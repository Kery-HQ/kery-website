import { BellRing, Database, Gauge, Layers, Scissors, Shrink, Trash2, Zap } from 'lucide-react';
import { levers } from '@/config/site';

const icons = {
  models: Shrink,
  caching: Database,
  batch: Layers,
  trim: Scissors,
  limits: Gauge,
  waste: Trash2,
  speed: Zap,
  alerts: BellRing,
};

export default function Levers() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="text-4xl sm:text-5xl">{levers.heading}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border lg:grid-cols-4">
          {levers.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.title} className="bg-background p-4 sm:p-6">
                <Icon aria-hidden="true" className="size-5 text-savings" />
                <h3 className="mt-4 font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
