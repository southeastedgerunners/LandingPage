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

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CallRequestModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const url = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!url) throw new Error('Webhook URL not configured');

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'Website Form' }),
      });

      if (!res.ok) throw new Error(`${res.status}`);
      setStatus('success');
      setForm(EMPTY);
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
      aria-labelledby="crm-title"
    >
      <div className="crm-modal">
        <button className="crm-modal__close" onClick={handleClose} aria-label="Close dialog">
          ✕
        </button>

        {status === 'success' ? (
          <div className="crm-success">
            <div className="crm-success__icon" aria-hidden="true">✓</div>
            <h2>Request sent!</h2>
            <p>We'll give you a call shortly to talk through your automation goals.</p>
            <button className="cta-button" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="crm-modal__header">
              <h2 id="crm-title">Request a Call</h2>
              <p>Tell us about your business and we'll reach out to discuss how we can help.</p>
            </div>

            <form className="crm-form" onSubmit={handleSubmit} noValidate>
              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="crm-contactName">Your Name</label>
                  <input
                    id="crm-contactName" name="contactName" type="text"
                    value={form.contactName} onChange={handleChange}
                    required autoComplete="name" placeholder="John Smith"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="crm-businessName">Business Name</label>
                  <input
                    id="crm-businessName" name="businessName" type="text"
                    value={form.businessName} onChange={handleChange}
                    required autoComplete="organization" placeholder="Acme Roofing"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="crm-phone">Phone Number</label>
                  <input
                    id="crm-phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    required autoComplete="tel" placeholder="(606) 555-1234"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="crm-email">Email Address</label>
                  <input
                    id="crm-email" name="email" type="email"
                    value={form.email} onChange={handleChange}
                    required autoComplete="email" placeholder="john@acmeroofing.com"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-form__row crm-form__row--half">
                <div className="crm-field">
                  <label htmlFor="crm-website">
                    Website <span className="crm-field__optional">(optional)</span>
                  </label>
                  <input
                    id="crm-website" name="website" type="text"
                    value={form.website} onChange={handleChange}
                    autoComplete="url" placeholder="acmeroofing.com"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="crm-field">
                  <label htmlFor="crm-industry">
                    Industry <span className="crm-field__optional">(optional)</span>
                  </label>
                  <input
                    id="crm-industry" name="industry" type="text"
                    value={form.industry} onChange={handleChange}
                    placeholder="Roofing"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              <div className="crm-field">
                <label htmlFor="crm-message">How can we help?</label>
                <textarea
                  id="crm-message" name="message"
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
                  I agree to receive SMS messages from SouthEast EdgeRunners. Msg &amp; data rates
                  may apply. Reply STOP to unsubscribe.{' '}
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
                className="cta-button crm-form__submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending…' : 'Request a Call →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default CallRequestModal;
