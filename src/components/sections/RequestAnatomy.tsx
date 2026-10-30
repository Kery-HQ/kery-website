import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { request } from '@/config/site';

const tokens = new Intl.NumberFormat('en-US');
const largest = Math.max(...request.rows.map((row) => row.before));

function total(state: 'before' | 'after') {
  return request.rows.reduce((sum, row) => sum + row[state], 0);
}

export default function RequestAnatomy({ state, model }: { state: 'before' | 'after'; model: string }) {
  const isAfter = state === 'after';

  return (
    <figure>
      <Card className="gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <p className="text-sm font-medium">{model}</p>
          <Badge variant="outline" className="shrink-0">
            {request.exampleLabel}
          </Badge>
        </div>
        <ul>
          {request.rows.map((row) => (
            <li key={row.label} className="grid gap-x-6 gap-y-2 border-b px-4 py-4 sm:px-6 md:grid-cols-[11rem_1fr_17rem] md:items-center">
              <p className="flex justify-between gap-3 text-sm font-medium md:block">
                {row.label}
                <span className="block font-mono font-normal text-muted-foreground">{tokens.format(row[state])}</span>
              </p>
              {/* In the "after" view the track keeps the original size, so the cut stays visible. */}
              <div className="h-3 rounded-sm" style={{ width: `${Math.max((row.before / largest) * 100, 1)}%` }}>
                <div className={`h-full rounded-sm ${isAfter ? 'bg-muted' : ''}`}>
                  <div
                    className={`h-full rounded-sm ${isAfter ? 'bg-savings' : 'bg-muted-foreground/50'}`}
                    style={{ width: `${(row[state] / row.before) * 100}%` }}
                  />
                </div>
              </div>
              <p className={`text-sm ${isAfter ? 'text-savings' : 'text-muted-foreground'}`}>
                {isAfter ? row.fix : row.leak}
              </p>
            </li>
          ))}
        </ul>
        <p className="flex justify-between px-4 py-3 text-sm sm:px-6">
          <span className="text-muted-foreground">Total</span>
          <span className="font-mono">
            {tokens.format(total(state))} {request.tokensLabel}
          </span>
        </p>
      </Card>
      <figcaption className="mt-3 text-sm text-muted-foreground">{request.note}</figcaption>
    </figure>
  );
}
