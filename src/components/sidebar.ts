import { icoon } from '../icons';
import type { Medewerker, Rol } from '../types';
import logoUrl from '../images/image.png';

interface NavItem {
  label: string;
  icoon: string;
  /** Hash-route; null = nog niet gebouwd. */
  route: string | null;
  /** Attentiestip, bv. openstaande acties. */
  notificatie?: 'oranje' | 'rood';
}

interface NavSectie {
  titel: string;
  items: NavItem[];
}

const buitenMioNavigatie: NavSectie[] = [
  {
    titel: 'Overzicht',
    items: [{ label: 'Dashboard', icoon: 'dashboard', route: '' }],
  },
  {
    titel: 'Voortgang',
    items: [
      { label: 'Mijn voortgang', icoon: 'trend', route: 'voortgang' },
      { label: "Mijn KPI's", icoon: 'doel', route: 'kpis' },
      { label: 'Mijn meeluistersessies', icoon: 'koptelefoon', route: 'sessies' },
    ],
  },
  {
    titel: 'Overig',
    items: [
      { label: 'Mijn kluisje', icoon: 'kluis', route: 'kluisje' },
      { label: 'Games', icoon: 'gamepad', route: 'games' },
      { label: 'Snackkast', icoon: 'koekje', route: 'snackkast' },
    ],
  },
];

const mioNavigatie: NavSectie[] = [
  {
    titel: 'Overzicht',
    items: [
      { label: 'Dashboard', icoon: 'dashboard', route: '' },
      { label: 'Mijn rooster', icoon: 'kalender', route: 'rooster' },
    ],
  },
  {
    titel: 'Voortgang',
    items: [
      { label: 'Mijn voortgang', icoon: 'trend', route: 'voortgang' },
      { label: "Mijn KPI's", icoon: 'doel', route: 'kpis' },
      { label: 'Mijn meeluistersessies', icoon: 'koptelefoon', route: 'sessies' },
      { label: 'Mijn certificeringen', icoon: 'diploma', route: 'certificeringen' },
    ],
  },
  {
    titel: 'Overig',
    items: [
      { label: 'Mijn kluisje', icoon: 'kluis', route: 'kluisje' },
      { label: 'Games', icoon: 'gamepad', route: 'games' },
      { label: 'Snackkast', icoon: 'koekje', route: 'snackkast' },
    ],
  },
];

const begeleiderNavigatie: NavSectie[] = [
  {
    titel: 'Overzicht',
    items: [
      { label: 'Dashboard', icoon: 'dashboard', route: '' },
      { label: 'Vandaag', icoon: 'kalender', route: 'vandaag' },
      { label: 'Agenda', icoon: 'klok', route: 'agenda' },
    ],
  },
  {
    titel: 'Begeleider',
    items: [
      { label: 'Overdrachten', icoon: 'pijlRechts', route: 'overdrachten' },
      { label: 'Week overzicht', icoon: 'kalender', route: 'weekoverzicht' },
      { label: 'Team planning', icoon: 'dashboard', route: 'teamplanning' },
      { label: 'Trainingsvoortgang', icoon: 'trend', route: 'trainingsvoortgang' },
    ],
  },
  {
    titel: 'MIO',
    items: [
      { label: 'KPI overzicht', icoon: 'doel', route: 'kpi-overzicht' },
      { label: 'Roosters', icoon: 'kalender', route: 'roosters' },
      { label: 'Meeluistersessies', icoon: 'koptelefoon', route: 'meeluistersessies', notificatie: 'oranje' },
      { label: 'Certificeringen', icoon: 'diploma', route: 'certificeringen' },
      { label: 'Crediteringen', icoon: 'euro', route: 'crediteringen', notificatie: 'rood' },
    ],
  },
  {
    titel: 'Overig',
    items: [
      { label: 'Kluisjes', icoon: 'kluis', route: 'kluisjes' },
      { label: 'Snackkast', icoon: 'koekje', route: 'snackkast' },
      { label: 'Games', icoon: 'gamepad', route: 'games' },
    ],
  },
];

function initialen(m: Medewerker): string {
  return (m.voornaam[0] + (m.achternaam.replace(/^(el|van|de|den)\s+/i, '')[0] ?? '')).toUpperCase();
}

const navigatiePerRol: Record<Rol, NavSectie[]> = {
  mio: mioNavigatie,
  'buiten-mio': buitenMioNavigatie,
  begeleider: begeleiderNavigatie,
};

export function renderSidebar(persona: Medewerker, rol: Rol): string {
  const navigatie = navigatiePerRol[rol];

  const secties = navigatie
    .map(
      (sectie) => `
      <div class="sidebar__sectie">
        <p class="sidebar__sectietitel">${sectie.titel}</p>
        <ul class="sidebar__lijst">
          ${sectie.items
            .map(
              (item) => `
            <li>
              <a href="${item.route === null ? '#' : `#/${item.route}`}"
                 class="sidebar__item"
                 ${item.route === null ? '' : `data-route="${item.route}"`}>
                ${icoon(item.icoon)}
                <span>${item.label}</span>
                ${item.notificatie ? `<span class="sidebar__stip sidebar__stip--${item.notificatie}" aria-label="Vraagt aandacht"></span>` : ''}
              </a>
            </li>`,
            )
            .join('')}
        </ul>
      </div>`,
    )
    .join('');

  return `
    <aside class="sidebar">
      <div class="sidebar__logo">
        <img class="sidebar__logo-img" src="${logoUrl}" alt="KPN" />
      </div>

      <nav class="sidebar__nav" aria-label="Hoofdnavigatie">${secties}</nav>

      <div class="rolwissel" role="group" aria-label="Wissel van rol">
        <p class="rolwissel__label">Bekijk als</p>
        <div class="rolwissel__knoppen">
          <button class="rolwissel__knop ${rol === 'mio' ? 'is-actief' : ''}" type="button"
                  data-rol="mio" aria-pressed="${rol === 'mio'}">MIO</button>
          <button class="rolwissel__knop ${rol === 'buiten-mio' ? 'is-actief' : ''}" type="button"
                  data-rol="buiten-mio" aria-pressed="${rol === 'buiten-mio'}">Buiten MIO</button>
          <button class="rolwissel__knop ${rol === 'begeleider' ? 'is-actief' : ''}" type="button"
                  data-rol="begeleider" aria-pressed="${rol === 'begeleider'}">Begeleider</button>
        </div>
      </div>

      <div class="sidebar__voet">
        <div class="avatar" aria-hidden="true">${initialen(persona)}</div>
        <div class="sidebar__persoon">
          <p class="sidebar__naam">${persona.voornaam} ${persona.achternaam}</p>
          <p class="sidebar__functie">${persona.functie}</p>
        </div>
        <button class="knop-icoon" type="button" aria-label="Instellingen">
          ${icoon('instellingen')}
        </button>
      </div>
    </aside>`;
}

/** Zet de actieve navigatie-status zonder de sidebar opnieuw te renderen. */
export function markeerActieveRoute(route: string): void {
  document.querySelectorAll<HTMLAnchorElement>('.sidebar__item[data-route]').forEach((item) => {
    const actief = item.dataset.route === route;
    item.classList.toggle('is-actief', actief);
    if (actief) {
      item.setAttribute('aria-current', 'page');
    } else {
      item.removeAttribute('aria-current');
    }
  });
}
