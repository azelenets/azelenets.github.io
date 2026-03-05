import { Suspense, lazy, useCallback, useMemo, useState, useTransition } from 'react';
import { View } from '@/types';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/pages/Hero';
import Footer from '@/components/layout/Footer';
import PrivacyBanner from '@/components/layout/PrivacyBanner';

const MissionLog = lazy(() => import('@/pages/MissionLog'));
const Laboratory = lazy(() => import('@/pages/Laboratory'));
const Arsenal = lazy(() => import('@/pages/Arsenal'));
const Protocols = lazy(() => import('@/pages/Protocols'));
const Credentials = lazy(() => import('@/pages/Credentials'));

const App = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isPending, startTransition] = useTransition();

  const handleViewChange = useCallback((view: View) => {
    startTransition(() => {
      setCurrentView(view);
    });
  }, []);

  const content = useMemo(() => {
    switch (currentView) {
      case View.HOME:
        return <Hero setView={handleViewChange} />;
      case View.MISSION:
        return <MissionLog />;
      case View.LAB:
        return <Laboratory />;
      case View.ARSENAL:
        return <Arsenal />;
      case View.PROTOCOLS:
        return <Protocols setView={handleViewChange} />;
      case View.CREDENTIALS:
        return <Credentials />;
      default:
        return <Hero setView={handleViewChange} />;
    }
  }, [currentView, handleViewChange]);

  return (
    <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-black">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05)_0%,_transparent_60%)]"></div>
      </div>

      <Navigation currentView={currentView} setView={handleViewChange} />

      <main className="flex-grow relative z-10 w-full">
        <Suspense fallback={<div className="px-6 py-16 text-primary/70 text-sm uppercase">Loading tactical module...</div>}>
          {content}
        </Suspense>
        {isPending && <output className="fixed bottom-4 right-4 text-[10px] text-primary/60 uppercase">Switching view...</output>}
      </main>

      <Footer />
      <PrivacyBanner />
    </div>
  );
};

export default App;
