import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitLead } from './submitLead';

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe('submitLead', () => {
  it('reports sent only on a 2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 }));
    expect(await submitLead({ a: 'b' })).toBe('sent');
  });

  it('reports not-connected when the placeholder backend answers 503', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    expect(await submitLead({ a: 'b' })).toBe('not-connected');
  });

  it('reports failure on any other error response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    expect(await submitLead({ a: 'b' })).toBe('failed');
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
    expect(await result).toBe('failed');
  });
});
