import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const backendURL = "http://150.241.244.175:8070/admin-new-apis" + req.url;

  const response = await fetch(backendURL, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
      ...(req.headers.authorization && { Authorization: req.headers.authorization })
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  return res.status(response.status).json(data);
}
