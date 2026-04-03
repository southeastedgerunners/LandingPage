import { useState, useEffect, useRef } from 'react';
import logo from '../assets/SouthEasternEdgeRunners.png';
import CallRequestModal from '../components/CallRequestModal';
import './HomePage.css';

const TALLY_FORM_URL = 'https://tally.so/r/REPLACE_WITH_YOUR_FORM_ID';

const services = [
  {
    title: 'Workflow Automation',
    description:
      'We build custom n8n workflows that connect your tools, eliminate repetitive tasks, and keep your business running around the clock.',
  },
  {
    title: 'AI Applications',
    description:
      'From smart chatbots to intelligent document processing, we integrate AI into your operations so you can focus on growth.',
  },
  {
    title: 'Website Creation',
    description:
      'Fast, modern websites built with purpose — designed to convert visitors and reflect your brand.',
  },
  {
    title: 'Facebook Ads & Lead Funnels',
    description:
      'Targeted ad campaigns paired with optimized funnels that capture leads and route them directly into your CRM.',
  },
  {
    title: 'CRM & Auto-Texting',
    description:
      'Automatically follow up with every lead via text, keeping customers engaged and reducing churn without lifting a finger.',
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Workflows Automated' },
  { value: 200, suffix: '+', label: 'Hours Saved Monthly' },
  { value: 100, suffix: '%', label: 'Client Retention' },
  { value: 5, suffix: 'x', label: 'Average ROI' },
];

const steps = [
  {
    title: 'Audit Your Workflow',
    description:
      'We map out where your team spends time on manual, repetitive work — and identify exactly where automation delivers the biggest impact.',
  },
  {
    title: 'Build the Automation',
    description:
      'We design and deploy custom n8n workflows, AI integrations, and CRM connections tailored to your business.',
  },
  {
    title: 'You Save Time',
    description:
      'Your systems run on autopilot. Leads get followed up, appointments get booked, and your team focuses on what matters.',
  },
];

function useCountUp(target: number, isActive: boolean, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [isActive, target, duration]);

  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, active);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stat-card" ref={ref}>
      <span className="stat-card__value">{count}{suffix}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="home">
        <section className="hero">
          <div className="hero__content">
            <h1>
              Automate your business.<br />
              <span className="hero__accent">Grow faster.</span>
            </h1>
            <p className="hero__sub">
              SouthEast EdgeRunners helps businesses automate the work they shouldn't be doing
              manually — from lead capture to customer retention.
            </p>
            <div className="hero__cta">
              <button type="button" className="cta-button" onClick={() => setIsModalOpen(true)}>
                Request a Call
              </button>
            </div>
            <p className="hero__note">
              Prefer a form?{' '}
              <a href={TALLY_FORM_URL} target="_blank" rel="noopener noreferrer" className="hero__tally-link">
                Fill out our quick intake form →
              </a>
            </p>
          </div>
          <div className="hero__visual">
            <img src={logo} alt="SouthEast EdgeRunners" className="hero__logo" />
          </div>
        </section>

        <section className="stats" aria-label="Key metrics">
          <h2>By the Numbers</h2>
          <div className="stats__grid">
            {stats.map(s => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </section>

        <section className="how-it-works">
          <h2>How It Works</h2>
          <div className="how-it-works__steps">
            {steps.map((step, i) => (
              <article key={step.title} className="step-card">
                <div className="step-card__badge" aria-hidden="true">{i + 1}</div>
                <h3 className="step-card__title">{step.title}</h3>
                <p className="step-card__desc">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="services">
          <h2>What We Do</h2>
          <div className="services__grid">
            {services.map((s) => (
              <article key={s.title} className="service-card">
                <div className="service-card__accent" aria-hidden="true" />
                <div className="service-card__body">
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <CallRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default HomePage;
