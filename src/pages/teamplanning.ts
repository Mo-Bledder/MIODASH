import { icoon } from '../icons';
import type { DashboardData, PlanningDag } from '../types';

function renderDag(dag: PlanningDag, begeleiders: string[], ik: string): string {
  const rijen = begeleiders
    .map((naam) => {
      const aanwezig = dag.aanwezig.includes(naam);
      if (!aanwezig) {
        return `<li class="planning__rij"><span>${naam}</span><span class="planning__leeg">–</span></li>`;
      }
      return `
        <li class="planning__rij is-aanwezig">
          <span>${naam}</span>
          <span class="planning__chips">
            <span class="planning__chip">Aanwezig</span>
            ${naam === ik ? '<button class="planning__afmelden" type="button">Afmelden</button>' : ''}
          </span>
        </li>`;
    })
    .join('');

  return `
    <div class="planning__dag">
      <header class="planning__dagkop">
        <p class="planning__dagnaam">${dag.dag}</p>
        <p class="planning__datum">${dag.datum}</p>
        <span class="teller">${dag.aanwezig.length} aanwezig</span>
      </header>
      <ul>${rijen}</ul>
    </div>`;
}

export function renderTeamplanningPagina(data: DashboardData): string {
  const planning = data.teamPlanning;
  const ik = `${data.begeleider.voornaam} ${data.begeleider.achternaam}`;

  const dagvinkjes = planning.beschikbaarheid
    .map(
      (dag) => `
      <label class="dagvink">
        <input type="checkbox" ${dag.beschikbaar ? 'checked' : ''} />
        <span>${dag.dag}</span>
      </label>`,
    )
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Team planning</h1>
        <p class="paginakop__datum">Wie is er welke dag? Begeleiders geven beschikbaarheid en verlof door, de planner vult de week in</p>
      </div>
    </header>

    <div class="weeknav">
      <button class="knop-ghost-klein" type="button">← Vorige week</button>
      <p class="weeknav__titel">${planning.week}</p>
      <button class="knop-ghost-klein" type="button">Volgende week →</button>
      <span class="badge badge--geel">Deze week</span>
    </div>

    ${
      planning.nietDoorgegeven.length > 0
        ? `<div class="waarschuwing-balk">
            <span class="attentie">${icoon('waarschuwing', 17)}</span>
            <div>
              <p><strong>${planning.nietDoorgegeven.length} begeleiders</strong> hebben de beschikbaarheid nog niet doorgegeven —
                ${planning.nietDoorgegeven.map((naam) => `<span class="badge">${naam}</span>`).join(' ')}</p>
              <p class="waarschuwing-balk__toelichting">Zolang dit niet is ingevuld gebruikt de planning de werkdagen uit het profiel als schatting.</p>
            </div>
          </div>`
        : ''
    }

    <div class="planning">
      ${planning.dagen.map((dag) => renderDag(dag, planning.begeleiders, ik)).join('')}
    </div>

    <div class="hoofd__raster">
      <section class="kaart" aria-labelledby="beschikbaarheid-titel">
        <header class="kaart__kop">
          <h2 id="beschikbaarheid-titel">Mijn beschikbaarheid</h2>
          <span class="badge badge--groen">Doorgegeven · ${planning.doorgegevenOp}</span>
        </header>
        <p class="planning__uitleg">Op welke dagen ben je standaard beschikbaar om ingepland te worden?
          De planner gebruikt dit om de weekplanning te maken.</p>
        <div class="dagvinkjes">${dagvinkjes}</div>
        <button class="knop-primair" type="button">Beschikbaarheid opslaan</button>
      </section>

      <section class="kaart" aria-labelledby="verlof-titel">
        <header class="kaart__kop"><h2 id="verlof-titel">Mijn verlof</h2></header>
        <p class="planning__uitleg">Geef hier je verlof door. Op die dagen kun je niet ingepland worden
          en zie je "Verlof" in de weekplanning.</p>
        <p class="voortgang__leeg">Geen aankomend verlof ingepland.</p>
        <button class="knop-ghost-klein" type="button">+ Verlof toevoegen</button>
      </section>
    </div>`;
}
