import React from 'react';
import { certifications, combatLanguages, tacticalFrameworks } from '@/constants/credentials';
import CertCard from './CertCard';
import StatCard from '@/components/Protocols/StatCard.tsx';
import PageHeader from '@/components/layout/PageHeader.tsx';

const Credentials: React.FC = () => {
  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative flex-grow">
      {/* Header Title */}
      <PageHeader
        eyebrow="Personnel Authorization File"
        titleMain="Credentials"
        titleAccent="Clearance Dossier"
        description="Secure profile and access summary, consolidating identity credentials, role authorizations, and current clearance status at a glance."
      />

      {/* Top Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-1 font-mono">
        <StatCard id="STAT_01" label="Combat Experience" value="13+ YEARS" progress={75} />
        <StatCard id="STAT_02" label="Authorization Level" value="MASTER'S [CS]" progress={100} segmented />
        <article className="bg-surface-terminal border border-primary/10 p-6 relative">
          <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">STAT_03</div>
          <p className="text-primary/60 text-[10px] uppercase mb-1">Strategic Reach</p>
          <p className="text-3xl font-bold text-white tracking-tighter">50M+ OPS</p>
          <p className="text-[10px] text-alert mt-4 uppercase animate-pulse">CRITICAL INFRASTRUCTURE REACHED</p>
        </article>
      </section>

      <div className="grid grid-cols-12 gap-8 items-start">

        {/* Sidebar Profile */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-4 space-y-6">
          <figure className="hud-border bg-black/40 p-1">
            <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img
                alt="Biometric Scan Avatar"
                className="w-full h-full object-cover grayscale opacity-50 brightness-125"
                src="/images/desktop.avif"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 w-full h-0.5 bg-primary/40 animate-[bounce_5s_infinite]"></div>
                <div className="absolute inset-0 border-[20px] border-black/60"></div>
                <div className="absolute top-2 left-2 text-[8px] text-primary">RETINA_SCAN: ACTIVE</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-primary animate-pulse">MATCH_FOUND_99%</div>
              </div>
            </div>
          </figure>

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
        </aside>

        {/* Main Details */}
        <div className="col-span-12 md:col-span-8 lg:col-span-8 space-y-8">
          <article className="hud-border bg-panel-dark/80 p-8 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
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
              <article className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 size-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Authorization_Level: MASTER</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">M.Eng. — Control and Automation</h3>
                      <span className="inline-flex items-center gap-1 border border-yellow-400/60 bg-yellow-400/10 text-yellow-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                        <span className="material-symbols-outlined text-[10px]">military_tech</span>
                        Diploma with Honor
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">Dnipro Polytech | Dept. of Automation &amp; Computer Systems</div>
                  </div>
                  <span className="text-xs font-bold text-white/40">2011 — 2012</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Specialization</div>
                    <div className="text-xs text-primary">Computerized systems, control and automation</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Qualification</div>
                    <div className="text-xs text-primary">Computer systems engineer, researcher</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Thesis_Project</div>
                    <div className="text-xs text-primary">Directed movement of a tunnel boring machine along a laser beam + Photovoltaic matrix development, MatLab/MathCad model</div>
                  </div>
                </div>
              </article>

              {/* Bachelors */}
              <article className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 size-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Authorization_Level: BACHELOR</div>
                    <h3 className="text-xl font-bold text-white">B.Sc. Information Technology</h3>
                    <div className="text-sm text-slate-400">Dnipro Polytech | Dept. of Automation &amp; Computer Systems</div>
                  </div>
                  <span className="text-xs font-bold text-white/40">2009 — 2011</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Specialization</div>
                    <div className="text-xs text-primary">Industry Automation &amp; Control Systems Engineering</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Qualification</div>
                    <div className="text-xs text-primary">Specialist in automation and control systems</div>
                  </div>
                </div>
              </article>

              {/* Jr. Specialist */}
              <article className="relative pl-8 border-l border-primary/30">
                <div className="absolute -left-[5px] top-0 size-2 bg-primary"></div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Authorization_Level: SPECIALIST</div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold text-white">Automated Control Systems Specialist</h3>
                      <span className="inline-flex items-center gap-1 border border-yellow-400/60 bg-yellow-400/10 text-yellow-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
                        <span className="material-symbols-outlined text-[10px]">military_tech</span>
                        Diploma with Honor
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">Dnipro Polytech College</div>
                  </div>
                  <span className="text-xs font-bold text-white/40">2005 — 2009</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Specialization</div>
                    <div className="text-xs text-primary">Installation and maintenance of technological production automation equipment and systems</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Qualification</div>
                    <div className="text-xs text-primary">Electromechanical technician for installation and commissioning of technological production automation equipment and systems</div>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-3">
                    <div className="text-[9px] text-white/40 uppercase mb-1">Thesis_Project</div>
                    <div className="text-xs text-primary">Automated control system for air heaters in steel production</div>
                  </div>
                </div>
              </article>
            </div>
          </article>

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
          <section className="space-y-4">
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
          </section>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
