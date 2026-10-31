import { Button } from '@/components/ui/button';
import { BOOKING_URL, SITE_NAME, booking } from '@/config/site';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="text-lg font-semibold tracking-tighter">
          {SITE_NAME}
        </a>
        <Button asChild size="sm">
          <a href={BOOKING_URL}>{booking.cta}</a>
        </Button>
      </div>
    </header>
  );
}
