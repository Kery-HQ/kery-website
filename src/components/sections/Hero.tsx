import { Button } from '@/components/ui/button';
import { hero } from '@/config/site';
import BillChart from './BillChart';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 bottom-0 h-72 opacity-70">
        <BillChart animate />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-64 sm:pt-28 sm:pb-72">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl leading-none sm:text-7xl">{hero.headline}</h1>
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
