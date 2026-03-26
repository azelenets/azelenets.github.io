import { memo } from 'react';

interface CliFilterProps {
  value: string;
  onChange: (value: string) => void;
  isPending?: boolean;
}

const CliFilter = ({ value, onChange, isPending = false }: CliFilterProps) => (
  <div role="search" className="mb-12">
    <div className="bg-surface-terminal border border-primary/20 p-4 font-mono shadow-2xl relative">
      <div className="flex items-center gap-3">
        <span className="text-primary shrink-0 hidden sm:inline">visitor@andrii.zelenets:~$</span>
        <span className="text-primary shrink-0 sm:hidden">$</span>
        <input
          className="flex-1 min-w-0 bg-transparent border-none focus:ring-0 text-primary placeholder:text-primary/30 text-lg p-0 uppercase focus:outline-none"
          placeholder="SEARCH SKILL..."
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {isPending ? (
          <span className="text-[9px] font-bold tracking-[0.25em] text-primary/60 uppercase shrink-0">SCANNING</span>
        ) : (
          <div className="w-2 h-5 bg-primary animate-pulse shrink-0" />
        )}
      </div>
    </div>
  </div>
);

export default memo(CliFilter);
