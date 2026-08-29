# Overdracht — redesign overnemen met Claude Code

Dit pakket is compleet en draait standalone: `npm install && npm run dev`.
De projectdocumentatie voor Claude Code staat in [CLAUDE.md](CLAUDE.md) en wordt
automatisch geladen zodra je Claude Code in deze map opent.

Er zijn twee routes:

**Route A — verder bouwen in deze repo (aangeraden).** Open Claude Code in deze
map en begin gewoon; CLAUDE.md geeft alle context. Eerste logische klussen:
`data.ts` vervangen door de echte API en de no-op-knoppen afmaken.

**Route B — de redesign overzetten naar je bestaande project.** Kopieer dit hele
mapje ergens naast je bestaande codebase, open Claude Code in je eigen project
en plak de onderstaande prompt (vervang het pad).

---

## Prompt voor Claude Code (route B)

```text
In de map <PAD-NAAR-MIODASH> staat een compleet redesign van ons MIO Dashboard
in de officiële KPN-huisstijl (vanilla TypeScript + SCSS, Vite). Ik wil dat je
dit redesign overneemt in dit project. Werk zo:

1. Lees eerst <PAD-NAAR-MIODASH>/CLAUDE.md en README.md volledig — daar staan
   de architectuur, het designsysteem en de spelregels. Bekijk daarna
   src/styles/_tokens.scss, src/main.ts en één voorbeeldpagina
   (src/pages/begeleider.ts) om de patronen te snappen.

2. Neem het designsysteem één-op-één over, zonder eigen interpretatie:
   - src/styles/_tokens.scss (kleuren van static.kpn.com/ds, radii, schaduw)
   - src/fonts/ (KPN Metric + KPN Extended woff2's) met de @font-face-regels
   - src/icons.ts (de complete icoonfamilie)
   - de basisbouwstenen uit src/styles/_base.scss (kaart, badge, knoppen,
     meter, tabs) en de overige partials per pagina.

3. Draag de pagina's per rol over (MIO / Buiten MIO / Begeleider) en houd je
   aan de stijlregels uit CLAUDE.md: geen hexwaarden buiten de tokens, geen
   gekleurde left-borders (zachte tintvlakken), groene koppen, blauwe links,
   groene pilknoppen, geel alleen als accentchip.

4. Koppel de echte data: alles leest uit src/data.ts (getypeerd in
   src/types.ts). Vervang die ene laag door onze API/queries en laat de
   render-functies ongemoeid. De berekende onderdelen ("Vandaag te doen",
   "Jouw volgende stap", sessie-aandacht) moeten op echte data blijven werken.

5. Controleer na elke pagina met een build/de dev-server dat het beeld gelijk
   is aan het origineel (npm run dev in de redesign-map ernaast om te
   vergelijken), en lever per rol een werkende weergave op voordat je aan de
   volgende begint. Volgorde: Begeleider, MIO, Buiten MIO.

Vraag het me als onze bestaande stack ergens niet op dit patroon past
(bijv. een framework in plaats van vanilla TS) — stel dan eerst een
mapping voor voordat je grootschalig herschrijft.
```

---

## Wat er in het pakket zit

- 7 pagina's voor (buiten-)MIO's, 13 voor begeleiders, met werkende rollenwissel
- Officiële KPN-kleuren en -fonts, lokaal ingebouwd (geen externe CDN's)
- Berekenende kaarten: "Vandaag te doen" (begeleider) en "Jouw volgende stap"
- Alle voorbeelddata geanonimiseerd in `src/data.ts`
