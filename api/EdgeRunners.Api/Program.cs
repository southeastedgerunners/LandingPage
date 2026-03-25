using EdgeRunners.Api.Configuration;
using EdgeRunners.Api.Models;
using EdgeRunners.Api.Services;
using Microsoft.Extensions.Options;
using System.Globalization;
using System.Collections.Concurrent;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<N8nOptions>(builder.Configuration.GetSection(N8nOptions.SectionName));
builder.Services.Configure<BookingAvailabilityOptions>(builder.Configuration.GetSection(BookingAvailabilityOptions.SectionName));
builder.Services.AddHttpClient<N8nBookingClient>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? [];

        if (allowedOrigins.Length > 0)
        {
            policy.WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod();
            return;
        }

        if (builder.Environment.IsDevelopment())
        {
            policy
                .WithOrigins(
                    "http://localhost:5173",
                    "http://127.0.0.1:5173",
                    "http://localhost:4173",
                    "http://127.0.0.1:4173"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    });
});

var app = builder.Build();

var pendingBookings = new ConcurrentDictionary<string, PendingBooking>();

// Background cleanup task to remove expired pending bookings (TTL-based holds)
var cleanupCts = new CancellationTokenSource();
_ = Task.Run(async () =>
{
    while (!cleanupCts.Token.IsCancellationRequested)
    {
        try
        {
            var now = DateTimeOffset.UtcNow;
            var expired = pendingBookings.Where(kv => kv.Value.ExpiresAtUtc <= now).Select(kv => kv.Key).ToList();
            foreach (var key in expired)
            {
                pendingBookings.TryRemove(key, out _);
            }
        }
        catch
        {
            // swallow and continue
        }

        try { await Task.Delay(TimeSpan.FromMinutes(1), cleanupCts.Token); } catch { }
    }
}, cleanupCts.Token);

app.Lifetime.ApplicationStopping.Register(() => cleanupCts.Cancel());

if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.UseCors("Frontend");

app.MapGet("/", () => Results.Ok(new { service = "EdgeRunners.Api", status = "ok" }));

app.MapGet("/api/booking/availability", async (
    string? timezone,
    string? calendarId,
    N8nBookingClient client,
    IOptions<BookingAvailabilityOptions> availabilityOptions,
    CancellationToken cancellationToken) =>
{
    try
    {
        var options = availabilityOptions.Value;
        var resolvedTimezone = string.IsNullOrWhiteSpace(timezone) ? options.Timezone : timezone;
        var resolvedCalendarId = string.IsNullOrWhiteSpace(calendarId) ? options.CalendarId : calendarId;

        var timeZoneInfo = ResolveTimeZone(resolvedTimezone);
        var nowUtc = DateTimeOffset.UtcNow;
        var nowLocal = TimeZoneInfo.ConvertTime(nowUtc, timeZoneInfo);
        var rangeStartLocal = new DateTime(nowLocal.Year, nowLocal.Month, nowLocal.Day, 0, 0, 0, DateTimeKind.Unspecified);
        var rangeEndLocal = rangeStartLocal.AddMonths(options.MonthsForward);
        var rangeStartUtc = ToUtc(rangeStartLocal, timeZoneInfo);
        var rangeEndUtc = ToUtc(rangeEndLocal, timeZoneInfo);

        var busyTimes = await client.GetBusyTimesAsync(
            rangeStartUtc.ToString("O", CultureInfo.InvariantCulture),
            rangeEndUtc.ToString("O", CultureInfo.InvariantCulture),
            resolvedTimezone,
            resolvedCalendarId,
            cancellationToken);

        // Merge in-memory pending bookings so recently requested appointments are temporarily blocked
        var mergedBusy = busyTimes.Busy.ToList();
        foreach (var pb in pendingBookings.Values)
        {
            mergedBusy.Add(new BusyTimeBlock(
                pb.StartUtc.ToString("O", CultureInfo.InvariantCulture),
                pb.EndUtc.ToString("O", CultureInfo.InvariantCulture)));
        }

        var busyForCalculation = mergedBusy.OrderBy(b => b.Start).ToArray();

        var response = busyTimes.AvailableSlots.Count > 0
            ? BuildAvailabilityFromAvailableSlots(
                busyTimes.AvailableSlots,
                resolvedTimezone,
                rangeStartLocal,
                rangeEndLocal,
                options,
                timeZoneInfo)
            : BuildAvailabilityFromBusyBlocks(
                busyForCalculation,
                resolvedTimezone,
                rangeStartLocal,
                rangeEndLocal,
                options,
                timeZoneInfo);

        return Results.Ok(response);
    }
    catch (InvalidOperationException exception)
    {
        return Results.Problem(statusCode: StatusCodes.Status500InternalServerError, detail: exception.Message);
    }
    catch (HttpRequestException exception)
    {
        return Results.Problem(statusCode: StatusCodes.Status502BadGateway, detail: exception.Message);
    }
});

app.MapPost("/api/booking/requests", async (BookingRequest request, N8nBookingClient client, IOptions<BookingAvailabilityOptions> availabilityOptions, CancellationToken cancellationToken) =>
{
    try
    {
        // Forward to n8n and capture the response body so we can return it to the frontend and record a pending hold
        var responseBody = await client.SubmitBookingAsync(request, cancellationToken);

        object? responseObj = null;
        try
        {
            responseObj = JsonSerializer.Deserialize<object>(responseBody);
        }
        catch
        {
            responseObj = new { status = "queued" };
        }

        // Attempt to extract a booking id from the n8n response; fallback to a GUID
        string bookingId = null!;
        try
        {
            using var doc = JsonDocument.Parse(responseBody);
            var root = doc.RootElement;

            if (root.ValueKind == JsonValueKind.Object)
            {
                if (root.TryGetProperty("bookingId", out var bookingIdEl) && bookingIdEl.ValueKind == JsonValueKind.String)
                {
                    bookingId = bookingIdEl.GetString() ?? Guid.NewGuid().ToString("N");
                }
                else if (root.TryGetProperty("appointmentDetails", out var ap) && ap.ValueKind == JsonValueKind.Object)
                {
                    if (ap.TryGetProperty("confirmationNumber", out var conf) && conf.ValueKind == JsonValueKind.String)
                    {
                        bookingId = conf.GetString() ?? Guid.NewGuid().ToString("N");
                    }
                    else if (ap.TryGetProperty("bookingId", out var bid) && bid.ValueKind == JsonValueKind.String)
                    {
                        bookingId = bid.GetString() ?? Guid.NewGuid().ToString("N");
                    }
                }
            }
        }
        catch
        {
            // ignore
        }

        if (string.IsNullOrWhiteSpace(bookingId)) bookingId = Guid.NewGuid().ToString("N");

        // Parse appointment start/end and create a pending hold (30 min TTL)
        var startDto = DateTimeOffset.Parse(request.Appointment.Start, CultureInfo.InvariantCulture);
        var endDto = !string.IsNullOrWhiteSpace(request.Appointment.End)
            ? DateTimeOffset.Parse(request.Appointment.End, CultureInfo.InvariantCulture)
            : startDto.AddMinutes(availabilityOptions.Value.SlotDurationMinutes);

        var pending = new PendingBooking
        {
            BookingId = bookingId,
            StartUtc = startDto.ToUniversalTime(),
            EndUtc = endDto.ToUniversalTime(),
            CreatedAtUtc = DateTimeOffset.UtcNow,
            ExpiresAtUtc = DateTimeOffset.UtcNow.AddMinutes(30)
        };

        pendingBookings.TryAdd(bookingId, pending);

        return Results.Accepted(value: responseObj);
    }
    catch (InvalidOperationException exception)
    {
        return Results.Problem(statusCode: StatusCodes.Status500InternalServerError, detail: exception.Message);
    }
    catch (HttpRequestException exception)
    {
        return Results.Problem(statusCode: StatusCodes.Status502BadGateway, detail: exception.Message);
    }
});

// Approval endpoint: n8n should POST here when owner approves/rejects via Twilio
app.MapPost("/api/booking/approval", (ApprovalRequest approval) =>
{
    if (string.IsNullOrWhiteSpace(approval.BookingId))
    {
        return Results.BadRequest(new { error = "bookingId is required" });
    }

    if (pendingBookings.TryRemove(approval.BookingId, out var removed))
    {
        // Optionally: handle approval==true/false if needed (audit/logging)
        return Results.Ok(new { removed = true, bookingId = approval.BookingId, approved = approval.Approved });
    }

    return Results.NotFound(new { removed = false, message = "Pending booking not found", bookingId = approval.BookingId });
});

app.Run();

static BookingAvailabilityResponse BuildAvailabilityFromBusyBlocks(
    IReadOnlyList<BusyTimeBlock> busyBlocks,
    string timezone,
    DateTime rangeStartLocal,
    DateTime rangeEndLocal,
    BookingAvailabilityOptions options,
    TimeZoneInfo timeZoneInfo)
{
    var parsedBusyBlocks = busyBlocks
        .Select(block => ParseBlockRange(block, timeZoneInfo))
        .OrderBy(block => block.StartLocal)
        .ToArray();

    var days = new List<BookingAvailabilityDay>();

    for (var day = rangeStartLocal.Date; day < rangeEndLocal.Date; day = day.AddDays(1))
    {
        var isWeekend = day.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
        var slots = new List<BookingAvailabilitySlot>();

        for (var hour = options.StartHour; hour < options.EndHour; hour++)
        {
            for (var minute = 0; minute < 60; minute += options.SlotDurationMinutes)
            {
                var slotStartLocal = day.AddHours(hour).AddMinutes(minute);
                var slotEndLocal = slotStartLocal.AddMinutes(options.SlotDurationMinutes);

                if (slotEndLocal.Hour > options.EndHour || (slotEndLocal.Hour == options.EndHour && slotEndLocal.Minute > 0))
                {
                    continue;
                }

                var slotStartUtc = ToUtc(slotStartLocal, timeZoneInfo);
                var slotEndUtc = ToUtc(slotEndLocal, timeZoneInfo);
                var overlapsBusyBlock = parsedBusyBlocks.Any(block =>
                    slotStartLocal < block.EndLocal && slotEndLocal > block.StartLocal);
                var available = !overlapsBusyBlock && (options.IncludeWeekends || !isWeekend);

                slots.Add(new BookingAvailabilitySlot(
                    slotStartUtc.ToString("O", CultureInfo.InvariantCulture),
                    slotEndUtc.ToString("O", CultureInfo.InvariantCulture),
                    slotStartLocal.ToString("h:mm tt", CultureInfo.InvariantCulture),
                    available));
            }
        }

        days.Add(new BookingAvailabilityDay(day.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture), slots));
    }

    return new BookingAvailabilityResponse(
        timezone,
        ToUtc(rangeStartLocal, timeZoneInfo).ToString("O", CultureInfo.InvariantCulture),
        ToUtc(rangeEndLocal, timeZoneInfo).ToString("O", CultureInfo.InvariantCulture),
        days);
}

static BookingAvailabilityResponse BuildAvailabilityFromAvailableSlots(
    IReadOnlyList<BusyTimeBlock> availableSlots,
    string timezone,
    DateTime rangeStartLocal,
    DateTime rangeEndLocal,
    BookingAvailabilityOptions options,
    TimeZoneInfo timeZoneInfo)
{
    var parsedAvailableSlots = availableSlots
        .Select(slot => ParseBlockRange(slot, timeZoneInfo))
        .OrderBy(slot => slot.StartLocal)
        .ToArray();

    var days = new List<BookingAvailabilityDay>();

    for (var day = rangeStartLocal.Date; day < rangeEndLocal.Date; day = day.AddDays(1))
    {
        var isWeekend = day.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday;
        var slots = new List<BookingAvailabilitySlot>();

        for (var hour = options.StartHour; hour < options.EndHour; hour++)
        {
            for (var minute = 0; minute < 60; minute += options.SlotDurationMinutes)
            {
                var slotStartLocal = day.AddHours(hour).AddMinutes(minute);
                var slotEndLocal = slotStartLocal.AddMinutes(options.SlotDurationMinutes);

                if (slotEndLocal.Hour > options.EndHour || (slotEndLocal.Hour == options.EndHour && slotEndLocal.Minute > 0))
                {
                    continue;
                }

                var slotStartUtc = ToUtc(slotStartLocal, timeZoneInfo);
                var slotEndUtc = ToUtc(slotEndLocal, timeZoneInfo);
                var withinAvailableSlot = parsedAvailableSlots.Any(slot =>
                    slotStartLocal >= slot.StartLocal && slotEndLocal <= slot.EndLocal);
                var available = withinAvailableSlot && (options.IncludeWeekends || !isWeekend);

                slots.Add(new BookingAvailabilitySlot(
                    slotStartUtc.ToString("O", CultureInfo.InvariantCulture),
                    slotEndUtc.ToString("O", CultureInfo.InvariantCulture),
                    slotStartLocal.ToString("h:mm tt", CultureInfo.InvariantCulture),
                    available));
            }
        }

        days.Add(new BookingAvailabilityDay(day.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture), slots));
    }

    return new BookingAvailabilityResponse(
        timezone,
        ToUtc(rangeStartLocal, timeZoneInfo).ToString("O", CultureInfo.InvariantCulture),
        ToUtc(rangeEndLocal, timeZoneInfo).ToString("O", CultureInfo.InvariantCulture),
        days);
}

static DateTimeOffset ToUtc(DateTime localDateTime, TimeZoneInfo timeZoneInfo)
{
    var offset = timeZoneInfo.GetUtcOffset(localDateTime);
    return new DateTimeOffset(localDateTime, offset).ToUniversalTime();
}

static (DateTime StartLocal, DateTime EndLocal) ParseBlockRange(BusyTimeBlock block, TimeZoneInfo timeZoneInfo)
{
    var start = ParseIncomingDateTime(block.Start, timeZoneInfo);
    var end = ParseIncomingDateTime(block.End, timeZoneInfo);

    if (end <= start)
    {
        throw new InvalidOperationException($"Invalid busy time block received: '{block.Start}' - '{block.End}'.");
    }

    return (start, end);
}

static DateTime ParseIncomingDateTime(string value, TimeZoneInfo timeZoneInfo)
{
    if (DateTimeOffset.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.RoundtripKind, out var offsetValue))
    {
        return TimeZoneInfo.ConvertTime(offsetValue, timeZoneInfo).DateTime;
    }

    if (DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out var localValue))
    {
        return DateTime.SpecifyKind(localValue, DateTimeKind.Unspecified);
    }

    throw new InvalidOperationException($"Invalid datetime value received from booking availability webhook: '{value}'.");
}

static TimeZoneInfo ResolveTimeZone(string timezone)
{
    try
    {
        return TimeZoneInfo.FindSystemTimeZoneById(timezone);
    }
    catch (TimeZoneNotFoundException)
    {
        var ianaToWindowsTimeZones = new Dictionary<string, string>
        {
            ["America/New_York"] = "Eastern Standard Time",
            ["America/Chicago"] = "Central Standard Time",
            ["America/Denver"] = "Mountain Standard Time",
            ["America/Los_Angeles"] = "Pacific Standard Time"
        };

        if (ianaToWindowsTimeZones.TryGetValue(timezone, out var windowsTimeZone))
        {
            return TimeZoneInfo.FindSystemTimeZoneById(windowsTimeZone);
        }

        throw new InvalidOperationException($"Unsupported timezone '{timezone}'.");
    }
}
