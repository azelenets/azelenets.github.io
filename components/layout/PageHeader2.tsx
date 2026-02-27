import React from 'react';
import {labCards} from '@/constants/lab.ts';
import LabCard from '@/components/Laboratory/LabCard.tsx';

interface PageHeader2Props {
  eyebrow?: string;
  titleMain: string;
  titleAccent?: string;
  description?: string;
}

const PageHeader2: React.FC<PageHeader2Props> = ({ eyebrow, titleMain, titleAccent, description }) => {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="hazard-stripe h-4 w-12"></span>
          {eyebrow && (
            <p className="text-hazard font-bold text-xs tracking-[0.3em] uppercase">{eyebrow}</p>
          )}
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
          {titleMain}
          {titleAccent && (
            <>
              {' '}<span className="text-primary font-light">//</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">{titleAccent}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase pt-2">{description}</p>
        )}
      </div>
    </header>
  );
};

export default PageHeader2;
