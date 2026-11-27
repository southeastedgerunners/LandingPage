import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On in-app navigation, start the new page at the top and move focus to <main>,
 * so keyboard and screen-reader users land on the new content, not the old link.
 * Skips the first render so a fresh page load behaves normally.
 */
function RouteChange({ mainId }: { mainId: string }) {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    document.getElementById(mainId)?.focus({ preventScroll: true });
  }, [pathname, mainId]);

  return null;
}

export default RouteChange;
