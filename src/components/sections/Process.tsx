import { Check } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { process } from '@/config/site';

export default function Process() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">{process.heading}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-4">
          {process.steps.map((step, index) => (
            <li key={step.title} className="grid">
              <Card>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">Step {index + 1}</p>
                  <CardTitle>
                    <h3>{step.title}</h3>
                  </CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ol>

        <h3 className="mt-12 font-semibold">{process.trustHeading}</h3>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {process.trustItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
