import { Link } from 'react-router-dom';
import { useCallRequest } from '../components/CallRequestContext';
import { contactRegion } from '../components/PhoneCallBar';
import { usePageTitle } from '../lib/usePageTitle';
import './LegalPage.css';

function NotFoundPage() {
  usePageTitle('Page not found');
  const openCallRequest = useCallRequest();
  return (
    <article className="legal">
      <header className="legal__header">
        <h1>We couldn’t find that page</h1>
        <p className="legal__updated">The link may be old, or the page may have moved.</p>
      </header>
      <div className="legal__actions" {...contactRegion}>
        <Link to="/" className="cta-button">Go to the homepage</Link>
        <button type="button" className="text-link" onClick={openCallRequest}>
          Or request a call
        </button>
      </div>
    </article>
  );
}

export default NotFoundPage;
