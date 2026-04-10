import './TermsPage.css';

function TermsPage() {
  return (
    <div className="terms">
      <div className="page-section">
        <h1>Terms and Conditions</h1>
        <p className="terms__updated">Last updated: April 2026</p>
      </div>

      <div className="terms__body">
        <section className="terms__section">
          <h2>SMS Consent and Purpose</h2>
          <p>
            By providing your phone number and submitting a form on our website, you consent to
            receive SMS (text) messages from SouthEast EdgeRunners. These messages may include:
          </p>
          <ul>
            <li>Responses to your inquiries</li>
            <li>Service updates and follow-ups</li>
            <li>Appointment scheduling and reminders</li>
            <li>One-time missed call responses requesting opt-in</li>
          </ul>
        </section>

        <section className="terms__section">
          <h2>Message Frequency</h2>
          <p>
            Message frequency may vary depending on your interaction with our services. You will
            only receive messages related to your submitted inquiry or ongoing business relationship
            with us.
          </p>
        </section>

        <section className="terms__section">
          <h2>Message and Data Rates</h2>
          <p>
            Message and data rates may apply based on your mobile carrier plan. Message and data
            rates may be charged by your wireless carrier. We are not responsible for any carrier
            charges incurred.
          </p>
        </section>

        <section className="terms__section">
          <h2>Opt-Out Instructions</h2>
          <p>
            You can opt out of receiving SMS messages at any time by replying <strong>STOP</strong>{' '}
            to any message. After opting out, you will receive a one-time confirmation message,
            and no further messages will be sent from us unless you opt back in.
          </p>
        </section>

        <section className="terms__section">
          <h2>Help Instructions</h2>
          <p>
            For assistance or questions about our messaging, reply <strong>HELP</strong> to any
            message or contact us at{' '}
            <a href="mailto:contact@southeastedgerunners.com" className="terms__link">
              contact@southeastedgerunners.com
            </a>
            .
          </p>
        </section>

        <section className="terms__section">
          <h2>Privacy and Data Handling</h2>
          <p>
            Your personal information, including your phone number, will be handled in accordance
            with our{' '}
            <a href="/privacy" className="terms__link">
              Privacy Policy
            </a>
            . We do not sell or share your phone number with third parties for their marketing
            purposes.
          </p>
        </section>

        <section className="terms__section">
          <h2>Contact Information</h2>
          <p>
            If you have questions about these Terms and Conditions or our SMS communication
            practices, please contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@southeastedgerunners.com" className="terms__link">
                contact@southeastedgerunners.com
              </a>
            </li>
            <li>
              <strong>Business:</strong> SouthEast EdgeRunners
            </li>
          </ul>
        </section>

        <section className="terms__section">
          <h2>Agreement to Terms</h2>
          <p>
            By submitting your information through our website forms and checking the SMS consent
            box, you acknowledge that you have read and agree to these Terms and Conditions. Your
            continued use of our services constitutes your acceptance of these terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsPage;
