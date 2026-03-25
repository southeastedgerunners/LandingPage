namespace EdgeRunners.Api.Configuration;

public sealed class N8nOptions
{
    public const string SectionName = "N8n";

    public string? AvailabilityWebhookUrl { get; init; }

    public string? BookingWebhookUrl { get; init; }
}
