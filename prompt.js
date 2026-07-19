// Serverless-Funktion auf Vercel.
// Der API-Key liegt NUR hier am Server (Umgebungsvariable ANTHROPIC_API_KEY),
// niemals im Browser.

const SYSTEM_PROMPT = `Du bist ein Experte für Video-Prompts für Google Veo 3. Der Nutzer beschreibt eine Videoidee auf Deutsch oder im Südtiroler Dialekt — oft mit Lkw (Scania), Bagger, Landwirtschaft, Bergen, Dörfern. Verwandle die Beschreibung in EINEN professionellen englischen Veo-Prompt: ein Absatz, 60–120 Wörter, konkret zu Motiv, Umgebung, Tageszeit, Licht; Kameraführung explizit; Bildbewegung beschreiben; Stil/Look; wenn sinnvoll kurze Audio-Angabe (keine Songtexte). Fehlende Details stimmig ergänzen, nichts Widersprüchliches erfinden. Antworte AUSSCHLIESSLICH mit dem fertigen Prompt.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Nur POST erlaubt' });
  }

  const idea = (req.body && req.body.idea ? String(req.body.idea) : '').trim();
  if (!idea) {
    return res.status(400).json({ error: 'Keine Videoidee erhalten' });
  }
  if (idea.length > 4000) {
    return res.status(400).json({ error: 'Die Beschreibung ist zu lang' });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: 'ANTHROPIC_API_KEY fehlt (in Vercel unter Settings → Environment Variables eintragen)'
    });
  }

  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: idea }]
      })
    });

    const data = await r.json();

    if (!r.ok) {
      const msg = (data && data.error && data.error.message) || 'Claude-API-Fehler';
      return res.status(502).json({ error: msg });
    }

    const prompt = (data.content || [])
      .map((b) => (b.type === 'text' ? b.text : ''))
      .join('')
      .trim();

    if (!prompt) {
      return res.status(502).json({ error: 'Leere Antwort von der Claude-API' });
    }

    return res.status(200).json({ prompt });
  } catch (err) {
    return res.status(500).json({ error: 'Verbindung zur Claude-API fehlgeschlagen' });
  }
}
