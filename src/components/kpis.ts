import { icoon } from '../icons';
import type { Kpi, KpiDetail } from '../types';

function renderDetail(detail: KpiDetail): string {
  const richting = detail.richting && detail.richting !== 'neutraal' ? `is-${detail.richting}` : '';
  return `<span class="kpi__detail ${richting}">${detail.tekst}</span>`;
}

export function renderKpis(kpis: Kpi[]): string {
  const tegels = kpis
    .map(
      (kpi) => `
      <article class="kaart kpi">
        <div class="kpi__kop">
          <span class="kpi__icoon">${icoon(kpi.icoon, 18)}</span>
          <p class="kpi__label">${kpi.label}</p>
        </div>
        <p class="kpi__waarde">${kpi.waarde}</p>
        <p class="kpi__details">${kpi.details.map(renderDetail).join('')}</p>
      </article>`,
    )
    .join('');

  return `
    <section class="kpis" aria-label="Mijn resultaten">
      <h2 class="sectietitel">Mijn resultaten</h2>
      <div class="kpis__raster">${tegels}</div>
    </section>`;
}
