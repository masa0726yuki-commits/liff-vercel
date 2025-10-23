// api/profile.js —— そのままコピペOK！

const GAS_URL = "https://script.google.com/macros/s/AKfycbweU7jbWwdin2MgX7VPYhBmozSkvyc9ZHYez00rtjlw9ip-xK0GfglJi1UCCngYMlCiSg/exec";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST")
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });

  try {
    const gRes = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await gRes.text();
    try {
      const json = JSON.parse(text);
      return res.status(200).json(json);
    } catch {
      return res.status(200).send(text);
    }
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
