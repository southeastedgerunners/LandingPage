// Homepage copy. Plain owner language first; tool names go in supporting lines.
// Nothing here may claim results, clients or numbers we can't show (see PRODUCT.md).

// ── Hero ──────────────────────────────────────────────────────────────────────

export const heroTitle = 'Let the busywork run itself.';

export const heroLead =
  'We build websites and the automations behind them for small businesses in Southeastern Kentucky, set up once and running every day.';

// ── Worked example (illustrative, labelled as such on the page) ───────────────

export interface ExampleStep {
  time: string;
  event: string;
  detail: string;
  outcome?: boolean;
}

export const exampleSteps: ExampleStep[] = [
  { time: '4:55 PM', event: 'Missed call', detail: '(606) 555-0142, while you were on a roof' },
  {
    time: '4:55 PM',
    event: 'Text sent automatically',
    detail: '“Sorry we missed you! Reply with a good time and we’ll call you back.”',
  },
  { time: '4:58 PM', event: 'Customer replied', detail: '“Tomorrow morning works.”' },
  {
    time: '4:58 PM',
    event: 'Booked',
    detail: 'Thursday, 9:00 AM. On your calendar, in your CRM, reminder scheduled.',
    outcome: true,
  },
];

export const exampleCaption =
  'An example of a missed-call text-back we set up. Times and messages are illustrative.';

// ── Services, grouped by the outcome an owner cares about ────────────────────

export interface Service {
  name: string;
  description: string;
}

export interface ServiceGroup {
  outcome: string;
  summary: string;
  services: Service[];
}

export const serviceGroups: ServiceGroup[] = [
  {
    outcome: 'Get found and look the part',
    summary: 'A place online that brings in work and looks as professional as you are.',
    services: [
      { name: 'Websites', description: 'Fast, clear sites built to turn visitors into calls.' },
      { name: 'Branding', description: 'Logo, colors and simple brand guidelines, made by people, not templates.' },
      { name: 'Facebook ads and lead funnels', description: 'Targeted ads that send new leads straight into your CRM.' },
    ],
  },
  {
    outcome: 'Never let a lead go cold',
    summary: 'Every call, form and message gets an answer, even when you’re busy.',
    services: [
      { name: 'CRM and auto-texting', description: 'Follow up with every lead by text, automatically, until they book.' },
      { name: 'Workflow automation', description: 'Custom n8n workflows that connect your tools and handle the repetitive steps.' },
      { name: 'AI assistants', description: 'Chat and document tools that answer common questions and sort paperwork.' },
    ],
  },
  {
    outcome: 'Get paid and get reviewed',
    summary: 'The end of the job takes care of itself.',
    services: [
      { name: 'QuickBooks automation', description: 'Invoices, payment reminders and expense syncing without the data entry.' },
      { name: 'Reviews and reputation', description: 'Ask for a Google or Facebook review after every job and keep an eye on mentions.' },
    ],
  },
];

// ── How it works ──────────────────────────────────────────────────────────────

export interface Step {
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    title: 'We talk through your week',
    description: 'On a free call we find the jobs that eat your time: chasing leads, booking, invoicing, reviews.',
  },
  {
    title: 'We build it around your tools',
    description: 'We connect what you already use, your phone, calendar, website and QuickBooks, and set up what’s missing.',
  },
  {
    title: 'It runs, and you get the hours back',
    description: 'Leads get a reply, appointments get booked, invoices go out. You get back to the work.',
  },
];
