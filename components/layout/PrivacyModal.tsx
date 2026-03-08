import { memo, useEffect, useCallback } from 'react';

interface PrivacyModalProps {
  onClose: () => void;
}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <div className="text-primary/50 text-[9px] font-black tracking-[0.3em] uppercase flex items-center gap-2">
      <span className="material-symbols-outlined text-xs">chevron_right</span>
      {label}
    </div>
    <div className="text-[11px] font-mono text-white/55 leading-relaxed pl-5">{children}</div>
  </div>
);

const PrivacyModal = ({ onClose }: PrivacyModalProps) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] flex flex-col bg-black/95 border border-primary/30 shadow-[0_0_60px_rgba(0,243,255,0.08)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent flex-shrink-0" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-4 border-b border-primary/10 flex-shrink-0">
          <div>
            <div className="text-[8px] text-hazard font-black tracking-[0.35em] uppercase mb-1">
              LEGAL_DIRECTIVE // REF: GDPR_ART.13
            </div>
            <h2 className="text-white font-display font-black text-lg uppercase tracking-tight">
              Terms of Use &amp; Privacy Policy
            </h2>
            <div className="text-[9px] text-primary/40 font-mono mt-0.5">
              Effective date: 2025.01.01 — Last revised: 2026.03.08
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-4 text-white/30 hover:text-primary transition-colors mt-1"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto px-6 py-5 space-y-6 flex-1">

          {/* ── TERMS OF USE ── */}
          <div className="text-[8px] text-primary font-mono tracking-[0.3em] uppercase border-b border-primary/40 pb-1">
            SECTION_01 — TERMS_OF_USE
          </div>

          <Section label="Acceptance">
            By accessing this interface you agree to be bound by these terms. If you do not agree,
            discontinue access immediately.
          </Section>

          <Section label="Purpose">
            This site is a personal engineering portfolio — informational only. No products, services,
            or subscriptions are sold through this interface. All content is provided for demonstration
            and professional contact purposes.
          </Section>

          <Section label="Intellectual Property">
            All content, design, source code, copy, and media on this site are the exclusive property
            of the operator. Reproduction, redistribution, or commercial use without prior written
            consent is prohibited.
          </Section>

          <Section label="Limitation of Liability">
            This site is provided &quot;as-is&quot; without warranties of any kind. The operator is not liable
            for any direct, indirect, or incidental damages arising from your use of this interface or
            reliance on information presented herein.
          </Section>

          <Section label="External Links">
            Links to third-party resources are provided for convenience only. The operator assumes no
            responsibility for the content, privacy practices, or availability of external sites.
          </Section>

          {/* ── PRIVACY POLICY ── */}
          <div className="text-[8px] text-primary font-mono tracking-[0.3em] uppercase border-b border-primary/40 pb-1 pt-2">
            SECTION_02 — PRIVACY_POLICY
          </div>

          <Section label="Data Controller">
            The data controller for this site is the individual operator reachable via the contact
            channels published on this interface.
          </Section>

          <Section label="Data Collected">
            This site deploys anonymised analytical trackers and session cookies via Google Tag
            Manager (GTM-KFBC3XH2) to measure page engagement, referral sources, and navigation
            patterns. No personally identifiable information (PII) is collected without explicit
            submission. If you contact the operator directly, only the information you voluntarily
            provide is retained.
          </Section>

          <Section label="Legal Basis (GDPR Art. 6)">
            Processing for strictly necessary cookies is based on legitimate interest. Processing for
            analytics is based on your explicit consent preference selected in the privacy banner.
          </Section>

          <Section label="Data Retention">
            Analytical data is retained in aggregated, anonymised form for up to 24 months.
            Voluntarily submitted contact data is retained only as long as necessary to respond to
            your inquiry and is deleted upon request.
          </Section>

          <Section label="Third-Party Processors">
            This site uses Google Tag Manager (container ID: GTM-KFBC3XH2) to manage and deploy
            analytics and tracking scripts, which may include Google Analytics. These processors
            operate under Google&apos;s Privacy Policy (policies.google.com/privacy) and are bound by
            data processing agreements compliant with applicable law.

          </Section>

          <Section label="Your Rights">
            Under GDPR you have the right to access, rectify, erase, restrict, and port your personal
            data, and to object to processing. To exercise any right, contact the operator via the
            channels on this site. You also have the right to lodge a complaint with your national
            supervisory authority.
          </Section>

          <Section label="Cookies">
            Session cookies are used solely to maintain interface state and are deleted when you close
            your browser. Analytical cookies persist for up to 13 months and can be cleared via your
            browser settings.
          </Section>

          <Section label="Policy Updates">
            This document may be updated periodically. Continued use of the site after updates
            constitutes acceptance of the revised terms. The effective date above reflects the latest
            revision.
          </Section>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 border-t border-primary/10 px-6 py-4 flex items-center justify-between">
          <span className="text-[9px] font-mono text-white/25 uppercase tracking-widest">
            ENCRYPTED_ENDPOINT_33 // SECURE_CHANNEL
          </span>
          <button
            onClick={onClose}
            className="relative px-5 py-2 bg-primary hover:brightness-110 transition-all slanted-clip"
          >
            <span className="text-black font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              ACKNOWLEDGED
            </span>
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent flex-shrink-0" />
      </div>
    </div>
  );
};

export default memo(PrivacyModal);
