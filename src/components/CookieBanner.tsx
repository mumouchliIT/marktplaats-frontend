import { useState } from "react";
import { useConsent } from "./useConsent";

export default function CookieBanner() {
  const { hasChoice, setAllAccepted, setAllRejected, saveCustom } = useConsent();
  const [openSettings, setOpenSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  if (hasChoice) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 16,
        right: 16,
        bottom: 16,
        background: "grey",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        zIndex: 9999,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6 }}>Cookies en privacy</div>
      <div style={{ fontSize: 14, lineHeight: 1.4 }}>
        We gebruiken noodzakelijke cookies om de app te laten werken. Optionele cookies voor analytics of marketing zetten we alleen aan als jij dat goed vindt.
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={setAllAccepted}>Accepteren</button>
        <button onClick={setAllRejected}>Weigeren</button>
        <button onClick={() => setOpenSettings(true)}>Instellingen</button>
      </div>

      {openSettings && (
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #eee" }}>
          <div style={{ fontSize: 14, marginBottom: 10 }}>
            Noodzakelijk is altijd aan. Kies zelf wat je extra toestaat.
          </div>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>Analytics</span>
          </label>

          <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
            <span>Marketing</span>
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => {
                saveCustom(analytics, marketing);
                setOpenSettings(false);
              }}
            >
              Opslaan
            </button>
            <button onClick={() => setOpenSettings(false)}>Annuleren</button>
          </div>
        </div>
      )}
    </div>
  );
}
