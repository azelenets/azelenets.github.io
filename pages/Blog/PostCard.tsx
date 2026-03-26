import { memo } from 'react';
import { Link } from 'react-router-dom';
import { type BlogPost } from '@/constants/blog';
import Tag from '@/components/Tag';
import { preloadRouteModule } from '@/lib/routeModules';

const CATEGORY_COLORS: Record<string, string> = {
  DISTRIBUTED_SYSTEMS: 'text-primary border-primary/30 bg-primary/5',
  CLOUD_NATIVE:        'text-blue-400 border-blue-400/30 bg-blue-400/5',
  FRONTEND:            'text-purple-400 border-purple-400/30 bg-purple-400/5',
  DATA_ENGINEERING:    'text-orange-400 border-orange-400/30 bg-orange-400/5',
  ENGINEERING_CULTURE: 'text-green-400 border-green-400/30 bg-green-400/5',
};

interface PostCardProps extends BlogPost {
  index: number;
}

const PostCard = ({ id, title, excerpt, category, date, readTime, tags, slug, link, index }: PostCardProps) => {
  const categoryColor = CATEGORY_COLORS[category] ?? 'text-primary/60 border-primary/20 bg-primary/5';
  const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

  const inner = (
    <article className="group bg-surface-terminal border border-primary/10 hover:border-primary/30 transition-all duration-300 flex flex-col h-full hover:shadow-[0_0_24px_rgba(0,243,255,0.06)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-primary/10">
        <span className="text-slate-400 text-[9px] font-bold font-mono tracking-widest">{id}</span>
        <Tag label={category.replace(/_/g, '\u00a0')} colorClass={categoryColor} />
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Index accent */}
        <span className="text-primary/20 font-black font-display text-4xl leading-none select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <h2 className="text-white font-bold text-base leading-snug tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h2>

        <p className="text-slate-500 text-xs font-mono leading-relaxed flex-1">{excerpt}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {tags.map(tag => (
            <span key={tag} className="text-[9px] font-bold text-slate-400 border border-slate-700/50 px-1.5 py-0.5 font-mono tracking-wider">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-primary/10">
        <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]">calendar_today</span>
            {formattedDate}
          </span>
          <span className="text-slate-700">·</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[11px]">schedule</span>
            {readTime} MIN READ
          </span>
        </div>
        <span className="text-[9px] font-bold text-primary/40 group-hover:text-primary transition-colors flex items-center gap-1 uppercase">
          {slug || link ? 'Read Article' : 'Coming Soon'}
          <span className="material-symbols-outlined text-[11px]">{slug || link ? 'arrow_outward' : 'lock'}</span>
        </span>
      </div>
    </article>
  );

  if (slug) {
    const path = `/blog/${slug}`;

    return (
      <Link
        to={path}
        className="flex flex-col"
        onMouseEnter={() => preloadRouteModule(path)}
        onFocus={() => preloadRouteModule(path)}
      >
        {inner}
      </Link>
    );
  }

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="flex flex-col">
        {inner}
      </a>
    );
  }

  return <div className="flex flex-col cursor-default">{inner}</div>;
};

export default memo(PostCard);
