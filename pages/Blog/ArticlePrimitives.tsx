import React from 'react';

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-slate-400 text-sm leading-7 font-mono mb-6">{children}</p>
);

export const H2: React.FC<{ num: string; children: React.ReactNode }> = ({ num, children }) => (
  <h2 className="flex items-baseline gap-3 text-white font-black font-display text-xl md:text-2xl uppercase tracking-tight mt-14 mb-5">
    <span className="text-primary/30 text-sm font-mono font-normal shrink-0">{num}</span>
    {children}
  </h2>
);

export const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-white font-bold text-sm uppercase tracking-widest mt-8 mb-3 flex items-center gap-2">
    <span className="text-primary">▸</span>
    {children}
  </h3>
);

export const Callout: React.FC<{ type?: 'info' | 'warn' | 'danger'; children: React.ReactNode }> = ({
  type = 'info',
  children,
}) => {
  const styles = {
    info:   { border: 'border-primary/20',       bg: 'bg-primary/5',       icon: 'info',    text: 'text-primary/80'    },
    warn:   { border: 'border-yellow-400/25',     bg: 'bg-yellow-400/5',    icon: 'warning', text: 'text-yellow-400/80' },
    danger: { border: 'border-red-400/25',        bg: 'bg-red-400/5',       icon: 'error',   text: 'text-red-400/80'    },
  }[type];

  return (
    <div className={`border ${styles.border} ${styles.bg} px-5 py-4 flex gap-3 my-7 rounded-sm`}>
      <span className={`material-symbols-outlined text-base mt-0.5 shrink-0 ${styles.text}`}>{styles.icon}</span>
      <p className={`text-xs font-mono leading-6 ${styles.text}`}>{children}</p>
    </div>
  );
};

export const Code: React.FC<{ label?: string; children: React.ReactNode }> = ({ label, children }) => (
  <figure className="my-7 border border-primary/10 bg-black/50">
    {label && (
      <figcaption className="px-4 py-2 border-b border-primary/10 text-[9px] font-bold font-mono text-slate-600 tracking-widest uppercase">
        {label}
      </figcaption>
    )}
    <pre className="px-5 py-4 text-xs font-mono text-slate-400 leading-6 overflow-x-auto whitespace-pre">
      {children}
    </pre>
  </figure>
);
