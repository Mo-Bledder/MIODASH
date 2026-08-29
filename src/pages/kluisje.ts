import { icoon } from '../icons';
import type { DashboardData, Kluisje } from '../types';

type KluisStatus = 'vrij' | 'bezet' | 'geen-sleutel' | 'van-jou';

const statusTekst: Record<KluisStatus, string> = {
  vrij: 'Vrij',
  bezet: 'Bezet',
  'geen-sleutel': 'Geen sleutel',
  'van-jou': 'Jouw kluis',
};

function kluisStatus(kluis: Kluisje, mijnNummer: number): KluisStatus {
  if (kluis.nummer === mijnNummer) return 'van-jou';
  if (!kluis.sleutel) return 'geen-sleutel';
  return kluis.mio ? 'bezet' : 'vrij';
}

function renderKluis(kluis: Kluisje, mijnNummer: number): string {
  const status = kluisStatus(kluis, mijnNummer);
  return `
    <li class="kluis kluis--${status}">
      <span class="kluis__nummer">${kluis.nummer}</span>
      <span class="kluis__status">${statusTekst[status]}</span>
    </li>`;
}

export function renderKluisjePagina(data: DashboardData): string {
  const vrij = data.kluisjes.filter(
    (k) => kluisStatus(k, data.mijnKluisnummer) === 'vrij',
  ).length;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn kluisje</h1>
        <p class="paginakop__datum">Jouw kluis en de kluisjeswand</p>
      </div>
      <span class="badge badge--groen">${vrij} kluisjes vrij</span>
    </header>

    <section class="kaart kluis-hero">
      <span class="kluis-hero__icoon">${icoon('sleutel', 24)}</span>
      <p class="kluis-hero__label">Jouw kluisnummer</p>
      <p class="kluis-hero__nummer">${data.mijnKluisnummer}</p>
      <p class="kluis-hero__tekst">
        Je bent zelf verantwoordelijk voor de sleutel.
        Ben je 'm kwijt? Meld het direct bij je begeleider.
      </p>
    </section>

    <section class="kaart" aria-labelledby="kluiswand-titel">
      <header class="kaart__kop">
        <h2 id="kluiswand-titel">Kluisjes overzicht</h2>
      </header>
      <ul class="kluis-raster">${data.kluisjes.map((k) => renderKluis(k, data.mijnKluisnummer)).join('')}</ul>
      <p class="kluis-legenda">
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--van-jou"></span> Jouw kluis</span>
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--vrij"></span> Vrij om aan te vragen</span>
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--bezet"></span> Bezet</span>
        <span class="kluis-legenda__item"><span class="kluis-legenda__blok kluis-legenda__blok--geen-sleutel"></span> Geen sleutel beschikbaar</span>
      </p>
    </section>`;
}
