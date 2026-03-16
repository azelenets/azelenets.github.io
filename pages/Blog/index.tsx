import React, { useState, useMemo } from 'react';
import PageHeader from '@/components/layout/PageHeader';
import PostCard from './PostCard';
import { blogPosts, blogCategories, type BlogCategory } from '@/constants/blog';

const CATEGORY_COLORS: Record<BlogCategory, string> = {
  ALL:                 'border-primary/30 text-primary bg-primary/10',
  DISTRIBUTED_SYSTEMS: 'border-primary/20 text-primary/60 hover:border-primary/40 hover:text-primary',
  CLOUD_NATIVE:        'border-blue-400/20 text-blue-400/60 hover:border-blue-400/40 hover:text-blue-400',
  FRONTEND:            'border-purple-400/20 text-purple-400/60 hover:border-purple-400/40 hover:text-purple-400',
  DATA_ENGINEERING:    'border-orange-400/20 text-orange-400/60 hover:border-orange-400/40 hover:text-orange-400',
  ENGINEERING_CULTURE: 'border-green-400/20 text-green-400/60 hover:border-green-400/40 hover:text-green-400',
};

const ACTIVE_COLORS: Record<BlogCategory, string> = {
  ALL:                 'border-primary/30 text-primary bg-primary/10',
  DISTRIBUTED_SYSTEMS: 'border-primary/50 text-primary bg-primary/10',
  CLOUD_NATIVE:        'border-blue-400/50 text-blue-400 bg-blue-400/10',
  FRONTEND:            'border-purple-400/50 text-purple-400 bg-purple-400/10',
  DATA_ENGINEERING:    'border-orange-400/50 text-orange-400 bg-orange-400/10',
  ENGINEERING_CULTURE: 'border-green-400/50 text-green-400 bg-green-400/10',
};

const Blog: React.FC = () => {
  const [active, setActive] = useState<BlogCategory>('ALL');

  const filtered = useMemo(
    () => (active === 'ALL' ? blogPosts : blogPosts.filter(p => p.category === active)),
    [active],
  );

  return (
    <section className="max-w-[1500px] mx-auto w-full space-y-12 px-6 py-16 relative">
      <PageHeader
        eyebrow="Field Notes & Technical Dispatches"
        titleMain="Intel"
        titleAccent="Briefings"
        description="Long-form engineering articles on distributed systems, cloud-native architecture, frontend craft, and team culture."
      />

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-primary/10 border border-primary/10">
        {[
          { label: 'ARTICLES', value: String(blogPosts.length) },
          { label: 'CATEGORIES', value: String(blogCategories.length - 1) },
          { label: 'AVG_READ', value: `${Math.round(blogPosts.reduce((s, p) => s + p.readTime, 0) / blogPosts.length)} MIN` },
          { label: 'STATUS', value: 'ACTIVE' },
        ].map(stat => (
          <div key={stat.label} className="bg-bg-dark px-6 py-4 flex flex-col gap-1">
            <span className="text-primary text-2xl font-black font-display">{stat.value}</span>
            <span className="text-slate-600 text-[9px] font-bold tracking-[0.3em] uppercase">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {blogCategories.map(cat => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[9px] font-bold font-mono px-3 py-1.5 border tracking-widest uppercase transition-all ${isActive ? ACTIVE_COLORS[cat] : CATEGORY_COLORS[cat]}`}
            >
              {cat.replace(/_/g, '\u00a0')}
              {cat !== 'ALL' && (
                <span className="ml-1.5 opacity-50">
                  {blogPosts.filter(p => p.category === cat).length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Post grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 border border-primary/10">
          {filtered.map((post, i) => (
            <PostCard key={post.id} {...post} index={i} />
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-primary/20 p-16 text-center">
          <div className="text-primary/30 text-xs font-bold tracking-[0.4em] uppercase mb-2">NO_INTEL_FOUND</div>
          <p className="text-slate-600 text-xs font-mono uppercase">
            CATEGORY: <span className="text-primary/40">{active}</span> — returned 0 results
          </p>
        </div>
      )}
    </section>
  );
};

export default Blog;
