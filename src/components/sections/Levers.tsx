import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { levers } from '@/config/site';

export default function Levers() {
  return (
    <section className="border-t">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">{levers.heading}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {levers.items.map((item) => (
            <li key={item.title} className="grid">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>{item.title}</h3>
                  </CardTitle>
                  <CardDescription>{item.body}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
