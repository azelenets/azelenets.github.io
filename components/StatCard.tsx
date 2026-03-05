import { memo } from 'react';

interface StatCardProps {
  id: string;
  label: string;
  value: string;
  progress: number;
  segmented?: boolean;
}

const StatCard = ({ id, label, value, progress, segmented }: StatCardProps) => (
  <article className="bg-surface-terminal border border-primary/10 p-6 relative group overflow-hidden hover:border-primary/40 transition-colors">
    <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">{id}</div>
    <p className="text-primary/60 text-[10px] uppercase mb-1">{label}</p>
    <p className="text-3xl font-bold text-white tracking-tighter">{value}</p>
    <div className="h-1 w-full bg-primary/10 mt-4 overflow-hidden flex gap-1">
      {segmented ? (
        <>
          <div className="h-full bg-primary flex-1" />
          <div className="h-full bg-primary flex-1" />
          <div className="h-full bg-primary/20 flex-1" />
        </>
      ) : (
        <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
      )}
    </div>
  </article>
);

export default memo(StatCard);
