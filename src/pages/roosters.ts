import type { DashboardData, MioOverzichtRij } from '../types';

const alleDagen = ['Ma', 'Di', 'Wo', 'Do', 'Vr'];

function renderDagen(werkdagen: string[]): string {
  return `<span class="dagen">${alleDagen
    .map(
      (dag) =>
        `<span class="dagen__dag ${werkdagen.includes(dag) ? 'is-werkdag' : ''}">${dag}</span>`,
    )
    .join('')}</span>`;
}

function renderRij(mio: MioOverzichtRij): string {
  return `
    <tr>
      <td><span class="mio-rij"><span class="mio-rij__naam">${mio.naam}</span></span></td>
      <td>${renderDagen(mio.werkdagen)}</td>
      <td>${mio.urenPerWeek === null ? '<span class="mio-rij__leeg">–</span>' : `${mio.urenPerWeek} uur`}</td>
      <td class="tabel__acties"><a href="#" class="knop-ghost-klein">Bekijken</a></td>
    </tr>`;
}

export function renderRoostersPagina(data: DashboardData): string {
  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Roosters</h1>
        <p class="paginakop__datum">Werkdagen en contracturen per MIO</p>
      </div>
    </header>

    <section class="kaart" aria-labelledby="roosters-titel">
      <header class="kaart__kop">
        <h2 id="roosters-titel">Overzicht per MIO</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel">
          <thead>
            <tr>
              <th scope="col">Naam</th>
              <th scope="col">Werkdagen</th>
              <th scope="col">Uren/week</th>
              <th scope="col"><span class="visueel-verborgen">Acties</span></th>
            </tr>
          </thead>
          <tbody>${data.mios.map(renderRij).join('')}</tbody>
        </table>
      </div>
    </section>`;
}
