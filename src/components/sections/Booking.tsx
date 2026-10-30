import { Button } from '@/components/ui/button';
import { BOOKING_URL, CONTACT_EMAIL, booking } from '@/config/site';

export default function Booking() {
  return (
    <section
      id="book"
      className="scroll-mt-4 bg-primary text-primary-foreground [--ring:var(--primary-foreground)]"
    >
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-4xl font-bold tracking-tight text-balance sm:text-6xl">{booking.heading}</h2>
        <p className="mt-4 text-lg">{booking.body}</p>
        <Button asChild size="lg" variant="secondary" className="mt-8 w-full sm:w-fit">
          <a href={BOOKING_URL}>{booking.cta}</a>
        </Button>
        <p className="mt-4 text-sm">
          {booking.emailPrefix}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
