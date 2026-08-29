import type { DashboardData, KpiReeks, KpiWeek } from '../types';
import {
  bepaalDelta,
  formatteerWaarde,
  laatsteWeekMetData,
  renderSparkline,
} from '../components/grafiek';

function renderKpiTegel(reeks: KpiReeks, weken: KpiWeek[]): string {
  const laatsteWaarde = [...reeks.waarden].reverse().find((w) => w !== null);
  if (laatsteWaarde === undefined || laatsteWaarde === null) return '';

  const week = laatsteWeekMetData(reeks, weken);
  const delta = bepaalDelta(reeks, weken);

  const deltaChip = delta
    ? `<span class="kpi-tegel__delta ${delta.goed ? 'is-positief' : 'is-negatief'}"
             title="Ten opzichte van ${delta.vorigeWeek}">
         ${delta.verschil >= 0 ? '▲' : '▼'} ${formatteerWaarde(reeks, Math.abs(delta.verschil))}
       </span>`
    : '';

  return `
    <article class="kaart kpi-tegel">
      <header class="kpi-tegel__kop">
        <p class="kpi-tegel__naam">${reeks.naam}</p>
        <span class="kpi-tegel__doel" title="Deze KPI is beter als de waarde ${reeks.doel} is">
          ${reeks.doel === 'hoger' ? '▲' : '▼'} beter
        </span>
      </header>
      <p class="kpi-tegel__waarde">${formatteerWaarde(reeks, laatsteWaarde)} ${deltaChip}</p>
      <p class="kpi-tegel__periode">${week ? `${week.label} · ${week.dagen} ${week.dagen === 1 ? 'dag' : 'dagen'} data` : ''}</p>
      ${renderSparkline(reeks, weken)}
    </article>`;
}

export function renderKpisPagina(data: DashboardData): string {
  const tegels = data.kpiReeksen.map((reeks) => renderKpiTegel(reeks, data.kpiWeken)).join('');

  const kolommen = [...data.kpiWeken].reverse();
  const tabelKop = kolommen
    .map(
      (week) => `<th scope="col">${week.label}<span>${week.dagen} ${week.dagen === 1 ? 'dag' : 'dagen'}</span></th>`,
    )
    .join('');

  const tabelRijen = data.kpiReeksen
    .map((reeks) => {
      const cellen = [...reeks.waarden]
        .reverse()
        .map((waarde) => `<td>${waarde === null ? '–' : formatteerWaarde(reeks, waarde)}</td>`)
        .join('');
      return `<tr><th scope="row">${reeks.naam}</th>${cellen}</tr>`;
    })
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn KPI's</h1>
        <p class="paginakop__datum">Per gewerkte week — laatste vijf weken</p>
      </div>
      <span class="badge badge--groen">Laatste data: ${data.kpiWeken[data.kpiWeken.length - 1].label}</span>
    </header>

    <div class="kpi-tegels">${tegels}</div>

    <section class="kaart" aria-labelledby="kpi-tabel-titel">
      <header class="kaart__kop">
        <h2 id="kpi-tabel-titel">Volledig overzicht per week</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel tabel--cijfers">
          <thead>
            <tr><th scope="col">KPI</th>${tabelKop}</tr>
          </thead>
          <tbody>${tabelRijen}</tbody>
        </table>
      </div>
    </section>`;
}
