import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { navItems } from '@/constants/navigation';

type GeoState =
  | { status: 'pending' }
  | { status: 'granted'; lat: number; lon: number }
  | { status: 'denied' };

const formatCoord = (val: number, posLabel: string, negLabel: string) => {
  const dir = val >= 0 ? posLabel : negLabel;
  return `${Math.abs(val).toFixed(4)}° ${dir}`;
};

const UtcClock = memo(() => {
  const [utcTime, setUtcTime] = useState(() => {
    const now = new Date();
    return `${now.toUTCString().split(' ')[4]} UTC`;
  });

  useEffect(() => {
    const id = window.setInterval(() => {
      const now = new Date();
      setUtcTime(`${now.toUTCString().split(' ')[4]} UTC`);
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return <span className="text-primary">{utcTime}</span>;
});

const Navigation = () => {
  const navigate = useNavigate();
  const [geo, setGeo] = useState<GeoState>({ status: 'pending' });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeo({ status: 'denied' });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => setGeo({ status: 'granted', lat: pos.coords.latitude, lon: pos.coords.longitude }),
      () => setGeo({ status: 'denied' }),
      { timeout: 6000 },
    );
  }, []);

  const handleNavClick = useCallback(
    (path: string) => {
      navigate(path);
      setMenuOpen(false);
    },
    [navigate],
  );

  const locationText = useMemo(() => {
    if (geo.status !== 'granted') {
      return (
        <>
          <span className="material-symbols-outlined text-[10px]">location_off</span>
          <span>{geo.status === 'pending' ? 'ACQUIRING_LOCATION...' : 'LOC_UNAVAILABLE'}</span>
        </>
      );
    }

    return (
      <>
        <span className="material-symbols-outlined text-[10px]">location_on</span>
        <span>
          COORDS: <span className="text-white">{formatCoord(geo.lat, 'N', 'S')}, {formatCoord(geo.lon, 'E', 'W')}</span>
        </span>
      </>
    );
  }, [geo]);

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 md:gap-8">
          <a
            href="https://calendar.app.google/yf8ZWByZWy1bFEY38"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden relative px-4 py-2 bg-hazard group hover:brightness-110 transition-all overflow-hidden slanted-clip"
          >
            <div className="absolute inset-0 hazard-stripe opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative z-10 text-black font-black text-xs uppercase tracking-tighter flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">lock_open</span>
              ACCESS_DOSSIER
            </span>
          </a>

          <div id="logo" className="hidden sm:flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-tighter text-white uppercase leading-none">
                ANDRII<span className="text-primary">.ZELENETS</span>
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] text-hazard/80 font-bold tracking-[0.3em]">AI_POWERED_SOFTWARE_ENGINEER</span>
                {/*<span className="h-[1px] w-8 bg-primary/30"></span>*/}
                {/*<span className="text-[8px] text-primary/60 font-bold animate-pulse">WEB_AUTOMATION</span>*/}
              </div>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-1 ml-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `group relative px-4 py-2 flex flex-col transition-all text-left ${isActive ? 'border-b-2 border-primary' : 'hover:opacity-80'}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={`text-[9px] font-bold tracking-tighter transition-colors ${isActive ? 'text-primary' : 'text-primary/40 group-hover:text-primary'}`}>
                      {item.num}_TERMINAL
                    </span>
                    <span className={`text-xs font-bold tracking-widest uppercase ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex xl:hidden items-center gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-[10px] font-bold tracking-wider ${isActive ? 'text-primary' : 'text-slate-500'}`
                }
              >
                {item.label}
              </NavLink>
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

          <a
            href="https://calendar.app.google/yf8ZWByZWy1bFEY38"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex relative px-6 py-2 bg-hazard group hover:brightness-110 transition-all overflow-hidden slanted-clip"
          >
            <div className="absolute inset-0 hazard-stripe opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative z-10 text-black font-black text-xs uppercase tracking-tighter flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">lock_open</span>
              INITIATE_CONTACT
            </span>
          </a>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 group"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}></span>
          </button>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="border-t border-primary/20 bg-black/95 px-6 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              onClick={() => handleNavClick(item.path)}
              className={({ isActive }) =>
                `w-full flex items-center justify-between py-3 border-b border-primary/10 last:border-0 group transition-all ${isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-bold tracking-[0.2em] ${isActive ? 'text-primary' : 'text-primary/40 group-hover:text-primary'}`}>
                      {item.num}
                    </span>
                    <span className={`text-xs font-black tracking-widest uppercase ${isActive ? 'text-white' : 'text-white/70 group-hover:text-white'}`}>
                      {item.label}
                    </span>
                  </div>
                  {isActive && <span className="w-4 h-[2px] bg-primary"></span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="bg-primary/5 border-t border-b border-primary/10">
        <div className="max-w-[1600px] mx-auto px-6 py-1.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8 text-[9px] font-bold tracking-[0.2em] uppercase">
            <div className="flex items-center gap-2 text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <div>
                SYSTEM_STATUS: <span className="text-white">OPERATIONAL</span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-primary/60">{locationText}</div>
            <div className="hidden sm:flex items-center gap-2 text-primary/60">
              <span className="material-symbols-outlined text-[10px]">public</span>
              <span>
                NODE: <span className="text-white">US-EAST-01</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-primary/40">
            <span className="hidden md:inline">
              ENCRYPT: <span className="text-primary/60">AES-256_ACTIVE</span>
            </span>
            <UtcClock />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Navigation);
