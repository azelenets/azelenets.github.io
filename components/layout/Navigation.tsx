import React from 'react';
import { View } from '@/types';
import { navItems } from '@/constants/navigation';

interface NavigationProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/20">
      {/* Top Bar */}
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span
                className="font-display font-black text-2xl tracking-tighter text-white uppercase leading-none">
                  ANDRII<span className="text-primary">.ZELENETS</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] text-primary/60 font-bold tracking-[0.3em]">SR_SOFTWARE_ENGINEER</span>
                <span className="h-[1px] w-8 bg-primary/30"></span>
                <span className="text-[8px] text-experimental/80 font-bold animate-pulse">L7_AUTH_REQ</span>
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`group relative px-4 py-2 flex flex-col transition-all text-left ${currentView === item.id ? 'border-b-2 border-primary' : 'hover:opacity-80'}`}
              >
                <span
                  className={`text-[9px] font-bold tracking-tighter transition-colors ${currentView === item.id ? 'text-primary' : 'text-primary/40 group-hover:text-primary'}`}>
                  {item.num}_TERMINAL
                </span>
                <span
                  className={`text-xs font-bold tracking-widest uppercase ${currentView === item.id ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex xl:hidden items-center gap-4">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setView(item.id)}
                      className={`text-[10px] font-bold tracking-wider ${currentView === item.id ? 'text-primary' : 'text-slate-500'}`}>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex flex-col text-right">
            <span className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">Signal_Strength</span>
            <div className="flex gap-0.5 mt-0.5 justify-end">
              <div className="w-3 h-1 bg-primary"></div>
              <div className="w-3 h-1 bg-primary"></div>
              <div className="w-3 h-1 bg-primary"></div>
              <div className="w-3 h-1 bg-primary/20"></div>
            </div>
          </div>

          <button
            onClick={() => setView(View.CREDENTIALS)}
            className="relative px-6 py-2 bg-hazard group hover:brightness-110 transition-all overflow-hidden slanted-clip"
          >
            <div className="absolute inset-0 hazard-stripe opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative z-10 text-black font-black text-xs uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock_open</span>
              ACCESS_DOSSIER
            </span>
          </button>
        </div>
      </div>

      {/* Sub Bar */}
      <div className="bg-primary/5 border-t border-b border-primary/10">
        <div className="max-w-[1600px] mx-auto px-6 py-1.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8 text-[9px] font-bold tracking-[0.2em] uppercase">
            <div className="flex items-center gap-2 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <div>SYSTEM_STATUS: <span className="text-white">OPERATIONAL</span></div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined text-[10px]">location_on</span>
              <span>COORDS: <span className="text-white">40.7128° N, 74.0060° W</span></span>
            </div>
             <div className="hidden sm:flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined text-[10px]">public</span>
              <span>NODE: <span className="text-white">US-EAST-01</span></span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-primary/40">
            <span className="hidden md:inline">ENCRYPT: <span className="text-primary/60">AES-256_ACTIVE</span></span>
            <span className="text-primary">02:14:45 UTC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
