import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type * as ReactRouterDom from 'react-router-dom';
import ProtocolCard from '@/pages/Protocols/ProtocolCard';
import Protocols from '@/pages/Protocols';
import ProtocolsCta from '@/pages/Protocols/ProtocolsCta';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe('ProtocolCard', () => {
  it('renders title, id, description, and dots', () => {
    const { container } = render(
      <ProtocolCard id="DIR_01" icon="radar" title="Strategic Leadership" status="READY" dots={3}>
        Protocol content
      </ProtocolCard>,
    );

    expect(screen.getByText('Strategic Leadership')).toBeInTheDocument();
    expect(screen.getByText('// DIR_01')).toBeInTheDocument();
    expect(screen.getByText(/Protocol content/)).toBeInTheDocument();
    expect(container.querySelectorAll('.bg-primary').length).toBeGreaterThan(0);
  });
});

describe('ProtocolsCta', () => {
  it('navigates to credentials and arsenal', () => {
    render(
      <MemoryRouter>
        <ProtocolsCta />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /VIEW_CREDENTIALS/i }));
    fireEvent.click(screen.getByRole('button', { name: /EXPLORE_ARSENAL/i }));

    expect(navigateMock).toHaveBeenNthCalledWith(1, '/credentials');
    expect(navigateMock).toHaveBeenNthCalledWith(2, '/arsenal');
  });
});

describe('Protocols page', () => {
  it('renders the page header and protocol cards', () => {
    render(
      <MemoryRouter>
        <Protocols />
      </MemoryRouter>,
    );

    expect(screen.getByText('Strategic')).toBeInTheDocument();
    expect(screen.getByText('Protocols')).toBeInTheDocument();
    expect(screen.getByText('Engineering Excellence')).toBeInTheDocument();
    expect(screen.getByText(/Ready to Build Something/i)).toBeInTheDocument();
  });
});
