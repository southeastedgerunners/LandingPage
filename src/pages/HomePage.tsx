import { useState } from 'react';
import logo from '../assets/SouthEasternEdgeRunners.png';
import BookingModal from '../components/BookingModal';
import './HomePage.css';

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

function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

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
              <button type="button" className="cta-button" onClick={() => setIsBookingOpen(true)}>
                Book a consultation
              </button>
            </div>
            <p className="hero__booking-note">
              Choose an available time, send your request, and we will route it through our n8n
              approval workflow before the appointment is added to the calendar.
            </p>
          </div>
          <div className="hero__visual">
            <img src={logo} alt="SouthEast EdgeRunners" className="hero__logo" />
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

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}

export default HomePage;
