import type { DashboardData, Overdracht } from '../types';

function renderRij(overdracht: Overdracht): string {
  return `
    <tr>
      <td class="sessies__datum">${overdracht.datum}</td>
      <td>${overdracht.dag}</td>
      <td>${overdracht.ingevuldDoor}</td>
      <td><span class="telchip">${overdracht.mios}</span></td>
      <td><span class="telchip telchip--blauw">${overdracht.trainers}</span></td>
      <td class="tabel__acties">
        <a href="#" class="knop-ghost-klein">Bekijken</a>
        <a href="#" class="knop-primair knop-primair--klein">Bewerken</a>
      </td>
    </tr>`;
}

export function renderOverdrachtenPagina(data: DashboardData): string {
  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Overdrachten</h1>
        <p class="paginakop__datum">De dagelijkse overdracht per werkdag — wie was er en wie heeft ingevuld</p>
      </div>
      <span class="badge badge--groen">${data.overdrachtenTotaal} totaal</span>
    </header>

    <div class="weeknav">
      <button class="knop-ghost-klein" type="button">←</button>
      <p class="weeknav__titel">Augustus 2026</p>
      <button class="knop-ghost-klein" type="button">→</button>
    </div>

    <section class="kaart" aria-labelledby="overdrachten-titel">
      <header class="kaart__kop">
        <h2 id="overdrachten-titel">Deze maand</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel">
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Dag</th>
              <th scope="col">Ingevuld door</th>
              <th scope="col">MIO's</th>
              <th scope="col">Trainers</th>
              <th scope="col"><span class="visueel-verborgen">Acties</span></th>
            </tr>
          </thead>
          <tbody>${data.overdrachten.map(renderRij).join('')}</tbody>
        </table>
      </div>
    </section>`;
}
