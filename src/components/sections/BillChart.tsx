const COLUMNS = 240;

// A bill stepping down: each drop is a shipped fix. Purely decorative, no real data.
function columnHeight(index: number) {
  const progress = index / (COLUMNS - 1);
  const step = Math.floor(progress * 12) / 12;
  const noise = Math.sin(index * 1.7) * 3 + Math.sin(index * 0.6) * 2;
  return Math.round(92 - step * 62 + noise);
}

export default function BillChart({ animate = false }: { animate?: boolean }) {
  return (
    <div aria-hidden="true" className="mask-dots flex h-full items-end justify-center">
      {Array.from({ length: COLUMNS }, (_, index) => (
        <div
          key={index}
          className="w-2 shrink-0 origin-bottom bg-gradient-to-t from-savings to-savings/50 motion-safe:[animation:column-rise_900ms_ease-out_backwards]"
          style={{
            height: `${columnHeight(index)}%`,
            animationDelay: animate ? `${index * 3}ms` : undefined,
            animationName: animate ? undefined : 'none',
          }}
        />
      ))}
    </div>
  );
}
