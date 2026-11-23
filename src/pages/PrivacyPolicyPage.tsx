import './LegalPage.css';
import { usePageTitle } from '../lib/usePageTitle';
import { CONTACT_EMAIL } from '../lib/contact';
import Placeholder from '../components/Placeholder';

function PrivacyPolicyPage() {
  usePageTitle('Privacy Policy', 'How SouthEast EdgeRunners collects, uses and protects your information, including SMS messages.');
  return (
    <article className="legal">
      <header className="legal__header">
        <h1>Privacy Policy</h1>
        <p className="legal__updated">Last updated: April 2026</p>
      </header>

      <div className="legal__body">
        <section className="legal__section">
          <h2>Information We Collect</h2>
          <p>
            When you contact us or use our services, we may collect personal information such as your
            name, email address, phone number, and business details. We only collect information you
            voluntarily provide to us.
          </p>
        </section>

        <section className="legal__section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to inquiries and provide our services</li>
            <li>Send relevant updates about your project or account</li>
            <li>Improve our offerings and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            data with trusted service providers who assist us in operating our business, subject to
            confidentiality agreements.
          </p>
        </section>

        <section className="legal__section">
          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to
            disable cookies through your browser settings, though some features may not function
            properly as a result.
          </p>
        </section>

        <section className="legal__section">
          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However,
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="legal__section">
          <h2>SMS / Text Message Communications</h2>
          <p>
            By submitting our contact form and checking the SMS consent box, you agree to receive
            text messages from SouthEast EdgeRunners at the phone number you provided. These messages
            may include responses to your inquiry, follow-up information about our services, and
            relevant business automation updates.
          </p>
          <ul>
            {/* TODO(legal): this names only the "Request a Call" form, but the intake form also
                collects SMS consent. Owner is updating the wording; do not edit it here. */}
            <li>
              <strong>Opt-in:</strong> SMS consent is obtained at the time you submit our "Request a Call" form.{' '}
              <Placeholder>SMS opt-in wording to be updated</Placeholder>
            </li>
            <li><strong>Opt-out:</strong> Reply <strong>STOP</strong> at any time to unsubscribe from SMS messages. You will receive a one-time confirmation and no further messages will be sent.</li>
            <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance or contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="legal__link">{CONTACT_EMAIL}</a>.</li>
            <li><strong>Frequency:</strong> Message frequency varies based on your inquiry.</li>
            <li><strong>Rates:</strong> Message and data rates may apply depending on your carrier and plan.</li>
            <li><strong>Sharing:</strong> Your phone number and SMS consent are never sold or shared with third parties for their own marketing purposes.</li>
          </ul>
        </section>

        <section className="legal__section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="legal__link">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}

export default PrivacyPolicyPage;
