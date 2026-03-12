import React from 'react';
import {labCards} from '@/constants/lab';
import LabCard from './LabCard';
import PageHeader from '@/components/layout/PageHeader';

const labCardChildren: Record<string, React.ReactNode> = {
  PRJ_0001: (
    <div className="h-24 w-full bg-black/40 rounded relative overflow-hidden flex items-center justify-center">
      <div className="absolute size-12 border border-primary/20 rounded-full" />
      <div className="absolute size-7 border border-primary/30 rounded-full" />
      <div className="absolute w-full h-[1px] bg-primary/10" />
      <div className="absolute h-full w-[1px] bg-primary/10" />
      <div className="size-1.5 bg-primary rounded-full animate-ping" />
    </div>
  ),
  PRJ_0174: (
    <div className="h-24 w-full bg-black/40 rounded flex items-center justify-between px-3 gap-1.5">
      {(['COMMAND', 'QUERY', 'EVENT', 'HANDLER'] as const).map((label) => (
        <div key={label} className="flex-1 border border-primary/20 bg-primary/5 flex items-center justify-center text-xs text-primary/50 font-bold py-2">
          {label}
        </div>
      ))}
    </div>
  ),
  PRJ_0287: (
    <div className="h-24 w-full bg-black/40 rounded flex items-center px-2 overflow-hidden">
      <svg className="w-full h-10 text-primary/50" viewBox="0 0 200 30" preserveAspectRatio="none">
        <polyline
          points="0,15 18,5 36,25 54,10 72,20 90,6 108,22 126,11 144,19 162,4 180,16 200,15"
          fill="none" stroke="currentColor" strokeWidth="1.5"
        />
        <circle cx="162" cy="4" r="2.5" fill="currentColor" opacity="0.8" />
      </svg>
    </div>
  ),
  PRJ_0330: (
    <div className="h-24 w-full bg-black/40 rounded flex items-center justify-around px-4">
      <div className="text-xs text-alert/50 border border-alert/20 px-2 py-1.5 font-bold">FORM</div>
      <div className="text-xs text-alert/30">→</div>
      <div className="text-xs text-alert/50 border border-alert/20 px-2 py-1.5 font-bold">EDGE</div>
      <div className="text-xs text-alert/30">→</div>
      <div className="text-xs text-alert/50 border border-alert/20 px-2 py-1.5 font-bold">INBOX</div>
    </div>
  ),
  PRJ_0412: (
    <div className="h-24 w-full rounded relative overflow-hidden border border-alert/20 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.16),_transparent_35%),linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.92))]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(251,191,36,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-alert/40" />
      <div className="absolute inset-y-0 left-0 w-px bg-alert/20" />
      <div className="relative h-full px-4 py-3 flex flex-col justify-between">
        <div className="flex items-start justify-between text-[9px] font-bold tracking-[0.25em] text-alert/70">
          <span>AEGIS</span>
          <span>HUD // UI</span>
        </div>
        <div>
          <div className="font-display text-lg font-black leading-none text-white uppercase">Design System</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-alert/70">React 19 Tactical Components</div>
        </div>
      </div>
    </div>
  ),
};

const Laboratory: React.FC = () => {
  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="Experimental Prototypes"
        titleMain="R&D"
        titleAccent="EXPERIMENTAL LAB"
        description="Rapid prototyping zone for in-progress R&D, where experimental components are tested, validated, and prepared for tactical deployment."
      />

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {labCards.map(card => (
          <LabCard key={card.id} {...card}>
            {labCardChildren[card.id]}
          </LabCard>
        ))}

        {/* Add New */}
        <div
          className="hud-border bg-panel-dark/80 backdrop-blur-sm p-6 group border-dashed border-primary/40 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
          <span className="material-symbols-outlined text-4xl text-primary/40 mb-2">add_circle</span>
          <h3 className="text-lg font-display font-bold text-white">NEW_INITIATIVE</h3>
          <p className="text-xs text-slate-500 mt-2">Submit a proposal for the next experimental prototype.</p>
          <button
            className="mt-4 px-4 py-2 border border-primary/20 text-[10px] hover:bg-primary hover:text-black transition-colors uppercase">Initialize_Draft
          </button>
        </div>
      </div>
    </section>
  );
};

export default Laboratory;
