import { memo } from 'react';

interface CliFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const CliFilter = ({ value, onChange }: CliFilterProps) => (
  <search className="mb-12">
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
        <div className="w-2 h-5 bg-primary animate-pulse shrink-0" />
      </div>
    </div>
  </search>
);

export default memo(CliFilter);
