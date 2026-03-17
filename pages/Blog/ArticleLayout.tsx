import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ArticleLayoutProps {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: number;
  tags: string[];
  children: ReactNode;
}

const CATEGORY_COLORS: Record<string, string> = {
  DISTRIBUTED_SYSTEMS: 'text-primary border-primary/30 bg-primary/5',
  CLOUD_NATIVE:        'text-blue-400 border-blue-400/30 bg-blue-400/5',
  FRONTEND:            'text-purple-400 border-purple-400/30 bg-purple-400/5',
  DATA_ENGINEERING:    'text-orange-400 border-orange-400/30 bg-orange-400/5',
  ENGINEERING_CULTURE: 'text-green-400 border-green-400/30 bg-green-400/5',
};

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ id, title, category, date, readTime, tags, children }) => {
  const categoryColor = CATEGORY_COLORS[category] ?? 'text-primary/60 border-primary/20 bg-primary/5';
  const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();

  return (
    <div className="max-w-[1500px] mx-auto w-full px-6 py-16">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[10px] font-bold text-primary/50 hover:text-primary transition-colors uppercase tracking-widest mb-12 font-mono"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Intel_Briefings
      </Link>

      <div className="max-w-full">
        {/* Article header */}
        <header className="mb-12 border-l-4 border-primary pl-6 md:pl-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-slate-600 text-[9px] font-bold font-mono tracking-widest">{id}</span>
            <span className={`text-[9px] font-bold font-mono px-2 py-0.5 border tracking-widest ${categoryColor}`}>
              {category.replace(/_/g, '\u00a0')}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-4">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">calendar_today</span>
              {formattedDate}
            </span>
            <span className="text-slate-700">·</span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-xs">schedule</span>
              {readTime} MIN READ
            </span>
          </div>
        </header>

        {/* Article body */}
        <article className="article-prose">
          {children}
        </article>

        {/* Tags footer */}
        <footer className="mt-16 pt-8 border-t border-primary/10">
          <p className="text-[9px] font-bold text-slate-600 tracking-widest uppercase mb-3">Filed under</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span key={tag} className="text-[9px] font-bold text-slate-500 border border-slate-700/50 px-2 py-1 font-mono tracking-wider">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[10px] font-bold text-primary/50 hover:text-primary transition-colors uppercase tracking-widest font-mono border border-primary/20 hover:border-primary/50 px-4 py-2"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Back to Intel Briefings
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ArticleLayout;
