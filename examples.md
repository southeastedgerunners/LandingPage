:root {
color-scheme: dark;
font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
line-height: 1.5;
font-weight: 400;

--color-background: #2b2b2b;
--color-text: #e6e6e6;
--color-muted: #b6b6b6;
--color-accent: #00b5c9;
--color-accent-alt: #ff2d8a;
--color-elevated: #353535;
--color-border: rgba(255, 255, 255, 0.08);
--shadow-soft: 0 12px 30px rgba(0, 0, 0, 0.3);
}

* {
  box-sizing: border-box;
  }

body {
margin: 0;
min-height: 100vh;
background-color: var(--color-background);
color: var(--color-text);
display: flex;
justify-content: center;
}

#root {
width: 100%;
}

button {
font-family: inherit;
}

a {
color: inherit;
text-decoration: none;
}

NEXT EXAMPLE

.app-shell {
margin: 0 auto;
max-width: 1100px;
padding: 2.6rem 2.25rem 3.2rem;
display: flex;
flex-direction: column;
gap: 3.4rem;
min-height: 100vh;
}

.site-header {
display: flex;
align-items: center;
justify-content: space-between;
gap: 1.5rem;
}

.hero__brand {
font-size: 1.25rem;
font-weight: 600;
letter-spacing: 0.03em;
color: var(--color-text);
text-decoration: none;
transition: color 150ms ease;
line-height: 1.1;
}

.hero__brand-line {
display: block;
font-size: 0.92em;
letter-spacing: 0.12em;
text-transform: uppercase;
}

.hero__brand:hover,
.hero__brand:focus-visible {
color: var(--color-accent);
}

.hero__actions {
display: flex;
flex-wrap: wrap;
gap: 0.75rem;
}

.nav-button {
display: inline-flex;
align-items: center;
justify-content: center;
border: 1px solid var(--color-border);
border-radius: 999px;
background: rgba(255, 255, 255, 0.04);
color: var(--color-text);
padding: 0.45rem 1.25rem;
font-size: 0.9rem;
font-weight: 500;
letter-spacing: 0.02em;
cursor: pointer;
text-decoration: none;
transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease, color 150ms ease;
}

.nav-button:hover,
.nav-button:focus-visible {
border-color: var(--color-accent);
box-shadow: 0 6px 18px rgba(0, 181, 201, 0.35);
transform: translateY(-2px);
}

.nav-button--active {
border-color: var(--color-accent);
box-shadow: 0 6px 20px rgba(0, 181, 201, 0.32);
color: #ffffff;
}

.nav-button--alt {
border-color: rgba(255, 45, 138, 0.75);
background: rgba(255, 45, 138, 0.12);
color: #ffd5eb;
}

.nav-button--alt:hover,
.nav-button--alt:focus-visible {
border-color: var(--color-accent-alt);
box-shadow: 0 6px 20px rgba(255, 45, 138, 0.35);
}

.main-area {
display: flex;
flex-direction: column;
gap: 3.25rem;
flex: 1 1 auto;
}

.landing {
display: flex;
flex-direction: column;
gap: 3.25rem;
}

.hero {
display: flex;
flex-direction: column;
gap: 2.5rem;
}

.hero__body {
display: flex;
align-items: center;
justify-content: space-between;
gap: 2.5rem;
}

.hero__content {
display: flex;
flex-direction: column;
gap: 1.5rem;
max-width: 520px;
flex: 1 1 360px;
}

.hero__content h1 {
font-size: clamp(2.2rem, 5vw, 3.5rem);
margin: 0;
font-weight: 700;
letter-spacing: -0.01em;
}

.hero__content p {
margin: 0;
color: var(--color-muted);
font-size: 1.05rem;
}

.hero__cta {
display: flex;
flex-wrap: wrap;
gap: 0.85rem;
}

.hero__visual {
flex: 1 1 320px;
display: flex;
justify-content: center;
align-items: center;
}

.hero__visual img {
width: clamp(220px, 28vw, 360px);
max-width: 100%;
mix-blend-mode: multiply;
filter: brightness(1.12) contrast(1.08);
pointer-events: none;
}

.cta-button {
appearance: none;
border: none;
border-radius: 12px;
background: linear-gradient(135deg, rgba(0, 181, 201, 0.9), rgba(0, 120, 160, 0.9));
color: #ffffff;
padding: 0.75rem 1.75rem;
font-size: 0.95rem;
font-weight: 600;
letter-spacing: 0.03em;
cursor: pointer;
box-shadow: 0 14px 28px rgba(0, 181, 201, 0.25);
transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease;
}

.cta-button:hover,
.cta-button:focus-visible {
transform: translateY(-2px);
box-shadow: 0 16px 32px rgba(0, 181, 201, 0.32);
}

.cta-button--ghost {
background: transparent;
border: 1px solid rgba(255, 255, 255, 0.15);
color: var(--color-text);
box-shadow: none;
}

.cta-button--ghost:hover,
.cta-button--ghost:focus-visible {
border-color: rgba(255, 255, 255, 0.35);
transform: translateY(-2px);
}

.projects h2 {
margin: 0 0 1.5rem;
font-size: 1.5rem;
font-weight: 600;
}

.projects__grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
gap: 1.4rem;
}

.project-card {
position: relative;
border-radius: 20px;
overflow: hidden;
background: linear-gradient(160deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.25));
border: 1px solid rgba(255, 255, 255, 0.06);
min-height: 205px;
transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.project-card__accent {
position: absolute;
inset: 0;
background: radial-gradient(circle at top right, rgba(0, 181, 201, 0.45), transparent 55%),
radial-gradient(circle at bottom left, rgba(255, 45, 138, 0.35), transparent 55%);
opacity: 0.65;
pointer-events: none;
}

.project-card__body {
position: relative;
padding: 1.5rem;
display: flex;
flex-direction: column;
gap: 0.9rem;
}

.project-card h3 {
margin: 0;
font-size: 1.2rem;
font-weight: 600;
}

.project-card p {
margin: 0;
color: var(--color-muted);
font-size: 0.95rem;
}

.project-card__action {
align-self: flex-start;
appearance: none;
background: transparent;
border: none;
color: var(--color-text);
font-weight: 500;
cursor: pointer;
padding: 0;
letter-spacing: 0.02em;
border-bottom: 1px solid transparent;
transition: border-color 150ms ease;
text-decoration: none;
}

.project-card__action:hover,
.project-card__action:focus-visible {
border-color: var(--color-text);
}

.project-card:hover,
.project-card:focus-within {
transform: translateY(-4px);
box-shadow: var(--shadow-soft);
border-color: rgba(255, 255, 255, 0.12);
}

.boggle-controls {
display: flex;
gap: 0.85rem;
flex-wrap: wrap;
margin: 1rem 0 1.75rem;
}

.boggle-main {
display: flex;
flex-wrap: wrap;
gap: 2.5rem;
align-items: flex-start;
}

.boggle-content {
display: flex;
flex-direction: column;
gap: 2rem;
}

.boggle-board {
display: inline-flex;
flex-direction: column;
gap: 0.5rem;
margin-bottom: 2rem;
}

.boggle-board__row {
display: flex;
gap: 0.5rem;
}

.boggle-board__cell {
width: 56px;
height: 56px;
display: inline-flex;
align-items: center;
justify-content: center;
border-radius: 12px;
font-size: 1.4rem;
font-weight: 600;
background: linear-gradient(140deg, rgba(255, 45, 138, 0.95), rgba(200, 16, 112, 0.8));
border: 1px solid rgba(255, 255, 255, 0.22);
box-shadow: 0 14px 28px rgba(255, 45, 138, 0.28);
color: #fff;
}

.boggle-words {
max-width: 420px;
}

.boggle-words h2 {
margin: 0 0 0.75rem;
font-size: 1.2rem;
}

.boggle-words ol {
margin: 0;
padding-left: 1.25rem;
columns: 2;
column-gap: 1.75rem;
}

.boggle-words li {
color: var(--color-muted);
font-weight: 500;
margin-bottom: 0.35rem;
}

.boggle-summary {
flex: 1 1 320px;
min-width: 260px;
padding: 1.75rem;
border-radius: 20px;
background: linear-gradient(150deg, rgba(0, 181, 201, 0.22), rgba(0, 120, 160, 0.45));
border: 1px solid rgba(0, 181, 201, 0.25);
box-shadow: 0 18px 38px rgba(0, 120, 160, 0.32);
display: flex;
flex-direction: column;
gap: 1rem;
color: #e7f9ff;
}

.boggle-summary h2 {
margin: 0;
font-size: 1.3rem;
font-weight: 600;
color: #ffffff;
}

.boggle-summary p {
margin: 0;
line-height: 1.55;
font-size: 0.97rem;
color: rgba(231, 249, 255, 0.92);
}

.page-section {
padding: 2.5rem;
border-radius: 24px;
background: linear-gradient(155deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.28));
border: 1px solid rgba(255, 255, 255, 0.07);
display: flex;
flex-direction: column;
gap: 1rem;
box-shadow: 0 16px 36px rgba(0, 0, 0, 0.32);
}

.page-section h1 {
margin: 0;
font-size: clamp(2rem, 4.2vw, 2.75rem);
font-weight: 700;
}

.page-section p {
margin: 0;
color: var(--color-muted);
font-size: 1.05rem;
}

.notar-page {
display: flex;
flex-direction: column;
gap: 2.5rem;
}

.notar-actions {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: 1.5rem;
margin-top: 2rem;
}

.notar-card {
display: flex;
flex-direction: column;
gap: 1.1rem;
padding: 2.25rem 2rem;
border-radius: 22px;
background: linear-gradient(160deg, rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.3));
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 18px 40px rgba(0, 0, 0, 0.34);
}

.notar-card h2 {
margin: 0;
font-size: 1.32rem;
font-weight: 600;
}

.notar-card p {
color: var(--color-muted);
margin: 0;
}

.notar-summary {
margin-top: 2.25rem;
padding: 2rem;
border-radius: 22px;
background: linear-gradient(150deg, rgba(255, 45, 138, 0.22), rgba(200, 16, 112, 0.48));
border: 1px solid rgba(255, 45, 138, 0.3);
box-shadow: 0 18px 38px rgba(200, 16, 112, 0.38);
display: flex;
flex-direction: column;
gap: 1rem;
color: #ffe8f4;
}

.notar-summary h2 {
margin: 0;
font-size: 1.3rem;
font-weight: 600;
color: #ffffff;
}

.notar-summary p {
margin: 0;
font-size: 0.97rem;
line-height: 1.6;
color: rgba(255, 232, 244, 0.88);
}

.notar-button {
align-self: flex-start;
appearance: none;
border: none;
border-radius: 999px;
padding: 0.75rem 1.9rem;
font-size: 0.95rem;
font-weight: 600;
letter-spacing: 0.03em;
cursor: pointer;
color: #ffffff;
transition: transform 150ms ease, box-shadow 150ms ease, filter 150ms ease, opacity 150ms ease;
}

.notar-button--teal {
background: linear-gradient(135deg, rgba(0, 181, 201, 0.95), rgba(0, 120, 160, 0.85));
box-shadow: 0 18px 36px rgba(0, 181, 201, 0.28);
}

.notar-button--pink {
background: linear-gradient(135deg, rgba(255, 45, 138, 0.95), rgba(200, 16, 112, 0.82));
box-shadow: 0 18px 36px rgba(255, 45, 138, 0.28);
}

.notar-button:not(:disabled):hover,
.notar-button:not(:disabled):focus-visible {
transform: translateY(-2px);
filter: brightness(1.05);
}

.notar-button:disabled {
opacity: 0.6;
cursor: progress;
}

.notar-status {
min-height: 1.25rem;
font-size: 0.9rem;
color: var(--color-text);
}

.resume-builder {
display: flex;
flex-direction: column;
gap: 2rem;
}

.resume-header {
display: flex;
flex-wrap: wrap;
justify-content: space-between;
gap: 1.25rem;
align-items: center;
}

.resume-header p {
margin: 0.5rem 0 0;
color: var(--color-muted);
}

.resume-grid {
display: flex;
flex-direction: column;
gap: 2rem;
}

.resume-section {
display: flex;
flex-direction: column;
gap: 1.25rem;
padding: 1.75rem;
border-radius: 20px;
background: linear-gradient(160deg, rgba(255, 255, 255, 0.04), rgba(0, 0, 0, 0.28));
border: 1px solid rgba(255, 255, 255, 0.08);
box-shadow: 0 14px 32px rgba(0, 0, 0, 0.3);
}

.resume-section__header {
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
}

.resume-section__header h2 {
margin: 0;
font-size: 1.4rem;
}

.resume-fields {
display: grid;
gap: 1rem;
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.resume-field {
display: flex;
flex-direction: column;
gap: 0.35rem;
}

.resume-field span {
font-size: 0.85rem;
letter-spacing: 0.02em;
color: rgba(255, 255, 255, 0.75);
}

.resume-field input,
.resume-field textarea {
width: 100%;
padding: 0.65rem 0.75rem;
border-radius: 10px;
border: 1px solid rgba(255, 255, 255, 0.12);
background: rgba(0, 0, 0, 0.25);
color: var(--color-text);
font-size: 0.95rem;
transition: border-color 150ms ease, box-shadow 150ms ease;
}

.resume-field input:focus,
.resume-field textarea:focus {
outline: none;
border-color: rgba(0, 181, 201, 0.6);
box-shadow: 0 0 0 2px rgba(0, 181, 201, 0.2);
}

.resume-field textarea {
resize: vertical;
}

.resume-field--full {
grid-column: 1 / -1;
}

.resume-array-item {
display: flex;
flex-direction: column;
gap: 1rem;
padding: 1.25rem;
border-radius: 16px;
background: rgba(0, 0, 0, 0.18);
border: 1px solid rgba(255, 255, 255, 0.06);
}

.resume-array-header {
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
}

.resume-array-header h3 {
margin: 0;
font-size: 1.1rem;
}

.resume-add {
align-self: flex-start;
border: none;
background: transparent;
color: var(--color-text);
font-size: 0.85rem;
cursor: pointer;
padding: 0;
border-bottom: 1px solid transparent;
transition: border-color 150ms ease;
}

.resume-add:hover,
.resume-add:focus-visible {
border-color: rgba(0, 181, 201, 0.8);
outline: none;
}

.resume-remove {
border: none;
background: transparent;
color: rgba(255, 45, 138, 0.8);
font-size: 0.85rem;
cursor: pointer;
padding: 0;
border-bottom: 1px solid transparent;
transition: border-color 150ms ease;
}

.resume-remove:hover,
.resume-remove:focus-visible {
border-color: rgba(255, 45, 138, 0.9);
outline: none;
}

.resume-bullets {
display: flex;
flex-direction: column;
gap: 0.75rem;
}

.resume-bullets__header {
display: flex;
justify-content: space-between;
align-items: center;
gap: 1rem;
font-size: 0.9rem;
color: rgba(255, 255, 255, 0.75);
}

.resume-bullet-row {
display: flex;
gap: 0.65rem;
align-items: flex-start;
}

.resume-bullet-row textarea {
flex: 1;
}

.resume-status {
margin: 0;
color: rgba(255, 255, 255, 0.85);
font-size: 0.95rem;
}

.resume-actions {
display: flex;
justify-content: flex-end;
}

.footer {
padding-top: 1rem;
border-top: 1px solid rgba(255, 255, 255, 0.06);
color: rgba(255, 255, 255, 0.45);
font-size: 0.75rem;
letter-spacing: 0.02em;
text-align: center;
}

@media (max-width: 720px) {
.app-shell {
padding: 2.5rem 1.5rem 3rem;
}

.site-header {
flex-direction: column;
align-items: flex-start;
}

.hero__brand {
font-size: 1.1rem;
}

.hero__actions {
justify-content: flex-start;
}

.hero__body {
flex-direction: column;
align-items: flex-start;
gap: 2rem;
}

.hero__visual {
align-self: center;
}

.hero__visual img {
width: min(260px, 80vw);
}

.page-section {
padding: 2rem;
}
}

NEXT EXAMPLE

import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import BarKeeperPage from './pages/BarKeeperPage';
import BogglerPage from './pages/BogglerPage';
import LandingPage from './pages/LandingPage';
import NoTarUltimatePage from './pages/NoTarUltimatePage';
import ResumePage from './pages/ResumePage';
import './App.css';

function App() {
return (
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<LandingPage />} />
<Route path="notarultimate" element={<NoTarUltimatePage />} />
<Route path="boggler" element={<BogglerPage />} />
<Route path="barkeeper" element={<BarKeeperPage />} />
<Route path="resume" element={<ResumePage />} />
</Route>
</Routes>
);
}

export default App;

NEXT EXAMPLE

import { NavLink, Outlet } from 'react-router-dom';

type NavItem = {
label: string;
to: string;
variant?: 'alt';
external?: boolean;
};

const navItems: NavItem[] = [
{ label: 'NoTarUltimate', to: '/notarultimate', variant: 'alt' },
{ label: 'Boggler', to: '/boggler' },
{ label: 'BarKeeper', to: 'https://barkeeper-client.onrender.com', external: true, variant: 'alt' },
{ label: 'Generate Resume', to: '/resume' },
{ label: 'My Resume', to: '/resume.pdf', external: true, variant: 'alt' },
];

function Layout() {
return (
<div className="app-shell">
<header className="site-header">
<NavLink to="/" className="hero__brand">
SouthEastern
<span className="hero__brand-line">EdgeRunners</span>
</NavLink>
<nav className="hero__actions" aria-label="Primary">
{navItems.map((item) => {
const baseClasses = [
'nav-button',
item.variant ? `nav-button--${item.variant}` : '',
]
.filter(Boolean)
.join(' ');

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.to}
                  className={baseClasses}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  [baseClasses, isActive ? 'nav-button--active' : ''].filter(Boolean).join(' ')
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main className="main-area">
        <Outlet />
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} SouthEastern EdgeRunners. All rights reserved.</small>
      </footer>
    </div>
);
}

export default Layout;

NEXT EXAMPLE

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import heroLogo from '../assets/SouthEasternEdgeRunners.png';

const featuredProjects = [
{
name: 'NoTarUltimate',
description:
'A custom archiver that packs directories into .notar bundles, aligning every file stream on 16-byte boundaries for speedy binary reads—think a modern, bit-level spin on the Unix tar workflow.',
href: '/notarultimate',
},
{
name: 'Boggler',
description:
'An interactive Boggle solver that spins up random boards, then unleashes a trie-backed, recursive (and optionally multithreaded) search to surface every legal Scrabble word on demand.',
href: '/boggler',
},
{
name: 'Resume Generator',
description:
'An interactive workflow that converts the details you enter into a LaTeX layout, then compiles the results into a polished PDF ready to share.',
href: '/resume',
},
{
name: 'BarKeeper',
description:
'A bar program companion that marries ingredient pricing with recipe lookup—calculate pour costs, surface house-approved mixes in a tap, and let guests filter cocktails by tags like fruity or vodka-forward.',
href: 'https://barkeeper-client.onrender.com',
external: true,
},
];

function LandingPage() {
const projectsRef = useRef<HTMLElement | null>(null);

return (
<div className="landing">
<section className="hero">
<div className="hero__body">
<div className="hero__content">
<h1>Building digital tools with personality and purpose.</h1>
<p>
A developer-crafted collection of products and experiments spanning productivity, games,
and hospitality. Each concept is tuned with focus on thoughtful UX and reliable execution.
</p>
<div className="hero__cta">
<button
type="button"
className="cta-button"
onClick={() => projectsRef.current?.scrollIntoView({ behavior: 'smooth' })}
>
Explore Projects
</button>
<a href="/resume.pdf" className="cta-button cta-button--ghost" target="_blank" rel="noreferrer">
View Resume
</a>
</div>
</div>

          <div className="hero__visual">
            <img src={heroLogo} alt="SouthEastern EdgeRunners emblem" />
          </div>
        </div>
      </section>

      <section className="projects" ref={projectsRef}>
        <h2>Featured Builds</h2>
        <div className="projects__grid">
          {featuredProjects.map((project) => (
            <article key={project.name} className="project-card">
              <div className="project-card__accent" aria-hidden="true" />
              <div className="project-card__body">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.external ? (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="project-card__action"
                  >
                    Learn more
                  </a>
                ) : (
                  <Link to={project.href} className="project-card__action">
                    Learn more
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
);
}

export default LandingPage;