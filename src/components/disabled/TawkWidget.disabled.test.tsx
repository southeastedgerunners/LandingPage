import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import TawkWidget from './TawkWidget.disabled';

beforeEach(() => {
  delete window.Tawk_API;
  sessionStorage.clear();
  // Never inject the real Tawk script in tests.
  vi.stubGlobal('requestIdleCallback', vi.fn(() => 0));
  vi.stubGlobal('cancelIdleCallback', vi.fn());
});

afterEach(() => {
  cleanup(); // unmount while the idle-callback stubs still exist
  vi.unstubAllGlobals();
});

describe('TawkWidget (disabled original, kept restorable)', () => {
  it('renders no controls until the chat widget has loaded', () => {
    render(<TawkWidget />);
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('offers hide and show once Tawk reports it has loaded', () => {
    render(<TawkWidget />);
    const hideWidget = vi.fn();
    const showWidget = vi.fn();
    act(() => {
      Object.assign(window.Tawk_API!, { hideWidget, showWidget });
      window.Tawk_API!.onLoad!();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Hide chat' }));
    expect(hideWidget).toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: 'Show chat' }));
    expect(showWidget).toHaveBeenCalled();
  });
});
