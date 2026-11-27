import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CallRequestProvider } from './CallRequestContext';
import PhoneCallBar, { contactRegion } from './PhoneCallBar';

let observers: FakeObserver[] = [];

class FakeObserver {
  targets: Element[] = [];
  constructor(private callback: IntersectionObserverCallback) {
    observers.push(this);
  }
  observe(target: Element) {
    this.targets.push(target);
  }
  disconnect() {}
  report(isIntersecting: boolean) {
    const entries = this.targets.map(target => ({ target, isIntersecting }) as IntersectionObserverEntry);
    act(() => this.callback(entries, this as unknown as IntersectionObserver));
  }
}

function renderPage({ withRegion }: { withRegion: boolean }) {
  render(
    <MemoryRouter>
      <CallRequestProvider>
        {withRegion && <div {...contactRegion}>Hero actions</div>}
        <PhoneCallBar />
      </CallRequestProvider>
    </MemoryRouter>,
  );
}

const barButton = () => screen.queryByRole('button', { name: 'Request a Call' });

beforeEach(() => {
  observers = [];
  vi.stubGlobal('IntersectionObserver', FakeObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('PhoneCallBar', () => {
  it('stays hidden while the page’s own contact actions are on screen', () => {
    renderPage({ withRegion: true });
    observers[0].report(true);
    expect(barButton()).toBeNull();
  });

  it('appears once the page’s contact actions scroll away', () => {
    renderPage({ withRegion: true });
    observers[0].report(true);
    observers[0].report(false);
    expect(barButton()).not.toBeNull();
  });

  it('shows on pages with no contact actions of their own', () => {
    renderPage({ withRegion: false });
    expect(barButton()).not.toBeNull();
  });

  it('opens the call request form', () => {
    renderPage({ withRegion: false });
    fireEvent.click(barButton()!);
    expect(screen.getByRole('dialog')).toBeTruthy();
    expect(screen.getByLabelText('Phone Number')).toBeTruthy();
  });
});
