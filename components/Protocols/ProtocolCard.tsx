import React from 'react';

interface ProtocolCardProps {
  id: string;
  icon: string;
  title: string;
  status: string;
  dots: number;
  children: React.ReactNode;
}

const ProtocolCard: React.FC<ProtocolCardProps> = ({ id, icon, title, status, dots, children }) => (
  <div className="bg-surface-terminal/90 p-10 flex flex-col gap-8 group hover:bg-primary/5 transition-all relative overflow-hidden">
    <div className="flex justify-between items-start">
      <div className="w-16 h-16 border border-primary/30 flex items-center justify-center text-primary relative">
        <span className="material-symbols-outlined text-4xl">{icon}</span>
        <div className="absolute -top-1 -left-1 w-2 h-2 bg-primary"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-primary"></div>
      </div>
      <span className="font-mono text-primary/40 text-xs">// {id}</span>
    </div>
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-2xl font-bold font-mono tracking-tight uppercase group-hover:text-primary transition-colors">
        {title}
      </h3>
      <div className="h-px w-12 bg-alert"></div>
      <p className="text-slate-400 text-sm leading-relaxed font-mono">
        <span className="text-primary">[OBJECTIVE]</span> {children}
      </p>
    </div>
    <div className="mt-auto pt-6 border-t border-primary/10 flex justify-between items-center opacity-40">
      <div className="flex gap-1">
        {[...Array(dots)].map((_, i) => (
          <div key={i} className="w-2 h-2 bg-primary"></div>
        ))}
      </div>
      <span className="text-[8px] font-mono text-primary">{status}</span>
    </div>
  </div>
);

export default ProtocolCard;
