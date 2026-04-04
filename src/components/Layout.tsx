import { NavLink, Outlet } from 'react-router-dom';
import TawkWidget from './TawkWidget';
import './Layout.css';

function Layout() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <NavLink to="/" className="brand">
          SouthEast
          <span className="brand__line">EdgeRunners</span>
        </NavLink>
        <nav className="header-nav" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              ['nav-button', isActive ? 'nav-button--active' : ''].filter(Boolean).join(' ')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              ['nav-button', isActive ? 'nav-button--active' : ''].filter(Boolean).join(' ')
            }
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/estimator"
            className={({ isActive }) =>
              ['nav-button', isActive ? 'nav-button--active' : ''].filter(Boolean).join(' ')
            }
          >
            Estimator
          </NavLink>
        </nav>
      </header>

      <main className="main-area">
        <Outlet />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} SouthEast EdgeRunners. All rights reserved.</small>
      </footer>

      <TawkWidget />
    </div>
  );
}

export default Layout;
