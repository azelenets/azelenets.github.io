import { memo, useCallback, useEffect, useState } from 'react';
import { applyConsentChoice, persistConsentChoice, readConsentChoice } from '@/lib/analytics';

const PrivacyBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedChoice = readConsentChoice();
    if (!storedChoice) {
      setVisible(true);
      return;
    }

    setVisible(false);
  }, []);

  const selectConsent = useCallback((choice: 'accepted' | 'rejected') => {
    persistConsentChoice(choice);
    applyConsentChoice(choice);
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-primary/30 bg-black/95 backdrop-blur-md"
      style={{ boxShadow: '0 -4px 40px rgba(0,243,255,0.08)' }}
    >
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 flex flex-col items-center gap-1 pt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hazard opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-hazard" />
            </span>
            <div className="w-[1px] h-6 bg-primary/20" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[8px] font-black tracking-[0.3em] text-hazard uppercase">DATA_COLLECTION_DIRECTIVE</span>
              <span className="text-[8px] text-primary/30 font-mono">&#47;&#47; REF: GDPR_ART.13</span>
            </div>
            <p className="text-[10px] font-mono text-white/60 leading-relaxed max-w-2xl">
              This interface deploys <span className="text-primary">analytical trackers</span> and <span className="text-primary">session cookies</span>{' '}
              to monitor operational metrics and optimise system performance. Interaction data is processed in accordance with applicable data-protection
              protocols. Select your analytics preference to continue.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0 ml-6 md:ml-0">
          <button
            onClick={() => selectConsent('accepted')}
            className="relative px-6 py-2.5 bg-primary group hover:brightness-110 transition-all overflow-hidden slanted-clip"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
            <span className="relative z-10 text-black font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              ACCEPT ANALYTICS
            </span>
          </button>

          <button
            onClick={() => selectConsent('rejected')}
            className="text-[9px] font-bold tracking-[0.15em] text-white/30 hover:text-white/60 transition-colors uppercase"
          >
            Reject Non-Essential
          </button>
        </div>
      </div>
    </aside>
  );
};

export default memo(PrivacyBanner);
