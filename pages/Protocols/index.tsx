import React from 'react';
import { useNavigate } from 'react-router-dom';
import { protocolCards } from '@/constants/protocols';
import StatCard from '@/components/StatCard';
import ProtocolCard from './ProtocolCard';
import PageHeader from '@/components/layout/PageHeader.tsx';

const Protocols: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="How I Work & What You Get"
        titleMain="Strategic"
        titleAccent="Protocols"
        description="13+ years of full-stack engineering across e-commerce, logistics, education, and SaaS. Here's the approach that's kept clients coming back."
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
          <div className="text-[10px] text-hazard font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">// OPEN_TO_COLLABORATION //</div>
          <h2 className="text-white text-3xl md:text-5xl font-black text-center uppercase tracking-tighter max-w-3xl">
            Ready to Build Something <span className="text-primary">That Actually Works?</span>
          </h2>
          <p className="text-primary/60 text-sm md:text-base text-center max-w-xl uppercase tracking-tighter">
            Skip the exploratory calls. Tell me what you're building — I'll tell you exactly how I can help ship it.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <button onClick={() => navigate('/credentials')} className="bg-hazard border-hazard text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary transition-all">
              VIEW_CREDENTIALS
            </button>
            <button onClick={() => navigate('/arsenal')} className="border border-primary/40 text-primary px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-primary/10 hover:text-primary hover:border-primary transition-all">
              EXPLORE_ARSENAL
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Protocols;
