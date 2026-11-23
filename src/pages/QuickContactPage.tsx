import { useNavigate } from 'react-router-dom';
import CallRequestForm from '../components/CallRequestForm';
import './ContactPage.css';
import { usePageTitle } from '../lib/usePageTitle';

/** Standalone call-request form, linked for SMS compliance review. */
function QuickContactPage() {
  usePageTitle('Request a Call', 'Leave your name and number and SouthEast EdgeRunners will call you back within one business day.');
  const navigate = useNavigate();
  return (
    <div className="contact-page contact-page--slim">
      <CallRequestForm headingId="quick-contact-title" headingLevel="h1" onDone={() => navigate('/')} doneLabel="Back to home" />
    </div>
  );
}

export default QuickContactPage;
