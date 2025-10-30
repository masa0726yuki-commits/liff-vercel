// api/profile.js — Vercel のサーバレス関数（GAS プロキシ）
// CORS対応 / GET(読み取り) と POST(保存) の両方に対応

const GAS_URL = "https://script.google.com/macros/s/AKfycbzAmoPLFYOIWr966QGSddWaPp3iO7H3cqHY__kpIWVY5UWJIlcAq6jueM0nM4aO873LUQ/exec";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  try {
    if (req.method === "GET") {
      // /api/profile?userId=xxxx
      const userId = (req.query?.userId || "").toString();
      if (!userId) return res.status(400).json({ ok: false, error: "userId required" });

      const url = `${GAS_URL}?action=get&userId=${encodeURIComponent(userId)}`;
      const gRes = await fetch(url, { method: "GET" });
      const text = await gRes.text();

      // JSON or JSONP のどちらでも受ける
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        const m = text.match(/^[\w$]+\((.*)\);?$/s);
        if (m) data = JSON.parse(m[1]);
      }

      return res.status(200).json(data ?? { ok: false, error: "Invalid GAS response" });
    }

    if (req.method === "POST") {
      // フロントからの JSON をそのまま GAS へ POST
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
        // JSON じゃない場合も一応返す
        return res.status(200).send(text);
      }
    }

    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
}
