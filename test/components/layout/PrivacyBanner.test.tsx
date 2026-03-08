import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrivacyBanner from '@/components/layout/PrivacyBanner';
import { CONSENT_STORAGE_KEY } from '@/lib/analytics';

beforeEach(() => {
  window.localStorage.clear();
  window.dataLayer = [];
});

describe('PrivacyBanner', () => {
  it('is visible when localStorage key is absent', () => {
    render(<PrivacyBanner />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('is hidden when consent choice is already set', () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'accepted');
    render(<PrivacyBanner />);
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('accepts analytics, hides banner, and stores consent choice', async () => {
    render(<PrivacyBanner />);
    const button = screen.getByRole('button', { name: /accept analytics/i });
    await userEvent.click(button);
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('accepted');
  });

  it('rejects analytics and stores consent choice', async () => {
    render(<PrivacyBanner />);
    const reject = screen.getByRole('button', { name: /reject non-essential/i });
    await userEvent.click(reject);
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('rejected');
  });

  it('shows the DATA_COLLECTION_DIRECTIVE label', () => {
    render(<PrivacyBanner />);
    expect(screen.getByText(/DATA_COLLECTION_DIRECTIVE/i)).toBeInTheDocument();
  });
});
