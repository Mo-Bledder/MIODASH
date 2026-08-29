import { icoon } from '../icons';
import type { DashboardData, MioRoosterDag, VerlofAanvraag, VerlofStatus } from '../types';

const verlofStatusTekst: Record<VerlofStatus, string> = {
  goedgekeurd: 'Goedgekeurd',
  'in-behandeling': 'In behandeling',
  afgewezen: 'Afgewezen',
};

function renderDag(dag: MioRoosterDag): string {
  const inhoud = dag.vrij
    ? '<span class="wrooster__vrij">Vrij</span>'
    : `<span class="wrooster__tijd">${dag.tijd}</span>
       ${dag.skill ? `<span class="badge badge--blauw">${dag.skill}</span>` : ''}
       ${dag.begeleider ? `<span class="wrooster__begeleider">${icoon('koptelefoon', 14)} ${dag.begeleider}</span>` : ''}`;

  return `
    <li class="wrooster__rij ${dag.vrij ? 'is-vrij' : ''}">
      <span class="wrooster__dag"><strong>${dag.dag}</strong> ${dag.datum}</span>
      ${inhoud}
    </li>`;
}

function renderVerlof(aanvraag: VerlofAanvraag): string {
  return `
    <li class="verlof">
      <span class="verlof__periode">${aanvraag.periode}</span>
      <span class="verlof__dagen">${aanvraag.dagen} ${aanvraag.dagen === 1 ? 'dag' : 'dagen'}</span>
      <span class="verlof__status verlof__status--${aanvraag.status}">${verlofStatusTekst[aanvraag.status]}</span>
    </li>`;
}

export function renderMioRoosterPagina(data: DashboardData): string {
  const uren = data.mioRooster
    .filter((d) => !d.vrij)
    .length * 8;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn rooster</h1>
        <p class="paginakop__datum">Week 35 — 24 t/m 28 augustus · ±${uren} uur</p>
      </div>
      <span class="badge badge--geel">Deze week</span>
    </header>

    <div class="hoofd__raster">
      <section class="kaart" aria-labelledby="weekrooster-titel">
        <header class="kaart__kop">
          <h2 id="weekrooster-titel">Deze week</h2>
        </header>
        <ul class="wrooster">${data.mioRooster.map(renderDag).join('')}</ul>
      </section>

      <section class="kaart" aria-labelledby="verlof-titel">
        <header class="kaart__kop">
          <h2 id="verlof-titel">Mijn verlof</h2>
        </header>
        <p class="planning__uitleg">Vraag hier je verlof aan. Je begeleider keurt de aanvraag goed
          en daarna zie je de dagen als "Verlof" in je rooster.</p>
        ${
          data.verlofAanvragen.length === 0
            ? '<p class="voortgang__leeg">Geen verlofaanvragen.</p>'
            : `<ul class="verlof-lijst">${data.verlofAanvragen.map(renderVerlof).join('')}</ul>`
        }
        <button class="knop-primair" type="button">+ Verlof aanvragen</button>
      </section>
    </div>`;
}
