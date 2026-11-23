import { useEffect } from 'react';

const SITE = 'SouthEast EdgeRunners';
const DEFAULT_DESCRIPTION =
  'SouthEast EdgeRunners builds websites and workflow automations for small businesses in Southeastern Kentucky: missed-call text-backs, follow-ups, invoice reminders and review requests.';

/**
 * Sets the document title ("Page · SouthEast EdgeRunners", or the site's full title)
 * and the meta description for a route.
 */
export function usePageTitle(page?: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    document.title = page ? `${page} · ${SITE}` : `${SITE} · Websites and automation for small businesses`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [page, description]);
}
