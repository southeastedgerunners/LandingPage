import { useState } from 'react';
import './CallRequestModal.css';

interface FormData {
  contactName: string;
  businessName: string;
  phone: string;
  email: string;
  website: string;
  industry: string;
  message: string;
}

const EMPTY: FormData = {
  contactName: '',
  businessName: '',
  phone: '',
  email: '',
  website: '',
  industry: '',
  message: '',
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function IntakeFormModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const isReady =
    form.contactName.trim().length > 0 &&
    form.businessName.trim().length > 0 &&
    form.phone.replace(/\D/g, '').length === 10 &&
    form.email.trim().length > 0 &&
    form.message.trim().length > 0 &&
    smsConsent;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'phone' ? formatPhone(value) : value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const url = '/.netlify/functions/intake';

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formType: 'full', source: 'Website Intake Form' }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('success');
      setForm(EMPTY);
      setSmsConsent(false);
    } catch {
      setStatus('error');
    }
  }

  function handleClose() {
    if (status === 'submitting') return;
    setStatus('idle');
    setSmsConsent(false);
    onClose();
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) handleClose();
  }

  return (
    <div
      className="crm-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="intake-title"
    >
      <div className="crm-modal">
        <button className="crm-modal__close" onClick={handleClose} aria-label="Close dialog">
          ✕
        </button>

        {status === 'success' ? (
          <div className="crm-success">
            <div className="crm-success__icon" aria-hidden="true">✓</div>
            <h2>We've got your info!</h2>
            <p>We'll review your submission and reach out shortly to get started.</p>
            <button className="cta-button" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="crm-modal__header">
              <h2 id="intake-title">Free Business Intake</h2>
              <p>Tell us about your business and what you'd like to automate. We'll reach out with a plan.</p>
            </div>

            <form className="crm-form" onSubmit={handleSubmit} noValidate>
              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="intake-contactName">Your Name</label>
                  <input
                    id="intake-contactName" name="contactName" type="text"
                    value={form.contactName} onChange={handleChange}
                    required autoComplete="name" placeholder="John Smith"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="intake-businessName">Business Name</label>
                  <input
                    id="intake-businessName" name="businessName" type="text"
                    value={form.businessName} onChange={handleChange}
                    required autoComplete="organization" placeholder="Acme Roofing"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="intake-phone">Phone Number</label>
                  <input
                    id="intake-phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    required autoComplete="tel" placeholder="(606) 555-1234"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="intake-email">Email Address</label>
                  <input
                    id="intake-email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    required autoComplete="email" placeholder="john@acmeroofing.com"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="intake-website">
                    Website <span className="crm-field__optional">(optional)</span>
                  </label>
                  <input
                    id="intake-website" name="website" type="text"
                    value={form.website} onChange={handleChange}
                    autoComplete="url" placeholder="acmeroofing.com"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="intake-industry">
                    Industry <span className="crm-field__optional">(optional)</span>
                  </label>
                  <input
                    id="intake-industry" name="industry" type="text"
                    value={form.industry} onChange={handleChange}
                    placeholder="Roofing"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-field">
                <label htmlFor="intake-message">How can we help?</label>
                <textarea
                  id="intake-message" name="message"
                  value={form.message} onChange={handleChange}
                  rows={3}
                  required
                  placeholder="We need help with missed-call text back and appointment reminders…"
                  disabled={status === 'submitting'}
                />
              </div>

              <label className="crm-consent">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={e => setSmsConsent(e.target.checked)}
                  required
                  disabled={status === 'submitting'}
                />
                <span>
                  I agree to receive SMS messages from SouthEast EdgeRunners regarding my inquiry,
                  including updates, reminders, and follow-ups. Message frequency may vary. Message
                  and data rates may apply. Reply STOP to opt out.{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="crm-consent__link">
                    Privacy Policy
                  </a>
                </span>
              </label>

              {status === 'error' && (
                <p className="crm-form__error" role="alert">
                  Something went wrong. Please try again or reach out directly.
                </p>
              )}

              <button
                type="submit"
                className="cta-button cta-button--pink crm-form__submit"
                disabled={!isReady || status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Submit Intake Form →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default IntakeFormModal;
