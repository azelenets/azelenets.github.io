export const CONSENT_STORAGE_KEY = 'aegis_consent_choice';
export const LEGACY_PRIVACY_STORAGE_KEY = 'aegis_privacy_acknowledged';
const GA_MEASUREMENT_ID = 'G-ELC1DH043N';
const GTM_CONTAINER_ID = 'GTM-KFBC3XH2';

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
    __aegisAnalyticsInitialized?: boolean;
    __aegisAnalyticsLoadScheduled?: boolean;
    __aegisAnalyticsLoadStarted?: boolean;
  }
}

const getDataLayer = () => {
  if (!window.dataLayer) window.dataLayer = [];
  return window.dataLayer;
};

const ensureGtagStub = () => {
  if (typeof window.gtag !== 'function') {
    window.gtag = (...args: unknown[]) => {
      getDataLayer().push(args);
    };
  }
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

const applyDefaultConsent = () => {
  ensureGtagStub();

  sendGtagCommand('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });
};

const appendScript = (src: string, id: string) => {
  if (document.querySelector(`script[data-analytics-id="${id}"]`)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  script.dataset.analyticsId = id;
  document.head.appendChild(script);
};

const loadAnalyticsScripts = () => {
  if (window.__aegisAnalyticsLoadStarted) return;
  window.__aegisAnalyticsLoadStarted = true;

  getDataLayer().push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });

  sendGtagCommand('js', new Date());
  sendGtagCommand('config', GA_MEASUREMENT_ID);

  appendScript(`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`, 'ga');
  appendScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`, 'gtm');
};

const scheduleAnalyticsLoad = () => {
  if (window.__aegisAnalyticsLoadScheduled) return;
  window.__aegisAnalyticsLoadScheduled = true;

  const start = () => {
    const load = () => loadAnalyticsScripts();

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(load, { timeout: 3000 });
      return;
    }

    globalThis.setTimeout(load, 1500);
  };

  if (document.readyState === 'complete') {
    start();
    return;
  }

  window.addEventListener('load', start, { once: true });
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

export const initializeAnalytics = (choice: ConsentChoice | null) => {
  getDataLayer();
  ensureGtagStub();

  if (!window.__aegisAnalyticsInitialized) {
    applyDefaultConsent();
    window.__aegisAnalyticsInitialized = true;
  }

  if (choice) {
    applyConsentChoice(choice);
  }
};

export const applyConsentChoice = (choice: ConsentChoice) => {
  const consentPayload = consentPayloadFor(choice);

  sendGtagCommand('consent', 'update', consentPayload);

  getDataLayer().push({
    event: 'consent_status_updated',
    consent_choice: choice,
  });

  if (choice === 'accepted') {
    scheduleAnalyticsLoad();
  }
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
