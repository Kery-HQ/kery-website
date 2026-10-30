import { Cloud, Eye, Route } from 'lucide-react';
import { process } from '@/config/site';

const icons = { readOnly: Eye, path: Route, cloud: Cloud };

export default function Process() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-4xl font-semibold tracking-tight">{process.heading}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {process.steps.map((step, index) => (
            <li key={step.title} className="relative pl-14 md:pt-14 md:pl-0">
              {index < process.steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-0 -bottom-8 left-[1.125rem] w-0.5 bg-primary/30 md:top-[1.125rem] md:-right-8 md:bottom-auto md:left-0 md:h-0.5 md:w-auto"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 flex size-9 items-center justify-center rounded-full bg-primary font-heading font-semibold text-primary-foreground"
              >
                {index + 1}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>

        <h3 className="mt-14 text-lg font-semibold">{process.trustHeading}</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {process.trustItems.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.text} className="flex items-start gap-2 text-sm">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
