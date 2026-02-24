import React from 'react';
import { stackColumns, specCards, filterLabels } from '@/constants/arsenal';
import FilterButton from './FilterButton';
import TechItem from './TechItem';
import StackColumn from './StackColumn';
import SpecCard from './SpecCard';

const Arsenal: React.FC = () => {
  return (
    <div className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">

      {/* Header */}
      <div className="mb-16 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-l-4 border-primary pl-8">
          <div className="max-w-[1500px]">
            <p className="text-primary text-xs font-bold mb-2 tracking-[0.4em] uppercase">Tactical Capability Overview</p>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
              Tech Stack <span className="text-primary">Arsenal</span> Matrix
            </h1>
            <p className="text-slate-500 text-sm font-medium leading-relaxed uppercase">
              Structural schematic of offensive and defensive engineering assets. High-density deployment capabilities across distributed infrastructure and enterprise-grade environments.
            </p>
          </div>
        </div>
      </div>

      {/* CLI Filter */}
      <div className="mb-12">
        <div className="bg-surface-terminal border border-primary/20 p-4 font-mono shadow-2xl relative">
          <div className="flex items-center gap-3">
            <span className="text-primary shrink-0">operator@aegis:~$</span>
            <input className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder:text-primary/30 text-lg p-0 uppercase focus:outline-none" placeholder="QUERY_ARSENAL --FILTER=*" type="text" />
            <div className="w-2 h-5 bg-primary animate-pulse"></div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {filterLabels.map((label, i) => (
            <FilterButton key={label} label={label} active={i === 0} />
          ))}
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stackColumns.map(col => (
          <StackColumn key={col.id} type={col.type} title={col.title} id={col.id} desc={col.desc}>
            {col.items.map(item => (
              <TechItem
                key={item.name}
                name={item.name}
                version={item.version}
                status={item.status}
                isCritical={item.isCritical}
                isMaster={item.isMaster}
              />
            ))}
          </StackColumn>
        ))}
      </div>

      {/* Specializations Footer */}
      <div className="mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-primary/20 pb-4 gap-4">
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">System_Specializations</h2>
          <a className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity" href="#">
            Download_Full_Schematics <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {specCards.map(card => (
            <SpecCard key={card.title} title={card.title} subtitle={card.subtitle} img={card.img} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Arsenal;
