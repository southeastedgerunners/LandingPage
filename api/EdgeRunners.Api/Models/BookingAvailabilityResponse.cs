namespace EdgeRunners.Api.Models;

public sealed record BookingAvailabilityResponse(
    string Timezone,
    string RangeStart,
    string RangeEnd,
    IReadOnlyList<BookingAvailabilityDay> Days);
