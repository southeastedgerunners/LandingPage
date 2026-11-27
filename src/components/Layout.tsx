import { Link, Outlet } from 'react-router-dom';
import TawkWidget from './TawkWidget';
import RouteChange from './RouteChange';
import { CallRequestProvider, useCallRequest } from './CallRequestContext';
import { SERVICE_AREA } from '../lib/contact';
import EmailLink from './EmailLink';
import logoMark from '../assets/logo-mark.webp';
import './Layout.css';

function HeaderCallButton() {
  const openCallRequest = useCallRequest();
  return (
    <button type="button" className="cta-button cta-button--compact" onClick={openCallRequest}>
      Request a Call
    </button>
  );
}

function Layout() {
  return (
    <CallRequestProvider>
      <div className="app-shell">
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="site-header">
          <Link to="/" className="brand" aria-label="SouthEast EdgeRunners, home">
            <img src={logoMark} alt="" className="brand__mark" width="40" height="40" />
            <span className="brand__name">
              SouthEast
              <span className="brand__line">EdgeRunners</span>
            </span>
          </Link>
          <HeaderCallButton />
        </header>

        <RouteChange mainId="main" />
        <main id="main" className="main-area" tabIndex={-1}>
          <Outlet />
        </main>

        <footer className="footer">
          <div className="footer__contact">
            <p className="footer__brand">SouthEast EdgeRunners</p>
            <p>{SERVICE_AREA}</p>
            <p>
              <EmailLink className="footer__link" />
            </p>
          </div>
          <nav className="footer__nav" aria-label="Legal">
            <Link to="/privacy" className="footer__link">Privacy Policy</Link>
            <Link to="/terms" className="footer__link">Terms and Conditions</Link>
          </nav>
          <p className="footer__copyright">© {new Date().getFullYear()} SouthEast EdgeRunners. All rights reserved.</p>
        </footer>

        <TawkWidget />
      </div>
    </CallRequestProvider>
  );
}

export default Layout;
