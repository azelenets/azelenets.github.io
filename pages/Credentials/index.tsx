import React from 'react';
import { combatLanguages, courses, education, tacticalFrameworks } from '@/constants/credentials';
import StatCard from '@/components/StatCard';
import PageHeader from '@/components/layout/PageHeader.tsx';
import EducationEntry from './EducationEntry';
import SkillGroup from './SkillGroup';

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
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
        <StatCard id="STAT_01" label="Combat Experience" value="13+ YEARS" progress={75} />
        <StatCard id="STAT_02" label="Authorization Level" value="MASTER'S [CS]" progress={100} segmented />
        <article className="bg-surface-terminal border border-primary/10 p-6 relative">
          <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">STAT_03</div>
          <p className="text-primary/60 text-[10px] uppercase mb-1">Strategic Reach</p>
          <p className="text-3xl font-bold text-white tracking-tighter">38 PROJECTS</p>
          <p className="text-[10px] text-alert mt-4 uppercase animate-pulse">CRITICAL INFRASTRUCTURE REACHED</p>
        </article>
      </section>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-start">
        {/* Sidebar Profile */}
        <aside className="w-full md:col-span-4 space-y-6">
          <figure className="hud-border bg-black/40 p-1">
            <div className="relative aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
              <img
                alt="Biometric Scan Avatar"
                className="w-full h-full object-cover grayscale opacity-50 brightness-125"
                src="/images/desktop.avif"
              />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 w-full h-0.5 bg-primary/40 animate-[bounce_5s_infinite]" />
                <div className="absolute inset-0 border-[20px] border-black/60" />
                <div className="absolute top-2 left-2 text-[8px] text-primary">RETINA_SCAN: ACTIVE</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-primary animate-pulse">MATCH_FOUND_99%</div>
              </div>
            </div>
          </figure>

          {/*<div className="space-y-4">*/}
          {/*  <div className="p-3 border border-white/10 bg-white/5">*/}
          {/*    <div className="text-[9px] text-primary/60 font-bold uppercase">Biometric_Auth_Status</div>*/}
          {/*    <div className="flex items-center justify-between mt-1">*/}
          {/*      <span className="text-xs text-white">GENETIC_HASH</span>*/}
          {/*      <span className="text-[10px] text-primary font-mono">X99-A12-88B</span>*/}
          {/*    </div>*/}
          {/*    <div className="w-full h-1 bg-white/10 mt-2 flex gap-1">*/}
          {/*      <div className="h-full bg-primary w-1/4" />*/}
          {/*      <div className="h-full bg-primary w-1/4" />*/}
          {/*      <div className="h-full bg-primary w-1/4" />*/}
          {/*      <div className="h-full bg-white/20 w-1/4" />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className="p-3 border border-white/10 bg-white/5">*/}
          {/*    <div className="text-[9px] text-primary/60 font-bold uppercase">Network_Integrity</div>*/}
          {/*    <div className="flex items-center justify-between mt-1">*/}
          {/*      <span className="text-xs text-white">VPN_TUNNEL</span>*/}
          {/*      <span className="text-[10px] text-hazard">SECURED</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </aside>

        {/* Main Details */}
        <div className="w-full md:col-span-8 space-y-8">
          <article className="hud-border bg-panel-dark/80 p-4 md:p-8 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
            <div className="flex items-start justify-between mb-8 border-b border-primary/20 pb-4">
              <div>
                <span className="bg-primary text-black text-[9px] px-2 py-0.5 font-black uppercase mb-2 inline-block">Priority Alpha</span>
                <h2 className="text-2xl font-display font-bold text-white uppercase tracking-tighter">Education Authorization</h2>
                <div className="text-[10px] text-primary/60 mt-1 uppercase">Academic Credentials & Specializations</div>
              </div>
              <span className="material-symbols-outlined text-primary text-4xl opacity-50">verified_user</span>
            </div>

            <div className="space-y-10">
              {education.map(entry => (
                <EducationEntry key={entry.level} {...entry} />
              ))}
            </div>
          </article>

          {/* Courses */}
          <section className="space-y-4">
            <div className="hazard-stripe h-2 w-full" />
            <div className="flex items-center justify-between px-2 pt-2">
              <div className="text-[10px] font-bold text-white tracking-[0.3em] uppercase">Training_Modules_Log</div>
              <span className="text-[9px] text-primary/50 font-mono">{courses.length}_RECORDS_FOUND</span>
            </div>
            <div className="space-y-3">
              {courses.map((course, i) => (
                <a
                  key={course.id}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group border border-white/10 bg-panel-dark hover:border-primary/50 transition-colors relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-primary/0 group-hover:bg-primary/60 transition-colors" />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-[8px] font-black text-black/80 px-1.5 py-0.5 uppercase tracking-widest"
                                style={{ background: course.platform === 'Coursera' ? '#0056d2' : '#a435f0', color: '#fff' }}>
                            {course.platform}
                          </span>
                          <span className="text-[8px] text-primary/40 font-mono">{course.id.toUpperCase()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white leading-tight group-hover:text-primary transition-colors">{course.title}</h4>
                        <div className="text-[9px] text-slate-400 mt-0.5">{course.instructor}</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 mt-1">
                        <span className="text-[8px] text-white/20 uppercase tracking-widest">#{String(i + 1).padStart(2, '0')}</span>
                        <span className="material-symbols-outlined text-white/20 text-sm group-hover:text-primary/60 transition-colors">open_in_new</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 mb-3 leading-relaxed">{course.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.topics.map(topic => (
                        <span key={topic} className="text-[8px] text-primary/70 border border-primary/20 bg-primary/5 px-1.5 py-0.5 font-mono uppercase">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillGroup title="Combat_Languages" items={combatLanguages} />
            <SkillGroup title="Tactical_Frameworks" items={tacticalFrameworks} />
          </div>

          {/* Certs */}
          {/*<section className="space-y-4">*/}
          {/*  <div className="hazard-stripe h-2 w-full mb-4"></div>*/}
          {/*  <div className="text-[10px] font-bold text-white tracking-[0.3em] uppercase mb-4 px-2">Access_Keys_Repository</div>*/}
          {/*  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">*/}
          {/*    {certifications.map(cert => (*/}
          {/*      <CertCard key={cert.id} id={cert.id} hash={cert.hash} title={cert.title} full={cert.full} />*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*  <div className="p-4 border border-dashed border-white/10 text-center">*/}
          {/*    <button className="text-[10px] text-white/30 uppercase tracking-[0.3em] hover:text-primary transition-colors">*/}
          {/*      [ REQUEST_FURTHER_DECRYPTION ]*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</section>*/}
        </div>
      </div>
    </section>
  );
};

export default Credentials;
