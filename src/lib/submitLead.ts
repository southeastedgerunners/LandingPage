export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const TIMEOUT_MS = 15000;

/**
 * Posts a lead to the intake Netlify function. Resolves true on a 2xx response,
 * false on an error response, a network failure, or no answer within 15 seconds.
 */
export async function submitLead(payload: Record<string, string>): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch('/.netlify/functions/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
