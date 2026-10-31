import { Button } from '@/components/ui/button';
import { BOOKING_URL, CONTACT_EMAIL, GLOSSY_LOGO_URL, booking } from '@/config/site';
import BillChart from './BillChart';

export default function Booking() {
  return (
    <section id="book" className="relative scroll-mt-14 overflow-hidden border-t">
      <div className="absolute inset-x-0 bottom-0 h-72 [--dot:var(--savings)] [mask-image:linear-gradient(to_top,black,transparent)]">
        <BillChart />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:py-36">
        <img src={GLOSSY_LOGO_URL} alt="" width={240} height={240} loading="lazy" className="mx-auto mb-8 size-40 sm:size-60" />
        <h2 className="text-5xl leading-none sm:text-7xl">{booking.heading}</h2>
        <p className="mt-6 text-lg text-muted-foreground">{booking.body}</p>
        <Button asChild size="lg" className="mt-8 w-full sm:w-fit">
          <a href={BOOKING_URL}>{booking.cta}</a>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {booking.emailPrefix}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
