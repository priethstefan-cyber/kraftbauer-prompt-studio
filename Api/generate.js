export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Nur POST erlaubt" });
  }
  const { text } = req.body || {};
  if (!text || text.trim().length < 3) {
    return res.status(400).json({ error: "Kein Text erhalten" });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API-Schlüssel fehlt (ANTHROPIC_API_KEY in Vercel eintragen)" });
  }

  const system = `You turn scene descriptions (often in South Tyrolean German dialect) into ONE polished English video prompt for Google Veo 3.

Rules:
- Output ONLY the prompt itself. No preamble, no explanation, no quotation marks.
- One flowing paragraph, 60-120 words.
- Cinematic and concrete: subject, action, setting, camera movement (e.g. drone shot, slow dolly, handheld), lens/framing, lighting, time of day, weather, color mood, and an audio cue (engine rumble, wind, music feel).
- Keep the alpine South Tyrol character when it fits: Dolomites, Pustertal valley, farms, trucks, mountain light.
- Translate dialect faithfully; if something is ambiguous, choose the most cinematic interpretation.`;

  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        system,
        messages: [{ role: "user", content: text.trim() }]
      })
    });

    const data = await r.json();
    if (!r.ok) {
      return res.status(502).json({ error: data?.error?.message || "Anthropic-API-Fehler" });
    }
    const prompt = (data.content || [])
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    return res.status(200).json({ prompt });
  } catch (e) {
    return res.status(500).json({ error: "Verbindung zur KI fehlgeschlagen" });
  }
}
