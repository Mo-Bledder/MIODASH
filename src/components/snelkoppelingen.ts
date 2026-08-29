import { icoon } from '../icons';
import type { Snelkoppeling } from '../types';

function renderKoppeling(link: Snelkoppeling): string {
  const binnenkant = `
    <span class="snelkoppeling__icoon">${icoon(link.icoon)}</span>
    <span class="snelkoppeling__tekst">
      <span class="snelkoppeling__naam">${link.naam}</span>
      <span class="snelkoppeling__omschrijving">${link.omschrijving}</span>
    </span>`;

  if (link.code) {
    return `
      <li>
        <button class="snelkoppeling" type="button" data-kopieer="${link.code}"
                aria-label="Kopieer activatiecode ${link.code}">
          ${binnenkant}
          <span class="snelkoppeling__code">${link.code} ${icoon('kopieer', 15)}</span>
        </button>
      </li>`;
  }

  return `
    <li>
      <a class="snelkoppeling" href="${link.url}" target="_blank" rel="noopener noreferrer">
        ${binnenkant}
        <span class="snelkoppeling__pijl">${icoon('extern', 16)}</span>
      </a>
    </li>`;
}

export function renderSnelkoppelingen(snelkoppelingen: Snelkoppeling[]): string {
  return `
    <section class="kaart snelkoppelingen" aria-labelledby="snelkoppelingen-titel">
      <header class="kaart__kop">
        <h2 id="snelkoppelingen-titel">Snel naar</h2>
      </header>
      <ul class="snelkoppelingen__lijst">
        ${snelkoppelingen.map(renderKoppeling).join('')}
      </ul>
    </section>`;
}
