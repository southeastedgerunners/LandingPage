namespace EdgeRunners.Api.Models;

public sealed record BusyTimesResponse(
    string Timezone,
    IReadOnlyList<BusyTimeBlock> Busy,
    IReadOnlyList<BusyTimeBlock> AvailableSlots);
