import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  vi.stubGlobal('requestIdleCallback', vi.fn(() => 0));
  vi.stubGlobal('cancelIdleCallback', vi.fn());
});

afterEach(() => {
  cleanup(); // unmount while the idle-callback stubs still exist
  vi.unstubAllGlobals();
});

describe('routes', () => {
  it('shows a not-found page for removed or unknown paths', () => {
    renderAt('/estimator');
    expect(screen.getByRole('heading', { level: 1, name: 'We couldn’t find that page' })).toBeTruthy();
    expect(document.title).toBe('Page not found · SouthEast EdgeRunners');
  });

  it('gives each page its own title', () => {
    renderAt('/privacy');
    expect(document.title).toBe('Privacy Policy · SouthEast EdgeRunners');
  });

  it('keeps the legal links in the footer', () => {
    renderAt('/');
    const legal = screen.getByRole('navigation', { name: 'Legal' });
    expect(legal.querySelector('a[href="/privacy"]')).toBeTruthy();
    expect(legal.querySelector('a[href="/terms"]')).toBeTruthy();
  });

  it('starts a new page at the top with focus on the main content', () => {
    const scrollTo = vi.fn();
    vi.stubGlobal('scrollTo', scrollTo);
    renderAt('/');
    fireEvent.click(screen.getByRole('link', { name: 'Privacy Policy' }));
    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(document.activeElement?.id).toBe('main');
  });

  it('sets a description for each page', () => {
    document.head.innerHTML = '<meta name="description" content="">';
    renderAt('/terms');
    expect(document.querySelector('meta[name="description"]')?.getAttribute('content')).toMatch(/^Terms for SMS/);
  });
});
