import { changes } from '@/config/site';
import RequestAnatomy from './RequestAnatomy';

export default function Changes() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        <h2 className="max-w-3xl text-4xl sm:text-6xl">{changes.heading}</h2>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{changes.body}</p>
        <div className="mt-10">
          <RequestAnatomy state="after" job={changes.job} callout={changes.callout} />
        </div>
        <h3 className="mt-14 font-medium">{changes.elsewhereHeading}</h3>
        <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-3">
          {changes.elsewhere.map((item) => (
            <li key={item} className="border-t border-savings/50 pt-3">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-muted-foreground">{changes.speed}</p>
      </div>
    </section>
  );
}
