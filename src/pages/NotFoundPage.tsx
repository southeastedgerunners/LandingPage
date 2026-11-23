import { Link } from 'react-router-dom';
import { usePageTitle } from '../lib/usePageTitle';
import './LegalPage.css';

function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <article className="legal">
      <header className="legal__header">
        <h1>We couldn’t find that page</h1>
        <p className="legal__updated">The link may be old, or the page may have moved.</p>
      </header>
      <p>
        <Link to="/" className="legal__link">Go to the homepage</Link>
      </p>
    </article>
  );
}

export default NotFoundPage;
