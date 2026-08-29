import { icoon } from '../icons';
import type { DashboardData, MioOverzichtRij } from '../types';

/** Dagen tussen een dd-mm-jjjj-datum en vandaag. */
export function dagenGeleden(datum: string): number {
  const [dag, maand, jaar] = datum.split('-').map(Number);
  const verschil = Date.now() - new Date(jaar, maand - 1, dag).getTime();
  return Math.floor(verschil / 86_400_000);
}

/** Een MIO vraagt aandacht zonder sessies, of als de laatste te lang geleden is. */
export function sessieAandacht(mio: MioOverzichtRij): boolean {
  if (mio.sessies === 0) return true;
  return mio.laatsteSessie !== null && dagenGeleden(mio.laatsteSessie) >= 7;
}

export function renderNaamMetWaarschuwing(naam: string, aandacht: boolean): string {
  return `
    <span class="mio-rij">
      <span class="mio-rij__naam">${naam}</span>
      ${aandacht ? `<span class="attentie" title="Vraagt aandacht">${icoon('waarschuwing', 15)}</span>` : ''}
    </span>`;
}

function renderRij(mio: MioOverzichtRij): string {
  const aandacht = sessieAandacht(mio);
  const dagen = mio.laatsteSessie ? dagenGeleden(mio.laatsteSessie) : null;
  const laatste = mio.laatsteSessie
    ? `${mio.laatsteSessie}${dagen !== null && dagen >= 7 ? ` <span class="is-attentie">(${dagen} dgn geleden)</span>` : ''}`
    : '<span class="mio-rij__leeg">–</span>';

  return `
    <tr>
      <td>${renderNaamMetWaarschuwing(mio.naam, aandacht)}</td>
      <td>${mio.sessies}</td>
      <td>${laatste}</td>
      <td class="tabel__acties">
        <a href="#" class="knop-ghost-klein">Sessies bekijken</a>
        <a href="#" class="knop-primair knop-primair--klein">+ Sessie starten</a>
      </td>
    </tr>`;
}

export function renderSessiesBeheerPagina(data: DashboardData): string {
  const aandacht = data.mios.filter(sessieAandacht).length;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Meeluistersessies</h1>
        <p class="paginakop__datum">Start of bekijk sessies per MIO — ${icoon('waarschuwing', 13)} betekent: 7+ dagen geen sessie</p>
      </div>
      <span class="badge badge--groen">${aandacht} vragen aandacht</span>
    </header>

    <section class="kaart" aria-labelledby="sessies-beheer-titel">
      <header class="kaart__kop">
        <h2 id="sessies-beheer-titel">Overzicht per MIO</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel">
          <thead>
            <tr>
              <th scope="col">Naam</th>
              <th scope="col">Sessies</th>
              <th scope="col">Laatste sessie</th>
              <th scope="col"><span class="visueel-verborgen">Acties</span></th>
            </tr>
          </thead>
          <tbody>${data.mios.map(renderRij).join('')}</tbody>
        </table>
      </div>
    </section>`;
}
