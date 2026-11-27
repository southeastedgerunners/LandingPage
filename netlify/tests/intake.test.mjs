import { describe, expect, it } from 'vitest';
import { handler } from '../functions/intake.mjs';

describe('intake function (placeholder while the lead pipeline is rebuilt)', () => {
  it('does not claim delivery: POST answers 503 with delivered false', async () => {
    const res = await handler({ httpMethod: 'POST', body: JSON.stringify({ contactName: 'Dana' }) });
    expect(res.statusCode).toBe(503);
    expect(JSON.parse(res.body)).toEqual({ delivered: false, reason: 'lead-pipeline-not-connected' });
  });

  it('rejects other methods', async () => {
    const res = await handler({ httpMethod: 'GET' });
    expect(res.statusCode).toBe(405);
  });
});
