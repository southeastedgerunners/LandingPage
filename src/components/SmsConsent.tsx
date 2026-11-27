interface Props {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  /** Shown under the checkbox after a send attempt without consent. */
  error?: string;
}

/**
 * SMS opt-in checkbox shared by both lead forms.
 * The wording is a Twilio/A2P compliance artifact (see SMS_CONSENT_COMPLIANCE.md):
 * change its presentation freely, but not its text without review.
 */
function SmsConsent({ id, checked, onChange, disabled, error }: Props) {
  return (
    <div className="consent-group">
      <div className="consent">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={e => onChange(e.target.checked)}
          required
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label htmlFor={id}>
          I agree to receive SMS messages from SouthEast EdgeRunners regarding my inquiry,
          including updates, reminders, and follow-ups. Message frequency may vary. Message
          and data rates may apply. Reply STOP to opt out.{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
        </label>
      </div>
      {error && <p id={`${id}-error`} className="field__error">{error}</p>}
    </div>
  );
}

export default SmsConsent;
