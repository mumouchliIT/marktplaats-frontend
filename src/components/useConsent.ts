import { useContext } from "react";
import { ConsentContext } from "./consentContext";

export function useConsent() {
  const v = useContext(ConsentContext);
  if (!v) throw new Error("useConsent must be used inside ConsentProvider");
  return v;
}
