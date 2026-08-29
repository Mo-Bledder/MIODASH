import { icoon } from '../icons';
import type { Mijlpaal } from '../types';

export function renderMijlpalen(mijlpalen: Mijlpaal[]): string {
  const behaald = mijlpalen.filter((m) => m.behaald).length;

  const stappen = mijlpalen
    .map(
      (m) => `
      <li class="mijlpaal ${m.behaald ? 'is-behaald' : ''}">
        <span class="mijlpaal__cirkel">
          ${icoon(m.icoon, 18)}
          ${m.behaald ? `<span class="mijlpaal__vink">${icoon('vinkje', 10)}</span>` : ''}
        </span>
        <span class="mijlpaal__naam">${m.naam}</span>
      </li>`,
    )
    .join('');

  return `
    <section class="kaart mijlpalen" aria-labelledby="mijlpalen-titel">
      <header class="kaart__kop">
        <h2 id="mijlpalen-titel">Mijlpalen</h2>
        <span class="teller">${behaald} van ${mijlpalen.length} behaald</span>
      </header>
      <ol class="mijlpalen__pad">${stappen}</ol>
    </section>`;
}
