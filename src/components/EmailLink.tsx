import { CONTACT_EMAIL } from '../lib/contact';

const [localPart, domain] = CONTACT_EMAIL.split('@');

/** The contact email as a mailto link. In a narrow column it wraps before the "@", never mid-word. */
function EmailLink({ className }: { className?: string }) {
  return (
    <a className={className} href={`mailto:${CONTACT_EMAIL}`}>
      {localPart}
      <wbr />@{domain}
    </a>
  );
}

export default EmailLink;
