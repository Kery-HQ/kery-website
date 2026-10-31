/** Everything editable lives here: links, contact details and page copy. */

/** Booking page for every call-to-action. */
export const BOOKING_URL = 'https://cal.com/keval-shah/30min';

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

/**
 * One example request carries the page's story. All figures are illustrative.
 * `squares` is how many of the 100 grid squares each part fills, before and after.
 */
export const request = {
  exampleLabel: 'Example request',
  note: 'Illustrative example. Each square is about 1% of the original request.',
  totalLabel: 'tokens, the unit AI providers bill by',
  rows: [
    { label: 'Standing instructions', before: 6200, after: 6200, squares: [35, 35], leak: 'The same instructions, sent every time', fix: 'Saved and reused at a fraction of the price', afterTag: 'Reused' },
    { label: 'List of tools', before: 4100, after: 450, squares: [23, 3], leak: '40 tools listed. This job uses 3.', fix: 'Only the 3 tools this job needs' },
    { label: 'Background documents', before: 4800, after: 800, squares: [27, 5], leak: '12 documents attached. 2 were useful.', fix: 'Only the 2 useful documents' },
    { label: 'Past conversation', before: 2600, after: 400, squares: [14, 2], leak: 'The whole chat, resent on every message', fix: 'Older messages boiled down to a short summary' },
    { label: 'The actual question', before: 60, after: 60, squares: [1, 1], leak: 'The one part your user typed', fix: 'Exactly the same', afterTag: 'Same' },
  ],
};

export const leaks = {
  heading: 'You pay for every word you send the AI.',
  body: 'Each time your app asks an AI model something, it also sends a pile of background text. Most of it goes unused, and all of it is billed. Here is what one request really looks like.',
  job: 'Sorting a support ticket, on the most expensive model',
  callout: 'Just 0.3% of this request is the actual question.',
  elsewhereHeading: 'Money also leaks outside the request',
  elsewhere: [
    'Overnight jobs paying instant-response prices',
    'AI agents retrying the same failed step over and over',
    'Test environments running on your most expensive model',
  ],
};

export const changes = {
  heading: 'Same request. Same answer. A smaller bill.',
  body: 'We trim what each request sends and match it to the right model. Your users get the same product, often faster.',
  job: 'Sorting the same ticket, on a smaller model',
  callout: 'This request now sends about 55% less.',
  elsewhereHeading: 'And we fix the leaks around it',
  elsewhere: [
    'Overnight jobs moved to batch pricing at 50% off',
    'Limits that stop runaway retries',
    'Test environments moved to small models',
  ],
  speed: 'Shorter requests and smaller models also respond faster, so your product speeds up as the bill comes down.',
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
    note: 'Illustrative example.',
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
