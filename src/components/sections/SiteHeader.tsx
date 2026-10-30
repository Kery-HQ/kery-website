import { Button } from '@/components/ui/button';
import { SITE_NAME, booking } from '@/config/site';

export default function SiteHeader() {
  return (
    <header className="border-b">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="/" className="font-heading text-lg font-bold tracking-tight">
          {SITE_NAME}
        </a>
        <Button asChild size="sm">
          <a href="/#book">{booking.cta}</a>
        </Button>
      </div>
    </header>
  );
}
