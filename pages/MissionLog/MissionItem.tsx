import { JSX, memo, useEffect, useMemo, useRef, useState } from 'react';

interface MissionItemProps {
  date: string;
  title: string;
  role: string;
  scanId: string;
  objective: string;
  tactics: string[];
  tools?: string[];
  outcome: string;
  status: string;
  statusColor: string;
  align: 'left' | 'right';
  isShield?: boolean;
  isGhost?: boolean;
  imageUrl?: string;
}

const WORD_DELAY = 50;
const BLOCK_GAP = 5;

type DeclassifiedTextProps = {
  text: string;
  startMs: number;
  active: boolean;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const DeclassifiedText = ({ text, startMs = 0, active, as: Wrapper, className }: DeclassifiedTextProps) => {
  const tokens = text.split(/(\s+)/);
  let wordIdx = 0;

  const nodes = tokens.map((token, i) => {
    if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
    const delay = startMs + wordIdx++ * WORD_DELAY;
    return (
      <span
        key={i}
        className={active ? 'declassify-char' : 'declassify-pending'}
        style={active ? { animationDelay: `${delay}ms` } : undefined}
        onAnimationEnd={(e) => {
          (e.currentTarget.firstElementChild as HTMLElement | null)?.classList.add('declassify-done');
        }}
      >
        <span className="declassify-block">{token}</span>
      </span>
    );
  });

  return Wrapper ? <Wrapper className={className}>{nodes}</Wrapper> : <>{nodes}</>;
};

const MissionItem = ({ date, title, role, scanId, objective, tactics, tools, outcome, status, statusColor, align, isShield, isGhost, imageUrl }: MissionItemProps) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offsets = useMemo(() => {
    let cursor = 0;
    const next = (text: string) => {
      const ms = cursor * BLOCK_GAP;
      cursor += text.length + BLOCK_GAP;
      return ms;
    };
    return {
      objective: next(objective),
      tactics: tactics.map(next),
      tools: (tools ?? []).map(next),
      outcome: next(outcome),
      status: next(status),
    };
  }, [objective, tactics, tools, outcome, status]);

  return (
    <article className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 z-10">
        <div className="size-4 bg-bg-dark border-2 border-primary rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.6)]">
          <div className="size-1 bg-primary" />
        </div>
      </div>

      <div className={`space-y-4 ${align === 'right' ? 'md:text-right' : 'md:order-2'}`}>
        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase">OPS_DATE: {date}</div>
        <DeclassifiedText text={title} startMs={0} active={active} as="h2" className="text-2xl font-display font-black text-white uppercase tracking-tight" />
        <DeclassifiedText text={`ROLE: ${role}`} startMs={role.length} active={active} as="div" className="text-primary/60 text-xs font-bold tracking-tighter uppercase" />

        <figure className="border border-primary/10 bg-black/20 p-4 mt-4 inline-block group hover:border-primary/40 transition-colors w-full">
          {isShield ? (
            <div className="w-full h-40 bg-black/40 flex items-center justify-center border border-primary/10 overflow-hidden relative">
              <div className="absolute inset-0 cyber-grid opacity-30" />
              <span className="material-symbols-outlined text-6xl text-primary/20 scale-150">shield_lock</span>
              <div className="absolute bottom-2 left-2 text-[8px] text-primary/30 uppercase">{scanId}</div>
            </div>
          ) : isGhost ? (
            <div className="h-40 flex flex-col justify-center space-y-2 px-8 w-full bg-black/40 border border-primary/10">
              <div className="h-1 w-full bg-white/5">
                <div className="h-full bg-primary/40 w-full animate-pulse" />
              </div>
              <div className="h-1 w-2/3 bg-white/5">
                <div className="h-full bg-primary/30 w-full" />
              </div>
              <div className="h-1 w-3/4 bg-white/5">
                <div className="h-full bg-primary/20 w-full animate-pulse" />
              </div>
            </div>
          ) : imageUrl ? (
            <div className="relative w-full h-40 bg-black/40 border border-primary/10">
              <img
                src={imageUrl}
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"
                alt="Wireframe"
              />
              <div className="absolute bottom-2 left-2 text-[8px] text-primary/40 flex justify-between uppercase w-full px-4">
                <span>Scan_ID: {scanId}</span>
                <span>V-Mesh: Active</span>
              </div>
            </div>
          ) : undefined}
        </figure>
      </div>

      <div ref={ref} className="hud-border p-6 bg-white/5 backdrop-blur-sm space-y-6">
        <div className="space-y-2">
          <div className="text-hazard text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">priority_high</span> MISSION_OBJECTIVE
          </div>

          <DeclassifiedText text={objective} startMs={offsets.objective} active={active} as="p" className="text-sm text-slate-400 leading-relaxed" />
        </div>

        <div className="space-y-2">
          <div className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">architecture</span> TACTICAL_IMPLEMENTATION
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-none font-mono">
            {tactics.map((tactic, i) => (
              <li key={tactic} className="flex gap-2">
                <span className="text-primary font-bold">&gt;&gt;</span>
                <DeclassifiedText text={tactic} startMs={offsets.tactics[i]} active={active} as="span"/>
              </li>
            ))}
          </ul>
        </div>

        {tools && tools.length > 0 && (
          <div className="space-y-2">
            <div className="text-primary/50 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2">
              <span className="material-symbols-outlined text-xs">memory</span> TECH_STACK
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((tool, i) => (
                <DeclassifiedText key={tool} text={tool} startMs={offsets.tools[i]} active={active} as="span" className="px-2 py-0.5 bg-primary/5 border border-primary/15 text-primary/60 text-[9px] font-mono tracking-wider" />
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <DeclassifiedText text={outcome} startMs={offsets.outcome} active={active} as="div" className="text-xl font-display font-black text-white tracking-widest"/>
          <DeclassifiedText text={status} startMs={offsets.status} active={active} as="div" className={`text-[10px] font-bold px-2 py-1 uppercase shrink-0 ${statusColor}`} />
        </div>
      </div>
    </article>
  );
};

export default memo(MissionItem);
