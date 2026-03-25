using System.Net.Http.Json;
using System.Text.Json;
using EdgeRunners.Api.Configuration;
using EdgeRunners.Api.Models;
using Microsoft.Extensions.Options;

namespace EdgeRunners.Api.Services;

public sealed class N8nBookingClient
{
    private readonly HttpClient _httpClient;
    private readonly N8nOptions _options;

    public N8nBookingClient(HttpClient httpClient, IOptions<N8nOptions> options)
    {
        _httpClient = httpClient;
        _options = options.Value;
    }

    public async Task<BusyTimesResponse> GetBusyTimesAsync(
        string timeMin,
        string timeMax,
        string timezone,
        string calendarId,
        CancellationToken cancellationToken)
    {
        var webhookUrl = RequireAbsoluteUrl(
            _options.AvailabilityWebhookUrl,
            "N8n:AvailabilityWebhookUrl is required for booking availability."
        );

        var requestUrl = AppendQueryString(
            webhookUrl,
            new Dictionary<string, string>
            {
                ["timeMin"] = timeMin,
                ["timeMax"] = timeMax,
                ["timeZone"] = timezone,
                ["calendarId"] = calendarId
            }
        );
        using var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
        request.Headers.Accept.ParseAdd("application/json");

        using var response = await _httpClient.SendAsync(request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"Availability webhook returned {(int)response.StatusCode}: {responseBody}"
            );
        }

        if (string.IsNullOrWhiteSpace(responseBody))
        {
            throw new InvalidOperationException(
                "Availability webhook returned an empty response body. Ensure n8n Respond to Webhook returns JSON."
            );
        }

        using var document = JsonDocument.Parse(responseBody);
        return NormalizeBusyTimes(document.RootElement, calendarId);
    }

    public async Task<string> SubmitBookingAsync(BookingRequest request, CancellationToken cancellationToken)
    {
        var webhookUrl = RequireAbsoluteUrl(
            _options.BookingWebhookUrl,
            "N8n:BookingWebhookUrl is required for booking submissions."
        );

        using var response = await _httpClient.PostAsJsonAsync(webhookUrl, request, cancellationToken);
        var responseBody = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"Booking webhook returned {(int)response.StatusCode}: {responseBody}"
            );
        }

        return responseBody;
    }

    private static Uri RequireAbsoluteUrl(string? rawUrl, string errorMessage)
    {
        if (string.IsNullOrWhiteSpace(rawUrl) || !Uri.TryCreate(rawUrl, UriKind.Absolute, out var uri))
        {
            throw new InvalidOperationException(errorMessage);
        }

        return uri;
    }

    private static string AppendQueryString(Uri baseUri, IReadOnlyDictionary<string, string> queryParameters)
    {
        var separator = string.IsNullOrEmpty(baseUri.Query) ? "?" : "&";
        var query = string.Join(
            "&",
            queryParameters.Select(pair => $"{Uri.EscapeDataString(pair.Key)}={Uri.EscapeDataString(pair.Value)}")
        );
        return $"{baseUri}{separator}{query}";
    }

    private static BusyTimesResponse NormalizeBusyTimes(JsonElement rootElement, string calendarId)
    {
        if (rootElement.ValueKind != JsonValueKind.Object)
        {
            throw new InvalidOperationException("Busy times webhook must return a JSON object.");
        }

        var timezone = rootElement.TryGetProperty("timeZone", out var timeZoneElement)
            && timeZoneElement.ValueKind == JsonValueKind.String
            ? timeZoneElement.GetString() ?? "UTC"
            : rootElement.TryGetProperty("timezone", out var timezoneElement)
                && timezoneElement.ValueKind == JsonValueKind.String
                ? timezoneElement.GetString() ?? "UTC"
                : "UTC";

        if (rootElement.TryGetProperty("busy", out var directBusyElement) && directBusyElement.ValueKind == JsonValueKind.Array)
        {
            return new BusyTimesResponse(timezone, NormalizeBusyBlocks(directBusyElement), []);
        }

        if (rootElement.TryGetProperty("busySlots", out var busySlotsElement) && busySlotsElement.ValueKind == JsonValueKind.Array)
        {
            return new BusyTimesResponse(timezone, NormalizeBusyBlocks(busySlotsElement), []);
        }

        if (rootElement.TryGetProperty("availableSlots", out var availableSlotsElement)
            && availableSlotsElement.ValueKind == JsonValueKind.Array)
        {
            return new BusyTimesResponse(timezone, [], NormalizeBusyBlocks(availableSlotsElement));
        }

        if (rootElement.TryGetProperty("calendars", out var calendarsElement)
            && calendarsElement.ValueKind == JsonValueKind.Object)
        {
            if (calendarsElement.TryGetProperty(calendarId, out var requestedCalendar)
                && requestedCalendar.ValueKind == JsonValueKind.Object
                && requestedCalendar.TryGetProperty("busy", out var requestedBusy)
                && requestedBusy.ValueKind == JsonValueKind.Array)
            {
                return new BusyTimesResponse(timezone, NormalizeBusyBlocks(requestedBusy), []);
            }

            foreach (var property in calendarsElement.EnumerateObject())
            {
                if (property.Value.ValueKind == JsonValueKind.Object
                    && property.Value.TryGetProperty("busy", out var busyElement)
                    && busyElement.ValueKind == JsonValueKind.Array)
                {
                    return new BusyTimesResponse(timezone, NormalizeBusyBlocks(busyElement), []);
                }
            }
        }

        throw new InvalidOperationException(
            "Busy times webhook must return a busy array or Google Calendar freeBusy calendars object."
        );
    }

    private static IReadOnlyList<BusyTimeBlock> NormalizeBusyBlocks(JsonElement busyArray)
    {
        var busyBlocks = new List<BusyTimeBlock>();

        foreach (var item in busyArray.EnumerateArray())
        {
            if (item.ValueKind != JsonValueKind.Object)
            {
                continue;
            }

            if (!item.TryGetProperty("start", out var startElement)
                || !item.TryGetProperty("end", out var endElement)
                || startElement.ValueKind != JsonValueKind.String
                || endElement.ValueKind != JsonValueKind.String)
            {
                continue;
            }

            var start = startElement.GetString();
            var end = endElement.GetString();

            if (string.IsNullOrWhiteSpace(start)
                || string.IsNullOrWhiteSpace(end)
                || !DateTimeOffset.TryParse(start, out _)
                || !DateTimeOffset.TryParse(end, out _))
            {
                continue;
            }

            busyBlocks.Add(new BusyTimeBlock(start, end));
        }

        return busyBlocks
            .OrderBy(block => DateTimeOffset.Parse(block.Start))
            .ToArray();
    }
}
