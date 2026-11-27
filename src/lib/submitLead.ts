export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'unavailable' | 'error';

/**
 * - sent: the server accepted the lead.
 * - not-connected: the server says the lead pipeline isn't set up (503 from the
 *   placeholder in netlify/functions/intake.mjs). Nothing was delivered.
 * - failed: any other error response, a network failure, or no answer in time.
 */
export type SubmitResult = 'sent' | 'not-connected' | 'failed';

const TIMEOUT_MS = 15000;

/** Posts a lead to the intake Netlify function. Gives up after 15 seconds. */
export async function submitLead(payload: Record<string, string>): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch('/.netlify/functions/intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.ok) return 'sent';
    return res.status === 503 ? 'not-connected' : 'failed';
  } catch {
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}

/** Maps a submit result onto the form's status. */
export function statusFor(result: SubmitResult): SubmitStatus {
  if (result === 'sent') return 'success';
  return result === 'not-connected' ? 'unavailable' : 'error';
}
