import type { DashboardData } from './types';

/** Voorbeelddata, één-op-één overgenomen van het huidige dashboard. */
export const dashboardData: DashboardData = {
  medewerker: {
    voornaam: 'Mohamed',
    achternaam: 'el Amrani',
    functie: 'MIO',
  },

  begeleider: {
    voornaam: 'Begeleider',
    achternaam: 'Test',
    functie: 'Begeleider',
  },

  mioPersona: {
    voornaam: 'Mio 1',
    achternaam: '',
    functie: 'MIO',
  },

  // Weekrooster en verlof van de ingelogde MIO.
  mioRooster: [
    { dag: 'Ma', datum: '24-08', tijd: '09:00 – 17:30', skill: 'Tech', begeleider: 'Begeleider 2' },
    { dag: 'Di', datum: '25-08', tijd: '09:00 – 17:30', skill: 'Tech' },
    { dag: 'Wo', datum: '26-08', tijd: '12:30 – 21:00', skill: 'Tech' },
    { dag: 'Do', datum: '27-08', tijd: '09:00 – 17:30', skill: 'Tech', begeleider: 'Begeleider Test' },
    { dag: 'Vr', datum: '28-08', vrij: true },
  ],

  verlofAanvragen: [
    { periode: '14 sep – 18 sep 2026', dagen: 5, status: 'in-behandeling' },
    { periode: '3 jul 2026', dagen: 1, status: 'goedgekeurd' },
  ],

  mioCertificeringen: [
    { naam: 'Certificering Admin', datum: '22-06-2026', status: 'behaald' },
    { naam: 'Certificering Tech 1', datum: '05-08-2026', status: 'behaald' },
    { naam: 'Certificering Tech 2', datum: 'Gepland in week 15', status: 'gepland' },
  ],

  mededelingen: [
    {
      id: 1,
      titel: 'Gebruik breedbandassistent',
      inhoud:
        'Zou iedereen per vandaag de breedbandassistent willen gebruiken, het liefst gisteren al. Bij voorbaat hartelijk dank.',
      afzender: 'Begeleider Test',
      datum: '14-8-2026',
    },
  ],

  mios: [
    { naam: 'Mio 1', week: 18, skill: 'XS KS', fase: 'Nazorg', trainingenAfgerond: 4, trainingenTotaal: 5, sessies: 14, laatsteSessie: '18-08-2026', certificeringen: 2, laatsteCertificering: '22-06-2026', werkdagen: ['Ma', 'Di', 'Wo', 'Do'], urenPerWeek: 32, itemsAfgerond: 12, itemsTotaal: 12 },
    { naam: 'Mio 2', week: 13, skill: 'Tech', fase: 'Tech 2', trainingenAfgerond: 3, trainingenTotaal: 5, sessies: 8, laatsteSessie: '21-08-2026', certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Wo', 'Vr'], urenPerWeek: 28, itemsAfgerond: 20, itemsTotaal: 25 },
    { naam: 'Mio 3', week: 13, skill: 'Tech', fase: 'Tech 2', trainingenAfgerond: 3, trainingenTotaal: 5, sessies: 9, laatsteSessie: '28-08-2026', certificeringen: 1, laatsteCertificering: '25-06-2026', werkdagen: ['Ma', 'Di', 'Wo', 'Do'], urenPerWeek: 32, itemsAfgerond: 20, itemsTotaal: 25 },
    { naam: 'Mio 4', week: 11, skill: 'Tech', fase: 'Tech 1', trainingenAfgerond: 2, trainingenTotaal: 5, sessies: 10, laatsteSessie: '21-08-2026', certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Wo', 'Do', 'Vr'], urenPerWeek: 38, itemsAfgerond: 16, itemsTotaal: 25 },
    { naam: 'Mio 5', week: 11, skill: 'Tech', fase: 'Tech 1', trainingenAfgerond: 2, trainingenTotaal: 5, sessies: 6, laatsteSessie: '28-08-2026', certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Wo', 'Vr'], urenPerWeek: null, itemsAfgerond: 11, itemsTotaal: 25 },
    { naam: 'Mio 6', week: 11, skill: 'XS KS', fase: 'Tech 1', trainingenAfgerond: 2, trainingenTotaal: 5, sessies: 11, laatsteSessie: '24-08-2026', certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Do', 'Vr'], urenPerWeek: null, itemsAfgerond: 11, itemsTotaal: 12 },
    { naam: 'Mio 7', week: 2, skill: 'Tech', fase: 'Admin', trainingenAfgerond: 1, trainingenTotaal: 5, sessies: 0, laatsteSessie: null, certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Wo', 'Do', 'Vr'], urenPerWeek: null, itemsAfgerond: 8, itemsTotaal: 25 },
    { naam: 'Mio 8', week: 2, skill: 'Tech', fase: 'Admin', trainingenAfgerond: 0, trainingenTotaal: 5, sessies: 2, laatsteSessie: '28-08-2026', certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Wo', 'Do', 'Vr'], urenPerWeek: 38, itemsAfgerond: 9, itemsTotaal: 25 },
    { naam: 'Mio 9', week: 2, skill: 'Tech', fase: 'Admin', trainingenAfgerond: 0, trainingenTotaal: 5, sessies: 0, laatsteSessie: null, certificeringen: 0, laatsteCertificering: null, werkdagen: ['Ma', 'Di', 'Wo', 'Do'], urenPerWeek: 32, itemsAfgerond: 9, itemsTotaal: 25 },
  ],

  snelkoppelingen: [
    {
      icoon: 'kalender',
      naam: 'NICE Rooster',
      omschrijving: 'Bekijk je rooster en diensten',
      url: 'https://kpn-wfm.nicecloudsvc.com/wfm/',
    },
    {
      icoon: 'smartphone',
      naam: 'NICE op je telefoon',
      omschrijving: 'EEM-activatiecode voor de app',
      code: 'KPN0320P',
    },
    {
      icoon: 'wereld',
      naam: 'TeamKPN intranet',
      omschrijving: 'Nieuws en info van KPN',
      url: 'https://teamkpn.kpnnet.org/',
    },
    {
      icoon: 'klok',
      naam: 'Beeline',
      omschrijving: 'Uren invullen (uitzendkracht)',
      url: 'https://prod2.beeline.com/kpn?7a785a4f42644ea7a89c11fb92b12c50',
    },
  ],

  voortgang: {
    week: 27,
    skillVan: 'Tech',
    skillNaar: 'Tech',
    fase: 'Nazorg',
    percentage: 0,
    leerdoel: null,
  },

  laatsteSessie: {
    datum: '19 juni 2026',
    coach: 'Begeleider 1',
  },

  trainingen: {
    elearnings: [
      { naam: 'Omgaan AI', afgerond: true },
      { naam: 'Thuiswerkwinkel', afgerond: false },
    ],
    masterclasses: [
      { naam: 'Digitale Coach', afgerond: true },
      { naam: 'Beeline / Urenstaten', afgerond: true },
      { naam: 'SAS Mails', afgerond: true },
    ],
  },

  kpis: [
    {
      icoon: 'telefoon',
      label: 'Klantcontacten',
      waarde: '591',
      details: [{ tekst: '323 I&I · 106 B&G' }],
    },
    {
      icoon: 'checkCirkel',
      label: 'FCR',
      waarde: '86,1%',
      details: [{ tekst: 'I&I 82,6% · B&G 92,4%' }],
    },
    {
      icoon: 'smiley',
      label: 'Positieve CES',
      waarde: '16',
      details: [
        { tekst: '84,2% positief', richting: 'positief' },
        { tekst: '3 negatief', richting: 'negatief' },
      ],
    },
    {
      icoon: 'diamant',
      label: 'Waarde toegevoegd',
      waarde: '9',
      details: [{ tekst: '1 Mob · 8 Ret · 0,1%' }],
    },
    {
      icoon: 'euro',
      label: 'Gecrediteerd',
      waarde: '€ 259,66',
      details: [{ tekst: '13 crediteringen' }],
    },
  ],

  mijlpalen: [
    { icoon: 'ster', naam: 'Eerste dag', behaald: true },
    { icoon: 'koptelefoon', naam: 'Eerste meeluistersessie', behaald: true },
    { icoon: 'diploma', naam: 'Alle e-learnings afgerond', behaald: false },
    { icoon: 'medaille', naam: 'Alle masterclasses afgerond', behaald: true },
    { icoon: 'vlag', naam: '50% van traject', behaald: false },
    { icoon: 'trofee', naam: 'Traject afgerond', behaald: false },
  ],

  traject: [
    {
      naam: 'Fase 1: Onboarding',
      onderdelen: [{ week: 'Week 1', naam: 'Onboarding', afgerond: 0, totaal: 2 }],
    },
    {
      naam: 'Fase 2: Admin',
      onderdelen: [
        { week: 'Week 1-2', naam: 'Welkom bij KPN', afgerond: 0, totaal: 3 },
        { week: 'Week 2', naam: 'Training', afgerond: 0, totaal: 3 },
        { week: 'Week 3-5', naam: 'Bellen', afgerond: 0, totaal: 3 },
        { week: 'Week 5', naam: 'Certificering', afgerond: 0, totaal: 1 },
      ],
    },
    {
      naam: 'Fase 3: Tech 1',
      onderdelen: [
        { week: 'Week 6', naam: 'Training', afgerond: 0, totaal: 4 },
        { week: 'Week 7-11', naam: 'Bellen', afgerond: 0, totaal: 3 },
        { week: 'Week 11', naam: 'Certificering', afgerond: 0, totaal: 1 },
      ],
    },
    {
      naam: 'Fase 4: Tech 2',
      onderdelen: [
        { week: 'Week 12', naam: 'Training', afgerond: 0, totaal: 2 },
        { week: 'Week 13-15', naam: 'Bellen', afgerond: 0, totaal: 2 },
        { week: 'Week 15', naam: 'Certificering', afgerond: 0, totaal: 1 },
      ],
    },
  ],

  workshops: [
    { naam: 'Sterk in klantcontact', afgerond: false },
    { naam: 'Ik zorg dat de klant zich gehoord voelt', afgerond: false },
    { naam: 'Ik zoek naar commerciële kansen', afgerond: false },
    { naam: 'Ik zoek een passende oplossing', afgerond: false },
    { naam: 'Ik wil weten waarom de klant belt', afgerond: false },
    { naam: 'Welkom bij KPN', afgerond: false },
  ],

  aanwezigheid: [
    { week: 1, dagen: 0 },
    { week: 2, dagen: 0 },
    { week: 3, dagen: 0 },
    { week: 4, dagen: 0 },
    { week: 5, dagen: 1 },
    { week: 6, dagen: 2 },
    { week: 7, dagen: 3 },
    { week: 8, dagen: 4 },
    { week: 9, dagen: 3 },
    { week: 10, dagen: 4 },
    { week: 11, dagen: 3 },
    { week: 12, dagen: 4 },
  ],

  activiteiten: [
    { datum: '02-06-2026', type: 'Training', skill: 'Tech' },
    { datum: '20-04-2026', type: 'Training', skill: 'Tech' },
    { datum: '10-04-2026', type: 'Training', skill: 'Tech' },
    { datum: '01-04-2026', type: 'Training', skill: 'Tech' },
  ],

  // KPI-reeksen: één waarde per gewerkte week, oudste eerst.
  kpiWeken: [
    { label: 'W24', dagen: 3 },
    { label: 'W25', dagen: 4 },
    { label: 'W27', dagen: 5 },
    { label: 'W28', dagen: 5 },
    { label: 'W35', dagen: 1 },
  ],
  kpiReeksen: [
    { naam: 'Behandeld', eenheid: 'aantal', doel: 'hoger', waarden: [63, 60, 72, 71, 20] },
    { naam: 'FCR-M 24u', eenheid: 'procent', doel: 'hoger', waarden: [86.5, 86.5, 87.8, 87.1, 89.3] },
    { naam: 'AHT', eenheid: 'seconden', doel: 'lager', waarden: [506, 725, 746, 710, 894] },
    { naam: 'Nawerktijd', eenheid: 'seconden', doel: 'lager', waarden: [53, 175, 230, 209, 158] },
    { naam: 'Wachttijd', eenheid: 'seconden', doel: 'lager', waarden: [64, 96, 89, 141, 89] },
    { naam: 'Adherence (RTA)', eenheid: 'procent', doel: 'hoger', waarden: [88.7, null, null, null, null] },
    { naam: 'Ruggespraak', eenheid: 'procent', doel: 'lager', waarden: [7.5, 0, 11.2, 18.2, 20] },
    { naam: 'Doorverbonden', eenheid: 'procent', doel: 'lager', waarden: [14.9, 13.7, 17.7, 18.2, 10] },
    { naam: 'Logistiek', eenheid: 'procent', doel: 'lager', waarden: [4, 8.3, null, null, null] },
    { naam: 'Monteurs', eenheid: 'procent', doel: 'lager', waarden: [12, 7.6, 12.6, null, 5] },
  ],

  sessies: [
    { datum: '19-06-2026', begeleider: 'Begeleider 1', gesprekken: 2, scores: ['G', 'G', 'G', 'G', 'N', 'V', 'G', 'A'] },
    { datum: '05-06-2026', begeleider: 'Begeleider 1', gesprekken: 1, scores: ['G', 'V', 'G', 'G', 'G', 'G', 'G', 'G'] },
    { datum: '27-05-2026', begeleider: 'Begeleider 6', gesprekken: 2, scores: ['G', 'G', 'G', 'G', 'N', 'G', 'N', 'G'] },
    { datum: '22-05-2026', begeleider: 'Begeleider Test', gesprekken: 1, scores: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'] },
    { datum: '13-05-2026', begeleider: 'Begeleider 3', gesprekken: 2, scores: ['G', 'G', 'G', 'G', 'G', 'G', 'G', 'G'] },
    { datum: '01-05-2026', begeleider: 'Begeleider 6', gesprekken: 1, scores: ['G', 'G', 'G', 'G', 'V', 'V', 'G', 'N'] },
    { datum: '24-04-2026', begeleider: 'Begeleider 6', gesprekken: 3, scores: ['G', 'N', 'G', 'A', 'V', 'G', 'G', 'G'] },
    { datum: '23-04-2026', begeleider: 'Begeleider Test', gesprekken: 1, scores: ['V', 'G', 'G', 'G', 'G', 'G', 'G', 'G'] },
  ],

  // Kluisjes 759–783; het raster loopt per kolom van boven naar beneden,
  // net als de echte kluisjeswand.
  mijnKluisnummer: 761,
  kluisjes: [
    { nummer: 759, sleutel: true },
    { nummer: 760, sleutel: false },
    { nummer: 761, sleutel: true, mio: 'Mohamed el Amrani' },
    { nummer: 762, sleutel: true, mio: 'Mio 3' },
    { nummer: 763, sleutel: true },
    { nummer: 764, sleutel: true },
    { nummer: 765, sleutel: true },
    { nummer: 766, sleutel: true },
    { nummer: 767, sleutel: true, mio: 'Mio 9' },
    { nummer: 768, sleutel: true },
    { nummer: 769, sleutel: false },
    { nummer: 770, sleutel: false },
    { nummer: 771, sleutel: true },
    { nummer: 772, sleutel: true, mio: 'Mio 7' },
    { nummer: 773, sleutel: false },
    { nummer: 774, sleutel: true },
    { nummer: 775, sleutel: true, mio: 'Mio 8' },
    { nummer: 776, sleutel: false },
    { nummer: 777, sleutel: false },
    { nummer: 778, sleutel: false },
    { nummer: 779, sleutel: true, mio: 'Mio 4' },
    { nummer: 780, sleutel: true, mio: 'Mio 1' },
    { nummer: 781, sleutel: false },
    { nummer: 782, sleutel: false },
    { nummer: 783, sleutel: false },
  ],

  // KPI overzicht per week: actieve MIO's én oud-MIO's die nog op de lijn staan.
  teamKpis: {
    week: 'Week 35 — 2026',
    kolommen: [
      { naam: 'Behandeld', eenheid: 'aantal' },
      { naam: 'FCR-M 24u', eenheid: 'procent' },
      { naam: 'AHT', eenheid: 'seconden' },
      { naam: 'Nawerktijd', eenheid: 'seconden' },
      { naam: 'Wachttijd', eenheid: 'seconden' },
      { naam: 'Adherence (RTA)', eenheid: 'procent' },
      { naam: 'Ruggespraak', eenheid: 'procent' },
      { naam: 'Doorverbonden', eenheid: 'procent' },
      { naam: 'Logistiek', eenheid: 'procent' },
      { naam: 'Monteurs', eenheid: 'procent' },
    ],
    rijen: [
      { naam: 'Mio 1', dagen: 0, waarden: [null, null, null, null, null, null, null, null, null, null] },
      { naam: 'Mio 2', dagen: 2, waarden: [45, 63.6, 1074, 124, 74, null, 1.9, 7.7, null, null] },
      { naam: 'Mio 3', dagen: 2, waarden: [73, 80.2, 583, 34, 80, null, 7.7, 15.8, null, null] },
      { naam: 'Mio 4', dagen: 1, waarden: [37, 80.3, 621, 56, 100, null, 0, 12.8, 3.2, 4.4] },
      { naam: 'Mio 5', dagen: 1, waarden: [37, 87.5, 578, 176, 49, null, 2.6, 9.8, 5.4, 10.8] },
      { naam: 'Mio 6', dagen: 2, waarden: [45, 87.5, 1023, 123, 132, null, 16.2, 8.9, null, null] },
      { naam: 'Mio 7', dagen: 0, waarden: [null, null, null, null, null, null, null, null, null, null] },
      { naam: 'Mio 8', dagen: 0, waarden: [null, null, null, null, null, null, null, null, null, null] },
      { naam: 'Mio 9', dagen: 0, waarden: [null, null, null, null, null, null, null, null, null, null] },
      { naam: 'Oud-Mio 1', oudMio: true, dagen: 2, waarden: [60, 89.2, 825, 54, 233, null, 3.2, 8.3, null, null] },
      { naam: 'Oud-Mio 2', oudMio: true, dagen: 2, waarden: [130, 92.5, 364, 62, 13, null, 3.8, 19.8, null, 4.4] },
      { naam: 'Mohamed el Amrani', oudMio: true, dagen: 1, waarden: [20, 89.3, 894, 158, 89, null, 20, 10, null, 5] },
      { naam: 'Oud-Mio 3', oudMio: true, dagen: 2, waarden: [66, 88.5, 701, 136, 36, null, 1.4, 10.6, 10.6, null] },
    ],
    totaal: [513, 84.3, 740, 103, 89, null, 6.9, 11.1, 5.5, 8.3],
  },

  teamPlanning: {
    week: 'Week 35 — 24-08-2026 t/m 28-08-2026',
    begeleiders: [
      'Begeleider 1',
      'Begeleider 2',
      'Begeleider 3',
      'Begeleider 4',
      'Begeleider 5',
      'Begeleider 6',
      'Begeleider 7',
      'Begeleider Test',
    ],
    nietDoorgegeven: ['Begeleider 1', 'Begeleider 7'],
    dagen: [
      { dag: 'Maandag', datum: '24-08-2026', aanwezig: ['Begeleider 1', 'Begeleider 2'] },
      { dag: 'Dinsdag', datum: '25-08-2026', aanwezig: ['Begeleider 5', 'Begeleider 6'] },
      { dag: 'Woensdag', datum: '26-08-2026', aanwezig: ['Begeleider 2', 'Begeleider 6'] },
      { dag: 'Donderdag', datum: '27-08-2026', aanwezig: ['Begeleider 5', 'Begeleider Test'] },
      { dag: 'Vrijdag', datum: '28-08-2026', aanwezig: ['Begeleider 1', 'Begeleider Test'] },
    ],
    beschikbaarheid: [
      { dag: 'Maandag', beschikbaar: false },
      { dag: 'Dinsdag', beschikbaar: true },
      { dag: 'Woensdag', beschikbaar: false },
      { dag: 'Donderdag', beschikbaar: false },
      { dag: 'Vrijdag', beschikbaar: true },
    ],
    doorgegevenOp: '20 aug 2026',
  },

  weekOverzichten: [
    {
      week: 35,
      periode: '24 aug – 28 aug 2026',
      ingevuld: 9,
      bijgewerktDoor: 'Maurits Rijneveld',
      dezeWeek: true,
      notities: [
        { mio: 'Mio 1', notitie: 'Laatste certificering behaald — klaar om het traject af te ronden.' },
        { mio: 'Mio 2', notitie: 'Sterke week, trainingen op schema. Sessie inplannen: laatste is 8 dagen geleden.' },
        { mio: 'Mio 3', notitie: 'Goede voortgang. Creditering van 6 juli nog bespreken.' },
        { mio: 'Mio 4', notitie: "KPI's stijgen. Let op: 8 dagen geen meeluistersessie." },
        { mio: 'Mio 5', notitie: 'Vindt het ritme. Contracturen nog niet definitief doorgegeven.' },
        { mio: 'Mio 6', notitie: 'XS KS bijna afgerond (11/12) — certificering voorbereiden.' },
        { mio: 'Mio 7', notitie: 'Eerste weken wennen; deze week de eerste meeluistersessie inplannen.' },
        { mio: 'Mio 8', notitie: 'Draait goed mee op de lijn, eerste sessie gehad.' },
        { mio: 'Mio 9', notitie: 'Onboarding afgerond, start met de e-learnings.' },
      ],
    },
    { week: 34, periode: '17 aug – 21 aug 2026', ingevuld: 9, bijgewerktDoor: 'Begeleider Test' },
    { week: 33, periode: '10 aug – 14 aug 2026', ingevuld: 8, bijgewerktDoor: 'Begeleider Test' },
    { week: 32, periode: '3 aug – 7 aug 2026', ingevuld: 9, bijgewerktDoor: 'Begeleider Test' },
    { week: 31, periode: '27 jul – 31 jul 2026', ingevuld: 7, bijgewerktDoor: 'Begeleider Test' },
  ],

  // Overdrachten: nieuwste eerst, één per werkdag.
  overdrachtenTotaal: 105,
  overdrachten: [
    { datum: '28-08-2026', dag: 'vr', ingevuldDoor: 'Begeleider 1', mios: 6, trainers: 2 },
    { datum: '27-08-2026', dag: 'do', ingevuldDoor: 'Begeleider Test', mios: 7, trainers: 2 },
    { datum: '26-08-2026', dag: 'wo', ingevuldDoor: 'Begeleider 2', mios: 6, trainers: 2 },
    { datum: '25-08-2026', dag: 'di', ingevuldDoor: 'Begeleider 5', mios: 8, trainers: 2 },
    { datum: '24-08-2026', dag: 'ma', ingevuldDoor: 'Begeleider 2', mios: 6, trainers: 2 },
    { datum: '21-08-2026', dag: 'vr', ingevuldDoor: 'Begeleider Test', mios: 4, trainers: 2 },
    { datum: '20-08-2026', dag: 'do', ingevuldDoor: 'Begeleider 5', mios: 8, trainers: 2 },
    { datum: '19-08-2026', dag: 'wo', ingevuldDoor: 'Begeleider 6', mios: 7, trainers: 2 },
    { datum: '18-08-2026', dag: 'di', ingevuldDoor: 'Begeleider 5', mios: 8, trainers: 2 },
    { datum: '17-08-2026', dag: 'ma', ingevuldDoor: 'Begeleider 2', mios: 8, trainers: 2 },
    { datum: '14-08-2026', dag: 'vr', ingevuldDoor: 'Begeleider 1', mios: 6, trainers: 2 },
    { datum: '13-08-2026', dag: 'do', ingevuldDoor: 'Begeleider 5', mios: 6, trainers: 2 },
    { datum: '12-08-2026', dag: 'wo', ingevuldDoor: 'Begeleider 2', mios: 6, trainers: 2 },
    { datum: '11-08-2026', dag: 'di', ingevuldDoor: 'Begeleider 6', mios: 8, trainers: 2 },
  ],

  // Agenda van week 35 (24 t/m 28 augustus).
  agenda: [
    { dag: 0, start: '09:00', eind: '14:00', titel: 'Admin training van Trainer 1', soort: 'training', status: 'placeholder' },
    { dag: 0, start: '11:30', eind: '12:00', titel: 'MIO meeting', soort: 'meeting', status: 'geannuleerd' },
    { dag: 0, start: '15:00', eind: '16:00', titel: 'Admin', personen: 'Mio 6', soort: 'skill' },
    { dag: 1, start: '09:30', eind: '13:00', titel: 'Admin training van Trainer 2', notitie: "Begeleider 5 kijkt mee, Begeleider 3 zit die tijd bij de MIO's.", soort: 'training', status: 'placeholder' },
    { dag: 1, start: '15:00', eind: '16:00', titel: 'Tech', personen: 'Mio 2', soort: 'skill', status: 'geannuleerd' },
    { dag: 2, start: '09:30', eind: '14:30', titel: 'Admin training van Trainer 2', personen: 'Mio 7, Mio 8, Mio 9', soort: 'training' },
    { dag: 2, start: '15:00', eind: '16:00', titel: 'Tech', personen: 'Mio 4', notitie: 'Ook nog die creditering bespreken.', soort: 'skill', status: 'geannuleerd' },
    { dag: 3, start: '10:00', eind: '11:00', titel: 'Eerste keer meeluisteren door begeleiding', personen: 'Mio 7', soort: 'skill' },
    { dag: 3, start: '11:00', eind: '13:00', titel: 'Digitenne training', personen: 'Mio 2, Mio 3, Mio 4 +4', soort: 'training' },
    { dag: 3, start: '13:30', eind: '14:30', titel: 'Tech', personen: 'Mio 8', soort: 'skill' },
    { dag: 4, start: '10:00', eind: '12:30', titel: 'Admin (Begeleider Test)', personen: 'Mio 5', soort: 'training' },
    { dag: 4, start: '15:00', eind: '16:00', titel: 'Tech', personen: 'Mio 3', soort: 'skill' },
    { dag: 4, start: '16:00', eind: '17:00', titel: 'Begeleiders meeting', soort: 'meeting', status: 'placeholder' },
  ],

  workshopVoortgang: [
    { naam: 'Sterk in klantcontact', afgerond: 5 },
    { naam: 'Ik zorg dat de klant zich gehoord voelt', afgerond: 4 },
    { naam: 'Ik zoek naar commerciële kansen', afgerond: 3 },
    { naam: 'Ik zoek een passende oplossing', afgerond: 3 },
    { naam: 'Ik wil weten waarom de klant belt', afgerond: 2 },
    { naam: 'Welkom bij KPN', afgerond: 9 },
  ],

  crediteringen: [
    {
      referentie: '82709446',
      mio: 'Mio 3',
      datum: '06-07-2026',
      reden: 'Coulance',
      omschrijving: 'Creditering abonnementskosten',
      bedrag: 75,
      status: 'onbesproken',
      afgekeurdDoor: 'Kwaliteitscontrole',
      toelichting:
        'Hoezo doen wij een toezegging dat de klant direct mag opzeggen en dienen wij hier een credit voor in? Dit is aan Save om zelf in te voeren.',
    },
    {
      referentie: '81554213',
      mio: 'Mio 6',
      datum: '18-06-2026',
      reden: 'Dubbele afschrijving',
      omschrijving: 'Creditering toestelbetaling',
      bedrag: 12.5,
      status: 'afgehandeld',
    },
  ],

  games: [
    {
      illustratie: 'wordle',
      naam: 'Wordle',
      omschrijving:
        'Raad elke dag het geheime woord in zes pogingen. Goed geraden? Punten voor het weekklassement.',
    },
    {
      illustratie: 'woordgraden',
      naam: 'Woordgraden',
      omschrijving:
        'Hoe warm zit je bij het geheime woord? Elke gok vertelt je of je warmer of kouder wordt.',
    },
    {
      illustratie: 'challengemio',
      naam: 'ChallengeMIO',
      omschrijving:
        'Daag een collega uit voor schaken of dammen. Elke beurt duurt maximaal 24 uur, met meldingen in Teams.',
    },
  ],

  snackkast: {
    balans: 0.05,
    recenteAankopen: [],
    producten: [
      { naam: 'Coca-Cola', variant: 'Regular', prijs: 1.2, categorie: 'drankjes', vorm: 'blikje', kleur: '#e32219' },
      { naam: 'Coca-Cola', variant: 'Zero', prijs: 1.2, categorie: 'drankjes', vorm: 'blikje', kleur: '#333333' },
      { naam: 'Fanta', variant: 'Orange', prijs: 1.2, categorie: 'drankjes', vorm: 'blikje', kleur: '#f77f00' },
      { naam: 'Fernandes', variant: 'Cherry Bouquet', prijs: 1.25, categorie: 'drankjes', vorm: 'blikje', kleur: '#d63384' },
      { naam: 'Fuze Tea', variant: 'Peach', prijs: 1.25, categorie: 'drankjes', vorm: 'blikje', kleur: '#3f9b48' },
      { naam: 'Red Bull', variant: 'Red Edition', prijs: 1.8, categorie: 'drankjes', vorm: 'blikje', kleur: '#c0272d' },
      { naam: 'Red Bull', variant: 'Regular', prijs: 1.75, categorie: 'drankjes', vorm: 'blikje', kleur: '#16437c' },
      { naam: 'Red Bull', variant: 'Sugar Free', prijs: 1.75, categorie: 'drankjes', vorm: 'blikje', kleur: '#5b9bd5', bijnaOp: true },
      { naam: 'San Pellegrino', variant: 'Aranciata', prijs: 1.5, categorie: 'drankjes', vorm: 'blikje', kleur: '#e8842c' },
      { naam: 'Spa', variant: 'Reine petfles', prijs: 0.75, categorie: 'drankjes', vorm: 'fles', kleur: '#1f6fb2' },
      { naam: 'Autodrop', variant: 'Cadillacs', prijs: 1, categorie: 'snacks', vorm: 'snoep', kleur: '#b02a6e' },
      { naam: 'Bakkers', variant: 'Stroopwafels', prijs: 1, categorie: 'snacks', vorm: 'zakje', kleur: '#d6699b' },
      { naam: 'Haribo', variant: 'Starmix', prijs: 1, categorie: 'snacks', vorm: 'snoep', kleur: '#d4380d' },
      { naam: "Lay's", variant: 'Naturel', prijs: 0.8, categorie: 'snacks', vorm: 'zakje', kleur: '#e0a800' },
      { naam: 'Doritos', variant: 'Nacho Cheese', prijs: 0.8, categorie: 'snacks', vorm: 'zakje', kleur: '#e05206' },
      { naam: 'Snelle Jelle', variant: 'Kruidkoek', prijs: 0.9, categorie: 'snacks', vorm: 'reep', kleur: '#7a4f22' },
      { naam: 'KitKat', variant: 'Original', prijs: 0.9, categorie: 'snacks', vorm: 'reep', kleur: '#c0392b' },
    ],
  },
};
