# MIO Dashboard

Redesign van het MIO Dashboard (KPN klantenservice-onboarding) in de officiële
KPN-huisstijl. Vanilla **TypeScript + SCSS** via Vite — bewust geen framework,
zodat de code makkelijk te lezen en over te nemen is.

## Commands

```bash
npm install        # eenmalig
npm run dev        # ontwikkelserver op http://localhost:5173
npm run build      # tsc (type-check) + vite build naar dist/
```

Er zijn geen tests; `npm run build` is de kwaliteitscheck (strict TypeScript).

## Architectuur

- **`src/main.ts`** — app-shell, hash-router en alle interactie (event-delegatie
  op `#app`: rollenwissel, snackkastfilters, crediteringen afvinken, kopiëren,
  grafiek-tooltips). Routes per rol staan in `paginasPerRol`.
- **Drie rollen** (`Rol` in types.ts): `mio` (in traject, mét rooster/verlof),
  `buiten-mio` (traject afgerond, snelkoppelingen i.p.v. rooster) en
  `begeleider` (teamweergave). De wissel zit linksonder in de sidebar en is een
  ontwerphulpmiddel — in productie bepaalt de login de rol.
- **`src/pages/`** — één render-functie per pagina, geeft een HTML-string terug.
- **`src/components/`** — herbruikbare onderdelen (sidebar, header, grafiek,
  volgendeStap, …).
- **`src/data.ts`** — de enige databron, getypeerd via `src/types.ts`. Alle
  pagina's zijn puur data-gedreven; dit bestand vervangen door API-calls is de
  bedoelde integratiestap. Namen zijn geanonimiseerd (Mio 1–9, Begeleider Test).
- **`src/icons.ts`** — de complete icoonfamilie als inline SVG (lijnstijl, 24×24,
  `currentColor`). Nieuwe iconen horen hier, nergens anders.

## Designsysteem — de spelregels

De volledige huisstijl staat in **`src/styles/_tokens.scss`** en komt
rechtstreeks uit KPN's eigen bronnen:

- Kleuren: `kpn-design-tokens.css` van `static.kpn.com/ds/design-tokens/` —
  primair `#00c300`/`#00a800`/`#008200`, linkblauw `#0066ee`, lime `#ddff44`,
  caution `#ff8811`, error `#e22e22`, neutralen `#131313`/`#737373`/`#e3e3e3`.
- Fonts: originele woff2's van `static.kpn.com/ds/assets/fonts/` —
  **KPN Metric** (400/600/700) voor alle tekst, **KPN Extended** (variabel)
  alleen voor display-koppen via `--lettertype-display`.

Regels die het geheel consistent houden:

1. **Nooit hexwaarden in componenten** — altijd de CSS custom properties uit
   `_tokens.scss` (`var(--groen-600)`, `var(--oranje-tint)`, …).
2. **Geen gekleurde left-borders** — status krijgt een zachte tint over de hele
   kaart (`--oranje-zacht`, `--rood-tint`, `--blauw-tint`, `--groen-50`).
3. Paginatitels (h1) zijn groen in KPN Extended; kaarttitels (h2) groen in
   Metric bold; tekstlinks blauw (`.knop-link`); primaire acties groene pillen
   (`.knop-primair`); geel (`--geel`) alleen als accentchip.
4. Rood/oranje alleen met betekenis (fout, aandacht), nooit als decoratie.
5. SCSS: één partial per component/pagina, BEM-achtig
   (`blok__element`, `--modifier`, `is-state`), aangemeld in `main.scss`.
6. Domeintaal is Nederlands (ook in code: `voortgang`, `kluisje`, `begeleider`).

## Slimme onderdelen (niet slopen)

- Begeleider-dashboard opent met **"Vandaag te doen"**: `bepaalActies()` in
  `pages/begeleider.ts` rekent alle aandachtspunten uit de data uit
  (sessies 7+ dagen geleden, crediteringen, certificeringen ≥90%, ontbrekende
  beschikbaarheid/kluisjes, overdracht van vandaag op werkdagen).
- (Buiten-)MIO-dashboards openen met **"Jouw volgende stap"**
  (`components/volgendeStap.ts`), ook volledig berekend.
- Sessie-aandachtslogica (`sessieAandacht`, `dagenGeleden`) staat in
  `pages/sessiesBeheer.ts` en rekent live vanaf vandaag.

## Nog open

- `data.ts` vervangen door echte API-koppeling; rol uit de login halen.
- Knoppen die nu no-op zijn: verlof aanvragen, sessie/certificering starten,
  overdracht bewerken, balans bijvullen, games spelen, agenda inplannen.
- Begeleiderpagina's "Bekijken/Detail"-links wijzen nog nergens naartoe.
