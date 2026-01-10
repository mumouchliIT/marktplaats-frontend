export default async function handler(req: Request) {
  const BACKEND_URL =
    "http://listing-service-env.eba-rtff238k.eu-north-1.elasticbeanstalk.com";

  try {
    const response = await fetch(`${BACKEND_URL}/listings`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : await req.text(),
    });

    const data = await response.text();

    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Proxy error" }),
      { status: 500 }
    );
  }
}
