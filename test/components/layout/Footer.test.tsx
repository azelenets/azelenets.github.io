import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

vi.mock('@/components/layout/PrivacyModal', async () => {
  const actual = await vi.importActual<typeof import('@/components/layout/PrivacyModal')>('@/components/layout/PrivacyModal');
  return actual;
});

describe('Footer', () => {
  it('renders footer metadata', () => {
    render(<Footer />);

    expect(screen.getByText('PRIVACY_POLICY')).toBeInTheDocument();
    expect(screen.getByText(/ENCRYPTED_ENDPOINT_33/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('opens and closes the privacy modal', async () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole('button', { name: 'PRIVACY_POLICY' }));
    expect(await screen.findByText(/Terms of Use/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    await waitFor(() => {
      expect(screen.queryByText(/Terms of Use/i)).toBeNull();
    });
  });
});
