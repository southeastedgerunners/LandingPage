import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HomePage from './HomePage';
import { FakeIntersectionObserver } from '../test/fakeIntersectionObserver';

// data-log is the contract with HomePage.css: no value shows the log complete,
// 'waiting' holds the entries back, 'playing' runs the play-in once.
function renderExample() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  return screen.getByRole('figure');
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('worked example log', () => {
  it('shows complete where the browser can’t tell when it is on screen', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    expect(renderExample().hasAttribute('data-log')).toBe(false);
  });

  it('waits until half of it is on screen, then plays', () => {
    FakeIntersectionObserver.instances = [];
    vi.stubGlobal('IntersectionObserver', FakeIntersectionObserver);
    const figure = renderExample();
    const observer = FakeIntersectionObserver.instances[0];

    expect(figure.getAttribute('data-log')).toBe('waiting');
    observer.report(true, 0.2);
    expect(figure.getAttribute('data-log')).toBe('waiting');
    observer.report(true);
    expect(figure.getAttribute('data-log')).toBe('playing');
  });
});
