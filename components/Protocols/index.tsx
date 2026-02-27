import React from 'react';
import { View } from '@/types';
import { protocolCards } from '@/constants/protocols';
import StatCard from './StatCard';
import ProtocolCard from './ProtocolCard';
import PageHeader from '@/components/layout/PageHeader.tsx';

interface ProtocolsProps {
  setView: (view: View) => void;
}

const Protocols: React.FC<ProtocolsProps> = ({ setView }) => {
  return (
    <div className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="Operational Doctrine"
        titleMain="Strategic"
        titleAccent="Protocols"
        description="Executing mission-critical directives to ensure absolute engineering dominance and structural integrity across all deployment theaters."
      />

      {/* Main Content */}
      <section className="flex flex-col gap-12 relative">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/20 border border-primary/20">
          {protocolCards.map(card => (
            <ProtocolCard
              key={card.id}
              id={card.id}
              icon={card.icon}
              title={card.title}
              status={card.status}
              dots={card.dots}
            >
              {card.description}
            </ProtocolCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative font-mono overflow-hidden py-10">
        <div className="hud-border bg-surface-terminal/80 p-12 md:p-20 flex flex-col items-center gap-8 relative z-10 slanted-clip mx-auto max-w-[1500px]">
          <div className="text-[10px] text-alert font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">// SYSTEM_READY //</div>
          <h2 className="text-white text-3xl md:text-5xl font-black text-center uppercase tracking-tighter max-w-3xl">
            Initiate Next <span className="text-primary">Operational Phase?</span>
          </h2>
          <p className="text-primary/60 text-sm md:text-base text-center max-w-xl uppercase tracking-tighter">
            Requesting connection to deploy advanced architectural frameworks for your high-value technical assets.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <button onClick={() => setView(View.CREDENTIALS)} className="bg-primary text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-white transition-all">
              ESTABLISH_UPLINK
            </button>
            <button onClick={() => setView(View.ARSENAL)} className="border border-primary/40 text-primary px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary/10 transition-all">
              DECRYPT_STACK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Protocols;
