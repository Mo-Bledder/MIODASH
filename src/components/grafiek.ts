import type { KpiReeks, KpiWeek } from '../types';

/** Formatteert een KPI-waarde in Nederlandse notatie. */
export function formatteerWaarde(reeks: KpiReeks, waarde: number): string {
  if (reeks.eenheid === 'procent') {
    return `${waarde.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }
  return waarde.toLocaleString('nl-NL');
}

interface Delta {
  verschil: number;
  vorigeWeek: string;
  goed: boolean;
}

/** Verschil tussen de laatste twee weken mét data. */
export function bepaalDelta(reeks: KpiReeks, weken: KpiWeek[]): Delta | null {
  const gevuld = reeks.waarden
    .map((waarde, i) => ({ waarde, week: weken[i] }))
    .filter((p): p is { waarde: number; week: KpiWeek } => p.waarde !== null);
  if (gevuld.length < 2) return null;

  const laatste = gevuld[gevuld.length - 1];
  const vorige = gevuld[gevuld.length - 2];
  const verschil = laatste.waarde - vorige.waarde;
  const goed = reeks.doel === 'hoger' ? verschil >= 0 : verschil <= 0;
  return { verschil, vorigeWeek: vorige.week.label, goed };
}

/** Laatste week mét data (voor het "W35 · 1 dag"-bijschrift). */
export function laatsteWeekMetData(reeks: KpiReeks, weken: KpiWeek[]): KpiWeek | null {
  for (let i = reeks.waarden.length - 1; i >= 0; i--) {
    if (reeks.waarden[i] !== null) return weken[i];
  }
  return null;
}

/**
 * Compacte trendlijn (sparkline) als SVG. De lijn is bewust ingetogen grijs;
 * het accent ligt op het laatste punt — de grote waarde erboven is de held.
 */
export function renderSparkline(reeks: KpiReeks, weken: KpiWeek[]): string {
  const breedte = 240;
  const hoogte = 72;
  const rand = 10;

  const aanwezig = reeks.waarden.filter((w): w is number => w !== null);
  if (aanwezig.length === 0) return '';

  const min = Math.min(...aanwezig);
  const max = Math.max(...aanwezig);
  const vlak = max === min;

  const x = (i: number) =>
    rand + (i * (breedte - 2 * rand)) / Math.max(1, reeks.waarden.length - 1);
  const y = (waarde: number) =>
    vlak
      ? hoogte / 2
      : hoogte - rand - ((waarde - min) / (max - min)) * (hoogte - 2 * rand);

  // Lijnsegmenten alleen tussen opeenvolgende weken mét data.
  const segmenten: string[] = [];
  let pad = '';
  reeks.waarden.forEach((waarde, i) => {
    if (waarde === null) {
      if (pad) segmenten.push(pad);
      pad = '';
      return;
    }
    pad += `${pad ? 'L' : 'M'}${x(i).toFixed(1)} ${y(waarde).toFixed(1)} `;
  });
  if (pad) segmenten.push(pad);

  const laatsteIndex = reeks.waarden.reduce(
    (laatste, waarde, i) => (waarde !== null ? i : laatste),
    -1,
  );

  const punten = reeks.waarden
    .map((waarde, i) => {
      if (waarde === null) return '';
      const isLaatste = i === laatsteIndex;
      return `<circle cx="${x(i).toFixed(1)}" cy="${y(waarde).toFixed(1)}"
        r="${isLaatste ? 4.5 : 3.5}"
        class="grafiek__punt ${isLaatste ? 'is-laatste' : ''}"
        data-tooltip="${weken[i].label} · ${weken[i].dagen} ${weken[i].dagen === 1 ? 'dag' : 'dagen'}: ${formatteerWaarde(reeks, waarde)}"
        tabindex="0"></circle>`;
    })
    .join('');

  const labels = weken
    .map((week) => `<span>${week.label}</span>`)
    .join('');

  return `
    <div class="grafiek">
      <svg viewBox="0 0 ${breedte} ${hoogte}" role="img"
           aria-label="Trend van ${reeks.naam} over ${weken.length} weken">
        ${segmenten.map((s) => `<path d="${s}" class="grafiek__lijn"/>`).join('')}
        ${punten}
      </svg>
      <div class="grafiek__weken" aria-hidden="true">${labels}</div>
    </div>`;
}
