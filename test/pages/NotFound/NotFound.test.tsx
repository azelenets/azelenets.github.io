import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type * as ReactRouterDom from 'react-router-dom';
import NotFound from '@/pages/NotFound';

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
    useLocation: () => ({ pathname: '/missing-route' }),
  };
});

describe('NotFound', () => {
  it('renders the missing path and navigates home', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('/missing-route')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /RETURN TO BASE/i }));
    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
