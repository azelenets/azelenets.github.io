import { memo, useState } from 'react';
import type { TechItemData } from '@/constants/arsenal';
import TechItem from './TechItem';

const VISIBLE_COUNT = 3;

interface StackColumnProps {
  type: string;
  title: string;
  id: string;
  desc: string;
  items: TechItemData[];
  forceShowAll?: boolean;
}

const StackColumn = ({ type, title, id, desc, items, forceShowAll = false }: StackColumnProps) => {
  const [showAll, setShowAll] = useState(false);
  const expanded = forceShowAll || showAll;
  const visible = expanded ? items : items.slice(0, VISIBLE_COUNT);
  const hidden = items.length - VISIBLE_COUNT;

  return (
    <article className="hud-border bg-surface-terminal p-6 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="text-[10px] text-primary font-bold mb-1 block uppercase">Module_Type: {type}</span>
          <h3 className="text-xl font-black text-white uppercase tracking-tight">{title}</h3>
        </div>
        <span className="text-[10px] font-mono text-slate-600">ID: {id}</span>
      </div>
      <p className="text-[10px] text-primary/40 font-mono italic uppercase tracking-wider leading-relaxed mb-6">{desc}</p>
      <ul className="space-y-3 flex-1 list-none">
        {visible.map(item => (
          <TechItem
            key={item.name}
            name={item.name}
            version={item.version}
            status={item.status}
            isCritical={item.isCritical}
            isMaster={item.isMaster}
          />
        ))}
      </ul>
      {items.length > VISIBLE_COUNT && !forceShowAll && (
        <button
          onClick={() => setShowAll(prev => !prev)}
          className="mt-4 text-[10px] font-mono font-bold uppercase tracking-widest text-hazard/50 hover:text-hazard transition-colors text-center"
        >
          {showAll ? '[ COLLAPSE ]' : `[ +${hidden} MORE ]`}
        </button>
      )}
    </article>
  );
};

export default memo(StackColumn);
