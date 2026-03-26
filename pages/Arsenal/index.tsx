import React, { useMemo, useState } from 'react';
import { stackColumns, specCards } from '@/constants/arsenal';
import StackColumn from './StackColumn';
import SpecCard from './SpecCard';
import CliFilter from './CliFilter';
import PageHeader from '@/components/layout/PageHeader';

const Arsenal: React.FC = () => {
  const [query, setQuery] = useState('');

  const filteredColumns = useMemo(() => {
    const transformedQuery = query.trim().toLowerCase();
    if (!transformedQuery) return stackColumns;
    return stackColumns.filter(
      col =>
        col.title.toLowerCase().includes(transformedQuery) ||
        col.items.some(item => item.name.toLowerCase().includes(transformedQuery)),
    );
  }, [query]);

  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-8 px-6 py-16 relative">
      <PageHeader
        eyebrow="Tactical Capability Overview"
        titleMain="Tech Stack"
        titleAccent="Arsenal Matrix"
        description="Structural schematic of offensive and defensive engineering assets. High-density deployment capabilities across distributed infrastructure and enterprise-grade environments."
      />

      {/* Specializations Footer */}
      <section className="mt-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-primary/20 pb-4 gap-4">
          <h2 className="text-2xl font-black uppercase tracking-widest text-white">System_Specializations</h2>
          <a className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity" href="#">
            Download_Full_Schematics <span className="material-symbols-outlined text-sm">arrow_outward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
          {specCards.map(card => (
            <SpecCard key={card.title} title={card.title} subtitle={card.subtitle} img={card.img} link={card.link} />
          ))}
        </div>
      </section>

      {/* CLI Filter */}
      <CliFilter value={query} onChange={setQuery} />

      {/* Matrix Grid */}
      {filteredColumns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColumns.map(col => (
            <StackColumn key={col.id} type={col.type} title={col.title} id={col.id} desc={col.desc} items={col.items} forceShowAll={!!query.trim()} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-primary/20 p-16 text-center">
          <div className="text-primary/30 text-xs font-bold tracking-[0.4em] uppercase mb-2">NO_ASSETS_FOUND</div>
          <p className="text-slate-400 text-xs font-mono uppercase">
            SEARCH: <span className="text-primary/40">{query}</span> — returned 0 results
          </p>
        </div>
      )}
    </section>
  );
};

export default Arsenal;
