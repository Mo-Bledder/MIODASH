# Overdracht — het redesign overnemen met Claude Code

Deze map bevat het goedgekeurde **redesign** van het MIO Dashboard. Het bestaande
dashboard heeft méér functionaliteit dan hier is nagebouwd — de bedoeling is dus
niet dat deze code het project vervangt, maar dat jouw Claude Code **het design
overneemt** op alles wat het huidige dashboard al kan. Puur de presentatielaag;
data en logica blijven onaangeraakt.

Zo werkt het: zet deze map ergens naast je bestaande project, open Claude Code in
je eigen project en plak de onderstaande prompt (vervang `<PAD-NAAR-MIODASH>`).
De referentie draait lokaal met `npm install && npm run dev`, zodat je elke
pagina naast het origineel kunt leggen.

---

## De prompt voor Claude Code

```text
In de map <PAD-NAAR-MIODASH> staat het goedgekeurde redesign van ons MIO
Dashboard (vanilla TypeScript + SCSS, Vite). Jouw taak: neem dit design volledig
over in dit project. LET OP: dit is een pure design-overname — de
functionaliteit, de datalaag en de logica van dit project blijven exact zoals ze
zijn.

Spelregels:

1. Lees eerst CLAUDE.md en README.md in de redesign-map, en bekijk daarna
   src/styles/_tokens.scss, src/styles/_base.scss, src/icons.ts en een paar
   pagina's (src/pages/begeleider.ts, src/pages/mioDashboard.ts) zodat je de
   patronen kent voordat je iets aanraakt.

2. DATA EN LOGICA NIET AANPASSEN. Kijk eerst hoe de data in dit project
   binnenkomt (API's, stores, state) en laat dat volledig intact. Je vervangt
   alleen markup, styling en iconen. Past een designpatroon niet op bestaande
   logica, dan pas je het design in — nooit de logica.

3. Neem het designsysteem één-op-één over:
   - alle kleuren via de tokens uit _tokens.scss (officiële KPN-waarden van
     static.kpn.com/ds) — nergens losse hexwaarden in componenten
   - de fonts uit src/fonts/: KPN Metric voor alle tekst, KPN Extended alleen
     voor de grote display-koppen
   - de complete icoonfamilie uit src/icons.ts — vervang ALLE bestaande iconen
     en emoji's hierdoor; heb je een icoon nodig dat er niet is, teken het in
     dezelfde lijnstijl (24×24, stroke 1.8, currentColor)
   - de bouwstenen uit _base.scss: kaarten met 24px radius, badges, groene
     pilknoppen, meter, tabs en tabellen.

4. Stijlregels (hard):
   - GEEN gekleurde borders of left-borders meer — status en betekenis krijgen
     een zachte, soft-transparante tint over het hele vlak (--groen-50,
     --oranje-zacht, --rood-tint, --blauw-tint)
   - koppen groen (h1 in KPN Extended, h2 in Metric bold), tekstlinks blauw,
     primaire acties als groene pil, geel alleen als accentchip
   - rood/oranje alleen met betekenis (fout, aandacht), nooit als decoratie
   - de groene streep helemaal bovenaan de site moet netjes zijn: één strakke,
     doorlopende balk over de volle breedte, zonder rafelranden of dubbele
     randen.

5. Alles humaan en netjes uitgelijnd — geen slordigheden:
   - rasters en kaarten op één grid; blokinhoud zoals de kluisjeswand
     gecentreerd in de kaart in plaats van links geplakt — de indeling moet
     logisch aanvoelen
   - vriendelijke lege staten met een vervolgstap, nooit een leeg vlak
   - consistente spacing, geen tekst die klem staat of rare afbrekingen
   - per pagina een compacte indeling die in één oogopslag leesbaar is.

6. Dit project heeft MEER functionaliteit dan de redesign-map laat zien. Pas het
   design toe op ALLE bestaande pagina's en functies, ook op alles wat niet in
   de redesign is nagebouwd — met dezelfde bouwstenen en patronen. Niets
   weglaten of versimpelen.

7. Light- en darkmode: dit project heeft beide, de redesign-code bevat alleen
   light. Bouw light exact na volgens de tokens, en leid darkmode af als een
   tweede tokenset in dezelfde structuur (alle kleuren lopen al via custom
   properties) — componenten raak je daarvoor niet aan.

8. Nieuwe onderdelen die je WEL toevoegt, want die horen bij het design:
   - de "Snel naar"-snelkoppelingen op het dashboard: NICE Rooster
     (https://kpn-wfm.nicecloudsvc.com/wfm/), NICE op je telefoon
     (EEM-activatiecode KPN0320P als klik-om-te-kopiëren chip), TeamKPN intranet
     (https://teamkpn.kpnnet.org/) en Beeline voor uitzendkrachten
   - de berekende kaarten "Vandaag te doen" (begeleider) en "Jouw volgende stap"
     (MIO), gevoed door de bestaande data van dit project.

9. Snackkast: behoud de bestaande productfoto's van dit project en zet die in de
   nieuwe tegelopmaak (foto op de plek van het gekleurde icoon; verder dezelfde
   kaartstijl, prijzen, "Bijna op"-chip en filters).

10. Werk per pagina. Leg elke pagina in de browser naast de referentie
    (npm run dev in de redesign-map) en lever pas op als het uitgelijnd,
    consistent en foutloos is. Volgorde: eerst de dashboards, daarna de rest
    per rol (Begeleider, MIO, Buiten MIO).
```

---

## Wat er in het referentiepakket zit

- 7 pagina's voor (buiten-)MIO's, 13 voor begeleiders, met werkende rollenwissel
- Officiële KPN-kleuren en -fonts (KPN Metric + KPN Extended), lokaal ingebouwd
- Eén getekende icoonfamilie (`src/icons.ts`) in plaats van losse iconen/emoji's
- Berekenende kaarten: "Vandaag te doen" (begeleider) en "Jouw volgende stap"
- Zachte tintvlakken in plaats van gekleurde randen, overal
- Alle voorbeelddata geanonimiseerd in `src/data.ts`
