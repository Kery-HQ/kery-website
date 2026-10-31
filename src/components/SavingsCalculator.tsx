import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { BOOKING_URL, calculator } from '@/config/site';
import { estimateSavings } from '@/lib/savings';

const { minSpend, maxSpend, stepSpend } = calculator;

const dollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const compactDollars = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
});

function formatCompact(value: number) {
  return compactDollars.format(value).replace('K', 'k');
}

function clampSpend(value: number) {
  return Math.min(Math.max(value, minSpend), maxSpend);
}

export default function SavingsCalculator() {
  // Raw text so the field can be mid-edit (or empty) without snapping back.
  const [spendText, setSpendText] = useState(String(calculator.defaultSpend));
  const [checked, setChecked] = useState<string[]>([]);

  const spend = clampSpend(Number(spendText) || 0);
  const savings = estimateSavings(spend, checked.length);

  const lowPct = (savings.monthlyLow / spend) * 100;
  const highPct = (savings.monthlyHigh / spend) * 100;

  return (
    <Card className="gap-0 overflow-hidden p-0">
      <CardContent className="grid grid-cols-1 p-0 md:grid-cols-2">
        <div className="grid min-w-0 content-start gap-6 p-6 sm:p-8">
          <div className="grid gap-3">
            <Label htmlFor="monthly-spend">{calculator.spendLabel}</Label>
            <Input
              id="monthly-spend"
              type="number"
              inputMode="numeric"
              min={minSpend}
              max={maxSpend}
              step={stepSpend}
              value={spendText}
              onChange={(event) => setSpendText(event.target.value)}
              onBlur={() => setSpendText(String(spend))}
            />
            <Slider
              aria-label={calculator.spendLabel}
              min={minSpend}
              max={maxSpend}
              step={stepSpend}
              value={[spend]}
              onValueChange={([value]) => setSpendText(String(value))}
            />
          </div>

          <fieldset className="grid gap-3">
            <legend className="mb-3 text-sm font-medium">{calculator.optionsLabel}</legend>
            {calculator.options.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <Checkbox
                  id={option.id}
                  checked={checked.includes(option.id)}
                  onCheckedChange={(isChecked) =>
                    setChecked((current) =>
                      isChecked ? [...current, option.id] : current.filter((id) => id !== option.id),
                    )
                  }
                />
                <Label htmlFor={option.id} className="font-normal">
                  {option.label}
                </Label>
              </div>
            ))}
          </fieldset>
        </div>

        <div className="grid min-w-0 content-start gap-6 border-t bg-muted p-6 sm:p-8 md:border-t-0 md:border-l">
          <div aria-live="polite">
            <p className="text-sm font-medium">{calculator.resultLabel}</p>
            <p className="mt-2 font-mono text-[1.6rem] leading-tight font-medium tracking-tighter sm:text-4xl">
              <span className="whitespace-nowrap">
                {dollars.format(savings.monthlyLow)}–{dollars.format(savings.monthlyHigh)}
              </span>
              <wbr />
              <span className="font-sans text-lg font-normal text-muted-foreground">/month</span>
            </p>
            <p className="mt-1 font-mono text-muted-foreground">
              ({formatCompact(savings.annualLow)}–{formatCompact(savings.annualHigh)}/year)
            </p>
          </div>

          {/* The whole bar is the bill; the right end shows the estimated cut. */}
          <div aria-hidden="true">
            <p className="mb-2 flex justify-between text-sm">
              <span>{calculator.meterLabel}</span>
              <span className="font-medium">{dollars.format(spend)}</span>
            </p>
            <div className="flex h-5 overflow-hidden rounded-sm bg-background">
              <div className="grow bg-muted-foreground/40" />
              <div
                className="bg-hatch text-savings motion-safe:transition-[width]"
                style={{ width: `${highPct - lowPct}%` }}
              />
              <div className="bg-savings motion-safe:transition-[width]" style={{ width: `${lowPct}%` }} />
            </div>
            <p className="mt-2 flex justify-between text-sm">
              <span>{calculator.meterKeep}</span>
              <span>
                {calculator.meterCut}: {Math.round(lowPct)}–{Math.round(highPct)}%
              </span>
            </p>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">{calculator.disclaimer}</p>
          <Button asChild size="lg" className="w-full sm:w-fit">
            <a href={BOOKING_URL}>{calculator.cta}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
