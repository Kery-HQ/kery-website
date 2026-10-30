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
    <section>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-4xl font-semibold tracking-tight">{levers.heading}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4">
          {levers.items.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <li key={item.title} className="border-t-2 border-primary pt-4">
                <Icon aria-hidden="true" className="size-5 text-primary" />
                <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
