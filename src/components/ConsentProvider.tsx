import React, { createContext, useContext, useMemo, useState } from "react";
import type { ConsentPrefs } from "../services/consent";
import { getConsent, saveConsent, clearConsent } from "../services/consent";

type ConsentCtx = {
  consent: ConsentPrefs | null;
  setAllAccepted: () => void;
  setAllRejected: () => void;
  saveCustom: (analytics: boolean, marketing: boolean) => void;
  reset: () => void;
  hasChoice: boolean;
};

const Ctx = createContext<ConsentCtx | undefined>(undefined);

export function useConsent() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useConsent must be used inside ConsentProvider");
  return v;
}

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

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
