import { Cloud, Eye, Route } from 'lucide-react';
import { preview, process } from '@/config/site';
import PullRequestPreview from './PullRequestPreview';

const icons = { readOnly: Eye, path: Route, cloud: Cloud };

export default function Process() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl">{process.heading}</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-4">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative pl-14 md:pt-14 md:pl-0">
              {index < process.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 -bottom-8 left-[1.125rem] w-px bg-border md:top-[1.125rem] md:-right-8 md:bottom-auto md:left-0 md:h-px md:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex size-9 items-center justify-center rounded-full border bg-background font-mono text-sm"
              >
                {index + 1}
              </span>
              <h3 className="font-medium">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-medium tracking-tighter text-balance">{preview.pullRequest.heading}</h3>
            <p className="mt-4 text-lg text-muted-foreground">{preview.pullRequest.body}</p>
            <h4 className="mt-10 font-medium">{process.trustHeading}</h4>
            <ul className="mt-4 grid gap-3">
              {process.trustItems.map((item) => {
                const Icon = icons[item.icon as keyof typeof icons];
                return (
                  <li key={item.text} className="flex items-start gap-2 text-sm">
                    <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-savings" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
          <PullRequestPreview />
        </div>
      </div>
    </section>
  );
}
