import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  CONSENT_STORAGE_KEY,
  LEGACY_PRIVACY_STORAGE_KEY,
  applyConsentChoice,
  persistConsentChoice,
  readConsentChoice,
  setupClickTracking,
  trackEvent,
  trackVirtualPageView,
} from '@/lib/analytics';

describe('analytics helpers', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.dataLayer = [];
    window.gtag = undefined;
    document.body.innerHTML = '';
    document.title = 'Test Title';
    window.history.replaceState({}, '', '/current');
  });

  it('reads current and legacy consent values', () => {
    expect(readConsentChoice()).toBeNull();

    window.localStorage.setItem(LEGACY_PRIVACY_STORAGE_KEY, '1');
    expect(readConsentChoice()).toBe('accepted');

    window.localStorage.setItem(CONSENT_STORAGE_KEY, 'rejected');
    expect(readConsentChoice()).toBe('rejected');
  });

  it('persists consent and clears the legacy key', () => {
    window.localStorage.setItem(LEGACY_PRIVACY_STORAGE_KEY, '1');

    persistConsentChoice('accepted');

    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe('accepted');
    expect(window.localStorage.getItem(LEGACY_PRIVACY_STORAGE_KEY)).toBeNull();
  });

  it('applies consent through gtag when available', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    applyConsentChoice('accepted');

    expect(gtag).toHaveBeenCalledWith('consent', 'update', expect.objectContaining({
      analytics_storage: 'granted',
    }));
    expect(window.dataLayer).toContainEqual({
      event: 'consent_status_updated',
      consent_choice: 'accepted',
    });
  });

  it('tracks virtual page views and custom events', () => {
    trackVirtualPageView('/lab');
    trackEvent('custom_event', { mode: 'test' });

    expect(window.dataLayer).toContainEqual(expect.objectContaining({
      event: 'virtual_page_view',
      page_path: '/lab',
      page_title: 'Test Title',
    }));
    expect(window.dataLayer).toContainEqual({
      event: 'custom_event',
      mode: 'test',
    });
  });

  it('tracks CTA and outbound clicks and removes the listener on cleanup', () => {
    document.body.innerHTML = `
      <button data-cta-id="deploy" data-cta-section="hero" data-cta-label="Deploy now">Deploy</button>
      <a href="https://example.com/path">External Link</a>
    `;

    const cleanup = setupClickTracking();

    document.querySelector('button')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    document.querySelector('a')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.dataLayer).toContainEqual(expect.objectContaining({
      event: 'cta_click',
      cta_id: 'deploy',
      cta_section: 'hero',
      cta_label: 'Deploy now',
      page_path: '/current',
    }));
    expect(window.dataLayer).toContainEqual(expect.objectContaining({
      event: 'outbound_click',
      link_domain: 'example.com',
      link_text: 'External Link',
      page_path: '/current',
    }));

    cleanup();
    const previousLength = window.dataLayer?.length ?? 0;
    document.querySelector('a')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(window.dataLayer?.length).toBe(previousLength);
  });
});
