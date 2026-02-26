import { memo } from 'react';

interface CertCardProps {
  id: string;
  hash: string;
  title: string;
  full?: boolean;
}

const CertCard = ({ id, hash, title, full }: CertCardProps) => (
  <div className={`p-4 border border-white/10 bg-panel-dark hover:border-primary/50 transition-colors group relative overflow-hidden ${full ? 'col-span-full' : ''}`}>
    <div className="absolute right-0 top-0 text-[40px] opacity-5 text-white pointer-events-none group-hover:opacity-10 transition-opacity">{id}</div>
    <div className="text-primary text-[8px] font-bold tracking-widest mb-1">KEY_HASH: {hash}</div>
    <div className="text-sm font-bold text-white uppercase">{title}</div>
    <div className="flex items-center gap-2 mt-3">
      <div className="h-1 flex-grow bg-white/5">
        <div className="h-full bg-primary w-full shadow-[0_0_8px_#00f3ff]"></div>
      </div>
      <span className="text-[8px] text-primary">VAL_OK</span>
    </div>
  </div>
);

export default memo(CertCard);
