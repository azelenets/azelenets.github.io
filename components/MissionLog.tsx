import React from 'react';

const MissionLog: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-16 px-6">
      {/* Header */}
      <div className="mb-16 space-y-4">
        <div className="flex items-center gap-3">
          <span className="hazard-stripe h-1 w-12"></span>
          <span className="text-hazard font-bold text-xs tracking-[0.4em] uppercase">Deployment Archives</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white leading-none tracking-tighter">
          MISSION LOG <span className="text-primary font-light">//</span> HISTORY
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-[10px] text-primary/40 tracking-widest border-t border-primary/10 pt-4">
          <span>ENTRIES: 04</span>
          <span>|</span>
          <span>CLEARANCE: LEVEL_5</span>
          <span>|</span>
          <span>STATUS: ARCHIVED_DEEP_DIVE</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative space-y-24">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 hidden md:block"></div>
        
        <MissionItem 
            date="2023.Q3 - PRESENT"
            title="Project: Neural Nexus"
            role="Lead Systems Architect"
            scanId="99x-A"
            objective="Revolutionize data ingestion for a global satellite array. Current system failing at 2M req/sec. Objective: Implement a resilient, zero-latency pipeline."
            tactics={[
                "Deployed Distributed Rust-based edge workers across 14 zones.",
                "Engineered custom protocol for telemetry packet deduplication."
            ]}
            outcome="+400% THRUPUT"
            status="S+"
            statusColor="text-hazard bg-hazard/10"
            align="right"
        />

        <MissionItem 
            date="2021.Q1 - 2023.Q2"
            title="Project: Iron Wall Shield"
            role="Cyber-Security Engineer"
            scanId="ENCRYPT_LAYER_6"
            objective="Secure a legacy financial infrastructure against emerging quantum-decryption threats. Defenses were failing stress tests."
            tactics={[
                "Lattice-based cryptographic wrappers.",
                "Heuristic behavioral threat detection."
            ]}
            outcome="0 BREACHES"
            status="ACTIVE"
            statusColor="text-primary bg-primary/10"
            align="left"
            isShield
        />

        <MissionItem 
            date="2018 - 2021"
            title="Project: Ghost Stream"
            role="Full Stack Systems Dev"
            scanId="BW-OPT"
            objective="Minimize bandwidth for HD video feeds across low-orbit satellite links."
            tactics={[
                "Custom C++ encoding for ARM processors.",
                "Adaptive bitrate logic for orbital velocity."
            ]}
            outcome="-65% BW"
            status="ARCHIVED"
            statusColor="text-white/40 bg-white/5"
            align="right"
            isGhost
        />
      </div>

      {/* CTA */}
      <div className="mt-24 border border-dashed border-primary/20 p-10 text-center bg-primary/5 relative overflow-hidden">
         {/* Corner Markers */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary"></div>

        <div className="font-display text-xl md:text-2xl font-black text-white mb-6 uppercase tracking-widest">Request Full Tactical Briefing?</div>
        <button className="group relative px-10 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm overflow-hidden">
            <span className="relative z-10">DOWNLOAD_CV.PDF</span>
            <div className="absolute top-0 right-0 hazard-stripe w-2 h-full opacity-50 group-hover:w-full transition-all duration-300"></div>
        </button>
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8 text-[9px] text-primary font-bold">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> ENCRYPTED</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> VERIFIED</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">check_circle</span> ACCESSIBLE</span>
        </div>
      </div>
    </div>
  );
};

interface MissionItemProps {
    date: string;
    title: string;
    role: string;
    scanId: string;
    objective: string;
    tactics: string[];
    outcome: string;
    status: string;
    statusColor: string;
    align: 'left' | 'right';
    isShield?: boolean;
    isGhost?: boolean;
}

const MissionItem: React.FC<MissionItemProps> = ({ date, title, role, scanId, objective, tactics, outcome, status, statusColor, align, isShield, isGhost }) => {
    return (
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Center Node */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 z-10">
                <div className="size-4 bg-bg-dark border-2 border-primary rotate-45 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.6)]">
                    <div className="size-1 bg-primary"></div>
                </div>
            </div>

            {/* Content Side */}
            <div className={`space-y-4 ${align === 'right' ? 'md:text-right' : 'md:order-2'}`}>
                <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold tracking-widest uppercase">
                    OPS_DATE: {date}
                </div>
                <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">{title}</h2>
                <div className="text-primary/60 text-xs font-bold tracking-tighter uppercase">ROLE: {role}</div>
                
                {/* Visual Artifact */}
                <div className={`border border-primary/10 bg-black/20 p-4 mt-4 inline-block group hover:border-primary/40 transition-colors w-full ${align === 'right' ? '' : ''}`}>
                   {isShield ? (
                        <div className="w-full h-40 bg-black/40 flex items-center justify-center border border-primary/10 overflow-hidden relative">
                             <div className="absolute inset-0 cyber-grid opacity-30"></div>
                             <span className="material-symbols-outlined text-6xl text-primary/20 scale-150">shield_lock</span>
                             <div className="absolute bottom-2 left-2 text-[8px] text-primary/30 uppercase">{scanId}</div>
                        </div>
                   ) : isGhost ? (
                        <div className="h-40 flex flex-col justify-center space-y-2 px-8 w-full bg-black/40 border border-primary/10">
                            <div className="h-1 w-full bg-white/5"><div className="h-full bg-primary/40 w-full animate-pulse"></div></div>
                            <div className="h-1 w-2/3 bg-white/5"><div className="h-full bg-primary/30 w-full"></div></div>
                            <div className="h-1 w-3/4 bg-white/5"><div className="h-full bg-primary/20 w-full animate-pulse"></div></div>
                        </div>
                   ) : (
                        <div className="relative w-full h-40 bg-black/40 border border-primary/10">
                             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDD6PtT9XbGV5DBla2sWVSFGupmogjKkxsrPHoXaddESktS5ZWLKP-Qff8Tjy_wk5EEkTOgKvW9hOCtbxIz-3UrOgrbletwIDaEbP4D4xczV2nuzj3ap23p5Oz_BHH7n4kYpnh9i7Hu5IqhmLxWAdHCV0pxkQ3TdRXLlOzfwqD9DgQo8A1HklqlPwDsmgJNi47CymzZqskzURNFRYKia1ofWwFdRfJHxxPBFuReN8tuDl7ctOAL82rsKrjpE9WAhHeC67Z3G7iDdDrL" 
                             className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" alt="Wireframe" />
                             <div className="absolute bottom-2 left-2 text-[8px] text-primary/40 flex justify-between uppercase w-full px-4">
                                <span>Scan_ID: {scanId}</span>
                                <span>V-Mesh: Active</span>
                            </div>
                        </div>
                   )}
                </div>
            </div>

            {/* Details Side */}
            <div className={`hud-border p-6 bg-white/5 backdrop-blur-sm space-y-6 ${align === 'right' ? '' : 'md:order-1 md:text-right'}`}>
                <div className="space-y-2">
                    <div className={`text-hazard text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 ${align === 'right' ? '' : 'justify-end'}`}>
                        <span className="material-symbols-outlined text-xs">priority_high</span> MISSION_OBJECTIVE
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">{objective}</p>
                </div>
                
                <div className="space-y-2">
                     <div className={`text-primary text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-2 ${align === 'right' ? '' : 'justify-end'}`}>
                        <span className="material-symbols-outlined text-xs">architecture</span> TACTICAL_IMPLEMENTATION
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2 list-none font-mono">
                        {tactics.map((t, i) => (
                            <li key={i} className={`flex gap-2 ${align === 'right' ? '' : 'justify-end'}`}>
                                <span className={`text-primary font-bold ${align === 'right' ? '' : 'order-last'}`}>&gt;&gt;</span>
                                <span>{t}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={`pt-4 border-t border-white/5 flex items-end justify-between ${align === 'right' ? '' : 'flex-row-reverse'}`}>
                    <div className="space-y-1">
                        <div className="text-[9px] text-white/40 uppercase">Outcome_Impact</div>
                        <div className="text-xl font-display font-black text-white tracking-widest">{outcome}</div>
                    </div>
                    <div className={`text-[10px] font-bold px-2 py-1 uppercase ${statusColor}`}>SUCCESS: {status}</div>
                </div>
            </div>
        </div>
    );
};

export default MissionLog;