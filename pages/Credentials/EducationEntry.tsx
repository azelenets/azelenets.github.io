import { memo } from 'react';
import type { EducationData } from '@/constants/credentials';

const EducationEntry = ({ level, title, institution, years, withHonor, fields }: EducationData) => (
  <article className="relative pl-6 border-l border-primary/30">
    <div className="absolute -left-[5px] top-0 size-2 bg-primary" />
    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
      <div className="flex flex-col gap-2">
        <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">
          Authorization_Level: {level}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {withHonor && (
            <span className="inline-flex items-center gap-1 border border-yellow-400/60 bg-yellow-400/10 text-yellow-400 text-[8px] font-black uppercase tracking-widest px-2 py-0.5">
              <span className="material-symbols-outlined text-[10px]">military_tech</span>
              Diploma with Honor
            </span>
          )}
        </div>
        <div className="text-sm text-slate-400">{institution}</div>
      </div>
      <span className="text-xs font-bold text-white/40">{years}</span>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {fields.map(({ label, value }) => (
        <div key={label} className="bg-black/40 border border-white/5 p-3">
          <div className="text-[9px] text-primary uppercase mb-1">{label}</div>
          <div className="text-xs text-white/40">{value}</div>
        </div>
      ))}
    </div>
  </article>
);

export default memo(EducationEntry);
