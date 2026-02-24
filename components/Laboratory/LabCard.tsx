import React from 'react';

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
  children: React.ReactNode;
}

const LabCard: React.FC<LabCardProps> = ({ id, codename, title, desc, status, statusColor, color, stats, action, icon, children }) => {
  const colorClasses = {
    primary: 'text-primary group-hover:bg-primary/5 group-hover:text-primary',
    hazard: 'text-hazard group-hover:bg-hazard/5 group-hover:text-hazard',
    alert: 'text-alert group-hover:bg-alert/5 group-hover:text-alert'
  };

  const textColors = {
    primary: 'text-primary/60 hover:text-primary',
    hazard: 'text-hazard/60 hover:text-hazard',
    alert: 'text-alert/60 hover:text-alert'
  };

  return (
    <div className={`hud-border bg-panel-dark/80 backdrop-blur-sm p-6 group transition-all ${colorClasses[color]}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold opacity-60">{id} // {codename}</span>
        <span className={`px-2 py-0.5 text-[9px] font-bold tracking-tighter uppercase ${statusColor}`}>{status}</span>
      </div>
      <h3 className={`text-xl font-display font-bold text-white mb-2 transition-colors ${color === 'primary' ? 'group-hover:text-primary' : color === 'hazard' ? 'group-hover:text-hazard' : 'group-hover:text-alert'}`}>{title}</h3>
      <p className="text-sm text-slate-400 mb-6 h-12 overflow-hidden">{desc}</p>

      <div className="space-y-4">
        {children}
        <div className={`flex justify-between items-center text-[10px] ${textColors[color].split(' ')[0]}`}>
          <span>{stats}</span>
          <span className={`flex items-center gap-1 cursor-pointer uppercase ${textColors[color].split(' ')[1]}`}>
            <span className="material-symbols-outlined text-xs">{icon}</span> {action}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LabCard;
