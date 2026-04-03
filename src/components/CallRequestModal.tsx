import { useState } from 'react';
import './CallRequestModal.css';

interface FormData {
  contactName: string;
  phone: string;
}

const EMPTY: FormData = { contactName: '', phone: '' };

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

function CallRequestModal({ isOpen, onClose }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  if (!isOpen) return null;

  const isReady =
    form.contactName.trim().length > 0 &&
    form.phone.replace(/\D/g, '').length === 10 &&
    smsConsent;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        body: JSON.stringify({ ...form, formType: 'quick', source: 'Website Call Request' }),
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
      aria-labelledby="crm-title"
    >
      <div className="crm-modal crm-modal--slim">
        <button className="crm-modal__close" onClick={handleClose} aria-label="Close dialog">
          ✕
        </button>

        {status === 'success' ? (
          <div className="crm-success">
            <div className="crm-success__icon" aria-hidden="true">✓</div>
            <h2>We'll call you soon!</h2>
            <p>Expect a call from the EdgeRunners team shortly.</p>
            <button className="cta-button" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="crm-modal__header">
              <h2 id="crm-title">Request a Call</h2>
              <p>Drop your name and number — we'll reach out shortly.</p>
            </div>

            <form className="crm-form" onSubmit={handleSubmit} noValidate>
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
                <label htmlFor="crm-phone">Phone Number</label>
                <input
                  id="crm-phone" name="phone" type="tel"
                  value={form.phone} onChange={handleChange}
                  required autoComplete="tel" placeholder="(606) 555-1234"
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
                disabled={!isReady || status === 'submitting'}
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
