import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import PrivacyBanner from '@/components/layout/PrivacyBanner';

const SITE_URL = 'https://azelenets.github.io';

interface PageMeta { title: string; description: string; }

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'Andrii Zelenets // Tactical Software Engineering Unit',
    description: 'Andrii Zelenets — AI-powered full-stack software engineer specialising in distributed systems, Ruby on Rails, React, NestJS, and cloud-native architecture.',
  },
  '/mission': {
    title: 'Mission Log // Andrii Zelenets',
    description: 'Engineering mission log — a timeline of Andrii Zelenets\'s key engagements across startups, scale-ups, and enterprise organisations.',
  },
  '/arsenal': {
    title: 'Tech Stack Arsenal // Andrii Zelenets',
    description: 'Full-stack tech arsenal spanning 20+ categories: Ruby on Rails, React, NestJS, PostgreSQL, Kafka, Docker, AWS, and more.',
  },
  '/lab': {
    title: 'R&D Lab // Andrii Zelenets',
    description: 'Experimental R&D projects and technical explorations by Andrii Zelenets — side projects, prototypes, and open-source work.',
  },
  '/protocols': {
    title: 'Protocols // Andrii Zelenets',
    description: 'Delivery protocols and working model of Andrii Zelenets — how engagements are structured, communicated, and executed.',
  },
  '/credentials': {
    title: 'Credentials // Andrii Zelenets',
    description: 'Education, certifications, courses, and skill dossier of Andrii Zelenets.',
  },
};

const DEFAULT_META = PAGE_META['/'];

function setMeta(pathname: string) {
  const meta = PAGE_META[pathname] ?? DEFAULT_META;

  document.title = meta.title;

  const setTag = (sel: string, attr: string, val: string) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };

  setTag('meta[name="description"]',    'content', meta.description);
  setTag('meta[property="og:title"]',   'content', meta.title);
  setTag('meta[property="og:description"]', 'content', meta.description);
  setTag('meta[property="og:url"]',     'content', `${SITE_URL}${pathname}`);
  setTag('link[rel="canonical"]',       'href',    `${SITE_URL}${pathname}`);
}

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    setMeta(pathname);
  }, [pathname]);
  return null;
};

const Hero = lazy(() => import('@/pages/Hero'));
const MissionLog = lazy(() => import('@/pages/MissionLog'));
const Arsenal = lazy(() => import('@/pages/Arsenal'));
const Laboratory = lazy(() => import('@/pages/Laboratory'));
const Protocols = lazy(() => import('@/pages/Protocols'));
const Credentials = lazy(() => import('@/pages/Credentials'));

const App = () => (
  <div className="min-h-screen flex flex-col font-mono selection:bg-primary selection:text-black">
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(0,243,255,0.05)_0%,_transparent_60%)]" />
    </div>

    <ScrollToTop />
    <Navigation />

    <main className="flex-grow relative z-10 w-full">
      <Suspense fallback={<div className="px-6 py-16 text-primary/70 text-sm uppercase text-center">Loading tactical module...</div>}>
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
