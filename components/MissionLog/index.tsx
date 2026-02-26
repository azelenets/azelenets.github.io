import React from 'react';
import {missions} from '@/constants/missions';
import MissionItem from './MissionItem';

const MissionLog: React.FC = () => {
  return (
    <div className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      {/* Header */}
      <div className="mb-16 relative">
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-8">
          <div className="max-w-[1500px]">
            <p className="text-primary text-xs font-bold mb-2 tracking-[0.4em] uppercase">Deployment Archives</p>
            <h1
              className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
              MISSION LOG <span className="text-primary font-light">//</span> {' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">HISTORY</span>
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase pt-2">
              Operational chronology of high-impact missions, escalation pivots, and recovery outcomes. Sequential
              record of strategic execution across production-critical environments.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-24">
        <div
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 hidden md:block"></div>
        {missions.map((mission) => (
          <MissionItem key={mission.title} {...mission} />
        ))}
      </div>

      {/* CTA */}
      <div
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
      </div>
    </div>
  );
};

export default MissionLog;
