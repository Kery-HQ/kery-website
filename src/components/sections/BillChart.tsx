const COLUMNS = 240;

// A bill stepping down: each drop is a shipped fix. Purely decorative, no real data.
// A new seed gives a new shape, so the chart can reshuffle.
function columnHeight(index: number, seed: number) {
  const progress = index / (COLUMNS - 1);
  const steps = 8 + (seed % 5) * 2;
  const step = Math.floor(progress * steps) / steps;
  const noise = Math.sin(index * (1.7 + seed * 0.37) + seed * 2.1) * 5 + Math.sin(index * (0.6 + seed * 0.21) + seed) * 4;
  return Math.min(Math.max(92 - step * 62 + noise, 6), 100) / 100;
}

export default function BillChart({ animate = false, seed = 0 }: { animate?: boolean; seed?: number }) {
  return (
    <div aria-hidden="true" className="mask-dots flex h-full items-end">
      {Array.from({ length: COLUMNS }, (_, index) => (
        <div
          key={index}
          className="h-full min-w-0 flex-1 origin-bottom bg-[linear-gradient(to_top,var(--dot),color-mix(in_srgb,var(--dot)_50%,transparent))] motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-in-out motion-safe:[animation:column-rise_900ms_ease-out_backwards]"
          style={{
            transform: `scaleY(${columnHeight(index, seed)})`,
            transitionDelay: `${index * 2}ms`,
            animationDelay: animate ? `${index * 3}ms` : undefined,
            animationName: animate ? undefined : 'none',
          }}
        />
      ))}
    </div>
  );
}
