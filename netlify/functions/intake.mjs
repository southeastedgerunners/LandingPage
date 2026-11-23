// TODO(lead-pipeline): The lead pipeline is being rebuilt. Leads are NOT being
// delivered anywhere yet. The old n8n forwarding was removed on 2026-11-23.
//
// What this placeholder does, on purpose:
// - POST: does not store, forward or log the submission (no personal data is
//   kept), and answers 503 { delivered: false, reason: 'lead-pipeline-not-connected' }.
//   The site's forms treat that as "online requests aren't connected yet" and
//   point the visitor to the contact email instead of showing a success screen.
// - Any other method: 405.
//
// When the new pipeline exists, replace the POST branch with real delivery and
// return 200 only after the lead has actually been accepted downstream.

const NOT_CONNECTED = {
  statusCode: 503,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ delivered: false, reason: 'lead-pipeline-not-connected' }),
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  return NOT_CONNECTED;
};
