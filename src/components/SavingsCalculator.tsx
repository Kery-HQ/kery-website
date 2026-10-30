import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { calculator } from '@/config/site';
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

  return (
    <Card>
      <CardContent className="grid gap-6">
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

        <Separator />

        <div className="grid gap-4">
          <div aria-live="polite">
            <p className="text-sm text-muted-foreground">{calculator.resultLabel}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {dollars.format(savings.monthlyLow)}–{dollars.format(savings.monthlyHigh)}/month
            </p>
            <p className="text-muted-foreground">
              ({formatCompact(savings.annualLow)}–{formatCompact(savings.annualHigh)}/year)
            </p>
          </div>
          <p className="text-sm text-muted-foreground">{calculator.disclaimer}</p>
          <Button asChild size="lg" className="w-full sm:w-fit">
            <a href="#book">{calculator.cta}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
