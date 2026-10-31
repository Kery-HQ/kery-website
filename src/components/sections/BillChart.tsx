import { useEffect, useRef, useState } from 'react';

// One dot per cell. Keep in sync with the 8px in the bill-column utility.
const CELL = 8;

// A bill stepping down: each drop is a shipped fix. Purely decorative, no real data.
// A new seed gives a new shape, so the chart can reshuffle.
function columnHeight(index: number, columns: number, seed: number) {
  const progress = index / Math.max(columns - 1, 1);
  const steps = 8 + (seed % 5) * 2;
  const step = Math.floor(progress * steps) / steps;
  const noise = Math.sin(index * (1.7 + seed * 0.37) + seed * 2.1) * 5 + Math.sin(index * (0.6 + seed * 0.21) + seed) * 4;
  return Math.min(Math.max(92 - step * 62 + noise, 6), 100) / 100;
}

export default function BillChart({ animate = false, seed = 0 }: { animate?: boolean; seed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ columns: 0, rows: 0, inset: 0 });

  // Only as many cells as fit whole, so no dot is ever cut at an edge.
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const measure = () => {
      // The outer size, as the inset below would otherwise shrink what is measured.
      const { offsetWidth: width, offsetHeight: height } = element;
      const columns = Math.floor(width / CELL);
      // A whole-pixel inset centres the grid without blurring the dots.
      setGrid({ columns, rows: Math.floor(height / CELL), inset: Math.floor((width - columns * CELL) / 2) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="flex h-full" style={{ paddingLeft: grid.inset }}>
      {Array.from({ length: grid.columns }, (_, index) => (
        <div
          key={index}
          className="bill-column bg-[linear-gradient(to_top,var(--dot),color-mix(in_srgb,var(--dot)_50%,transparent))]"
          style={
            {
              height: grid.rows * CELL,
              '--filled': Math.round(columnHeight(index, grid.columns, seed) * grid.rows),
              transitionDelay: `${index * 2}ms`,
              animationDelay: animate ? `${index * 3}ms` : undefined,
              animationName: animate ? undefined : 'none',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
