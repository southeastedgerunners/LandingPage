import { useId, useState } from 'react';
import SmsConsent from './SmsConsent';
import FormStatus from './FormStatus';
import { FieldError, SubmitError, fieldA11y, focusFirstInvalid } from './FormMessages';
import { RESPONSE_PROMISE } from '../lib/contact';
import { formatPhone, isCompletePhone } from '../lib/phone';
import { statusFor, submitLead, type SubmitStatus } from '../lib/submitLead';
import './forms.css';

interface Props {
  headingId: string;
  headingLevel?: 'h1' | 'h2';
  onDone: () => void;
  doneLabel?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = {
  contactName: '',
  businessName: '',
  phone: '',
  email: '',
  website: '',
  industry: '',
  message: '',
};

const FIELD_ORDER = [
  'contactName',
  'businessName',
  'phone',
  'email',
  'message',
  'consent',
];

function emailError(value: string): string | undefined {
  const email = value.trim();
  if (!email) return 'Enter your email address.';
  if (!EMAIL_PATTERN.test(email)) return 'Enter an email address like name@example.com.';
  return undefined;
}

function IntakeForm({ headingId, headingLevel = 'h2', onDone, doneLabel = 'Done' }: Props) {
  const [form, setForm] = useState(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const uid = useId();
  const Heading = headingLevel;
  const busy = status === 'submitting';

  const errors: Record<string, string | undefined> = {
    'contactName': form.contactName.trim() ? undefined : 'Enter your name.',
    'businessName': form.businessName.trim() ? undefined : 'Enter your business name.',
    'phone': isCompletePhone(form.phone) ? undefined : 'Enter a 10‑digit phone number.',
    'email': emailError(form.email),
    'message': form.message.trim() ? undefined : 'Tell us a little about what you need.',
    'consent': smsConsent ? undefined : 'Check the box so we can text you about your request.',
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
    const result = await submitLead({ ...form, formType: 'full', source: 'Website Intake Form' });
    setStatus(statusFor(result));
    if (result === 'sent') {
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
        title="Thanks, we've got it"
        body={`We'll read through it and reach out ${RESPONSE_PROMISE} to talk next steps.`}
        doneLabel={doneLabel}
        onDone={onDone}
      />
    );
  }

  const show = (id: string) => (attempted ? errors[id] : undefined);
  const a11y = (name: string) => fieldA11y(`${uid}-${name}`, errors[name], attempted);

  return (
    <div className="lead-form">
      <div className="lead-form__header">
        <Heading id={headingId}>Free Business Intake</Heading>
        <p>Tell us about your business and what you’d like to take off your plate. We’ll reply {RESPONSE_PROMISE}.</p>
      </div>

      <form className="lead-form__fields" onSubmit={handleSubmit} noValidate>
        <div className="lead-form__row">
          <div className="field">
            <label htmlFor={`${uid}-contactName`}>Your Name</label>
            <input
              id={`${uid}-contactName`} name="contactName" type="text"
              value={form.contactName} onChange={handleChange}
              required autoComplete="name" placeholder="e.g. John Smith"
              readOnly={busy} {...a11y('contactName')}
            />
            <FieldError id={`${uid}-contactName-error`} message={show('contactName')} />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-businessName`}>Business Name</label>
            <input
              id={`${uid}-businessName`} name="businessName" type="text"
              value={form.businessName} onChange={handleChange}
              required autoComplete="organization" placeholder="e.g. Acme Roofing"
              readOnly={busy} {...a11y('businessName')}
            />
            <FieldError id={`${uid}-businessName-error`} message={show('businessName')} />
          </div>
        </div>

        <div className="lead-form__row">
          <div className="field">
            <label htmlFor={`${uid}-phone`}>Phone Number</label>
            <input
              id={`${uid}-phone`} name="phone" type="tel" inputMode="tel"
              value={form.phone} onChange={handleChange}
              required autoComplete="tel" placeholder="e.g. (606) 555-1234"
              readOnly={busy} {...a11y('phone')}
            />
            <FieldError id={`${uid}-phone-error`} message={show('phone')} />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-email`}>Email Address</label>
            <input
              id={`${uid}-email`} name="email" type="email"
              value={form.email} onChange={handleChange}
              required autoComplete="email" placeholder="e.g. john@acmeroofing.com"
              readOnly={busy} {...a11y('email')}
            />
            <FieldError id={`${uid}-email-error`} message={show('email')} />
          </div>
        </div>

        <div className="lead-form__row">
          <div className="field">
            <label htmlFor={`${uid}-website`}>
              Website <span className="field__optional">(optional)</span>
            </label>
            <input
              id={`${uid}-website`} name="website" type="text"
              value={form.website} onChange={handleChange}
              autoComplete="url" placeholder="e.g. acmeroofing.com"
              readOnly={busy}
            />
          </div>
          <div className="field">
            <label htmlFor={`${uid}-industry`}>
              Industry <span className="field__optional">(optional)</span>
            </label>
            <input
              id={`${uid}-industry`} name="industry" type="text"
              value={form.industry} onChange={handleChange}
              placeholder="e.g. Roofing"
              readOnly={busy}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor={`${uid}-message`}>How can we help?</label>
          <textarea
            id={`${uid}-message`} name="message"
            value={form.message} onChange={handleChange}
            rows={3}
            required
            placeholder="e.g. We need help with missed-call text back and appointment reminders…"
            readOnly={busy} {...a11y('message')}
          />
          <FieldError id={`${uid}-message-error`} message={show('message')} />
        </div>

        <SmsConsent
          id={`${uid}-consent`}
          checked={smsConsent}
          onChange={setSmsConsent}
          disabled={busy}
          error={show('consent')}
        />

        {(status === 'error' || status === 'unavailable') && <SubmitError unavailable={status === 'unavailable'} />}

        <button type="submit" className="cta-button lead-form__submit" aria-disabled={busy || undefined}>
          {busy ? 'Sending…' : 'Send intake form'}
        </button>
      </form>
    </div>
  );
}

export default IntakeForm;
