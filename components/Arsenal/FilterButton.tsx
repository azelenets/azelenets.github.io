import { memo } from 'react';

interface FilterButtonProps {
  active?: boolean;
  label: string;
  onClick?: () => void;
}

const FilterButton = ({ active, label, onClick }: FilterButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`shrink-0 px-4 py-1 text-[10px] font-bold uppercase transition-all ${active ? 'bg-primary text-black' : 'border border-primary/30 text-primary/70 hover:bg-primary/10'}`}
  >
    {label}
  </button>
);

export default memo(FilterButton);
