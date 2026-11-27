import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCallRequest } from './CallRequestContext';
import './PhoneCallBar.css';

/** Marks a part of a page that already offers a way to get in touch. */
export const contactRegion = { 'data-contact-region': '' };

/**
 * A "Request a Call" bar pinned to the bottom of phone screens (CSS hides it from 561px up).
 * It shows only while no contact region of the current page is on screen, so it fills
 * the gaps between the page's own calls to action instead of doubling them.
 */
function PhoneCallBar() {
  const openCallRequest = useCallRequest();
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const regions = document.querySelectorAll('[data-contact-region]');
    if (regions.length === 0 || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });
    regions.forEach(region => observer.observe(region));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <div className="phone-call-bar" data-visible={visible} aria-hidden={!visible}>
      <button type="button" className="cta-button" onClick={openCallRequest}>
        Request a Call
      </button>
    </div>
  );
}

export default PhoneCallBar;
