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
  link?: string;
  children: ReactNode;
}

const COLOR_CLASS_MAP: Record<LabCardProps['color'], string> = {
  primary: '[--hud-border-color:rgba(0,243,255,0.2)] [--hud-accent-color:#00f3ff] text-primary hover:[--hud-border-color:rgba(0,243,255,0.5)] hover:bg-primary/5 hover:text-primary hover:shadow-[0_0_24px_rgba(0,243,255,0.12)]',
  hazard: '[--hud-border-color:rgba(250,204,21,0.2)] [--hud-accent-color:#facc15] text-hazard hover:[--hud-border-color:rgba(250,204,21,0.5)] hover:bg-hazard/5 hover:text-hazard hover:shadow-[0_0_24px_rgba(250,204,21,0.12)]',
  alert: '[--hud-border-color:rgba(255,0,60,0.2)] [--hud-accent-color:#ff003c] text-alert hover:[--hud-border-color:rgba(255,0,60,0.5)] hover:bg-alert/5 hover:text-alert hover:shadow-[0_0_24px_rgba(255,0,60,0.12)]',
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

const DESCRIPTION_HOVER_CLASS_MAP: Record<LabCardProps['color'], string> = {
  primary: 'group-hover:text-primary/80',
  hazard: 'group-hover:text-hazard/80',
  alert: 'group-hover:text-alert/80',
};

const LabCard = ({ id, codename, title, desc, status, statusColor, color, stats, action, icon, link, children }: LabCardProps) => {
  const actionClasses = ACTION_CLASS_MAP[color];
  const descriptionHoverClass = DESCRIPTION_HOVER_CLASS_MAP[color];

  return (
    <article className={`hud-border bg-panel-dark/80 backdrop-blur-sm p-6 group transition-all duration-300 ${COLOR_CLASS_MAP[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold opacity-60">
          {id}{' // '}{codename}
        </span>
        <span className={`px-2 py-0.5 text-[9px] font-bold tracking-tighter uppercase ${statusColor}`}>{status}</span>
      </div>
      <h3 className={`text-xl font-display font-bold text-white mb-2 transition-colors ${TITLE_HOVER_CLASS_MAP[color]}`}>{title}</h3>
      <p className={`text-sm text-slate-400 mb-6 h-22 overflow-hidden transition-colors ${descriptionHoverClass}`}>{desc}</p>

      <div className="space-y-4">
        {children}
        <div className={`flex justify-between items-center text-[10px] ${actionClasses.text}`}>
          <span>{stats}</span>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 uppercase ${actionClasses.hover}`}
            >
              <span className="material-symbols-outlined text-xs">{icon}</span> {action}
            </a>
          ) : (
            <span className={`flex items-center gap-1 cursor-pointer uppercase ${actionClasses.hover}`}>
              <span className="material-symbols-outlined text-xs">{icon}</span> {action}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default memo(LabCard);
