import { Button } from '@/components/ui/button';
import { hero } from '@/config/site';

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">{hero.headline}</h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{hero.subhead}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button asChild size="lg">
          <a href="#book">{hero.primaryCta}</a>
        </Button>
        <Button asChild size="lg" variant="link">
          <a href="#savings">{hero.secondaryCta}</a>
        </Button>
      </div>
      <p className="mt-6 text-sm text-muted-foreground">{hero.trustLine}</p>
    </section>
  );
}
