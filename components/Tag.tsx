import { memo } from 'react';

interface TagProps {
  label: string;
  colorClass?: string;
}

const Tag = ({ label, colorClass = 'text-primary/60 border-primary/20 bg-primary/5' }: TagProps) => (
  <span className={`text-[9px] font-bold font-mono px-2 py-0.5 pt-1 border tracking-widest shrink-0 ${colorClass}`}>
    {label}
  </span>
);

export default memo(Tag);
