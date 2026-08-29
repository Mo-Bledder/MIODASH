# MIO Dashboard

Redesign van het MIO Dashboard in KPN-huisstijl — gebouwd met **TypeScript + SCSS** (Vite, geen framework).

## Starten

```bash
npm install
npm run dev      # ontwikkelserver op http://localhost:5173
npm run build    # productie-build in dist/
```

## Opbouw

```
src/
  main.ts               # app-shell, hash-router en interactie (kopiëren, tooltips)
  data.ts               # voorbeelddata (in productie: API)
  types.ts              # datamodel
  icons.ts              # inline SVG-iconen (één consistente lijnfamilie)
  pages/                # één render-functie per pagina (route in main.ts)
    dashboard.ts        #   #/          — overzicht
    voortgang.ts        #   #/voortgang — traject, workshops, aanwezigheid
    kpis.ts             #   #/kpis      — KPI-tegels met trend + weektabel
    sessies.ts          #   #/sessies   — meeluistersessies met scores
    kluisje.ts          #   #/kluisje   — kluisnummer + kluisjeswand
    games.ts            #   #/games     — Wordle, Woordgraden, ChallengeMIO
    snackkast.ts        #   #/snackkast — balans + prijslijst met filters
    begeleider.ts       #   begeleidersrol: dashboard met MIO's-overzicht
    sessiesBeheer.ts    #   begeleider: sessies per MIO (+ aandachtsignalen)
    certificeringen.ts  #   begeleider: certificeringen per MIO
    crediteringen.ts    #   begeleider: afkeur-workflow, bundels per MIO
    kluisjesBeheer.ts   #   begeleider: kluisjes toewijzen (vloer-layout)
    roosters.ts         #   begeleider: werkdagen en uren per MIO
    kpiOverzicht.ts     #   begeleider: team-KPI's per week (incl. oud-MIO's)
    trainingsvoortgang.ts # begeleider: voortgang per MIO + workshops
    teamplanning.ts     #   begeleider: aanwezigheid, beschikbaarheid, verlof
    weekOverzicht.ts    #   begeleider: weeknotities per MIO
    vandaag.ts          #   begeleider: wie is er vandaag + agenda van de dag
    agenda.ts           #   begeleider: weekkalender met trainingen en sessies
    overdrachten.ts     #   begeleider: dagelijkse overdrachten per maand
  components/           # herbruikbare onderdelen
    sidebar.ts · header.ts · mededelingen.ts · snelkoppelingen.ts
    voortgang.ts · kpis.ts · mijlpalen.ts · grafiek.ts
  styles/
    _tokens.scss        # alle kleuren en vormen als CSS custom properties
    _base.scss          # reset, layout, gedeelde bouwstenen (kaart, badge, meter…)
    _<component>.scss   # per component/pagina één partial
```

## Designkeuzes (officiële KPN-huisstijl)

- **Officiële KPN-tokens**: kleuren komen rechtstreeks uit het huidige designsysteem
  op `static.kpn.com/ds` (kpn-design-tokens.css) — primair groen `#00c300`/`#00a800`,
  linkblauw `#0066ee`, lime `#ddff44`, caution `#ff8811`, error `#e22e22`, neutralen
  `#131313`/`#737373`/`#e3e3e3`.
- **KPN Metric** (regular/semibold/bold, originele woff2's van static.kpn.com) voor
  alle tekst en **KPN Extended** voor de grote display-koppen — exact de fonts van
  kpn.com. Lokaal ingebouwd, geen externe font-CDN's nodig.
- **Zachte tintkaarten** in plaats van gekleurde randjes: waarschuwingen, afkeuringen
  en agenda-blokken staan op een soft-transparante tint van hun kleur.
- **Groene pil-knoppen** met witte tekst voor primaire acties, zoals de CTA's op kpn.com.
- **kpn.com-accenten**: koppen in KPN-groen, tekstlinks in blauw, gele accentchips
  ("Deze week", verlofstatus), royale kaartrondingen en een groene topbalk.
- **Alles in één oogopslag**: compacte maatvoering zodat snelkoppelingen, voortgang,
  KPI's en mijlpalen samen op één scherm passen zonder scrollen.
- **Snelkoppelingen** naar de echte tools (NICE Rooster, TeamKPN, Beeline) plus de
  EEM-activatiecode als klik-om-te-kopiëren chip — links en code staan in `src/data.ts`.
- Rood/groen alleen voor betekenis (positief/negatief bij KPI's), nooit als decoratie.

## Rollen

Linksonder in de sidebar zit een **"Bekijk als"**-wissel tussen drie rollen:

- **MIO** — in traject: dashboard mét weekrooster, Mijn rooster (incl. verlof
  aanvragen), voortgang, KPI's, sessies, eigen certificeringen, kluisje, games, snackkast.
- **Buiten MIO** — traject afgerond: zelfde basis, maar zonder rooster/verlof;
  snelkoppelingen naar NICE, TeamKPN en Beeline in plaats van het rooster.
- **Begeleider** — volledige eigen navigatie: dashboard met overdracht-stats en
  MIO-voortgang, Vandaag, Agenda (weekkalender), Overdrachten, Week overzicht,
  Team planning, Trainingsvoortgang, KPI overzicht (incl. oud-MIO's), Roosters,
  Meeluistersessies, Certificeringen, Crediteringen en Kluisjesbeheer.

Alle namen in de voorbeelddata zijn geanonimiseerd (Mio 1–9, Begeleider Test,
Begeleider 1–7, Oud-Mio 1–3).

**Slim, niet druk**: het begeleider-dashboard opent met een automatisch berekende
actielijst ("Vandaag te doen") die alles verzamelt wat aandacht vraagt — sessies
die te lang geleden zijn, crediteringen, certificeringen, beschikbaarheid en
kluisjes — met een directe link naar de juiste pagina. (Buiten-)MIO's krijgen een
"Jouw volgende stap"-kaart met persoonlijke suggesties uit hun eigen data.

In productie bepaalt de ingelogde gebruiker de rol; de wissel is er voor het ontwerpen.

Alle kleuren staan in `src/styles/_tokens.scss` — één plek om de huisstijl bij te stellen.
