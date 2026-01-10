import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL =
  "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Missing id" });
  }

  const url = `${BACKEND_URL}/listings/${id}`;

  try {
    const r = await fetch(url, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body:
        req.method === "GET" || req.method === "HEAD" || req.method === "DELETE"
          ? undefined
          : JSON.stringify(req.body),
    });

    const text = await r.text();
    return res.status(r.status).send(text);
  } catch (e: any) {
    return res.status(500).json({
      error: "Proxy error",
      message: e?.message,
      backend: url,
    });
  }
}
