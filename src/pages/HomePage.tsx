import { useState } from 'react';
import Modal from '../components/Modal';
import IntakeForm from '../components/IntakeForm';
import { useCallRequest } from '../components/CallRequestContext';
import {
  heroTitle,
  heroLead,
  exampleSteps,
  exampleCaption,
  serviceGroups,
  steps,
} from '../content/homePage';
import { CONTACT_EMAIL, FOUNDER_NAME, RESPONSE_PROMISE, SERVICE_AREA } from '../lib/contact';
import './HomePage.css';
import { usePageTitle } from '../lib/usePageTitle';

function HomePage() {
  usePageTitle();
  const openCallRequest = useCallRequest();
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeKey, setIntakeKey] = useState(0);

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
            <div className="hero__actions">
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

          <figure className="example" aria-labelledby="example-caption">
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

        <section className="about" aria-labelledby="about-title">
          <h2 id="about-title">Local, and easy to reach</h2>
          <div className="about__body">
            <p className="about__text">
              SouthEast EdgeRunners is run by {FOUNDER_NAME}, working with small businesses across{' '}
              {SERVICE_AREA}.
            </p>
            <dl className="about__facts">
              <div>
                <dt>Email</dt>
                <dd><a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
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

        <section className="closing" aria-labelledby="closing-title">
          <h2 id="closing-title">Tell us what’s eating your week.</h2>
          <p>One short call is enough to find the first thing worth automating.</p>
          <div className="closing__actions">
            <button type="button" className="cta-button" onClick={openCallRequest}>
              Request a Call
            </button>
            <p className="closing__alt">
              Or {intakeLink('fill out the intake form')}, or email{' '}
              <a className="inline-link" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
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
