import React from 'react';
import { protocolCards } from '@/constants/protocols';
import ProtocolCard from './ProtocolCard';
import ProtocolsCta from './ProtocolsCta';
import PageHeader from '@/components/layout/PageHeader.tsx';

const Protocols: React.FC = () => {
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
      <ProtocolsCta />
    </section>
  );
};

export default Protocols;
