import { icoon } from '../icons';
import type { DashboardData, Rol } from '../types';

interface Stap {
  icoon: string;
  tekst: string;
  route: string;
}

/**
 * Een vriendelijke, persoonlijke "wat nu?"-kaart voor (buiten-)MIO's,
 * automatisch samengesteld uit de data.
 */
export function renderVolgendeStap(data: DashboardData, rol: Rol): string {
  const stappen: Stap[] = [];

  if (!data.voortgang.leerdoel) {
    stappen.push({ icoon: 'sparkle', tekst: 'Zet je leerdoel voor deze week — klein en concreet werkt het best', route: 'voortgang' });
  }

  const openElearning = data.trainingen.elearnings.find((t) => !t.afgerond);
  if (openElearning) {
    stappen.push({ icoon: 'diploma', tekst: `Rond de e-learning "${openElearning.naam}" af — dan is je volgende mijlpaal binnen`, route: 'voortgang' });
  }

  if (rol === 'mio') {
    const gepland = data.mioCertificeringen.find((c) => c.status === 'gepland');
    if (gepland) {
      stappen.push({ icoon: 'medaille', tekst: `${gepland.naam} komt eraan — kijk alvast wat je kunt voorbereiden`, route: 'certificeringen' });
    }
  } else {
    stappen.push({ icoon: 'koptelefoon', tekst: 'Luister je laatste meeluistersessie terug voor de gouden tips', route: 'sessies' });
  }

  if (stappen.length === 0) return '';

  const weekend = [0, 6].includes(new Date().getDay());
  const ondertitel = weekend
    ? 'Fijn weekend! Dit staat er voor volgende week voor je klaar.'
    : 'Kleine stappen, groot verschil — dit is wat er nu toe doet.';

  return `
    <section class="kaart volgende-stap" aria-labelledby="volgende-stap-titel">
      <header class="kaart__kop">
        <h2 id="volgende-stap-titel">Jouw volgende stap</h2>
      </header>
      <p class="volgende-stap__ondertitel">${ondertitel}</p>
      <ul>
        ${stappen
          .map(
            (stap) => `
          <li class="actie">
            <span class="actie__icoon">${icoon(stap.icoon, 16)}</span>
            <span class="actie__tekst">${stap.tekst}</span>
            <a href="#/${stap.route}" class="knop-link">Ga ernaartoe ${icoon('pijlRechts', 14)}</a>
          </li>`,
          )
          .join('')}
      </ul>
    </section>`;
}
