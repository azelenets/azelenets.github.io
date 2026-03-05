import React, { useMemo, useState } from 'react';
import { stackColumns, specCards, filterLabels } from '@/constants/arsenal';
import FilterButton from './FilterButton';
import TechItem from './TechItem';
import StackColumn from './StackColumn';
import SpecCard from './SpecCard';
import PageHeader from '@/components/layout/PageHeader';

const FILTER_MAP: Record<string, string[]> = {
  ALL_ASSETS:          [],
  LANGUAGES_SRC:       ['LANG-99'],
  BACKEND_FRAMEWORKS:  ['BKN-33'],
  UI_FRAMEWORKS:       ['UI-44'],
  DB_CLUSTERS:         ['DB-77'],
  ORM_LAYER:           ['ORM-09'],
  BACKGROUND_OPS:      ['BG-76'],
  MESSAGE_BROKERS:     ['MSG-08'],
  AUTH_PROTOCOLS:      ['AUTH-11'],
  PAYMENTS_STACK:      ['PAY-00'],
  INFRA_ORCHESTRATION: ['CLOUD-88'],
  CI_CD:               ['CICD-87'],
  TEST_OPS:            ['TEST-55'],
  CODE_QUALITY:        ['QA-07'],
  OBSERVABILITY:       ['OBS-10'],
  DOCUMENTATION:       ['DOCS-22'],
  AI_TOOLS:            ['AI-66'],
};

const Arsenal: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL_ASSETS');
  const [query, setQuery] = useState('');

  const filteredColumns = useMemo(() => {
    let cols = stackColumns;

    if (activeFilter !== 'ALL_ASSETS') {
      const ids = FILTER_MAP[activeFilter];
      cols = ids.length > 0 ? cols.filter(col => ids.includes(col.id)) : [];
    }

    const transformedQuery = query.trim().toLowerCase();
    if (transformedQuery) {
      cols = cols.filter(
        col =>
          col.title.toLowerCase().includes(transformedQuery) ||
          col.items.some(item => item.name.toLowerCase().includes(transformedQuery)),
      );
    }

    return cols;
  }, [activeFilter, query]);

  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="Tactical Capability Overview"
        titleMain="Tech Stack"
        titleAccent="Arsenal Matrix"
        description="Structural schematic of offensive and defensive engineering assets. High-density deployment capabilities across distributed infrastructure and enterprise-grade environments."
      />

      {/* CLI Filter */}
      <search className="mb-12">
        <div className="bg-surface-terminal border border-primary/20 p-4 font-mono shadow-2xl relative">
          <div className="flex items-center gap-3">
            <span className="text-primary shrink-0">operator@aegis:~$</span>
            <input
              className="flex-1 bg-transparent border-none focus:ring-0 text-primary placeholder:text-primary/30 text-lg p-0 uppercase focus:outline-none"
              placeholder="QUERY_ARSENAL --FILTER=*"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <div className="w-2 h-5 bg-primary animate-pulse"></div>
          </div>
        </div>
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
          {filterLabels.map(label => (
            <FilterButton
              key={label}
              label={label}
              active={activeFilter === label}
              onClick={() => setActiveFilter(label)}
            />
          ))}
        </div>
      </search>

      {/* Matrix Grid */}
      {filteredColumns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColumns.map(col => (
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
      ) : (
        <div className="border border-dashed border-primary/20 p-16 text-center">
          <div className="text-primary/30 text-xs font-bold tracking-[0.4em] uppercase mb-2">NO_ASSETS_FOUND</div>
          <p className="text-slate-600 text-xs font-mono uppercase">
            QUERY: <span className="text-primary/40">{query || activeFilter}</span> — returned 0 results
          </p>
        </div>
      )}

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
            <SpecCard key={card.title} title={card.title} subtitle={card.subtitle} img={card.img} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Arsenal;
