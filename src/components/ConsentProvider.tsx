import React, { useMemo, useState } from "react";
import type { ConsentPrefs } from "../services/consent";
import { getConsent, saveConsent, clearConsent } from "../services/consent";
import { ConsentContext, type ConsentCtx } from "./consentContext";

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentPrefs | null>(() => getConsent());

  const api = useMemo<ConsentCtx>(() => {
    return {
      consent,
      hasChoice: !!consent,
      setAllAccepted: () => setConsent(saveConsent({ analytics: true, marketing: true, necessary: true })),
      setAllRejected: () => setConsent(saveConsent({ analytics: false, marketing: false, necessary: true })),
      saveCustom: (analytics, marketing) =>
        setConsent(saveConsent({ analytics, marketing, necessary: true })),
      reset: () => {
        clearConsent();
        setConsent(null);
      },
    };
  }, [consent]);

  return <ConsentContext.Provider value={api}>{children}</ConsentContext.Provider>;
}
