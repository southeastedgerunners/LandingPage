import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitLead } from './submitLead';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('submitLead', () => {
  it('reports failure on an error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    expect(await submitLead({ a: 'b' })).toBe(false);
  });

  it('gives up after 15 seconds without an answer', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      vi.fn((_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener('abort', () => reject(new DOMException('aborted', 'AbortError')));
        }),
      ),
    );
    const result = submitLead({ a: 'b' });
    await vi.advanceTimersByTimeAsync(15000);
    expect(await result).toBe(false);
  });
});
