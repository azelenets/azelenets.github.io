import React from 'react';

interface TechItemProps {
  name: string;
  version: string;
  status: string;
  isCritical?: boolean;
  isMaster?: boolean;
}

const TechItem: React.FC<TechItemProps> = ({ name, version, status, isCritical, isMaster }) => {
  let borderColor = 'border-primary/10 hover:border-primary';
  let nameColor = 'text-primary';
  let badge = null;

  if (isCritical) {
    borderColor = 'border-alert/20 hover:border-alert';
    nameColor = 'text-alert';
    badge = <span className="text-[9px] text-alert font-bold px-1 bg-alert/10 border border-alert shadow-[0_0_10px_rgba(255,62,62,0.3)]">CRITICAL_ASSET</span>;
  } else if (isMaster) {
    borderColor = 'border-alert/20 hover:border-alert';
    nameColor = 'text-alert';
    badge = <span className="text-[9px] text-alert font-bold px-1 bg-alert/10 border border-alert shadow-[0_0_10px_rgba(255,62,62,0.3)]">MASTER_UNIT</span>;
  } else {
    badge = <span className="text-[9px] text-primary/50 font-bold uppercase px-1 border border-primary/30">ACTIVE</span>;
  }

  return (
    <div className={`border p-3 bg-bg-dark group transition-colors relative ${borderColor}`}>
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-bold uppercase group-hover:text-white ${nameColor}`}>{name}</span>
        {badge}
      </div>
      <div className="flex justify-between text-[10px] text-slate-500 font-mono">
        <span>{version}</span>
        <span>{status}</span>
      </div>
    </div>
  );
};

export default TechItem;
