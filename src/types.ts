/** Datamodel van het MIO Dashboard. In productie komt dit uit de API. */

export interface Medewerker {
  voornaam: string;
  achternaam: string;
  functie: string;
}

export type Rol = 'mio' | 'buiten-mio' | 'begeleider';

// MIO in traject: rooster, verlof en eigen certificeringen -------------------

export interface MioRoosterDag {
  dag: string;
  datum: string;
  tijd?: string;
  skill?: string;
  begeleider?: string;
  vrij?: boolean;
}

export type VerlofStatus = 'goedgekeurd' | 'in-behandeling' | 'afgewezen';

export interface VerlofAanvraag {
  periode: string;
  dagen: number;
  status: VerlofStatus;
}

export interface MioCertificering {
  naam: string;
  datum: string;
  status: 'behaald' | 'gepland';
}

export interface Mededeling {
  id: number;
  titel: string;
  inhoud: string;
  afzender?: string;
  datum?: string;
}

export interface Snelkoppeling {
  icoon: string;
  naam: string;
  omschrijving: string;
  /** Externe link — óf een url, óf een code om te kopiëren. */
  url?: string;
  code?: string;
}

export interface Voortgang {
  week: number;
  skillVan: string;
  skillNaar: string;
  fase: string;
  /** 0–100 */
  percentage: number;
  leerdoel: string | null;
}

export interface Meeluistersessie {
  datum: string;
  coach: string;
}

export interface Training {
  naam: string;
  afgerond: boolean;
}

export interface Trainingen {
  elearnings: Training[];
  masterclasses: Training[];
}

export type Richting = 'positief' | 'negatief' | 'neutraal';

export interface KpiDetail {
  tekst: string;
  richting?: Richting;
}

export interface Kpi {
  icoon: string;
  label: string;
  waarde: string;
  details: KpiDetail[];
}

export interface Mijlpaal {
  icoon: string;
  naam: string;
  behaald: boolean;
}

// Mijn voortgang -------------------------------------------------------------

export interface TrajectOnderdeel {
  week: string;
  naam: string;
  afgerond: number;
  totaal: number;
}

export interface TrajectFase {
  naam: string;
  onderdelen: TrajectOnderdeel[];
}

export interface Workshop {
  naam: string;
  afgerond: boolean;
}

export interface AanwezigheidWeek {
  week: number;
  dagen: number;
}

export interface Activiteit {
  datum: string;
  type: string;
  skill: string;
}

// Mijn KPI's -----------------------------------------------------------------

export interface KpiWeek {
  label: string;
  dagen: number;
}

export interface KpiReeks {
  naam: string;
  eenheid: 'aantal' | 'procent' | 'seconden';
  /** In welke richting is deze KPI beter? */
  doel: 'hoger' | 'lager';
  /** Eén waarde per week (oudste eerst); null = geen data die week. */
  waarden: (number | null)[];
}

// Mijn meeluistersessies -----------------------------------------------------

export type SessieScore = 'G' | 'V' | 'N' | 'A';

export interface Sessie {
  datum: string;
  begeleider: string;
  gesprekken: number;
  scores: SessieScore[];
}

// Kluisjes -------------------------------------------------------------------

export interface Kluisje {
  nummer: number;
  /** false = er is geen sleutel beschikbaar voor dit kluisje. */
  sleutel: boolean;
  /** Naam van de MIO aan wie het kluisje is toegewezen. */
  mio?: string;
}

// Games ----------------------------------------------------------------------

export interface Game {
  /** Sleutel van de illustratie in pages/games.ts */
  illustratie: string;
  naam: string;
  omschrijving: string;
}

// Snackkast ------------------------------------------------------------------

export type ProductCategorie = 'drankjes' | 'snacks';
export type ProductVorm = 'blikje' | 'fles' | 'zakje' | 'snoep' | 'reep';

export interface Product {
  naam: string;
  variant: string;
  prijs: number;
  categorie: ProductCategorie;
  vorm: ProductVorm;
  /** Merk-tint voor het productticoon. */
  kleur: string;
  bijnaOp?: boolean;
}

export interface Aankoop {
  datum: string;
  product: string;
  bedrag: number;
}

export interface Snackkast {
  balans: number;
  producten: Product[];
  /** Aankopen in de afgelopen 24 uur. */
  recenteAankopen: Aankoop[];
}

// Begeleider -----------------------------------------------------------------

export interface MioOverzichtRij {
  naam: string;
  week: number;
  skill: string;
  fase: string;
  trainingenAfgerond: number;
  trainingenTotaal: number;
  sessies: number;
  /** dd-mm-jjjj, null = nog geen sessie gehad. */
  laatsteSessie: string | null;
  certificeringen: number;
  laatsteCertificering: string | null;
  /** Rooster: werkdagen (Ma…Vr) en contracturen; null = nog niet doorgegeven. */
  werkdagen: string[];
  urenPerWeek: number | null;
  /** Trajectonderdelen (Tech = 25, XS KS = 12). */
  itemsAfgerond: number;
  itemsTotaal: number;
}

export interface TeamKpiKolom {
  naam: string;
  eenheid: 'aantal' | 'procent' | 'seconden';
}

export interface TeamKpiRij {
  naam: string;
  oudMio?: boolean;
  /** Aantal dagen data deze week; 0 = geen data. */
  dagen: number;
  waarden: (number | null)[];
}

export interface TeamKpis {
  week: string;
  kolommen: TeamKpiKolom[];
  rijen: TeamKpiRij[];
  totaal: (number | null)[];
}

export interface PlanningDag {
  dag: string;
  datum: string;
  aanwezig: string[];
}

export interface TeamPlanning {
  week: string;
  begeleiders: string[];
  nietDoorgegeven: string[];
  dagen: PlanningDag[];
  /** Beschikbaarheid van de ingelogde begeleider, Ma…Vr. */
  beschikbaarheid: { dag: string; beschikbaar: boolean }[];
  doorgegevenOp: string;
}

export interface WeekNotitie {
  mio: string;
  notitie: string;
}

export interface WeekOverzicht {
  week: number;
  periode: string;
  ingevuld: number;
  bijgewerktDoor: string;
  dezeWeek?: boolean;
  notities?: WeekNotitie[];
}

export interface WorkshopVoortgang {
  naam: string;
  afgerond: number;
}

export interface Overdracht {
  datum: string;
  dag: string;
  ingevuldDoor: string;
  mios: number;
  trainers: number;
}

export type AgendaSoort = 'training' | 'skill' | 'meeting';

export interface AgendaItem {
  /** 0 = maandag … 4 = vrijdag */
  dag: number;
  start: string;
  eind: string;
  titel: string;
  personen?: string;
  notitie?: string;
  soort: AgendaSoort;
  status?: 'placeholder' | 'geannuleerd';
}

export type CrediteringStatus = 'onbesproken' | 'afgehandeld';

export interface Creditering {
  referentie: string;
  mio: string;
  datum: string;
  reden: string;
  omschrijving: string;
  bedrag: number;
  status: CrediteringStatus;
  /** Ingevuld wanneer kwaliteitscontrole de creditering heeft afgekeurd. */
  afgekeurdDoor?: string;
  toelichting?: string;
}

export interface DashboardData {
  medewerker: Medewerker;
  begeleider: Medewerker;
  mioPersona: Medewerker;
  mioRooster: MioRoosterDag[];
  verlofAanvragen: VerlofAanvraag[];
  mioCertificeringen: MioCertificering[];
  mios: MioOverzichtRij[];
  mededelingen: Mededeling[];
  snelkoppelingen: Snelkoppeling[];
  voortgang: Voortgang;
  laatsteSessie: Meeluistersessie | null;
  trainingen: Trainingen;
  kpis: Kpi[];
  mijlpalen: Mijlpaal[];
  traject: TrajectFase[];
  workshops: Workshop[];
  aanwezigheid: AanwezigheidWeek[];
  activiteiten: Activiteit[];
  kpiWeken: KpiWeek[];
  kpiReeksen: KpiReeks[];
  sessies: Sessie[];
  mijnKluisnummer: number;
  kluisjes: Kluisje[];
  games: Game[];
  snackkast: Snackkast;
  crediteringen: Creditering[];
  teamKpis: TeamKpis;
  teamPlanning: TeamPlanning;
  weekOverzichten: WeekOverzicht[];
  workshopVoortgang: WorkshopVoortgang[];
  overdrachten: Overdracht[];
  overdrachtenTotaal: number;
  agenda: AgendaItem[];
}
