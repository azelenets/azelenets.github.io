import React, { useState } from 'react';
import { View } from '@/types';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/Hero';
import MissionLog from '@/components/MissionLog';
import Laboratory from '@/components/Laboratory';
import Arsenal from '@/components/Arsenal';
import Protocols from '@/components/Protocols';
import Credentials from '@/components/Credentials';
import Footer from '@/components/layout/Footer';
import PrivacyBanner from '@/components/layout/PrivacyBanner';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Hero setView={setCurrentView} />;
      case View.MISSION:
        return <MissionLog />;
      case View.LAB:
        return <Laboratory />;
      case View.ARSENAL:
        return <Arsenal />;
      case View.PROTOCOLS:
        return <Protocols setView={setCurrentView} />;
      case View.CREDENTIALS:
        return <Credentials />;
      default:
        return <Hero setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-black">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05)_0%,_transparent_60%)]"></div>
      </div>

      <Navigation currentView={currentView} setView={setCurrentView} />

      <main className="flex-grow relative z-10 w-full">
        {renderView()}
      </main>

      <Footer />
      <PrivacyBanner />
    </div>
  );
};

export default App;
