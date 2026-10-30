import { Button } from '@/components/ui/button';
import { hero } from '@/config/site';
import BillChart from './BillChart';
import ProductPreview from './ProductPreview';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-[22rem] h-[26rem] opacity-70 sm:top-[24rem] [mask-image:linear-gradient(to_bottom,black_40%,transparent)]">
        <BillChart animate />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-20 sm:pt-28">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl leading-none sm:text-7xl lg:text-8xl">{hero.headline}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">{hero.subhead}</p>
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
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
