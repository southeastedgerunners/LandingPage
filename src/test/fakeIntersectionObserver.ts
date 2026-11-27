import { act } from '@testing-library/react';

/**
 * Stand-in for IntersectionObserver (jsdom has none). report() plays a scroll by putting every
 * target on screen (wholly, or by `ratio`) or off it.
 */
export class FakeIntersectionObserver {
  static instances: FakeIntersectionObserver[] = [];
  targets: Element[] = [];

  constructor(private callback: IntersectionObserverCallback) {
    FakeIntersectionObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.push(target);
  }

  disconnect() {
    this.targets = [];
  }

  report(isIntersecting: boolean, ratio = isIntersecting ? 1 : 0) {
    const entries = this.targets.map(
      target => ({ target, isIntersecting, intersectionRatio: ratio }) as IntersectionObserverEntry,
    );
    act(() => this.callback(entries, this as unknown as IntersectionObserver));
  }
}
