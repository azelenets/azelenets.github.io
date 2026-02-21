import React from 'react';

interface StackColumnProps {
  type: string;
  title: string;
  id: string;
  desc: string;
  children: React.ReactNode;
}

const StackColumn: React.FC<StackColumnProps> = ({ type, title, id, desc, children }) => (
  <div className="hud-border bg-surface-terminal p-6 flex flex-col">
    <div className="flex justify-between items-start mb-6">
      <div>
        <span className="text-[10px] text-primary font-bold mb-1 block uppercase">Module_Type: {type}</span>
        <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
      </div>
      <span className="text-[10px] font-mono text-slate-600">ID: {id}</span>
    </div>
    <div className="space-y-3 flex-1">
      {children}
    </div>
    <div className="mt-8 pt-4 border-t border-primary/10">
      <p className="text-[10px] text-primary/40 font-mono italic uppercase tracking-wider leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default StackColumn;
