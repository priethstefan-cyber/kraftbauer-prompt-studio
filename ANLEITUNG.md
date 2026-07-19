# Kraftbauer Prompt-Studio — Anleitung fürs Handy

Diese Anleitung bringt die App online, nur mit deinem Samsung-Handy. Alles läuft im Chrome-Browser. Rechne mit etwa 30–45 Minuten. Du kannst jederzeit Pause machen — nichts geht verloren.

**Was du brauchst:** die 6 Dateien aus dem ZIP (vorher am Handy entpacken: ZIP antippen → „Entpacken" / „Alle extrahieren"), dein GitHub-Konto (priethstefan-cyber) und später ein Anthropic-Konto mit kleinem Guthaben (~5 €).

---

## Teil 1: Die Dateien auf GitHub hochladen

GitHub ist wie ein Online-Ordner für den Code. Vercel (der Dienst, der die App ins Internet stellt) holt sich den Code später von dort.

1. Öffne Chrome und gehe auf **github.com** → melde dich an.
2. **Wichtiger Trick:** Tippe in Chrome oben rechts auf die drei Punkte ⋮ und setze den Haken bei **„Desktopwebsite"**. Die Seite sieht dann klein aus (mit zwei Fingern zoomen), aber nur so funktioniert das Hochladen von Dateien.
3. Tippe oben rechts auf das **+** → **„New repository"**.
4. Bei „Repository name" eintragen: **kraftbauer-prompt-studio**
5. „Public" ausgewählt lassen → unten auf den grünen Knopf **„Create repository"**.
6. Auf der nächsten Seite steht ein Link: **„uploading an existing file"** — den antippen.
7. Tippe auf **„choose your files"** und wähle diese 5 Dateien aus dem entpackten Ordner aus (mehrere gleichzeitig auswählen geht: erste Datei gedrückt halten, dann die anderen antippen):
   - index.html
   - manifest.json
   - sw.js
   - icon-192.png
   - icon-512.png
   
   (Die Datei ANLEITUNG.md musst du nicht hochladen, kannst du aber.)
8. Unten auf den grünen Knopf **„Commit changes"**. Fertig — die 5 Dateien sind oben.

**Jetzt fehlt noch eine Datei, die in einen Unterordner muss:**

9. Im Repository auf **„Add file"** → **„Create new file"**.
10. Oben ins Namensfeld **genau das** eintippen: `api/prompt.js` — der Schrägstrich erzeugt automatisch den Ordner „api".
11. Öffne auf dem Handy die Datei **prompt.js** aus dem Ordner „api" im entpackten ZIP (mit einer Text-App oder „HTML Viewer" → „Text"), **alles markieren und kopieren**, dann im GitHub-Feld einfügen.
    - Wenn das Öffnen als Text nicht klappt: Sag mir Bescheid, dann geben wir dir den Text zum Kopieren direkt im Chat.
12. Unten auf **„Commit changes"**.

✅ Kontrolle: Im Repository müssen jetzt zu sehen sein: ein Ordner **api**, dazu **index.html**, **manifest.json**, **sw.js**, **icon-192.png**, **icon-512.png**.

---

## Teil 2: Anthropic-Konto und API-Key

Der API-Key ist wie ein Schlüssel, mit dem deine App bei Claude Prompts bestellen darf. Er kostet nur, was du wirklich nutzt — ein Prompt kostet weniger als 1 Cent.

1. Gehe auf **console.anthropic.com** → Konto erstellen (mit Google-Konto anmelden geht am schnellsten).
2. Links im Menü auf **„Billing"** (Abrechnung) → **„Add funds"** → **5 $** aufladen (Kreditkarte oder Google Pay). Das reicht für hunderte Prompts.
3. Links auf **„API Keys"** → **„Create Key"** → Name eingeben, z. B. `kraftbauer` → **„Create"**.
4. Der Key wird **nur einmal** angezeigt (fängt mit `sk-ant-` an). **Kopieren** und kurz sicher zwischenspeichern (z. B. in Samsung Notes). Gleich brauchen wir ihn.

⚠️ Den Key niemandem schicken und nirgends öffentlich posten — wer ihn hat, kann auf deine Kosten Prompts erzeugen.

---

## Teil 3: Mit Vercel ins Internet stellen

1. Gehe auf **vercel.com** → **„Sign Up"** → **„Continue with GitHub"** → mit deinem GitHub-Konto anmelden und die Verbindung erlauben.
2. Nach der Anmeldung: **„Add New…"** → **„Project"**.
3. In der Liste erscheint **kraftbauer-prompt-studio** → daneben auf **„Import"**.
4. **Bevor** du auf Deploy drückst: Den Bereich **„Environment Variables"** aufklappen. Dort eintragen:
   - Bei **Name/Key:** `ANTHROPIC_API_KEY`
   - Bei **Value:** deinen Key aus Teil 2 einfügen (der mit `sk-ant-…`)
   - Auf **„Add"** tippen.
5. Jetzt auf **„Deploy"**. Nach 1–2 Minuten kommt Konfetti 🎉 und ein Link wie `kraftbauer-prompt-studio.vercel.app`.
6. Link antippen → die App öffnet sich. **Test:** Mikrofon erlauben, Idee einsprechen (z. B. „Der Scania fahrt in der Fruah durchs Pustertal"), auf „Prompt erstellen" drücken. Nach ein paar Sekunden kommt der englische Veo-Prompt → „Prompt kopieren" → in Google Flow einfügen.
7. Danach kannst du den Key aus Samsung Notes wieder löschen — er ist jetzt sicher bei Vercel hinterlegt.

**Wenn ein Fehler kommt:** Mach einen Screenshot und zeig ihn mir im Chat — wir lösen das gemeinsam.

---

## Teil 4: App auf den Startbildschirm + „Hey Google"

1. Öffne die App-Adresse (…vercel.app) in Chrome.
2. Drei Punkte ⋮ oben rechts → **„Zum Startbildschirm hinzufügen"** (oder „App installieren") → **„Hinzufügen"**.
3. Auf dem Startbildschirm liegt jetzt das Bernstein-Icon **„Kraftbauer"**.
4. Test: **„Hey Google, öffne Kraftbauer"** sagen. Google findet installierte Apps meist am Namen. 
   - Falls Google es nicht findet: Google-App öffnen → Profilbild → „Einstellungen" → „Google Assistant" → „Verknüpfungen"/„Routinen" → neue Routine: Sprachbefehl „öffne Kraftbauer" → Aktion „App öffnen" → Kraftbauer auswählen.
5. Beim Öffnen fängt die App automatisch an zuzuhören (beim allerersten Mal fragt sie einmal nach der Mikrofon-Erlaubnis — „Zulassen" drücken, danach nie wieder).

---

## Was als Nächstes kommt (Teil 3 vom Bauplan)

Die Bild-Bibliothek aus deinem Google-Drive-Ordner „Kraftbauer Motive" (Bild per Sprache auswählen, z. B. „…nimm das Scania-Bild") bauen wir ein, **sobald diese Grundversion bei dir läuft**. Dafür führen wir dich dann Schritt für Schritt durch die Google Cloud Console — das ist der kniffligste Teil, den machen wir gemeinsam in Ruhe.
