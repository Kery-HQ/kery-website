import { Button } from '@/components/ui/button';
import { BOOKING_URL, CONTACT_EMAIL, booking } from '@/config/site';

export default function Booking() {
  return (
    <section id="book" className="scroll-mt-4 border-t">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <h2 className="text-3xl font-semibold tracking-tight">{booking.heading}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{booking.body}</p>
        <Button asChild size="lg" className="mt-8 w-full sm:w-fit">
          <a href={BOOKING_URL}>{booking.cta}</a>
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">
          {booking.emailPrefix}{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline underline-offset-4 hover:text-foreground">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </section>
  );
}
