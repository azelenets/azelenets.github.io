import React from 'react';
import {missions} from '@/constants/missions';
import MissionItem from './MissionItem';
import PageHeader from '@/components/layout/PageHeader';

const MissionLog: React.FC = () => {
  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="Deployment Archives"
        titleMain="MISSION LOG"
        titleAccent="HISTORY"
        description="Operational chronology of high-impact missions, escalation pivots, and recovery outcomes. Sequential record of strategic execution across production-critical environments."
      />

      {/* Timeline */}
      <div className="relative">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 hidden md:block"></div>
        <ol className="space-y-24 list-none">
          {missions.map((mission) => (
            <li key={mission.title}>
              <MissionItem {...mission} />
            </li>
          ))}
        </ol>
      </div>

      {/* CTA */}
      <aside
        className="mt-24 border border-dashed border-primary/20 p-10 text-center bg-primary/5 relative overflow-hidden">
        {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>

        <div className="font-display text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-widest">Request
          Full Tactical Briefing?
        </div>
        <button
          className="group relative px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm overflow-hidden">
          <span className="relative z-10">DOWNLOAD_CV.PDF</span>
          <div
            className="absolute top-0 right-0 hazard-stripe w-2 h-full opacity-50 group-hover:w-full transition-all duration-300"></div>
        </button>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] text-primary font-bold">
          <span className="flex items-center gap-1"><span
            className="material-symbols-outlined text-xs">check_circle</span> ENCRYPTED</span>
          <span className="flex items-center gap-1"><span
            className="material-symbols-outlined text-xs">check_circle</span> VERIFIED</span>
          <span className="flex items-center gap-1"><span
            className="material-symbols-outlined text-xs">check_circle</span> ACCESSIBLE</span>
        </div>
      </aside>
    </section>
  );
};

export default MissionLog;
