import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

// Stub out lazy-loaded pages so they resolve immediately without dynamic import issues
vi.mock('@/pages/Hero', () => ({ default: () => <div>HERO_PAGE</div> }));
vi.mock('@/pages/MissionLog', () => ({ default: () => <div>MISSION_PAGE</div> }));
vi.mock('@/pages/Arsenal', () => ({ default: () => <div>ARSENAL_PAGE</div> }));
vi.mock('@/pages/Laboratory', () => ({ default: () => <div>LAB_PAGE</div> }));
vi.mock('@/pages/Protocols', () => ({ default: () => <div>PROTOCOLS_PAGE</div> }));
vi.mock('@/pages/Credentials', () => ({ default: () => <div>CREDENTIALS_PAGE</div> }));

// Stub geolocation to avoid pending side-effects
beforeEach(() => {
  Object.defineProperty(global.navigator, 'geolocation', {
    value: { getCurrentPosition: vi.fn((_s, error) => error()) },
    configurable: true,
  });
  window.localStorage.clear();
});

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe('App routing', () => {
  it('renders Hero at /', async () => {
    renderAt('/');
    await waitFor(() => expect(screen.getByText('HERO_PAGE')).toBeInTheDocument());
  });

  it('renders MissionLog at /mission', async () => {
    renderAt('/mission');
    await waitFor(() => expect(screen.getByText('MISSION_PAGE')).toBeInTheDocument());
  });

  it('renders Arsenal at /arsenal', async () => {
    renderAt('/arsenal');
    await waitFor(() => expect(screen.getByText('ARSENAL_PAGE')).toBeInTheDocument());
  });

  it('renders Laboratory at /lab', async () => {
    renderAt('/lab');
    await waitFor(() => expect(screen.getByText('LAB_PAGE')).toBeInTheDocument());
  });

  it('renders Protocols at /protocols', async () => {
    renderAt('/protocols');
    await waitFor(() => expect(screen.getByText('PROTOCOLS_PAGE')).toBeInTheDocument());
  });

  it('renders Credentials at /credentials', async () => {
    renderAt('/credentials');
    await waitFor(() => expect(screen.getByText('CREDENTIALS_PAGE')).toBeInTheDocument());
  });
});

describe('App page titles', () => {
  it('sets the correct title at /', async () => {
    renderAt('/');
    await waitFor(() => expect(document.title).toBe('Andrii Zelenets // Tactical Software Engineering Unit'));
  });

  it('sets the correct title at /mission', async () => {
    renderAt('/mission');
    await waitFor(() => expect(document.title).toBe('Mission Log // Andrii Zelenets'));
  });

  it('sets the correct title at /arsenal', async () => {
    renderAt('/arsenal');
    await waitFor(() => expect(document.title).toBe('Tech Stack Arsenal // Andrii Zelenets'));
  });

  it('sets the correct title at /lab', async () => {
    renderAt('/lab');
    await waitFor(() => expect(document.title).toBe('R&D Lab // Andrii Zelenets'));
  });

  it('sets the correct title at /protocols', async () => {
    renderAt('/protocols');
    await waitFor(() => expect(document.title).toBe('Protocols // Andrii Zelenets'));
  });

  it('sets the correct title at /credentials', async () => {
    renderAt('/credentials');
    await waitFor(() => expect(document.title).toBe('Credentials // Andrii Zelenets'));
  });
});

describe('App layout', () => {
  it('renders Navigation', async () => {
    renderAt('/');
    await waitFor(() => expect(screen.getByRole('banner')).toBeInTheDocument());
  });

  it('renders PrivacyBanner when localStorage key is absent', async () => {
    renderAt('/');
    await waitFor(() => expect(screen.getByRole('complementary')).toBeInTheDocument());
  });

  it('does not render PrivacyBanner when already acknowledged', async () => {
    window.localStorage.setItem('aegis_privacy_acknowledged', '1');
    renderAt('/');
    await waitFor(() => {
      expect(screen.queryByRole('complementary')).toBeNull();
    });
  });
});
