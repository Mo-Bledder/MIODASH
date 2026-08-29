import { icoon } from '../icons';
import type { DashboardData, MioCertificering } from '../types';

function renderCertificering(certificering: MioCertificering): string {
  const behaald = certificering.status === 'behaald';
  return `
    <li class="certificering ${behaald ? 'is-behaald' : ''}">
      <span class="certificering__status">${behaald ? icoon('vinkje', 13) : icoon('klok', 15)}</span>
      <span class="certificering__naam">${certificering.naam}</span>
      <span class="certificering__datum">${certificering.datum}</span>
      ${behaald ? '<span class="badge badge--groen">Behaald</span>' : '<span class="badge badge--geel">Gepland</span>'}
    </li>`;
}

export function renderMioCertificeringenPagina(data: DashboardData): string {
  const behaald = data.mioCertificeringen.filter((c) => c.status === 'behaald').length;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn certificeringen</h1>
        <p class="paginakop__datum">Behaalde en geplande certificeringen in je traject</p>
      </div>
      <span class="badge badge--groen">${behaald} behaald</span>
    </header>

    <section class="kaart" aria-labelledby="certificeringen-mio-titel">
      <header class="kaart__kop">
        <h2 id="certificeringen-mio-titel">Overzicht</h2>
      </header>
      <ul>${data.mioCertificeringen.map(renderCertificering).join('')}</ul>
    </section>`;
}
