/** Everything editable lives here: links, contact details and page copy. */

/** Booking page for every call-to-action. Replace with the real link before launch. */
export const BOOKING_URL = 'https://cal.com/REPLACE_ME';

export const CONTACT_EMAIL = 'hello@kery.dev';

export const SITE_NAME = 'Kery';
export const SITE_ORIGIN = 'https://kery.dev';

export const seo = {
  title: 'Kery — Cut your LLM bill without compromising quality',
  description:
    'Kery finds the cost and speed gains across your entire AI stack, and ships them without compromising quality. Book a free cost audit.',
};

export const hero = {
  headline: 'Cut your LLM bill, not quality.',
  subhead:
    'We find the cost and speed gains across your entire AI stack, and ship them.',
  primaryCta: 'Book a free cost audit',
  secondaryCta: 'See your savings potential',
  trustLine: 'Read-only access to start. Your prompts never leave your cloud.',
};

export const calculator = {
  heading: 'See your savings potential',
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

/** One example request carries the page's story. Token counts are illustrative, not customer data. */
export const request = {
  exampleLabel: 'Example request',
  note: 'Illustrative example, not customer data.',
  tokensLabel: 'input tokens',
  rows: [
    { label: 'System prompt', before: 6200, after: 6200, leak: 'Same text on every call, never cached', fix: 'Cached, so repeat reads cost a fraction' },
    { label: 'Tool definitions', before: 4100, after: 450, leak: '40 tools sent, 3 ever used on this route', fix: 'Only the 3 tools this route calls' },
    { label: 'Retrieved context', before: 4800, after: 800, leak: '12 chunks retrieved, 2 cited', fix: 'Fewer, better-ranked chunks' },
    { label: 'Chat history', before: 2600, after: 400, leak: 'Every past turn resent', fix: 'Older turns summarized' },
    { label: 'The actual question', before: 60, after: 60, leak: 'The only part the user wrote', fix: 'Unchanged' },
  ],
};

export const leaks = {
  heading: 'Your bill is mostly context, not questions.',
  body: 'Most of a typical request is material the model never needed. Here is one call, taken apart.',
  modelBefore: 'Model: frontier, sorting tickets into five labels',
  elsewhereHeading: 'And the waste outside the request',
  elsewhere: [
    'Nightly evals and backfills paying real-time prices',
    'Agents retrying the same failed tool call until they hit a limit',
    'Staging traffic running on your production model',
  ],
};

export const changes = {
  heading: 'Same request. Same answer. A smaller bill.',
  body: 'We change what each route sends and which model handles it. Your product does not change.',
  modelAfter: 'Model: small, and just as accurate on this job',
  elsewhereHeading: 'And outside the request',
  elsewhere: [
    'Evals and backfills moved to batch APIs at 50% off',
    'Retry limits and loop guards on every agent',
    'Dev and staging pointed at small models',
  ],
  speed: 'Shorter prompts and smaller models also respond faster, so latency usually drops with cost.',
};

export const proof = {
  heading: 'Cheaper only counts if quality held.',
  body: 'Nothing ships on a hunch. Every change is tested on your real traffic first.',
  checks: [
    { title: 'Replay', body: 'We replay your real traffic through the cheaper option, in your cloud, on your API keys.' },
    { title: 'Compare', body: 'Answers are scored against your current output on the checks that matter for that route.' },
    { title: 'Ship', body: 'If quality held, you get a pull request with the before/after evidence. If not, it never reaches you.' },
  ],
  pullRequest: {
    sampleLabel: 'Sample data',
    note: 'Illustrative example, not a customer result.',
    title: 'Trim ticket tagging and move it to a small model',
    removed: ['model: "frontier"', 'tools: allTools', 'topK: 12'],
    added: ['model: "small"', 'tools: taggingTools', 'topK: 2'],
    columns: ['Check', 'Before', 'After'],
    rows: [
      { check: 'Input tokens', before: '17,760', after: '7,910' },
      { check: 'Quality eval', before: '96.1%', after: '96.0%' },
      { check: 'p95 latency', before: '2.4s', after: '0.8s' },
    ],
  },
  trustHeading: 'Built to be trusted',
  trustItems: [
    { icon: 'readOnly', text: 'Read-only access to start' },
    { icon: 'path', text: 'Never sits in your request path' },
    { icon: 'cloud', text: 'Replays run in your cloud, on your API keys' },
  ],
};

export const process = {
  heading: 'How it runs',
  steps: [
    { title: 'Free audit, 48 hours', body: 'Connect read-only usage data. You get your top savings opportunities with dollar estimates. No code required.' },
    { title: 'Cost cut, 2 weeks', body: 'We test the fixes on your real traffic and deliver each one as a pull request.' },
    { title: 'Savings dashboard', body: 'See spend by feature, team and customer, savings against your baseline, and alerts when costs creep back.' },
    { title: 'Ongoing optimization', body: 'New models and prices tested automatically, quarterly check-ins, and migration help when a model is retired.' },
  ],
};

export const booking = {
  heading: 'Find out what you could save',
  body: "30 minutes. We'll look at your setup and tell you where the money is.",
  cta: 'Book a call',
  emailPrefix: 'Or email',
};
