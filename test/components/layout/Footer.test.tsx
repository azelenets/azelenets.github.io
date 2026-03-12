import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders footer metadata', () => {
    render(<Footer />);

    expect(screen.getByText('PRIVACY_POLICY')).toBeInTheDocument();
    expect(screen.getByText(/ENCRYPTED_ENDPOINT_33/)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });

  it('opens and closes the privacy modal', () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole('button', { name: 'PRIVACY_POLICY' }));
    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));
    expect(screen.queryByText(/Terms of Use/i)).toBeNull();
  });
});
