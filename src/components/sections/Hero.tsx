import { Button } from '@/components/ui/button';
import { hero } from '@/config/site';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground [--ring:var(--primary-foreground)]">
      <div
        aria-hidden="true"
        className="bg-hatch absolute inset-y-0 right-0 hidden w-2/5 text-primary-foreground/20 [mask-image:linear-gradient(to_right,transparent,black)] lg:block"
      />
      <div className="relative mx-auto max-w-5xl px-4 pt-16 pb-44 sm:pt-24 sm:pb-56">
        <h1 className="max-w-3xl text-5xl leading-none font-bold tracking-tight text-balance sm:text-7xl">
          {hero.headline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg sm:text-xl">{hero.subhead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" variant="secondary">
            <a href="#book">{hero.primaryCta}</a>
          </Button>
          <Button asChild size="lg" variant="link" className="text-primary-foreground underline">
            <a href="#savings">{hero.secondaryCta}</a>
          </Button>
        </div>
        <p className="mt-6 text-sm">{hero.trustLine}</p>
      </div>
    </section>
  );
}
