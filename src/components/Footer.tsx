import { useState } from "react";
import { useConsent } from "./useConsent";

type Props = {
  onShowPrivacy: () => void;
};

export default function Footer({ onShowPrivacy }: Props) {
  const { consent, saveCustom, reset } = useConsent();
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  return (
    <div style={{ marginTop: 30, padding: 16, borderTop: "1px solid #eee", fontFamily: "sans-serif" }}>
      <button onClick={onShowPrivacy}>Privacy</button>
      <button onClick={() => setOpen(true)}>Privacy instellingen</button>

      {open && (
        <div style={{ marginTop: 12, padding: 12, border: "1px solid #ddd", borderRadius: 10, maxWidth: 420 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Instellingen</div>

          <div style={{ fontSize: 13, marginBottom: 10 }}>
            Noodzakelijk is altijd aan. Je kan je keuze altijd aanpassen.
          </div>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>Analytics</span>
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>Marketing</span>
          </label>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => {
                saveCustom(analytics, marketing);
                setOpen(false);
              }}
            >
              Opslaan
            </button>
            <button onClick={() => setOpen(false)}>Sluiten</button>
            <button
              onClick={() => {
                reset();
                setOpen(false);
              }}
            >
              Reset consent
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
