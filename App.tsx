import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PrivacyBanner from '@/components/layout/PrivacyBanner';

const Hero = lazy(() => import('@/pages/Hero'));
const MissionLog = lazy(() => import('@/pages/MissionLog'));
const Arsenal = lazy(() => import('@/pages/Arsenal'));
const Laboratory = lazy(() => import('@/pages/Laboratory'));
const Protocols = lazy(() => import('@/pages/Protocols'));
const Credentials = lazy(() => import('@/pages/Credentials'));

const App = () => (
  <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-black">
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05)_0%,_transparent_60%)]"></div>
    </div>

    <Navigation />

    <main className="flex-grow relative z-10 w-full">
      <Suspense fallback={<div className="px-6 py-16 text-primary/70 text-sm uppercase">Loading tactical module...</div>}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/mission" element={<MissionLog />} />
          <Route path="/arsenal" element={<Arsenal />} />
          <Route path="/lab" element={<Laboratory />} />
          <Route path="/protocols" element={<Protocols />} />
          <Route path="/credentials" element={<Credentials />} />
        </Routes>
      </Suspense>
    </main>

    <Footer />
    <PrivacyBanner />
  </div>
);

export default App;
