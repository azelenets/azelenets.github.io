import { memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-200px)] w-full px-6 py-16">
      <div className="w-full max-w-lg">
        <div className="relative border border-primary/20 bg-panel-dark/80 backdrop-blur-sm p-10">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary -translate-x-px -translate-y-px" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary translate-x-px translate-y-px" />

          <p className="text-[10px] font-bold tracking-[0.3em] text-primary/50 uppercase mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/30" />
            AEGIS TACTICAL INTERFACE // SYS_ERR
            <span className="h-px w-8 bg-primary/30" />
          </p>

          <div className="font-display text-[7rem] font-black leading-none text-alert mb-1"
            style={{ textShadow: '0 0 20px rgba(255,0,60,0.4), 0 0 60px rgba(255,0,60,0.15)' }}>
            404
          </div>
          <p className="font-display text-sm font-bold tracking-[0.3em] text-alert/60 uppercase mb-8">
            SIGNAL LOST
          </p>

          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8" />

          <p className="font-mono text-xs text-slate-500 leading-relaxed uppercase mb-2">
            TARGET COORDINATES NOT FOUND IN TACTICAL DATABASE.
          </p>
          <p className="font-mono text-xs text-primary/40 mb-8">
            PATH: <span className="text-primary/70">{pathname}</span>
          </p>

          <button
            onClick={() => navigate('/')}
            className="relative px-6 py-3 bg-primary text-black font-black text-xs uppercase tracking-widest overflow-hidden group hover:brightness-110 transition-all"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              RETURN TO BASE
            </span>
          </button>

          <div className="mt-8 flex justify-between text-[9px] font-mono text-white/15 uppercase tracking-widest">
            <span>NODE: GHP_EDGE</span>
            <span>ERR: 0x404</span>
            <span>STATUS: UNRESOLVED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(NotFound);
