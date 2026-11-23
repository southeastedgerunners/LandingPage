import { useNavigate } from 'react-router-dom';
import IntakeForm from '../components/IntakeForm';
import './ContactPage.css';
import { usePageTitle } from '../lib/usePageTitle';

/** Standalone intake form, linked for SMS compliance review. */
function ContactPage() {
  usePageTitle('Free Business Intake', 'Tell SouthEast EdgeRunners about your business and what you would like to automate. We reply within one business day.');
  const navigate = useNavigate();
  return (
    <div className="contact-page">
      <IntakeForm headingId="contact-title" headingLevel="h1" onDone={() => navigate('/')} doneLabel="Back to home" />
    </div>
  );
}

export default ContactPage;
