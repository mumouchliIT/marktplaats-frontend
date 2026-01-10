import type { VercelRequest, VercelResponse } from "@vercel/node";

const BACKEND_URL =
  "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const pathParts = (req.query.path ?? []) as string[];
    const restPath = pathParts.length ? `/${pathParts.join("/")}` : "";
    const url = `${BACKEND_URL}/listings${restPath}`;

    const r = await fetch(url, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        ...(req.headers.authorization
          ? { Authorization: String(req.headers.authorization) }
          : {}),
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    const text = await r.text();
    return res.status(r.status).send(text);
  } catch (e: any) {
    return res.status(500).json({
      error: "Proxy error",
      message: e?.message,
      backend: BACKEND_URL,
    });
  }
}
