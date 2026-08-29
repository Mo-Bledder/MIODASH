import { icoon } from '../icons';
import type { Mededeling } from '../types';

export function renderMededelingen(mededelingen: Mededeling[]): string {
  if (mededelingen.length === 0) return '';

  const items = mededelingen
    .map(
      (m) => `
      <article class="mededelingen__item">
        <h3>${m.titel}</h3>
        <p>${m.inhoud}</p>
        ${m.afzender ? `<p class="mededelingen__meta">${m.afzender}${m.datum ? ` · ${m.datum}` : ''}</p>` : ''}
      </article>`,
    )
    .join('');

  return `
    <details class="mededelingen">
      <summary class="mededelingen__kop">
        <span class="mededelingen__icoon">${icoon('megafoon')}</span>
        <span class="mededelingen__titel">Mededelingen</span>
        <span class="teller">${mededelingen.length}</span>
        <span class="mededelingen__preview">${mededelingen[0].titel}</span>
        <span class="mededelingen__chevron">${icoon('chevronOnder', 18)}</span>
      </summary>
      <div class="mededelingen__inhoud">${items}</div>
    </details>`;
}
