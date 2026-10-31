import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hero } from '@/config/site';
import BillChart from './BillChart';

export default function Hero() {
  // Counts every change, so the chart gets a new shape even when a brand comes round again.
  const [tick, setTick] = useState(0);
  const current = hero.rotation[tick % hero.rotation.length];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (const { icon } of hero.rotation) {
      if (icon) new Image().src = icon;
    }
    const timer = setInterval(() => setTick((value) => value + 1), hero.rotationMs);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-x-0 bottom-0 h-72 [transition:--dot_800ms_ease-in-out]"
        style={{ '--dot': current.color } as React.CSSProperties}
      >
        <BillChart animate seed={tick} />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-80 sm:pt-28">
        <div className="mx-auto max-w-5xl text-center">
          {/* The name stays fixed for screen readers while the visible word rotates. */}
          <h1 aria-label={hero.headline} className="text-[9.6vw] leading-tight sm:text-5xl md:text-7xl">
            <span aria-hidden="true" className="block whitespace-nowrap">
              Use{' '}
              <span
                key={current.word}
                className="inline-flex items-center gap-[0.15em] align-bottom animate-in fade-in slide-in-from-bottom-3 duration-500"
                style={{ color: current.color }}
              >
                {current.icon ? (
                  <span
                    className="size-[0.8em] bg-current"
                    style={{
                      maskImage: `url(${current.icon})`,
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                    }}
                  />
                ) : (
                  <Sparkles className="size-[0.8em]" />
                )}
                {current.word}
              </span>{' '}
              right.
            </span>
            <span aria-hidden="true" className="block">
              Spend less.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-balance text-muted-foreground sm:text-xl">{hero.subhead}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href="#book">{hero.primaryCta}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#savings">{hero.secondaryCta}</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">{hero.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
