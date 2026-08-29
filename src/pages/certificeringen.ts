import type { DashboardData, MioOverzichtRij } from '../types';

function renderRij(mio: MioOverzichtRij): string {
  return `
    <tr>
      <td><span class="mio-rij"><span class="mio-rij__naam">${mio.naam}</span></span></td>
      <td>${mio.certificeringen}</td>
      <td>${mio.laatsteCertificering ?? '<span class="mio-rij__leeg">–</span>'}</td>
      <td class="tabel__acties">
        <a href="#" class="knop-ghost-klein">Bekijken</a>
        <a href="#" class="knop-primair knop-primair--klein">+ Certificering starten</a>
      </td>
    </tr>`;
}

export function renderCertificeringenPagina(data: DashboardData): string {
  const totaal = data.mios.reduce((som, mio) => som + mio.certificeringen, 0);

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Certificeringen</h1>
        <p class="paginakop__datum">Start en volg certificeringen per MIO</p>
      </div>
      <span class="badge badge--groen">${totaal} behaald</span>
    </header>

    <section class="kaart" aria-labelledby="certificeringen-titel">
      <header class="kaart__kop">
        <h2 id="certificeringen-titel">Overzicht per MIO</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel">
          <thead>
            <tr>
              <th scope="col">Naam</th>
              <th scope="col">Certificeringen</th>
              <th scope="col">Laatste</th>
              <th scope="col"><span class="visueel-verborgen">Acties</span></th>
            </tr>
          </thead>
          <tbody>${data.mios.map(renderRij).join('')}</tbody>
        </table>
      </div>
    </section>`;
}
