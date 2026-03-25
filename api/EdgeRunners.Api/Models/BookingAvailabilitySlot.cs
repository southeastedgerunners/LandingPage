namespace EdgeRunners.Api.Models;

public sealed record BookingAvailabilitySlot(string Start, string End, string Label, bool Available);
