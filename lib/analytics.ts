export const CONSENT_STORAGE_KEY = 'aegis_consent_choice';
export const LEGACY_PRIVACY_STORAGE_KEY = 'aegis_privacy_acknowledged';

export type ConsentChoice = 'accepted' | 'rejected';

interface ConsentPayload {
  ad_storage: 'denied' | 'granted';
  ad_user_data: 'denied' | 'granted';
  ad_personalization: 'denied' | 'granted';
  analytics_storage: 'denied' | 'granted';
  functionality_storage: 'denied' | 'granted';
  security_storage: 'denied' | 'granted';
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const getDataLayer = () => {
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
};

const sendGtagCommand = (...args: unknown[]) => {
  if (typeof window.gtag === 'function') {
    window.gtag(...args);
    return;
  }

  getDataLayer().push(args);
};

const consentPayloadFor = (choice: ConsentChoice): ConsentPayload => {
  const analytics = choice === 'accepted' ? 'granted' : 'denied';

  return {
    analytics_storage: analytics,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  };
};

export const readConsentChoice = (): ConsentChoice | null => {
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (value === 'accepted' || value === 'rejected') return value;

  // Keep backward compatibility with old one-button acknowledgement banner.
  if (window.localStorage.getItem(LEGACY_PRIVACY_STORAGE_KEY) === '1') return 'accepted';

  return null;
};

export const persistConsentChoice = (choice: ConsentChoice) => {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  window.localStorage.removeItem(LEGACY_PRIVACY_STORAGE_KEY);
};

export const applyConsentChoice = (choice: ConsentChoice) => {
  const consentPayload = consentPayloadFor(choice);

  sendGtagCommand('consent', 'update', consentPayload);

  getDataLayer().push({
    event: 'consent_status_updated',
    consent_choice: choice,
  });
};

export const trackVirtualPageView = (pathname: string) => {
  getDataLayer().push({
    event: 'virtual_page_view',
    page_path: pathname,
    page_location: window.location.href,
    page_title: document.title,
  });
};

interface AnalyticsEventPayload {
  [key: string]: string | number | boolean | null | undefined;
}

export const trackEvent = (event: string, payload: AnalyticsEventPayload = {}) => {
  getDataLayer().push({
    event,
    ...payload,
  });
};

const normalizeText = (value: string | null | undefined) => {
  if (!value) return '';
  return value.trim().replace(/\s+/g, ' ').slice(0, 120);
};

export const setupClickTracking = () => {
  const clickHandler = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const ctaElement = target.closest<HTMLElement>('[data-cta-id]');
    if (ctaElement) {
      const ctaId = ctaElement.dataset.ctaId;
      const ctaSection = ctaElement.dataset.ctaSection ?? null;
      const ctaLabel = normalizeText(ctaElement.dataset.ctaLabel ?? ctaElement.textContent);

      trackEvent('cta_click', {
        cta_id: ctaId ?? 'unknown',
        cta_section: ctaSection,
        cta_label: ctaLabel || null,
        page_path: window.location.pathname,
      });
    }

    const anchor = target.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) return;

    const href = anchor.getAttribute('href');
    if (!href) return;

    const isHttpLink = href.startsWith('http://') || href.startsWith('https://');
    const isMailOrTel = href.startsWith('mailto:') || href.startsWith('tel:');
    if (!isHttpLink && !isMailOrTel) return;

    const destination = new URL(anchor.href, window.location.origin);
    const isOutbound = destination.origin !== window.location.origin || isMailOrTel;
    if (!isOutbound) return;

    trackEvent('outbound_click', {
      link_url: anchor.href,
      link_domain: destination.hostname || null,
      link_text: normalizeText(anchor.textContent) || null,
      page_path: window.location.pathname,
    });
  };

  document.addEventListener('click', clickHandler);
  return () => document.removeEventListener('click', clickHandler);
};
