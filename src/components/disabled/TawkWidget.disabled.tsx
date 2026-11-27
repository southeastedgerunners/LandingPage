// DISABLED: the original Tawk.to live-chat integration, kept so it is easy to restore.
// Nothing imports this file. To restore: move it and its CSS back to src/components/
// as TawkWidget.tsx / TawkWidget.css (replacing the placeholder) after testing in a
// real browser. Its tests in TawkWidget.disabled.test.tsx keep it working meanwhile.
import { useState, useEffect } from 'react';
import './TawkWidget.disabled.css';

const TAWK_SRC = 'https://embed.tawk.to/69cfd11d9a2c2c1c3651d0a2/1jl9shn8e';
const HIDDEN_KEY = 'tawk-hidden';

function readHidden(): boolean {
  try {
    return sessionStorage.getItem(HIDDEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeHidden(hidden: boolean) {
  try {
    sessionStorage.setItem(HIDDEN_KEY, String(hidden));
  } catch {
    // Storage can be blocked (private mode); hiding still works for this page view.
  }
}

/**
 * Loads the Tawk.to chat script once the page is idle, so it never competes with the
 * first paint, and shows our hide/show control only after the widget has actually
 * loaded. If Tawk is blocked or fails, nothing of ours is left floating on the page.
 */
function TawkWidget() {
  const [loaded, setLoaded] = useState(false);
  const [hidden, setHidden] = useState(readHidden);

  useEffect(() => {
    const api = (window.Tawk_API = window.Tawk_API || {});
    const previousOnLoad = api.onLoad;
    api.onLoad = () => {
      previousOnLoad?.();
      setLoaded(true);
    };

    if (document.querySelector(`script[src="${TAWK_SRC}"]`)) return;

    const inject = () => {
      window.Tawk_LoadStart = new Date();
      const script = document.createElement('script');
      script.async = true;
      script.src = TAWK_SRC;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(inject, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(inject, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const api = window.Tawk_API;
    if (hidden) api?.hideWidget?.();
    else api?.showWidget?.();
    writeHidden(hidden);
  }, [hidden, loaded]);

  if (!loaded) return null;

  if (hidden) {
    return (
      <button type="button" className="tawk-restore" onClick={() => setHidden(false)} aria-label="Show chat">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path
            d="M4 5h16v11H9l-5 4z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinejoin="miter"
          />
        </svg>
      </button>
    );
  }

  return (
    <button type="button" className="tawk-dismiss" onClick={() => setHidden(true)}>
      Hide chat
    </button>
  );
}

export default TawkWidget;
