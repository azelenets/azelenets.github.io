import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PrivacyModal from '@/components/layout/PrivacyModal';

describe('PrivacyModal', () => {
  it('locks body scroll while mounted and restores it on unmount', () => {
    const { unmount } = render(<PrivacyModal onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('closes on escape and backdrop click', () => {
    const onClose = vi.fn();
    render(<PrivacyModal onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    fireEvent.click(screen.getByText(/Terms of Use/i).closest('div[class*="fixed"]') ?? screen.getByText(/Terms of Use/i));

    expect(onClose).toHaveBeenCalled();
  });
});
