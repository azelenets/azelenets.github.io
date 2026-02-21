import React from 'react';
import { certifications, combatLanguages, tacticalFrameworks } from '@/constants/credentials';
import CertCard from './CertCard';

const Credentials: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto w-full space-y-12 px-6 py-16 flex-grow">
      {/* Header Title */}
      <div className="mb-12 border-l-4 border-primary pl-8 py-2">
        <div className="text-primary font-bold text-xs tracking-[0.4em] uppercase mb-1">Personnel Authorization File</div>
        <h1 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
          Credentials Clearance Dossier
        </h1>
        <div className="mt-2 text-xs text-white/40 flex gap-6">
          <span>SUBJECT_ID: AZ-9942-X</span>
          <span>STATUS: VERIFIED</span>
          <span>AUTH_TOKEN: 8829-PX-001</span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 items-start">

        {/* Sidebar Profile */}
        <div className="col-span-12 md:col-span-4 lg:col-span-4 space-y-6">
          <div className="hud-border bg-black/40 p-1">
            <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img
                alt="Biometric Scan Avatar"
                className="w-full h-full object-cover grayscale opacity-50 brightness-125"
                src="/images/desktop.png"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 w-full h-0.5 bg-primary/40 animate-[bounce_5s_infinite]"></div>
                <div className="absolute inset-0 border-[20px] border-black/60"></div>
                <div className="absolute top-2 left-2 text-[8px] text-primary">RETINA_SCAN: ACTIVE</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-primary animate-pulse">MATCH_FOUND_99%</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-3 border border-white/10 bg-white/5">
              <div className="text-[9px] text-primary/60 font-bold uppercase">Biometric_Auth_Status</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white">GENETIC_HASH</span>
                <span className="text-[10px] text-primary font-mono">X99-A12-88B</span>
              </div>
              <div className="w-full h-1 bg-white/10 mt-2 flex gap-1">
                <div className="h-full bg-primary w-1/4"></div>
                <div className="h-full bg-primary w-1/4"></div>
                <div className="h-full bg-primary w-1/4"></div>
                <div className="h-full bg-white/20 w-1/4"></div>
              </div>
            </div>
            <div className="p-3 border border-white/10 bg-white/5">
              <div className="text-[9px] text-primary/60 font-bold uppercase">Network_Integrity</div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white">VPN_TUNNEL</span>
                <span className="text-[10px] text-hazard">SECURED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Details */}
        <div className="col-span-12 md:col-span-8 lg:col-span-8 space-y-8">
          <div className="hud-border bg-panel-dark/80 p-8 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
            <div className="flex items-start justify-between mb-8 border-b border-primary/20 pb-4">
              <div>
                <span className="bg-primary text-black text-[9px] px-2 py-0.5 font-black uppercase mb-2 inline-block">Priority Alpha</span>
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tighter">High-Level Authorization</h2>
                <div className="text-[10px] text-primary/60 mt-1 uppercase">Academic Credentials & Specializations</div>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl opacity-50">verified_user</span>
            </div>

            <div className="space-y-10">
              {/* Masters */}
              <div className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 size-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Authorization_Level: MASTER</div>
                    <h3 className="text-xl font-bold text-white">M.Sc. Advanced Distributed Systems</h3>
                    <div className="text-sm text-slate-400">California Institute of Advanced Neural Computation</div>
                  </div>
                  <span className="text-xs font-bold text-white/40">2012 — 2014</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Thesis_Sector</div>
                    <div className="text-xs text-primary">Autonomous Edge Node Recovery</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Grade_Matrix</div>
                    <div className="text-xs text-primary">4.0 / 4.0 (PRIME)</div>
                  </div>
                </div>
              </div>

              {/* Bachelors */}
              <div className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 size-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Authorization_Level: BACHELOR</div>
                    <h3 className="text-xl font-bold text-white">B.Eng. Cyber-Tactical Engineering</h3>
                    <div className="text-sm text-slate-400">United Defense Systems Academy</div>
                  </div>
                  <span className="text-xs font-bold text-white/40">2008 — 2012</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mt-2 uppercase tracking-wide">
                  Focus on low-level kernel architectures and secure-boot protocols. Awarded the 'Top Gun' accolade for zero-day mitigation simulation.
                </p>
              </div>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-5">
              <div className="text-[10px] text-primary/70 font-bold mb-4 uppercase">Combat_Languages</div>
              <div className="flex flex-wrap gap-2">
                {combatLanguages.map(l => (
                  <span key={l} className="bg-black border border-primary/20 text-[10px] px-2 py-1 text-white">{l}</span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-5">
              <div className="text-[10px] text-primary/70 font-bold mb-4 uppercase">Tactical_Frameworks</div>
              <div className="flex flex-wrap gap-2">
                {tacticalFrameworks.map(l => (
                  <span key={l} className="bg-black border border-primary/20 text-[10px] px-2 py-1 text-white">{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Certs */}
          <div className="space-y-4">
            <div className="hazard-stripe h-2 w-full mb-4"></div>
            <div className="text-[10px] font-bold text-white tracking-[0.3em] uppercase mb-4 px-2">Access_Keys_Repository</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certifications.map(cert => (
                <CertCard key={cert.id} id={cert.id} hash={cert.hash} title={cert.title} full={cert.full} />
              ))}
            </div>
            <div className="p-4 border border-dashed border-white/10 text-center">
              <button className="text-[10px] text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                [ REQUEST_FURTHER_DECRYPTION ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
