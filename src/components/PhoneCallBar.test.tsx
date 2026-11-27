import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CallRequestProvider } from './CallRequestContext';
import PhoneCallBar, { contactRegion } from './PhoneCallBar';
import { FakeIntersectionObserver } from '../test/fakeIntersectionObserver';

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

const observer = () => FakeIntersectionObserver.instances[0];

beforeEach(() => {
  FakeIntersectionObserver.instances = [];
  vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('PhoneCallBar', () => {
  it('stays hidden while the page’s own contact actions are on screen', () => {
    renderPage({ withRegion: true });
    observer().report(true);
    expect(barButton()).toBeNull();
  });

  it('appears once the page’s contact actions scroll away', () => {
    renderPage({ withRegion: true });
    observer().report(true);
    observer().report(false);
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
