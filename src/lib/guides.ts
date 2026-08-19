/**
 * Evergreen guides that live outside the Sanity blog - the comparison, stack and
 * use-case pages under /vs, /for and /use-cases.
 *
 * The pages themselves own their copy; this is only the card metadata the blog
 * index needs to list them alongside published notes.
 */

export type GuideCategory = 'Comparison' | 'Your stack' | 'Use case';

export interface Guide {
  href: string;
  title: string;
  blurb: string;
  category: GuideCategory;
}

export const GUIDES: Guide[] = [
  {
    href: '/vs/claude-code-playwright',
    title: 'Claude Code + Playwright MCP vs. Kery',
    blurb:
      'The DIY agent-drives-a-browser setup: where it genuinely holds up, and the six things it cannot do.',
    category: 'Comparison',
  },
  {
    href: '/vs/playwright',
    title: 'Playwright, without a suite to maintain',
    blurb:
      'Nobody abandons a test suite because writing it was hard. They abandon it in month four. Where derived checks fit instead.',
    category: 'Comparison',
  },
  {
    href: '/vs/manual-qa',
    title: 'Automating the repetitive half of QA',
    blurb:
      'What to hand to a machine, what to keep human, and why smoke testing stopped keeping pace with agent-authored pull requests.',
    category: 'Comparison',
  },
  {
    href: '/for/claude-code',
    title: 'Verifying what Claude Code ships',
    blurb:
      'Write with the agent, verify with something that did not write the code. Plus running Kery from inside the session over MCP.',
    category: 'Your stack',
  },
  {
    href: '/for/cursor',
    title: 'End-to-end testing for Cursor',
    blurb:
      'Background agents open pull requests nobody watched happen. Two ways to wire a browser check into that loop.',
    category: 'Your stack',
  },
  {
    href: '/for/nextjs',
    title: 'Testing every Next.js preview deploy',
    blurb:
      'Vercel already builds a preview for each pull request. Where App Router apps actually break once something opens it.',
    category: 'Your stack',
  },
  {
    href: '/use-cases/pull-request-testing',
    title: 'A browser pass on every pull request',
    blurb:
      'What lands on the PR, why the bar for failing a build is deliberately high, and what the evidence looks like a week later.',
    category: 'Use case',
  },
  {
    href: '/use-cases/authenticated-testing',
    title: 'Testing the flows behind your login',
    blurb:
      'Clerk, Supabase, Auth0, Firebase, 2FA codes and magic links — and why storage-state fixtures keep going stale.',
    category: 'Use case',
  },
];
