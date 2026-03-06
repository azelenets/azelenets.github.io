import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtocolsCta = () => {
  const navigate = useNavigate();
  return (
    <section className="relative font-mono overflow-hidden py-10">
      <div className="hud-border bg-surface-terminal/80 p-12 md:p-20 flex flex-col items-center gap-8 relative z-10 slanted-clip mx-auto max-w-[1500px]">
        <div className="text-[10px] text-hazard font-bold tracking-[0.3em] uppercase mb-4 animate-pulse">OPEN_TO_COLLABORATION</div>
        <h2 className="text-white text-3xl md:text-5xl font-black text-center uppercase tracking-tighter max-w-3xl">
          Ready to Build Something <span className="text-primary">That Actually Works?</span>
        </h2>
        <p className="text-primary/60 text-sm md:text-base text-center max-w-xl uppercase tracking-tighter">
          Skip the exploratory calls. Tell me what you&apos;re building — I&apos;ll tell you exactly how I can help ship it.
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
  );
};

export default memo(ProtocolsCta);
