import { useId, useState } from 'react';
import SmsConsent from './SmsConsent';
import FormStatus from './FormStatus';
import { FieldError, SubmitError, fieldA11y, focusFirstInvalid } from './FormMessages';
import { RESPONSE_PROMISE } from '../lib/contact';
import { formatPhone, isCompletePhone } from '../lib/phone';
import { submitLead, type SubmitStatus } from '../lib/submitLead';
import './forms.css';

interface Props {
  /** Heading level and id let the form sit in a dialog (h2) or be a page's main content (h1). */
  headingId: string;
  headingLevel?: 'h1' | 'h2';
  /** Called from the success screen's button. */
  onDone: () => void;
  doneLabel?: string;
}

const EMPTY = { contactName: '', phone: '' };
const FIELD_ORDER = ['contactName', 'phone', 'consent'];

function CallRequestForm({ headingId, headingLevel = 'h2', onDone, doneLabel = 'Done' }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const uid = useId();
  const Heading = headingLevel;
  const busy = status === 'submitting';

  const errors: Record<string, string | undefined> = {
    'contactName': form.contactName.trim() ? undefined : 'Enter your name.',
    'phone': isCompletePhone(form.phone) ? undefined : 'Enter a 10‑digit phone number.',
    'consent': smsConsent ? undefined : 'Check the box so we can text you about your request.',
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? formatPhone(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setAttempted(true);
    if (Object.values(errors).some(Boolean)) {
      focusFirstInvalid(FIELD_ORDER.map((name): [string, string | undefined] => [`${uid}-${name}`, errors[name]]));
      return;
    }
    setStatus('submitting');
    const ok = await submitLead({ ...form, formType: 'quick', source: 'Website Call Request' });
    setStatus(ok ? 'success' : 'error');
    if (ok) {
      setForm(EMPTY);
      setSmsConsent(false);
      setAttempted(false);
    }
  }

  if (status === 'success') {
    return (
      <FormStatus
        headingId={headingId}
        headingLevel={headingLevel}
        title="Thanks, we'll call you soon"
        body={`Expect a call from SouthEast EdgeRunners ${RESPONSE_PROMISE}.`}
        doneLabel={doneLabel}
        onDone={onDone}
      />
    );
  }

  const show = (id: string) => (attempted ? errors[id] : undefined);

  return (
    <div className="lead-form">
      <div className="lead-form__header">
        <Heading id={headingId}>Request a Call</Heading>
        <p>Leave your name and number and we’ll call you back {RESPONSE_PROMISE}.</p>
      </div>

      <form className="lead-form__fields" onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor={`${uid}-contactName`}>Your Name</label>
          <input
            id={`${uid}-contactName`} name="contactName" type="text"
            value={form.contactName} onChange={handleChange}
            required autoComplete="name" placeholder="e.g. John Smith"
            readOnly={busy}
            {...fieldA11y(`${uid}-contactName`, errors['contactName'], attempted)}
          />
          <FieldError id={`${uid}-contactName-error`} message={show('contactName')} />
        </div>

        <div className="field">
          <label htmlFor={`${uid}-phone`}>Phone Number</label>
          <input
            id={`${uid}-phone`} name="phone" type="tel" inputMode="tel"
            value={form.phone} onChange={handleChange}
            required autoComplete="tel" placeholder="e.g. (606) 555-1234"
            readOnly={busy}
            {...fieldA11y(`${uid}-phone`, errors['phone'], attempted)}
          />
          <FieldError id={`${uid}-phone-error`} message={show('phone')} />
        </div>

        <SmsConsent
          id={`${uid}-consent`}
          checked={smsConsent}
          onChange={setSmsConsent}
          disabled={busy}
          error={show('consent')}
        />

        {status === 'error' && <SubmitError />}

        <button type="submit" className="cta-button lead-form__submit" aria-disabled={busy || undefined}>
          {busy ? 'Sending…' : 'Request a Call'}
        </button>
      </form>
    </div>
  );
}

export default CallRequestForm;
