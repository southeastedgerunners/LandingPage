import { CONTACT_EMAIL } from '../lib/contact';

/** Inline message under a field that failed validation. Linked from the field by aria-describedby. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="field__error">
      {message}
    </p>
  );
}

/** Shown when the request fails. Names the problem and a way around it. */
export function SubmitError() {
  return (
    <p className="lead-form__error" role="alert">
      We couldn’t send that. Check your connection and try again, or email us at{' '}
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
    </p>
  );
}

/** Field props for a validated input: invalid state and the link to its message, once the visitor has tried to send. */
export function fieldA11y(id: string, message: string | undefined, attempted: boolean) {
  const showError = attempted && Boolean(message);
  return {
    'aria-invalid': showError || undefined,
    'aria-describedby': showError ? `${id}-error` : undefined,
  };
}

/** Moves focus to the first field, in form order, that has an error. Takes [element id, error] pairs. */
export function focusFirstInvalid(fields: [string, string | undefined][]) {
  const first = fields.find(([, error]) => error);
  if (first) document.getElementById(first[0])?.focus();
}
