# Tally.so Form Setup

This document specifies how to configure your Tally.so form so it sends the same data structure as the website's "Request a Call" modal.

## Field Spec

Create a new form at [tally.so](https://tally.so) with **exactly these fields**, in order:

| Field Label         | Field Type      | Required | Notes                              |
|---------------------|-----------------|----------|------------------------------------|
| Business Name       | Short answer    | ✅ Yes   |                                    |
| Your Name           | Short answer    | ✅ Yes   |                                    |
| Phone Number        | Phone           | ✅ Yes   |                                    |
| Email Address       | Email           | ✅ Yes   |                                    |
| Website             | Short answer    | ❌ No    | Placeholder: `acmeroofing.com`     |
| Industry            | Short answer    | ❌ No    | Placeholder: `Roofing`             |
| How can we help?    | Long answer     | ✅ Yes   |                                    |

## Webhook Configuration

1. In your Tally form, go to **Settings → Integrations → Webhooks**
2. Add your n8n webhook URL (same URL as `VITE_N8N_WEBHOOK_URL`)
3. Set method to **POST**

Tally will POST a payload like:
```json
{
  "eventId": "...",
  "eventType": "FORM_RESPONSE",
  "createdAt": "...",
  "data": {
    "responseId": "...",
    "submittedAt": "...",
    "fields": [
      { "key": "question_abc", "label": "Business Name", "type": "INPUT_TEXT", "value": "Acme Roofing" },
      { "key": "question_def", "label": "Your Name",     "type": "INPUT_TEXT", "value": "John Smith" },
      ...
    ]
  }
}
```

## n8n Normalization

In your n8n workflow, add a **Code** or **Set** node after the Tally webhook trigger to map the Tally payload into the same shape as the website form:

```js
// Example n8n Code node (JavaScript)
const fields = $input.first().json.data.fields;
const get = (label) => fields.find(f => f.label === label)?.value ?? '';

return [{
  json: {
    businessName:  get('Business Name'),
    contactName:   get('Your Name'),
    phone:         get('Phone Number'),
    email:         get('Email Address'),
    website:       get('Website'),
    industry:      get('Industry'),
    message:       get('How can we help?'),
    source:        'Tally Form',
  }
}];
```

After this node, the data shape is identical to the website form and both can share the same downstream workflow.

## Updating the Website Link

Once your Tally form is published, copy the form URL (e.g., `https://tally.so/r/abc123`) and update the `TALLY_FORM_URL` constant at the top of `src/pages/HomePage.tsx`:

```ts
const TALLY_FORM_URL = 'https://tally.so/r/abc123';
```
