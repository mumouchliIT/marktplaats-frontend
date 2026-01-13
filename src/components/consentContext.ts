import { createContext } from "react";
import type { ConsentPrefs } from "../services/consent";

export type ConsentCtx = {
  consent: ConsentPrefs | null;
  setAllAccepted: () => void;
  setAllRejected: () => void;
  saveCustom: (analytics: boolean, marketing: boolean) => void;
  reset: () => void;
  hasChoice: boolean;
};

export const ConsentContext = createContext<ConsentCtx | undefined>(undefined);
