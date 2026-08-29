import { icoon } from '../icons';
import type { DashboardData, Kluisje } from '../types';

function voornaam(naam: string): string {
  return naam.split(' ')[0];
}

function renderKluis(kluis: Kluisje): string {
  if (!kluis.sleutel) {
    return `
      <li class="kluis kluis--geen-sleutel">
        <span class="kluis__nummer">${kluis.nummer}</span>
        <span class="kluis__status">Geen sleutel</span>
      </li>`;
  }

  if (kluis.mio) {
    return `
      <li class="kluis kluis--toegewezen" title="${kluis.mio}">
        <span class="kluis__nummer">${kluis.nummer}</span>
        <span class="kluis__status">${voornaam(kluis.mio)}</span>
      </li>`;
  }

  return `
    <li class="kluis kluis--vrij">
      <span class="kluis__nummer">${kluis.nummer}</span>
      <span class="kluis__status">Vrij</span>
    </li>`;
}

export function renderKluisjesBeheerPagina(data: DashboardData): string {
  const metSleutel = data.kluisjes.filter((k) => k.sleutel);
  const toegewezen = metSleutel.filter((k) => k.mio);
  const vrij = metSleutel.filter((k) => !k.mio);

  const toegewezenNamen = new Set(toegewezen.map((k) => k.mio));
  const zonderKluis = data.mios.filter((mio) => !toegewezenNamen.has(mio.naam));

  const statistieken = [
    { icoon: 'kluis', label: 'Kluisjes totaal', waarde: String(metSleutel.length) },
    { icoon: 'checkCirkel', label: 'Toegewezen', waarde: String(toegewezen.length) },
    { icoon: 'sleutel', label: 'Vrij', waarde: String(vrij.length) },
    { icoon: 'waarschuwing', label: "MIO's zonder kluis", waarde: String(zonderKluis.length) },
  ];

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Kluisjes</h1>
        <p class="paginakop__datum">Wijs kluisjes toe aan MIO's — klik op een nummer om een MIO te koppelen of de toewijzing te wijzigen</p>
      </div>
    </header>

    <section class="kpis" aria-label="Samenvatting">
      <div class="kpis__raster">
        ${statistieken
          .map(
            (stat) => `
          <article class="kaart kpi">
            <div class="kpi__kop">
              <span class="kpi__icoon">${icoon(stat.icoon, 18)}</span>
              <p class="kpi__label">${stat.label}</p>
            </div>
            <p class="kpi__waarde">${stat.waarde}</p>
          </article>`,
          )
          .join('')}
      </div>
    </section>

    <section class="kaart" aria-labelledby="kluiswand-beheer-titel">
      <header class="kaart__kop">
        <h2 id="kluiswand-beheer-titel">Kluisjes (vloer-layout)</h2>
      </header>
      <ul class="kluis-raster">${data.kluisjes.map(renderKluis).join('')}</ul>
      <p class="kluis-legenda">
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--van-jou"></span> Toegewezen</span>
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--vrij"></span> Vrij</span>
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--geen-sleutel"></span> Geen sleutel beschikbaar</span>
      </p>
    </section>

    <section class="kaart zonder-kluis" aria-labelledby="zonder-kluis-titel">
      <header class="kaart__kop">
        <h2 id="zonder-kluis-titel">MIO's zonder kluisje</h2>
        <span class="teller">${zonderKluis.length}</span>
      </header>
      <div class="zonder-kluis__lijst">
        ${zonderKluis
          .map(
            (mio) => `
          <span class="zonder-kluis__mio">
            ${mio.naam}
            <a href="#" class="knop-link">Kluis toewijzen</a>
          </span>`,
          )
          .join('')}
      </div>
    </section>`;
}
