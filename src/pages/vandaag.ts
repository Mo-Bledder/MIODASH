import { icoon } from '../icons';
import { renderMededelingen } from '../components/mededelingen';
import type { DashboardData, MioOverzichtRij } from '../types';

const dagLetters = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];

function renderMioRij(mio: MioOverzichtRij, vandaagLetter: string): string {
  const verwacht = mio.werkdagen.includes(vandaagLetter);
  return `
    <tr>
      <td><span class="mio-rij"><span class="mio-rij__naam">${mio.naam}</span></span></td>
      <td>${verwacht ? '09:00' : '<span class="mio-rij__leeg">–</span>'}</td>
      <td>${verwacht ? '<span class="badge badge--groen">Verwacht</span>' : '<span class="badge">Vrij</span>'}</td>
    </tr>`;
}

export function renderVandaagPagina(data: DashboardData): string {
  const nu = new Date();
  const datum = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(nu);
  const vandaagLetter = dagLetters[nu.getDay()];
  const verwacht = data.mios.filter((mio) => mio.werkdagen.includes(vandaagLetter)).length;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Vandaag</h1>
        <p class="paginakop__datum">${datum.charAt(0).toUpperCase() + datum.slice(1)}</p>
      </div>
      <div class="paginakop__acties">
        <a href="#/overdrachten" class="knop-ghost-klein">Overdracht invullen</a>
        <button class="knop-primair" type="button">+ Nieuw bericht</button>
      </div>
    </header>

    ${renderMededelingen(data.mededelingen)}

    <section class="kpis" aria-label="Samenvatting">
      <div class="kpis__raster">
        <article class="kaart kpi">
          <div class="kpi__kop">
            <span class="kpi__icoon">${icoon('checkCirkel', 18)}</span>
            <p class="kpi__label">Aangemeld vandaag</p>
          </div>
          <p class="kpi__waarde">0/${verwacht}</p>
        </article>
      </div>
    </section>

    <div class="hoofd__raster">
      <section class="kaart" aria-labelledby="mios-vandaag-titel">
        <header class="kaart__kop">
          <h2 id="mios-vandaag-titel">MIO's vandaag</h2>
          ${verwacht === 0 ? '<span class="badge">Niemand ingepland</span>' : `<span class="teller">${verwacht} verwacht</span>`}
        </header>
        <div class="tabel-scroll">
          <table class="tabel">
            <thead>
              <tr>
                <th scope="col">Naam</th>
                <th scope="col">Start</th>
                <th scope="col">Aanwezigheid</th>
              </tr>
            </thead>
            <tbody>${data.mios.map((mio) => renderMioRij(mio, vandaagLetter)).join('')}</tbody>
          </table>
        </div>
      </section>

      <section class="kaart" aria-labelledby="agenda-vandaag-titel">
        <header class="kaart__kop">
          <h2 id="agenda-vandaag-titel">Agenda vandaag</h2>
          <a href="#/agenda" class="knop-ghost-klein">Hele week</a>
        </header>
        <p class="voortgang__leeg">Niets ingepland vandaag.</p>
        <button class="knop-primair" type="button">+ Inplannen</button>
      </section>
    </div>`;
}
