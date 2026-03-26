import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatBlock from './StatBlock';

const MORSE_PATTERN: number[] = (() => {
  const DOT = 100;
  const DASH = 300;
  const INTRA = 100;
  const INTER = 300;
  const WORD = 700;

  const morseMap: Record<string, string> = {
    A: '.-',
    B: '-...',
    C: '-.-.',
    D: '-..',
    E: '.',
    F: '..-.',
    G: '--.',
    H: '....',
    I: '..',
    J: '.---',
    K: '-.-',
    L: '.-..',
    M: '--',
    N: '-.',
    O: '---',
    P: '.--.',
    Q: '--.-',
    R: '.-.',
    S: '...',
    T: '-',
    U: '..-',
    V: '...-',
    W: '.--',
    X: '-..-',
    Y: '-.--',
    Z: '--..',
  };

  const pattern: number[] = [];
  const words = 'HELLO WORLD'.split(' ');

  words.forEach((word, wordIndex) => {
    word.split('').forEach((char, charIndex) => {
      const code = morseMap[char];
      if (!code) return;

      code.split('').forEach((symbol, symbolIndex) => {
        pattern.push(symbol === '.' ? DOT : DASH);
        if (symbolIndex < code.length - 1) pattern.push(INTRA);
      });

      if (charIndex < word.length - 1) pattern.push(INTER);
    });

    if (wordIndex < words.length - 1) pattern.push(WORD);
  });

  return pattern;
})();

const Hero = () => {
  const navigate = useNavigate();
  const [localIP, setLocalIP] = useState<string>();

  useEffect(() => {
    const shouldLoadIp = typeof window.matchMedia !== 'function'
      || window.matchMedia('(min-width: 1280px)').matches;

    if (!shouldLoadIp) return;

    const controller = new AbortController();

    const loadIp = () => {
      fetch('https://api.ipify.org?format=json', { signal: controller.signal })
        .then((response) => response.json())
        .then((data: { ip?: string }) => setLocalIP(data.ip))
        .catch(() => {});
    };

    if (typeof window.requestIdleCallback === 'function') {
      const idleId = window.requestIdleCallback(loadIp, { timeout: 3000 });
      return () => {
        window.cancelIdleCallback(idleId);
        controller.abort();
      };
    }

    const timeoutId = globalThis.setTimeout(loadIp, 1500);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (!('vibrate' in navigator)) return;

    navigator.vibrate(MORSE_PATTERN);
  }, []);

  return (
    <section className="flex flex-1 flex-col items-center justify-center min-h-[calc(100vh-140px)] w-full pt-12 pb-12 md:py-12 relative overflow-hidden">
      <aside className="absolute left-6 bottom-48 hidden xl:block text-[9px] leading-tight text-primary/40 space-y-1 font-mono">
        <p>ENCRYPTION: AES-256-GCM</p>
        <p>IP: {localIP ?? 'UNKNOWN'}</p>
        {'platform' in navigator && <p>PLATFORM: {navigator.platform}</p>}
        {'hardwareConcurrency' in navigator && <p>CPU: {`${navigator.hardwareConcurrency}_CORES`}</p>}
        {'deviceMemory' in navigator && <p>MEMORY: {`${navigator.deviceMemory}_GB`}</p>}
        <div className="w-32 h-1 bg-white/5 mt-2">
          <div className="w-3/4 h-full bg-primary/50" />
        </div>
      </aside>

      <div className="max-w-[1500px] mx-auto w-full flex-1 flex flex-col lg:flex-row items-center px-6 gap-16 pt-6 pb-24 md:py-24">
        <div className="flex-1 w-full space-y-8 z-10">
          <header className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="hazard-stripe h-4 w-12" />
              <span className="text-hazard font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">Tactical Software Engineering</span>
            </div>
            <h1 className="font-display text-4xl md:text-7xl pt-3 font-black text-white leading-none tracking-tighter">
              ARCHITECTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">DIGITAL DEFENSE</span>
            </h1>
          </header>

          <div className="hud-border p-6 bg-white/5 backdrop-blur-sm max-w-xl">
            <p className="text-2xs md:text-lg text-slate-400 border-l-2 border-primary pl-4 uppercase">
              Senior Software Engineer with 13+ years of specialized combat in high-load environments. Mastering{' '}
              <span className="text-white font-bold">Distributed Architectures, Secure, High-Performance systems</span>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <a
              href="https://calendar.app.google/yf8ZWByZWy1bFEY38"
              target="_blank"
              rel="noopener noreferrer"
              data-cta-id="hero_deploy_solution"
              data-cta-section="hero"
              data-cta-label="Deploy Solution"
              className="group relative px-8 py-4 bg-primary text-black font-black uppercase tracking-widest text-sm overflow-hidden flex items-center justify-center"
            >
              <span className="relative z-10">Deploy_Solution</span>
              <div className="absolute top-0 right-0 hazard-stripe w-2 h-full opacity-50 group-hover:w-full transition-all duration-300" />
            </a>
            <button
              data-cta-id="hero_view_stack"
              data-cta-section="hero"
              data-cta-label="View Stack"
              onClick={() => navigate('/arsenal')}
              className="px-8 py-4 border border-white/20 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
            >
              <span className="material-symbols-outlined text-sm">terminal</span> View_Stack
            </button>
          </div>
        </div>

        <figure className="relative w-full lg:w-1/2 aspect-square max-w-md hidden xl:block">
          <div className="absolute inset-0 border border-primary/10 rounded-full scale-110" />
          <div className="absolute inset-0 border border-dashed border-primary/20 rounded-full scale-125 animate-spin-slow" />

          <div className="relative w-full h-full hud-border bg-black overflow-hidden z-10">
            <div className="absolute inset-0 bg-primary/5 z-10" />
            <img alt="Tactical Avatar" className="w-full h-full object-cover glitch-img opacity-60 z-30" decoding="async" fetchPriority="low" loading="lazy" src="/images/desktop.avif" />

            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-32 border border-primary/30 rounded-full" />
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-primary/20" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-primary/20" />

              <div className="absolute top-4 left-4 text-[10px] text-experimental/80 font-bold">REC [●]</div>
              <div className="absolute top-4 right-4 text-[10px] text-primary/60 font-bold">CAM_01</div>
              <div className="absolute bottom-4 right-4 text-[10px] text-primary/60 font-bold">SIG_STRENGTH: 98%</div>
            </div>
          </div>

          <div className="absolute -bottom-4 -left-4 z-30 bg-hazard text-black px-4 py-2 font-black -skew-x-12 shadow-[0_0_15px_rgba(250,204,21,0.4)]">
            <div className="text-[10px] tracking-widest opacity-70">EXP_LEVEL</div>
            <div className="text-2xl font-display">13+ YRS</div>
          </div>
        </figure>
      </div>

      <footer className="flex w-full border-t border-primary/20 bg-black/50 py-6">
        <div className="max-w-[1600px] w-full mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatBlock label="Nodes_Managed" value="90+" barColor="bg-primary" width="66%" />
          <StatBlock label="Uptime_Record" value="99.9%" barColor="bg-primary" width="99%" />
          <StatBlock label="Projects_Mastered" value="30+" barColor="bg-primary" width="50%" />
          <StatBlock label="System_Threat_Level" value="MINIMAL" barColor="bg-hazard" width="5%" />
        </div>
      </footer>
    </section>
  );
};

export default memo(Hero);
