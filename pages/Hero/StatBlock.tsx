import { memo, useEffect, useRef, useState } from 'react';

interface StatBlockProps {
  label: string;
  value: string;
  barColor: string;
  width: string;
}

const DURATION = 1400;

function parseNumeric(value: string): { num: number; suffix: string } | null {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
}

const StatBlock = ({ label, value, barColor, width }: StatBlockProps) => {
  const [displayed, setDisplayed] = useState('\u00A0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parsed = parseNumeric(value);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        if (parsed) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / DURATION, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = eased * parsed.num;
            const formatted = Number.isInteger(parsed.num)
              ? String(Math.round(current))
              : current.toFixed(1);
            setDisplayed(formatted + parsed.suffix);
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        } else {
          const chars = value.split('');
          const delay = DURATION / chars.length;
          chars.forEach((_, i) => {
            setTimeout(() => setDisplayed(value.slice(0, i + 1)), i * delay);
          });
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="space-y-1">
      <div className="text-[10px] text-primary/60 font-bold tracking-widest uppercase">{label}</div>
      <div className="text-3xl font-display font-black text-white">{displayed}</div>
      <div className="h-1 bg-white/5 w-full mt-2">
        <div className={`h-full ${barColor}`} style={{ width }} />
      </div>
    </div>
  );
};

export default memo(StatBlock);
