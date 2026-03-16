import { memo } from 'react';
import { Link } from 'react-router-dom';

interface SpecCardProps {
  title: string;
  subtitle: string;
  img: string;
  link?: string;
}

const SpecCard = ({ title, subtitle, img, link }: SpecCardProps) => {
  const figure = (
    <figure className="group relative overflow-hidden bg-surface-terminal border border-primary/10 aspect-video grayscale hover:grayscale-0 transition-all cursor-pointer">
      <div className="absolute inset-0 bg-primary/20 z-10 opacity-40 group-hover:opacity-10 transition-opacity" />
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${img}')` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-transparent to-transparent z-20" />
      <figcaption className="absolute bottom-4 left-4 z-30">
        <h4 className="text-white font-bold uppercase text-sm tracking-tighter">{title}</h4>
        <p className="text-[9px] text-primary/70 font-mono">{subtitle}</p>
      </figcaption>
      {link && (
        <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary text-sm">arrow_outward</span>
        </div>
      )}
    </figure>
  );

  return link ? <Link to={link}>{figure}</Link> : figure;
};

export default memo(SpecCard);
