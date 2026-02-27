import React from 'react';
import {labCards} from '@/constants/lab';
import LabCard from './LabCard';
import PageHeader from '@/components/layout/PageHeader';

const labCardChildren: Record<string, React.ReactNode> = {
  PRJ_0442: (
    <div className="h-16 w-full bg-black/40 rounded flex items-end gap-1 p-2">
      <div className="w-full bg-primary/20 h-1/2"></div>
      <div className="w-full bg-primary/40 h-3/4"></div>
      <div className="w-full bg-primary/60 h-2/3"></div>
      <div className="w-full bg-primary/40 h-full"></div>
      <div className="w-full bg-primary/20 h-1/2"></div>
      <div className="w-full bg-primary/30 h-1/3"></div>
    </div>
  ),
  PRJ_0819: (
    <div className="h-16 w-full bg-black/40 rounded flex items-center justify-center p-2">
      <svg className="w-full h-full text-hazard/40" viewBox="0 0 100 20">
        <path d="M0 10 Q 25 0, 50 10 T 100 10" fill="none" stroke="currentColor" strokeDasharray="2,1"
              strokeWidth="1"></path>
        <path d="M0 10 Q 25 20, 50 10 T 100 10" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
      </svg>
    </div>
  ),
  PRJ_1105: (
    <div className="h-16 w-full bg-black/40 rounded flex items-center justify-between px-4">
      <div className="size-8 border-2 border-alert/30 rounded-full flex items-center justify-center">
        <div className="size-4 bg-alert animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-1 w-2/3">
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-alert w-[15%]"></div>
        </div>
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-alert w-[45%]"></div>
        </div>
        <div className="h-1 bg-white/5 w-full">
          <div className="h-full bg-alert w-[8%]"></div>
        </div>
      </div>
    </div>
  ),
  PRJ_0291: (
    <div className="grid grid-cols-4 gap-2 h-16">
      <div
        className="bg-primary/10 border border-primary/20 flex items-center justify-center text-[8px] text-primary">82%
      </div>
      <div
        className="bg-primary/20 border border-primary/30 flex items-center justify-center text-[8px] text-primary">94%
      </div>
      <div
        className="bg-primary/5 border border-primary/10 flex items-center justify-center text-[8px] text-primary">44%
      </div>
      <div
        className="bg-primary/40 border border-primary/50 flex items-center justify-center text-[8px] text-primary">99%
      </div>
    </div>
  ),
};

const Laboratory: React.FC = () => {
  return (
    <div className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
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
    </div>
  );
};

export default Laboratory;
