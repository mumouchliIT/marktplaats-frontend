import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL =
  "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = `${BACKEND_URL}/listings/test`;
    const r = await fetch(url);
    const text = await r.text();

    res.status(r.status);
    return res.send(text);
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return res.status(500).json({ error: "Proxy error", detail: message });
  }
}
