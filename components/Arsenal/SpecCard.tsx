import React from 'react';

interface SpecCardProps {
  title: string;
  subtitle: string;
  img: string;
}

const SpecCard: React.FC<SpecCardProps> = ({ title, subtitle, img }) => (
  <div className="group relative overflow-hidden bg-surface-terminal border border-primary/10 aspect-video grayscale hover:grayscale-0 transition-all cursor-pointer">
    <div className="absolute inset-0 bg-primary/20 z-10 opacity-40 group-hover:opacity-10 transition-opacity"></div>
    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${img}')` }}></div>
    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-20"></div>
    <div className="absolute bottom-4 left-4 z-30">
      <h4 className="text-white font-bold uppercase text-sm tracking-tighter">{title}</h4>
      <p className="text-[9px] text-primary/70 font-mono">{subtitle}</p>
    </div>
  </div>
);

export default SpecCard;
