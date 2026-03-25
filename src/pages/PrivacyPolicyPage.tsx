import './PrivacyPolicyPage.css';

function PrivacyPolicyPage() {
  return (
    <div className="privacy">
      <div className="page-section">
        <h1>Privacy Policy</h1>
        <p className="privacy__updated">Last updated: March 2026</p>
      </div>

      <div className="privacy__body">
        <section className="privacy__section">
          <h2>Information We Collect</h2>
          <p>
            When you contact us or use our services, we may collect personal information such as your
            name, email address, phone number, and business details. We only collect information you
            voluntarily provide to us.
          </p>
        </section>

        <section className="privacy__section">
          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to inquiries and provide our services</li>
            <li>Send relevant updates about your project or account</li>
            <li>Improve our offerings and customer experience</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="privacy__section">
          <h2>Data Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. We may share
            data with trusted service providers who assist us in operating our business, subject to
            confidentiality agreements.
          </p>
        </section>

        <section className="privacy__section">
          <h2>Cookies</h2>
          <p>
            Our website may use cookies to enhance your browsing experience. You can choose to
            disable cookies through your browser settings, though some features may not function
            properly as a result.
          </p>
        </section>

        <section className="privacy__section">
          <h2>Data Security</h2>
          <p>
            We implement reasonable security measures to protect your personal information. However,
            no method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="privacy__section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:contact@southeastedgerunners.com" className="privacy__link">
              contact@southeastedgerunners.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
