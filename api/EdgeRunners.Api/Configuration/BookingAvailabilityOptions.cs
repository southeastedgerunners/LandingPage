namespace EdgeRunners.Api.Configuration;

public sealed class BookingAvailabilityOptions
{
    public const string SectionName = "BookingAvailability";

    public string Timezone { get; init; } = "America/New_York";

    public string CalendarId { get; init; } = "primary";

    public int MonthsForward { get; init; } = 2;

    public int SlotDurationMinutes { get; init; } = 30;

    public int StartHour { get; init; } = 9;

    public int EndHour { get; init; } = 17;

    public bool IncludeWeekends { get; init; }
}
