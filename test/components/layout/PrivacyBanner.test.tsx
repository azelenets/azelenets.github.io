import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PrivacyBanner from '@/components/layout/PrivacyBanner';

const STORAGE_KEY = 'aegis_privacy_acknowledged';

beforeEach(() => {
  window.localStorage.clear();
});

describe('PrivacyBanner', () => {
  it('is visible when localStorage key is absent', () => {
    render(<PrivacyBanner />);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('is hidden when localStorage key is already set', () => {
    window.localStorage.setItem(STORAGE_KEY, '1');
    render(<PrivacyBanner />);
    expect(screen.queryByRole('complementary')).toBeNull();
  });

  it('hides the banner and sets localStorage after clicking ACKNOWLEDGE', async () => {
    render(<PrivacyBanner />);
    const button = screen.getByRole('button', { name: /acknowledge/i });
    await userEvent.click(button);
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('1');
  });

  it('hides the banner after clicking Dismiss', async () => {
    render(<PrivacyBanner />);
    const dismiss = screen.getByRole('button', { name: /dismiss/i });
    await userEvent.click(dismiss);
    expect(screen.queryByRole('complementary')).toBeNull();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('1');
  });

  it('shows the DATA_COLLECTION_DIRECTIVE label', () => {
    render(<PrivacyBanner />);
    expect(screen.getByText(/DATA_COLLECTION_DIRECTIVE/i)).toBeInTheDocument();
  });
});
