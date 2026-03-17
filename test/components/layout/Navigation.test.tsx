import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '@/components/layout/Navigation';

// formatCoord is not exported — test it via rendered output after geo mock
function renderNav() {
  return render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>,
  );
}

describe('formatCoord (via Navigation output)', () => {
  it('shows N for positive latitude', async () => {
    const mockGeo = {
      getCurrentPosition: vi.fn((success) =>
        success({ coords: { latitude: 48.8566, longitude: 2.3522 } }),
      ),
    };
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeo,
      configurable: true,
    });

    await act(async () => { renderNav(); });

    expect(screen.getByText(/48\.8566° N/)).toBeInTheDocument();
    expect(screen.getByText(/2\.3522° E/)).toBeInTheDocument();
  });

  it('shows S for negative latitude and W for negative longitude', async () => {
    const mockGeo = {
      getCurrentPosition: vi.fn((success) =>
        success({ coords: { latitude: -33.8688, longitude: -70.6693 } }),
      ),
    };
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeo,
      configurable: true,
    });

    await act(async () => { renderNav(); });

    expect(screen.getByText(/33\.8688° S/)).toBeInTheDocument();
    expect(screen.getByText(/70\.6693° W/)).toBeInTheDocument();
  });
});

describe('Navigation geo states', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });
  });

  it('shows ACQUIRING_LOCATION while pending', () => {
    const mockGeo = {
      getCurrentPosition: vi.fn(), // never calls success or error → stays pending
    };
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeo,
      configurable: true,
    });

    renderNav();
    expect(screen.getByText(/ACQUIRING_LOCATION/)).toBeInTheDocument();
  });

  it('shows LOC_UNAVAILABLE when geolocation is denied', async () => {
    const mockGeo = {
      getCurrentPosition: vi.fn((_success, error) => error()),
    };
    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeo,
      configurable: true,
    });

    await act(async () => { renderNav(); });

    expect(screen.getByText(/LOC_UNAVAILABLE/)).toBeInTheDocument();
  });

  it('shows LOC_UNAVAILABLE when geolocation API is absent', async () => {
    await act(async () => { renderNav(); });
    expect(screen.getByText(/LOC_UNAVAILABLE/)).toBeInTheDocument();
  });
});

describe('Navigation mobile menu', () => {
  beforeEach(() => {
    Object.defineProperty(global.navigator, 'geolocation', {
      value: undefined,
      configurable: true,
    });
  });

  it('mobile nav is collapsed initially', () => {
    const { container } = renderNav();
    const mobileMenu = container.querySelector('.max-h-0');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('toggles mobile menu open on hamburger click', async () => {
    const { container } = renderNav();
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    await userEvent.click(toggle);
    const expanded = container.querySelector('.max-h-96');
    expect(expanded).toBeInTheDocument();
  });

  it('closes mobile menu on second click', async () => {
    const { container } = renderNav();
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    await userEvent.click(toggle);
    await userEvent.click(toggle);
    expect(container.querySelector('.max-h-0')).toBeInTheDocument();
  });
});

describe('Navigation renders nav links', () => {
  it('renders all nav item labels', () => {
    renderNav();
    expect(screen.getAllByText('MAIN').length).toBeGreaterThan(0);
    expect(screen.getAllByText('HISTORY').length).toBeGreaterThan(0);
    expect(screen.getAllByText('SKILLS').length).toBeGreaterThan(0);
  });

  it('renders SYSTEM_STATUS: OPERATIONAL', () => {
    renderNav();
    expect(screen.getByText(/OPERATIONAL/)).toBeInTheDocument();
  });
});
