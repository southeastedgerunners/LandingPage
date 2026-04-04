import { useState, useEffect, useRef } from 'react';
import logo from '../assets/SouthEasternEdgeRunners.png';
import CallRequestModal from '../components/CallRequestModal';
import IntakeFormModal from '../components/IntakeFormModal';
import {
  auditYourWorkflow,
  buildTheAutomation,
  youSaveTime,
  workflowAutomation,
  aiApplications,
  websiteCreation,
  facebookAdsAndLeadFunnels,
  crmAndAutoTexting,
  brandingAndVisualIdentity,
  quickBooksAutomation,
  reputationAndReviewManagement,
} from '../content/homePage';
import './HomePage.css';

const services = [
  { title: 'Workflow Automation',            description: workflowAutomation },
  { title: 'AI Applications',               description: aiApplications },
  { title: 'Website Creation',              description: websiteCreation },
  { title: 'Facebook Ads & Lead Funnels',   description: facebookAdsAndLeadFunnels },
  { title: 'CRM & Auto-Texting',            description: crmAndAutoTexting },
  { title: 'Branding & Visual Identity',    description: brandingAndVisualIdentity },
  { title: 'QuickBooks Automation',         description: quickBooksAutomation },
  { title: 'Reputation & Review Management', description: reputationAndReviewManagement },
];

const stats = [
  { value: 50,  suffix: '+', label: 'Workflows Automated' },
  { value: 200, suffix: '+', label: 'Hours Saved Monthly' },
  { value: 100, suffix: '%', label: 'Client Retention' },
  { value: 5,   suffix: 'x', label: 'Average ROI' },
];

const steps = [
  { title: 'Audit Your Workflow', description: auditYourWorkflow },
  { title: 'Build the Automation', description: buildTheAutomation },
  { title: 'You Save Time',        description: youSaveTime },
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
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);

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
              <button type="button" className="cta-button cta-button--pink" onClick={() => setIsIntakeOpen(true)}>
                Free Intake Form →
              </button>
            </div>
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
      <IntakeFormModal isOpen={isIntakeOpen} onClose={() => setIsIntakeOpen(false)} />
    </>
  );
}

export default HomePage;
