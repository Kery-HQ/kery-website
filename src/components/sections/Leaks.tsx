import { leaks } from '@/config/site';
import RequestAnatomy from './RequestAnatomy';

export default function Leaks() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="max-w-3xl text-4xl sm:text-6xl">{leaks.heading}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{leaks.body}</p>
        <div className="mt-10">
          <RequestAnatomy state="before" job={leaks.job} callout={leaks.callout} />
        </div>
        <h3 className="mt-14 font-medium">{leaks.elsewhereHeading}</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 text-muted-foreground md:grid-cols-3">
          {leaks.elsewhere.map((item) => (
            <li key={item} className="border-t pt-3">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
