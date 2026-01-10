import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL = "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const path = Array.isArray(req.query.path) ? req.query.path.join("/") : "";
    const url = `${BACKEND_URL}/${path}`;

    const upstream = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: req.method === "GET" || req.method === "HEAD" ? undefined : JSON.stringify(req.body),
    });

    const text = await upstream.text();

    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") ?? "application/json");
    return res.send(text);
  } catch (e) {
    return res.status(500).json({ error: "Proxy error" });
  }
}
