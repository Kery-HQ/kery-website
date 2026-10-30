/** Everything editable lives here: links, contact details and page copy. */

/** Booking page for every call-to-action. Replace with the real link before launch. */
export const BOOKING_URL = 'https://cal.com/REPLACE_ME';

export const CONTACT_EMAIL = 'hello@kery.dev';

export const SITE_NAME = 'Kery';
export const SITE_ORIGIN = 'https://kery.dev';

export const seo = {
  title: 'Kery — Cut your LLM costs, prove quality held',
  description:
    'Kery finds where your AI spend is wasted, tests cheaper options on your real traffic, and ships the fixes as pull requests. Book a free cost audit.',
};

export const hero = {
  headline: 'Cut your LLM bill. Prove quality held.',
  subhead:
    'We find where your AI spend is wasted, test cheaper options on your real traffic, and ship the fixes as pull requests.',
  primaryCta: 'Book a free cost audit',
  secondaryCta: 'See your savings potential',
  trustLine: 'Read-only access to start. Your prompts never leave your cloud.',
};

export const calculator = {
  heading: 'AI savings potential',
  intro: 'Enter your monthly LLM API spend for a rough estimate.',
  spendLabel: 'Monthly LLM API spend (USD)',
  defaultSpend: 25_000,
  minSpend: 5_000,
  maxSpend: 500_000,
  stepSpend: 1_000,
  optionsLabel: 'What you already do (optional)',
  options: [
    { id: 'caching', label: 'We use prompt caching' },
    { id: 'batch', label: 'We use batch APIs' },
    { id: 'multi-model', label: 'We use more than one model' },
  ],
  resultLabel: 'Estimated savings',
  meterLabel: 'Your monthly bill',
  meterKeep: 'Stays',
  meterCut: 'Estimated cut',
  disclaimer: 'Estimate only. Actual savings depend on your workload. The free audit gives you real numbers.',
  cta: 'Get my real number',
};

export const levers = {
  heading: 'Where we cut costs',
  items: [
    { icon: 'models', title: 'Right-size models', body: 'Small models where they do the job just as well.' },
    { icon: 'caching', title: 'Prompt caching', body: 'Stop paying full price for the same context on every call.' },
    { icon: 'batch', title: 'Batch processing', body: "50% off for work that doesn't need an instant answer." },
    { icon: 'trim', title: 'Trim prompts and context', body: 'Oversized system prompts, RAG chunks, chat history, tool definitions.' },
    { icon: 'limits', title: 'Control output and reasoning', body: 'Sensible limits and reasoning effort per route.' },
    { icon: 'waste', title: 'Kill waste', body: 'Retries, duplicate calls, runaway agent loops, dev/test traffic on expensive models.' },
    { icon: 'speed', title: 'Faster responses', body: 'Smaller models, caching and shorter prompts cut latency, not just cost.' },
    { icon: 'alerts', title: 'Stay ahead of changes', body: 'Model retirements and price hikes caught before they hit you.' },
  ],
};

export const process = {
  heading: 'How we work',
  steps: [
    {
      title: 'Free audit (48 hours)',
      body: 'Connect read-only usage data. You get your top savings opportunities with dollar estimates. No code required.',
    },
    {
      title: 'Cost cut (2 weeks)',
      body: 'We test cheaper options on your real traffic, verify quality held, and deliver every change as a pull request with before/after evidence.',
    },
    {
      title: 'Savings dashboard',
      body: 'See spend by feature, team and customer, savings realized against your baseline, and alerts when costs creep back.',
    },
    {
      title: 'Ongoing optimization',
      body: 'New models and prices tested automatically, quarterly check-ins, and migration help when a model you use is retired.',
    },
  ],
  trustHeading: 'Built to be trusted',
  trustItems: [
    { icon: 'readOnly', text: 'Read-only access to start' },
    { icon: 'path', text: 'Never sits in your request path' },
    { icon: 'cloud', text: 'Replays run in your cloud, on your API keys' },
  ],
};

export const booking = {
  heading: 'Find out what you could save',
  body: "30 minutes. We'll look at your setup and tell you where the money is.",
  cta: 'Book a call',
  emailPrefix: 'Or email',
};
