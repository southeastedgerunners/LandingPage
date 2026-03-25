namespace EdgeRunners.Api.Models;

public sealed record BookingRequest(
    string SubmittedAt,
    string Timezone,
    string Source,
    BookingContact Contact,
    BookingAppointment Appointment);
