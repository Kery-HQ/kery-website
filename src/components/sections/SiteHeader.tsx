import { Button } from '@/components/ui/button';
import { BOOKING_URL, LOGO_URL, SITE_NAME, booking } from '@/config/site';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tighter">
          <img src={LOGO_URL} alt="" width={28} height={28} className="size-7" />
          {SITE_NAME}
        </a>
        <Button asChild size="sm">
          <a href={BOOKING_URL}>{booking.cta}</a>
        </Button>
      </div>
    </header>
  );
}
