import type { DashboardData, WeekOverzicht } from '../types';

function renderWeek(week: WeekOverzicht, totaalMios: number): string {
  const inhoud = week.notities
    ? `<ul class="weeknotities">
        ${week.notities
          .map(
            (notitie) => `
          <li class="weeknotitie">
            <span class="weeknotitie__mio">${notitie.mio}</span>
            <span class="weeknotitie__tekst">${notitie.notitie}</span>
          </li>`,
          )
          .join('')}
      </ul>`
    : `<p class="voortgang__leeg">Ingevuld door ${week.bijgewerktDoor} — open het archief voor alle notities.</p>`;

  return `
    <details class="weekkaart" ${week.dezeWeek ? 'open' : ''}>
      <summary class="weekkaart__kop">
        <span class="weekkaart__titel">
          Week ${week.week} · ${week.periode}
          ${week.dezeWeek ? '<span class="badge badge--geel">Deze week</span>' : ''}
        </span>
        <span class="weekkaart__meta">${week.ingevuld} van ${totaalMios} MIO's ingevuld · laatst bijgewerkt door ${week.bijgewerktDoor}</span>
        <span class="weekkaart__chevron">›</span>
      </summary>
      <div class="weekkaart__inhoud">${inhoud}</div>
    </details>`;
}

export function renderWeekOverzichtPagina(data: DashboardData): string {
  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Week overzicht</h1>
        <p class="paginakop__datum">Notities per MIO voor de begeleiders — invullen op vrijdag zodat iedereen op de hoogte blijft</p>
      </div>
      <button class="knop-primair" type="button">Bewerk overzicht van deze week</button>
    </header>

    <div class="weekkaarten">
      ${data.weekOverzichten.map((week) => renderWeek(week, data.mios.length)).join('')}
    </div>`;
}
