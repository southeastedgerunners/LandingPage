import { useLayoutEffect, useRef, useState } from 'react';
import Modal from '../components/Modal';
import IntakeForm from '../components/IntakeForm';
import { useCallRequest } from '../components/CallRequestContext';
import Placeholder from '../components/Placeholder';
import EmailLink from '../components/EmailLink';
import { contactRegion } from '../components/PhoneCallBar';
import {
  heroTitle,
  heroLead,
  exampleSteps,
  exampleCaption,
  serviceGroups,
  steps,
  sampleSites,
} from '../content/homePage';
import { FOUNDER_NAME, RESPONSE_PROMISE, SERVICE_AREA } from '../lib/contact';
import './HomePage.css';
import { usePageTitle } from '../lib/usePageTitle';

/**
 * Holds the worked example's log back until half of it is on screen, then plays it once.
 * Without IntersectionObserver the state stays undefined and the log shows complete.
 */
function useExampleLog() {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<'waiting' | 'playing'>();

  useLayoutEffect(() => {
    const figure = ref.current;
    if (!figure || typeof IntersectionObserver === 'undefined') return;
    setState('waiting');
    // The first callback fires whatever the overlap, so check the ratio, not just isIntersecting.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < 0.5) return;
        setState('playing');
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return { ref, state };
}

function HomePage() {
  usePageTitle();
  const openCallRequest = useCallRequest();
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeKey, setIntakeKey] = useState(0);
  const exampleLog = useExampleLog();

  const intakeLink = (label: string) => (
    <button type="button" className="text-link" onClick={() => setIsIntakeOpen(true)}>
      {label}
    </button>
  );

  return (
    <>
      <div className="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <h1 id="hero-title" className="hero__title">{heroTitle}</h1>
            <p className="hero__lead">{heroLead}</p>
            <div className="hero__actions" {...contactRegion}>
              <button type="button" className="cta-button" onClick={openCallRequest}>
                Request a Call
              </button>
              <p className="hero__note">
                Free intake. We reply {RESPONSE_PROMISE}.
                <br />
                Prefer to write it out? {intakeLink('Fill out the intake form')}.
              </p>
            </div>
          </div>

          <figure className="example" aria-labelledby="example-caption" ref={exampleLog.ref} data-log={exampleLog.state}>
            <ol className="example__log">
              {exampleSteps.map((step, i) => (
                <li
                  key={step.event}
                  className={step.outcome ? 'example__step example__step--outcome' : 'example__step'}
                  style={{ '--step': i } as React.CSSProperties}
                >
                  <time className="example__time">{step.time}</time>
                  <span className="example__event">{step.event}</span>
                  <span className="example__detail">{step.detail}</span>
                </li>
              ))}
            </ol>
            <figcaption id="example-caption" className="example__caption">{exampleCaption}</figcaption>
          </figure>
        </section>

        <section className="services" aria-labelledby="services-title">
          <h2 id="services-title">What we can take off your plate</h2>
          <div className="services__groups">
            {serviceGroups.map(group => (
              <section key={group.outcome} className="service-group" aria-label={group.outcome}>
                <div className="service-group__intro">
                  <h3>{group.outcome}</h3>
                  <p>{group.summary}</p>
                </div>
                <dl className="service-group__list">
                  {group.services.map(service => (
                    <div key={service.name} className="service">
                      <dt>{service.name}</dt>
                      <dd>{service.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
          </div>
        </section>

        <section className="process" aria-labelledby="process-title">
          <h2 id="process-title">From first call to running on its own</h2>
          <ol className="process__steps">
            {steps.map(step => (
              <li key={step.title} className="process__step">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* The samples are static pages in public/samples, so these are plain links that leave the app router. */}
        <section className="samples" aria-labelledby="samples-title">
          <div className="samples__intro">
            <h2 id="samples-title">{sampleSites.title}</h2>
            <p>{sampleSites.lead}</p>
            <a className="inline-link samples__link" href={sampleSites.href}>{sampleSites.linkLabel}</a>
          </div>
          <a className="samples__strip" href={sampleSites.href} tabIndex={-1} aria-hidden="true">
            {sampleSites.previews.map(slug => (
              <img key={slug} src={`${sampleSites.href}img/${slug}-thumb.webp`} alt="" width={260} height={532} loading="lazy" decoding="async" />
            ))}
          </a>
        </section>

        <section className="about" aria-labelledby="about-title">
          <div className="about__intro">
            <h2 id="about-title">Local, and easy to reach</h2>
            {/* TODO(content): replace with a real photo of the founder. See PLACEHOLDERS.md. */}
            <div className="about__photo" role="img" aria-label={`Placeholder for a photo of ${FOUNDER_NAME}`}>
              <Placeholder>photo of {FOUNDER_NAME}</Placeholder>
            </div>
          </div>
          <div className="about__body">
            <div className="about__text">
              <p>
                SouthEast EdgeRunners is run by {FOUNDER_NAME}, working with small businesses across{' '}
                {SERVICE_AREA}.
              </p>
              {/* TODO(content): first-person intro from the founder. See PLACEHOLDERS.md. */}
              <Placeholder block>2–3 first-person sentences from {FOUNDER_NAME}: who you are and why you work locally</Placeholder>
            </div>
            <dl className="about__facts">
              <div>
                <dt>Phone</dt>
                {/* TODO(content): business phone number. See PLACEHOLDERS.md. */}
                <dd><Placeholder>business phone number</Placeholder></dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd><EmailLink className="inline-link" /></dd>
              </div>
              <div>
                <dt>Reply time</dt>
                <dd>Every inquiry, {RESPONSE_PROMISE}</dd>
              </div>
              <div>
                <dt>Service area</dt>
                <dd>{SERVICE_AREA}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="questions" aria-labelledby="questions-title">
          <h2 id="questions-title">Before you call</h2>
          <dl className="questions__list">
            <div className="question">
              <dt>What does it cost?</dt>
              {/* TODO(content): honest pricing information from the owner. See PLACEHOLDERS.md. */}
              <dd><Placeholder block>pricing: how projects are priced and any monthly costs</Placeholder></dd>
            </div>
            <div className="question">
              <dt>What happens on the call?</dt>
              {/* TODO(content): what the first call covers. See PLACEHOLDERS.md. */}
              <dd><Placeholder block>what happens on the first call, how long it takes, and what comes after</Placeholder></dd>
            </div>
          </dl>
        </section>

        <section className="closing" aria-labelledby="closing-title" {...contactRegion}>
          <h2 id="closing-title">Tell us what’s eating your week.</h2>
          <p>One short call is enough to find the first thing worth automating.</p>
          <div className="closing__actions">
            <button type="button" className="cta-button" onClick={openCallRequest}>
              Request a Call
            </button>
            <p className="closing__alt">
              Or {intakeLink('fill out the intake form')}, or email{' '}
              <EmailLink className="inline-link" />.
            </p>
          </div>
        </section>
      </div>

      <Modal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} labelledBy="intake-title">
        <IntakeForm
          key={intakeKey}
          headingId="intake-title"
          onDone={() => {
            setIsIntakeOpen(false);
            setIntakeKey(k => k + 1);
          }}
        />
      </Modal>
    </>
  );
}

export default HomePage;
