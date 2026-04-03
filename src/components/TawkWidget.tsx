import { useState, useEffect } from 'react';
import './TawkWidget.css';

function TawkWidget() {
  const [hidden, setHidden] = useState(() => sessionStorage.getItem('tawk-hidden') === 'true');

  useEffect(() => {
    const api = window.Tawk_API;
    if (!api) return;

    if (hidden) {
      api.hideWidget?.();
    } else {
      api.showWidget?.();
    }
    sessionStorage.setItem('tawk-hidden', String(hidden));
  }, [hidden]);

  if (hidden) {
    return (
      <button
        className="tawk-restore"
        onClick={() => setHidden(false)}
        aria-label="Show chat"
        title="Show chat"
      >
        💬
      </button>
    );
  }

  return (
    <button
      className="tawk-dismiss"
      onClick={() => setHidden(true)}
      aria-label="Hide chat widget"
      title="Hide chat"
    >
      ✕ Hide chat
    </button>
  );
}

export default TawkWidget;
