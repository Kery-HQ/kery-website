import { useState } from 'react';
import { RotateCcw, Scissors } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { request, story } from '@/config/site';

const COLUMNS = 10;
const GAP_PX = 6;

const tokens = new Intl.NumberFormat('en-US');

// One colour per request part. The last part, the user's question, uses the accent.
const colors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-savings'];

const totalBefore = request.rows.reduce((sum, row) => sum + row.before, 0);
const totalAfter = request.rows.reduce((sum, row) => sum + row.after, 0);

/** Every square keeps its identity, so kept ones can slide to their new place. */
const squares = (() => {
  let beforeSlot = 0;
  let afterSlot = 0;
  return request.rows.flatMap((row, rowIndex) =>
    Array.from({ length: row.squares[0] }, (_, position) => {
      const kept = position < row.squares[1];
      return { rowIndex, kept, beforeSlot: beforeSlot++, afterSlot: kept ? afterSlot++ : 0 };
    }),
  );
})();

function slotTransform(slot: number) {
  const column = slot % COLUMNS;
  const row = Math.floor(slot / COLUMNS);
  return `translate(calc(${column} * (100% + ${GAP_PX}px)), calc(${row} * (100% + ${GAP_PX}px)))`;
}

function rowFigure(row: (typeof request.rows)[number], trimmed: boolean) {
  if (!trimmed) return `${((row.before / totalBefore) * 100).toFixed(row.before < 1000 ? 1 : 0)}%`;
  return row.afterTag ?? `-${Math.round((1 - row.after / row.before) * 100)}%`;
}

export default function RequestStory() {
  const [trimmed, setTrimmed] = useState(false);
  // The button pulses until the first click, so it reads as something to press.
  const [hasClicked, setHasClicked] = useState(false);
  const copy = trimmed ? story.after : story.before;
  const Icon = trimmed ? RotateCcw : Scissors;

  return (
    <section className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-28">
        {/* Keyed text remounts on toggle, which replays the fade. */}
        <div key={String(trimmed)} className="min-h-72 animate-in fade-in duration-500 sm:min-h-64">
          <h2 className="max-w-3xl text-3xl sm:text-5xl">{copy.heading}</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{copy.body}</p>
        </div>

        <figure className="mt-6">
          <Card className="gap-0 overflow-hidden p-0">
            <div className="flex items-center justify-between gap-3 border-b px-4 py-3 sm:px-6">
              <p className="text-sm font-medium">{copy.job}</p>
              <Badge variant="outline" className="shrink-0">
                {request.exampleLabel}
              </Badge>
            </div>
            <div className="grid gap-8 p-4 sm:p-6 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-12 md:p-8">
              <div>
                <div aria-hidden="true" className="relative aspect-square">
                  <div className="absolute inset-0 grid grid-cols-10 gap-1.5">
                    {Array.from({ length: COLUMNS * COLUMNS }, (_, slot) => (
                      <div
                        key={slot}
                        className={`rounded-[3px] border border-dashed border-input motion-safe:transition-opacity motion-safe:duration-700 ${trimmed ? 'opacity-100' : 'opacity-0'}`}
                      />
                    ))}
                  </div>
                  {squares.map((square) => {
                    const isQuestion = square.rowIndex === colors.length - 1;
                    const slot = trimmed && square.kept ? square.afterSlot : square.beforeSlot;
                    return (
                      <div
                        key={square.beforeSlot}
                        className="absolute top-0 left-0 motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-in-out"
                        style={{
                          width: `calc((100% - ${GAP_PX * (COLUMNS - 1)}px) / ${COLUMNS})`,
                          aspectRatio: '1',
                          transform: slotTransform(slot),
                          transitionDelay: square.kept ? `${250 + square.afterSlot * 4}ms` : undefined,
                        }}
                      >
                        <div
                          className={`size-full rounded-[3px] ${colors[square.rowIndex]} motion-safe:transition-[opacity,scale] motion-safe:duration-300 ${isQuestion ? 'shadow-[0_0_16px_2px_var(--savings)]' : ''} ${trimmed && !square.kept ? 'scale-0 opacity-0' : ''}`}
                          style={{ transitionDelay: `${square.beforeSlot * 3}ms` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <Button
                  size="lg"
                  variant={trimmed ? 'outline' : 'default'}
                  aria-pressed={trimmed}
                  className={`relative mt-6 w-full motion-safe:transition-transform motion-safe:hover:-translate-y-0.5 ${hasClicked ? '' : 'after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-2 after:ring-savings motion-safe:after:[animation:button-pulse_1.8s_ease-out_infinite]'}`}
                  onClick={() => {
                    setHasClicked(true);
                    setTrimmed((current) => !current);
                  }}
                >
                  <Icon aria-hidden="true" />
                  {copy.button}
                </Button>
              </div>

              <div className="min-w-0">
                <p aria-live="polite" className="min-h-[4rem] text-2xl font-medium tracking-tight text-balance sm:text-3xl">
                  <span key={String(trimmed)} className="animate-in fade-in duration-500">
                    {copy.callout}
                  </span>
                </p>
                <ul className="mt-4">
                  {request.rows.map((row, rowIndex) => (
                    <li key={row.label} className="flex items-start gap-3 border-t py-3">
                      <span aria-hidden="true" className={`mt-1 size-3 shrink-0 rounded-[3px] ${colors[rowIndex]}`} />
                      <div className="min-w-0 grow">
                        <p className="text-sm font-medium">{row.label}</p>
                        <p key={String(trimmed)} className="animate-in fade-in text-sm text-muted-foreground duration-500">
                          {trimmed ? row.fix : row.leak}
                        </p>
                      </div>
                      <span className={`font-mono text-sm ${trimmed ? 'text-savings-text' : ''}`}>
                        {rowFigure(row, trimmed)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="border-t px-4 py-3 text-sm text-muted-foreground sm:px-6">
              <span className="font-mono text-foreground">{tokens.format(trimmed ? totalAfter : totalBefore)}</span>{' '}
              {request.totalLabel}
            </p>
          </Card>
          <figcaption className="mt-3 text-sm text-muted-foreground">{request.note}</figcaption>
        </figure>

        <div key={`elsewhere-${trimmed}`} className="animate-in fade-in duration-500">
          <h3 className="mt-14 font-medium">{copy.elsewhereHeading}</h3>
          <ul className="mt-4 grid gap-x-8 gap-y-3 md:grid-cols-3">
            {copy.elsewhere.map((item) => (
              <li key={item} className={`border-t pt-3 ${trimmed ? 'border-savings/60' : 'text-muted-foreground'}`}>
                {item}
              </li>
            ))}
          </ul>
          <p className={`mt-8 max-w-2xl text-muted-foreground ${trimmed ? '' : 'invisible'}`}>{story.speed}</p>
        </div>
      </div>
    </section>
  );
}
