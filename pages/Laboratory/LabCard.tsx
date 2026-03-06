import { memo, type ReactNode } from 'react';

interface LabCardProps {
  id: string;
  codename: string;
  title: string;
  desc: string;
  status: string;
  statusColor: string;
  color: 'primary' | 'hazard' | 'alert';
  stats: string;
  action: string;
  icon: string;
  children: ReactNode;
}

const COLOR_CLASS_MAP: Record<LabCardProps['color'], string> = {
  primary: 'text-primary group-hover:bg-primary/5 group-hover:text-primary',
  hazard: 'text-hazard group-hover:bg-hazard/5 group-hover:text-hazard',
  alert: 'text-alert group-hover:bg-alert/5 group-hover:text-alert',
};

const ACTION_CLASS_MAP: Record<LabCardProps['color'], { text: string; hover: string }> = {
  primary: { text: 'text-primary/60', hover: 'hover:text-primary' },
  hazard: { text: 'text-hazard/60', hover: 'hover:text-hazard' },
  alert: { text: 'text-alert/60', hover: 'hover:text-alert' },
};

const TITLE_HOVER_CLASS_MAP: Record<LabCardProps['color'], string> = {
  primary: 'group-hover:text-primary',
  hazard: 'group-hover:text-hazard',
  alert: 'group-hover:text-alert',
};

const LabCard = ({ id, codename, title, desc, status, statusColor, color, stats, action, icon, children }: LabCardProps) => {
  const actionClasses = ACTION_CLASS_MAP[color];

  return (
    <article className={`hud-border bg-panel-dark/80 backdrop-blur-sm p-6 group transition-all ${COLOR_CLASS_MAP[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold opacity-60">
          {id}{' // '}{codename}
        </span>
        <span className={`px-2 py-0.5 text-[9px] font-bold tracking-tighter uppercase ${statusColor}`}>{status}</span>
      </div>
      <h3 className={`text-xl font-display font-bold text-white mb-2 transition-colors ${TITLE_HOVER_CLASS_MAP[color]}`}>{title}</h3>
      <p className="text-sm text-slate-400 mb-6 h-24 overflow-hidden">{desc}</p>

      <div className="space-y-4">
        {children}
        <div className={`flex justify-between items-center text-[10px] ${actionClasses.text}`}>
          <span>{stats}</span>
          <span className={`flex items-center gap-1 cursor-pointer uppercase ${actionClasses.hover}`}>
            <span className="material-symbols-outlined text-xs">{icon}</span> {action}
          </span>
        </div>
      </div>
    </article>
  );
};

export default memo(LabCard);
