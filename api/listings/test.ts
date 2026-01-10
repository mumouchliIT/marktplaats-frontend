import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL =
  "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(`${BACKEND_URL}/listings/test`);
    const data = await response.text();
    res.status(response.status).send(data);
  } catch {
    res.status(500).json({ error: "Proxy error" });
  }
}
