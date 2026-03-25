namespace EdgeRunners.Api.Models;

public sealed record BookingAppointment(string Start, string? End, string? Label, string? DateLabel);
