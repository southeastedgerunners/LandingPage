namespace EdgeRunners.Api.Models;

public sealed record BookingAvailabilityDay(string Date, IReadOnlyList<BookingAvailabilitySlot> Slots);
