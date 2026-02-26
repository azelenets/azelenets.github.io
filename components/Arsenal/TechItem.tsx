import { memo } from 'react';

interface TechItemProps {
  name: string;
  version: string;
  status: string;
  isCritical?: boolean;
  isMaster?: boolean;
}

const ALERT_BADGE_CLASSES = 'text-[9px] text-alert font-bold px-1 bg-alert/10 border border-alert shadow-[0_0_10px_rgba(255,62,62,0.3)]';

const TechItem = ({ name, version, status, isCritical, isMaster }: TechItemProps) => {
  const isAlert = isCritical || isMaster;
  const borderColor = isAlert ? 'border-alert/20 hover:border-alert' : 'border-primary/10 hover:border-primary';
  const nameColor = isAlert ? 'text-alert' : 'text-primary';

  const badge = isCritical ? (
    <span className={ALERT_BADGE_CLASSES}>CRITICAL_ASSET</span>
  ) : isMaster ? (
    <span className={ALERT_BADGE_CLASSES}>MASTER_UNIT</span>
  ) : (
    <span className="text-[9px] text-primary/50 font-bold uppercase px-1 border border-primary/30">ACTIVE</span>
  );

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

export default memo(TechItem);
