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
                <div className="absolute w-full h-0.5 bg-primary/20" style={{ animation: 'scan-line 3s linear infinite alternate' }} />
                <div className="absolute inset-0 border-[20px] border-black/60" />
                <div className="absolute top-2 left-2 text-[8px] text-primary">RETINA_SCAN: ACTIVE</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-alert/60 animate-pulse">MATCH_FOUND_99%</div>
              </div>
            </div>
          </figure>

          <a
            href="https://www.linkedin.com/in/andriizelenets/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full border border-white/10 bg-white/5 hover:border-primary/50 transition-colors group p-4"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 text-white/40 group-hover:text-primary transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover:text-primary transition-colors">LinkedIn_Profile</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-sm group-hover:text-primary/60 transition-colors">open_in_new</span>
          </a>

          <a
            href="https://github.com/azelenets"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full border border-white/10 bg-white/5 hover:border-primary/50 transition-colors group p-4"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-3.5 h-3.5 text-white/40 group-hover:text-primary transition-colors shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="text-[10px] font-black text-white/60 uppercase tracking-widest group-hover:text-primary transition-colors">GitHub_Profile</span>
            </div>
            <span className="material-symbols-outlined text-white/20 text-sm group-hover:text-primary/60 transition-colors">open_in_new</span>
          </a>

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
