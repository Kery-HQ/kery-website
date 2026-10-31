import { Cloud, Eye, Route } from 'lucide-react';
import { proof } from '@/config/site';
import PullRequestPreview from './PullRequestPreview';

const icons = { readOnly: Eye, path: Route, cloud: Cloud };

export default function Proof() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="max-w-3xl text-3xl sm:text-5xl">{proof.heading}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{proof.body}</p>
        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div>
            <ol className="grid gap-6">
              {proof.checks.map((check) => (
                <li key={check.title}>
                  <h3 className="text-xl font-medium">{check.title}</h3>
                  <p className="mt-1 text-muted-foreground">{check.body}</p>
                </li>
              ))}
            </ol>
            <h3 className="mt-10 font-medium">{proof.trustHeading}</h3>
            <ul className="mt-4 grid gap-3">
              {proof.trustItems.map((item) => {
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
