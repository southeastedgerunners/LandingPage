import { useEffect, useRef } from 'react';

interface Props {
  headingId: string;
  headingLevel: 'h1' | 'h2';
  title: string;
  body: string;
  doneLabel: string;
  onDone: () => void;
}

/** Success screen shown after a lead form submits. */
function FormStatus({ headingId, headingLevel, title, body, doneLabel, onDone }: Props) {
  const Heading = headingLevel;
  const headingRef = useRef<HTMLHeadingElement>(null);

  // The form that had focus is gone; put focus on the confirmation so it is read out.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="lead-form lead-form--success" role="status">
      <svg className="lead-form__check" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <path d="M4 12.5l5 5L20 6.5" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" />
      </svg>
      <Heading id={headingId} ref={headingRef} tabIndex={-1}>{title}</Heading>
      <p>{body}</p>
      <button type="button" className="cta-button" onClick={onDone}>{doneLabel}</button>
    </div>
  );
}

export default FormStatus;
