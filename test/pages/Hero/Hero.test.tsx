import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type * as ReactRouterDom from 'react-router-dom';
import Hero from '@/pages/Hero';
import StatBlock from '@/pages/Hero/StatBlock';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('Hero page', () => {
  beforeEach(() => {
    navigateMock.mockReset();
    Object.defineProperty(window.navigator, 'vibrate', {
      value: vi.fn(),
      configurable: true,
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ ip: '127.0.0.1' }),
    }));
  });

  it('renders hero content and fetched IP', async () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    expect(screen.getByText(/ARCHITECTING/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Deploy_Solution/i })).toHaveAttribute('href', 'https://calendar.app.google/yf8ZWByZWy1bFEY38');
    await waitFor(() => expect(screen.getByText('IP: 127.0.0.1')).toBeInTheDocument());
  });

  it('navigates to arsenal when view stack is clicked', () => {
    render(
      <MemoryRouter>
        <Hero />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /View_Stack/i }));
    expect(navigateMock).toHaveBeenCalledWith('/arsenal');
  });
});

describe('Hero StatBlock', () => {
  it('renders label, value, and bar width', () => {
    const { container } = render(<StatBlock label="Nodes_Managed" value="90+" barColor="bg-primary" width="66%" />);
    expect(screen.getByText('Nodes_Managed')).toBeInTheDocument();
    expect(screen.getByText('90+')).toBeInTheDocument();
    expect(container.querySelector('[style="width: 66%;"]')).toBeInTheDocument();
  });
});
