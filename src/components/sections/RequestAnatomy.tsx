import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { request } from '@/config/site';

const tokens = new Intl.NumberFormat('en-US');

// One colour per request part. The last part, the user's question, uses the accent.
const colors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-savings'];

function totalTokens(index: 0 | 1) {
  return request.rows.reduce((sum, row) => sum + (index === 0 ? row.before : row.after), 0);
}

function rowFigure(row: (typeof request.rows)[number], isAfter: boolean) {
  if (!isAfter) return `${((row.before / totalTokens(0)) * 100).toFixed(row.before < 1000 ? 1 : 0)}%`;
  return row.afterTag ?? `-${Math.round((1 - row.after / row.before) * 100)}%`;
}

export default function RequestAnatomy({
  state,
  job,
  callout,
}: {
  state: 'before' | 'after';
  job: string;
  callout: string;
}) {
  const isAfter = state === 'after';
  const index = isAfter ? 1 : 0;
  const filled = request.rows.flatMap((row, rowIndex) => Array<number>(row.squares[index]).fill(rowIndex));
  const removed = 100 - filled.length;

  return (
    <figure>
      <Card className="gap-0 overflow-hidden p-0">
        <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
          <p className="text-sm font-medium">{job}</p>
          <Badge variant="outline" className="shrink-0">
            {request.exampleLabel}
          </Badge>
        </div>
        <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-12 md:p-8">
          <div aria-hidden="true" className="grid grid-cols-10 gap-1.5 self-start">
            {filled.map((rowIndex, square) => (
              <div
                key={square}
                className={`aspect-square rounded-[3px] ${colors[rowIndex]} ${rowIndex === colors.length - 1 ? 'shadow-[0_0_16px_2px_var(--savings)]' : ''}`}
              />
            ))}
            {Array.from({ length: removed }, (_, square) => (
              <div key={square} className="aspect-square rounded-[3px] border border-dashed border-input" />
            ))}
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">{callout}</p>
            <ul className="mt-6">
              {request.rows.map((row, rowIndex) => (
                <li key={row.label} className="flex items-start gap-3 border-t py-3">
                  <span aria-hidden="true" className={`mt-1 size-3 shrink-0 rounded-[3px] ${colors[rowIndex]}`} />
                  <div className="min-w-0 grow">
                    <p className="text-sm font-medium">{row.label}</p>
                    <p className="text-sm text-muted-foreground">{isAfter ? row.fix : row.leak}</p>
                  </div>
                  <span className={`font-mono text-sm ${isAfter ? 'text-savings' : ''}`}>{rowFigure(row, isAfter)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="border-t px-4 py-3 text-sm text-muted-foreground sm:px-6">
          <span className="font-mono text-foreground">{tokens.format(totalTokens(index))}</span> {request.totalLabel}
        </p>
      </Card>
      <figcaption className="mt-3 text-sm text-muted-foreground">{request.note}</figcaption>
    </figure>
  );
}
