# SMS Consent Compliance

## Overview

This document outlines the SMS consent implementation to meet Twilio regulatory requirements for SMS marketing and transactional messages.

## Implementation Details

### Forms with SMS Consent

Both customer-facing forms now include explicit SMS opt-in checkboxes with compliant language:

1. **CallRequestModal** (`src/components/CallRequestModal.tsx`)
   - Quick "Request a Call" form
   - SMS consent required to submit

2. **IntakeFormModal** (`src/components/IntakeFormModal.tsx`)
   - Full "Business Intake" form
   - SMS consent required to submit

### Consent Language

Both forms use the following SMS consent text:

> I agree to receive SMS messages from SouthEast EdgeRunners regarding my inquiry, including updates, reminders, and follow-ups. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out. [Privacy Policy link]

This language satisfies Twilio requirements by explicitly stating:
- ✅ **What messages** they'll receive ("updates, reminders, and follow-ups")
- ✅ **Frequency** ("Message frequency may vary")
- ✅ **Consent** ("I agree to receive SMS messages")
- ✅ **Cost disclosure** ("Message and data rates may apply")
- ✅ **Opt-out mechanism** ("Reply STOP to opt out")
- ✅ **Privacy policy link** (included)

### Validation

- Checkbox is **NOT pre-checked** (unchecked by default)
- Checkbox is **required** to submit the form
- Submit button is **disabled** until consent is confirmed
- Checkbox state properly resets on successful submission or modal close

### Styling

Checkbox styling in `src/components/CallRequestModal.css`:
- Custom styled checkbox with teal accent color when checked
- Proper focus states for accessibility
- Responsive design for mobile

### Next Steps for n8n Workflow

Ensure your n8n webhook handler:
1. Logs the SMS consent status from form submissions
2. Uses this consent flag before sending any SMS messages
3. Maintains audit trail of consent for compliance documentation

## Testing

To verify compliance:
1. Open either form modal
2. Try to submit without checking the SMS consent box → submit button should be disabled
3. Check the SMS consent box → submit button should become enabled
4. Submit form → should succeed and display success message
5. Reopen form → checkbox should be unchecked (reset)

## Regulatory Notes

- This implementation aligns with **Twilio's SMS regulations** for explicit prior written consent
- Consent is tied to **inquiry-specific messaging** (not general marketing)
- Always maintain records of when users provided consent
- Honor STOP requests immediately in your n8n workflow
