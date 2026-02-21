import React from 'react';

interface StatBlockProps {
  label: string;
  value: string;
  barColor: string;
  width: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ label, value, barColor, width }) => (
  <div className="space-y-1">
    <div className="text-[10px] text-primary/60 font-bold tracking-widest uppercase">{label}</div>
    <div className="text-3xl font-display font-black text-white">{value}</div>
    <div className="h-1 bg-white/5 w-full mt-2">
      <div className={`h-full ${barColor}`} style={{ width }}></div>
    </div>
  </div>
);

export default StatBlock;
