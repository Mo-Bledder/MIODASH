import { icoon } from '../icons';
import { renderHeader } from '../components/header';
import { renderMededelingen } from '../components/mededelingen';
import { renderSnelkoppelingen } from '../components/snelkoppelingen';
import { renderVoortgang } from '../components/voortgang';
import { renderKpis } from '../components/kpis';
import { renderMijlpalen } from '../components/mijlpalen';
import { renderVolgendeStap } from '../components/volgendeStap';
import type { DashboardData, MioRoosterDag } from '../types';

function renderRoosterKaart(rooster: MioRoosterDag[]): string {
  const rijen = rooster
    .map((dag) => {
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
    })
    .join('');

  return `
    <section class="kaart" aria-labelledby="rooster-kaart-titel">
      <header class="kaart__kop">
        <h2 id="rooster-kaart-titel">Mijn rooster</h2>
        <a href="#/rooster" class="knop-link">Rooster & verlof ${icoon('pijlRechts', 14)}</a>
      </header>
      <ul class="wrooster">${rijen}</ul>
    </section>`;
}

export function renderMioDashboard(data: DashboardData): string {
  return `
    ${renderHeader(data.mioPersona, data.mededelingen.length)}
    ${renderMededelingen(data.mededelingen)}
    ${renderVolgendeStap(data, 'mio')}
    <div class="hoofd__raster">
      ${renderRoosterKaart(data.mioRooster)}
      ${renderVoortgang(data.voortgang, data.laatsteSessie, data.trainingen)}
    </div>
    <div class="snelkoppelingen--breed">
      ${renderSnelkoppelingen(data.snelkoppelingen)}
    </div>
    ${renderKpis(data.kpis)}
    ${renderMijlpalen(data.mijlpalen)}`;
}
