import { icoon } from '../icons';
import type { Medewerker } from '../types';

export function begroeting(uur: number): string {
  if (uur < 6) return 'Goedenacht';
  if (uur < 12) return 'Goedemorgen';
  if (uur < 18) return 'Goedemiddag';
  return 'Goedenavond';
}

export function renderHeader(medewerker: Medewerker, aantalMededelingen: number): string {
  const nu = new Date();
  const datum = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(nu);

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">${begroeting(nu.getHours())}, ${medewerker.voornaam}</h1>
        <p class="paginakop__datum">${datum.charAt(0).toUpperCase() + datum.slice(1)}</p>
      </div>
      <button class="knop-icoon knop-icoon--rand ${aantalMededelingen > 0 ? 'heeft-melding' : ''}"
              type="button" aria-label="Mededelingen (${aantalMededelingen})">
        ${icoon('bel')}
      </button>
    </header>`;
}
