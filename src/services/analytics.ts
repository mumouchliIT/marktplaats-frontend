import { getConsent } from "./consent";

export function track(eventName: string, payload?: Record<string, unknown>) {
  const consent = getConsent();
  if (!consent?.analytics) return;

  const safePayload = payload ? JSON.parse(JSON.stringify(payload)) : undefined;
  console.log("[analytics]", eventName, safePayload);
}
