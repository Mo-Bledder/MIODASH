import type { DashboardData, TeamKpiKolom, TeamKpiRij } from '../types';

function formatteer(kolom: TeamKpiKolom, waarde: number | null): string {
  if (waarde === null) return '<span class="mio-rij__leeg">–</span>';
  if (kolom.eenheid === 'procent') {
    return `${waarde.toLocaleString('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
  }
  return waarde.toLocaleString('nl-NL');
}

function renderRij(rij: TeamKpiRij, kolommen: TeamKpiKolom[]): string {
  const cellen = rij.waarden
    .map((waarde, i) => `<td>${formatteer(kolommen[i], waarde)}</td>`)
    .join('');

  return `
    <tr>
      <th scope="row">
        <span class="mio-rij">
          <span class="mio-rij__naam">${rij.naam}</span>
          ${rij.oudMio ? '<span class="badge">oud-MIO</span>' : ''}
          ${rij.dagen > 0 ? `<span class="badge badge--groen">${rij.dagen}d</span>` : ''}
        </span>
      </th>
      ${cellen}
      <td class="tabel__acties"><a href="#" class="knop-ghost-klein">Bekijken</a></td>
    </tr>`;
}

export function renderKpiOverzichtPagina(data: DashboardData): string {
  const { kolommen, rijen, totaal, week } = data.teamKpis;

  const kop = kolommen.map((kolom) => `<th scope="col">${kolom.naam}</th>`).join('');
  const totaalCellen = totaal
    .map((waarde, i) => `<td>${formatteer(kolommen[i], waarde)}</td>`)
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">KPI overzicht</h1>
        <p class="paginakop__datum">Alle queues (totaal) — actieve MIO's en oud-MIO's op de lijn</p>
      </div>
      <span class="badge badge--groen">${week}</span>
    </header>

    <section class="kaart" aria-labelledby="kpi-overzicht-titel">
      <header class="kaart__kop">
        <h2 id="kpi-overzicht-titel">${week}</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel tabel--cijfers kpi-team">
          <thead>
            <tr><th scope="col">Naam</th>${kop}<th scope="col"><span class="visueel-verborgen">Acties</span></th></tr>
          </thead>
          <tbody>
            ${rijen.map((rij) => renderRij(rij, kolommen)).join('')}
            <tr class="kpi-team__totaal">
              <th scope="row">Totaal</th>
              ${totaalCellen}
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>`;
}
