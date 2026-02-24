import React from 'react';
import { View } from '@/types';
import { protocolCards } from '@/constants/protocols';
import StatCard from './StatCard';
import ProtocolCard from './ProtocolCard';

interface ProtocolsProps {
  setView: (view: View) => void;
}

const Protocols: React.FC<ProtocolsProps> = ({ setView }) => {
  return (
    <div className="flex flex-col items-center py-12 px-6 relative z-10 w-full">
      <div className="max-w-[1500px] mx-auto w-full px-6 space-y-12">

        {/* Top Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-1 font-mono">
          <StatCard id="STAT_01" label="Combat Experience" value="13+ YEARS" progress={75} color="primary" />
          <StatCard id="STAT_02" label="Authorization Level" value="MASTER'S [CS]" progress={100} color="primary" segmented />
          <div className="bg-surface-terminal border border-primary/10 p-6 relative">
            <div className="absolute top-0 right-0 p-1 text-[10px] text-primary/30">STAT_03</div>
            <p className="text-primary/60 text-[10px] uppercase mb-1">Strategic Reach</p>
            <p className="text-3xl font-bold text-white tracking-tighter">50M+ OPS</p>
            <p className="text-[10px] text-alert mt-4 uppercase animate-pulse">CRITICAL INFRASTRUCTURE REACHED</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="flex flex-col gap-12 relative">
          <div className="flex flex-col gap-2 border-l-4 border-alert pl-6 py-2">
            <div className="flex items-center gap-3">
              <span className="text-alert font-mono text-sm font-bold tracking-[0.2em] uppercase">Operational Doctrine</span>
              <div className="h-[1px] flex-1 bg-alert/20"></div>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black text-white leading-none tracking-tighter uppercase">
              Strategic Protocols
            </h1>
            <p className="text-primary/60 font-mono text-sm max-w-xl uppercase tracking-tighter">
              Executing mission-critical directives to ensure absolute engineering dominance and structural integrity across all deployment theaters.
            </p>
          </div>

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
    </div>
  );
};

export default Protocols;
