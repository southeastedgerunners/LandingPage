using System;

namespace EdgeRunners.Api.Models
{
    internal sealed record PendingBooking
    {
        public string BookingId { get; init; } = string.Empty;
        public DateTimeOffset StartUtc { get; init; }
        public DateTimeOffset EndUtc { get; init; }
        public DateTimeOffset CreatedAtUtc { get; init; } = DateTimeOffset.UtcNow;
        public DateTimeOffset ExpiresAtUtc { get; init; }
    }
}
