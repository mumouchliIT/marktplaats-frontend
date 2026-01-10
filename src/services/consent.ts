export type ConsentPrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
  consentId: string;
};

const KEY = "gdpr_consent_v1";

function randomId() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function getConsent(): ConsentPrefs | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentPrefs;
  } catch {
    return null;
  }
}

export function saveConsent(prefs: { necessary: true; analytics: boolean; marketing: boolean }) {
  const current = getConsent();
  const next: ConsentPrefs = {
    necessary: true,
    analytics: prefs.analytics,
    marketing: prefs.marketing,
    updatedAt: new Date().toISOString(),
    consentId: current?.consentId || randomId(),
  };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function clearConsent() {
  localStorage.removeItem(KEY);
}
