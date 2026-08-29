import './styles/main.scss';
import { dashboardData } from './data';
import { markeerActieveRoute, renderSidebar } from './components/sidebar';
import { renderDashboardPagina } from './pages/dashboard';
import { renderVoortgangPagina } from './pages/voortgang';
import { renderKpisPagina } from './pages/kpis';
import { renderSessiesPagina } from './pages/sessies';
import { renderKluisjePagina } from './pages/kluisje';
import { renderGamesPagina } from './pages/games';
import { renderSnackkastPagina } from './pages/snackkast';
import { renderBegeleiderDashboard } from './pages/begeleider';
import { renderMioDashboard } from './pages/mioDashboard';
import { renderMioRoosterPagina } from './pages/mioRooster';
import { renderMioCertificeringenPagina } from './pages/mioCertificeringen';
import { renderVandaagPagina } from './pages/vandaag';
import { renderAgendaPagina } from './pages/agenda';
import { renderOverdrachtenPagina } from './pages/overdrachten';
import { renderSessiesBeheerPagina } from './pages/sessiesBeheer';
import { renderRoostersPagina } from './pages/roosters';
import { renderKpiOverzichtPagina } from './pages/kpiOverzicht';
import { renderTrainingsvoortgangPagina } from './pages/trainingsvoortgang';
import { renderTeamplanningPagina } from './pages/teamplanning';
import { renderWeekOverzichtPagina } from './pages/weekOverzicht';
import { renderCertificeringenPagina } from './pages/certificeringen';
import { renderCrediteringenPagina } from './pages/crediteringen';
import { renderKluisjesBeheerPagina } from './pages/kluisjesBeheer';
import type { DashboardData, Rol } from './types';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('Element #app niet gevonden');

const data = dashboardData;
let rol: Rol = 'mio';

type Pagina = (data: DashboardData) => string;

// De medewerker die het traject heeft afgerond ("buiten MIO").
const buitenMioPaginas: Record<string, Pagina> = {
  '': renderDashboardPagina,
  voortgang: renderVoortgangPagina,
  kpis: renderKpisPagina,
  sessies: renderSessiesPagina,
  kluisje: renderKluisjePagina,
  games: renderGamesPagina,
  snackkast: renderSnackkastPagina,
};

// De MIO in traject: zelfde basis, plus rooster/verlof en eigen certificeringen.
const mioPaginas: Record<string, Pagina> = {
  '': renderMioDashboard,
  rooster: renderMioRoosterPagina,
  voortgang: renderVoortgangPagina,
  kpis: renderKpisPagina,
  sessies: renderSessiesPagina,
  certificeringen: renderMioCertificeringenPagina,
  kluisje: renderKluisjePagina,
  games: renderGamesPagina,
  snackkast: renderSnackkastPagina,
};

const begeleiderPaginas: Record<string, Pagina> = {
  '': renderBegeleiderDashboard,
  vandaag: renderVandaagPagina,
  agenda: renderAgendaPagina,
  overdrachten: renderOverdrachtenPagina,
  weekoverzicht: renderWeekOverzichtPagina,
  teamplanning: renderTeamplanningPagina,
  trainingsvoortgang: renderTrainingsvoortgangPagina,
  'kpi-overzicht': renderKpiOverzichtPagina,
  roosters: renderRoostersPagina,
  meeluistersessies: renderSessiesBeheerPagina,
  certificeringen: renderCertificeringenPagina,
  crediteringen: renderCrediteringenPagina,
  kluisjes: renderKluisjesBeheerPagina,
  snackkast: renderSnackkastPagina,
  games: renderGamesPagina,
};

let hoofd: HTMLElement;
let tooltip: HTMLDivElement;

const personaPerRol = (): Record<Rol, typeof data.medewerker> => ({
  mio: data.mioPersona,
  'buiten-mio': data.medewerker,
  begeleider: data.begeleider,
});

const paginasPerRol: Record<Rol, Record<string, Pagina>> = {
  mio: mioPaginas,
  'buiten-mio': buitenMioPaginas,
  begeleider: begeleiderPaginas,
};

function renderShell(): void {
  const persona = personaPerRol()[rol];
  app!.innerHTML = `
    <div class="app">
      ${renderSidebar(persona, rol)}
      <main class="hoofd" id="hoofd"></main>
    </div>
    <div class="tooltip" id="tooltip" role="tooltip" hidden></div>`;
  hoofd = document.querySelector<HTMLElement>('#hoofd')!;
  tooltip = document.querySelector<HTMLDivElement>('#tooltip')!;
}

function renderRoute(): void {
  const paginas = paginasPerRol[rol];
  const route = location.hash.replace(/^#\/?/, '');
  const pagina = paginas[route] ?? paginas[''];
  hoofd.innerHTML = pagina(data);
  markeerActieveRoute(route in paginas ? route : '');
  hoofd.scrollTop = 0;
  window.scrollTo(0, 0);
}

renderShell();
renderRoute();
window.addEventListener('hashchange', renderRoute);

// Rollenwissel linksonder in de sidebar.
app.addEventListener('click', (event) => {
  const knop = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-rol]');
  if (!knop) return;

  const nieuweRol = knop.dataset.rol as Rol;
  if (nieuweRol === rol) return;

  rol = nieuweRol;
  renderShell();
  if (location.hash && location.hash !== '#/') {
    location.hash = '#/'; // terug naar het dashboard van de nieuwe rol
  } else {
    renderRoute();
  }
});

// Crediteringen afvinken (één of een hele bundel tegelijk).
app.addEventListener('click', (event) => {
  const knop = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-besproken]');
  if (!knop) return;

  const referenties = (knop.dataset.besproken ?? '').split(',');
  data.crediteringen.forEach((creditering) => {
    if (referenties.includes(creditering.referentie)) creditering.status = 'afgehandeld';
  });
  renderRoute();
});

// Snackkast: filteren op categorie.
app.addEventListener('click', (event) => {
  const tab = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
  if (!tab) return;

  const filter = tab.dataset.filter;
  app.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((knop) => {
    knop.classList.toggle('is-actief', knop === tab);
  });
  app.querySelectorAll<HTMLElement>('[data-categorie]').forEach((sectie) => {
    sectie.hidden = filter !== 'alles' && sectie.dataset.categorie !== filter;
  });
});

// Activatiecode kopiëren met korte bevestiging.
app.addEventListener('click', async (event) => {
  const knop = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-kopieer]');
  if (!knop || knop.classList.contains('is-gekopieerd')) return;

  const codeElement = knop.querySelector<HTMLElement>('.snelkoppeling__code');
  if (!codeElement) return;

  try {
    await navigator.clipboard.writeText(knop.dataset.kopieer ?? '');
    const origineel = codeElement.innerHTML;
    knop.classList.add('is-gekopieerd');
    codeElement.textContent = 'Gekopieerd!';
    setTimeout(() => {
      codeElement.innerHTML = origineel;
      knop.classList.remove('is-gekopieerd');
    }, 1600);
  } catch {
    // Klembord niet beschikbaar (bv. onbeveiligde context) — code blijft leesbaar in beeld.
  }
});

// Tooltip op grafiekpunten (muis én toetsenbord).
function toonTooltip(punt: Element): void {
  const tekst = (punt as HTMLElement).dataset.tooltip;
  if (!tekst) return;
  tooltip.textContent = tekst;
  tooltip.hidden = false;
  const rect = punt.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2 + window.scrollX}px`;
  tooltip.style.top = `${rect.top + window.scrollY - 8}px`;
}

app.addEventListener('mouseover', (event) => {
  const punt = (event.target as Element).closest('[data-tooltip]');
  if (punt) toonTooltip(punt);
});
app.addEventListener('mouseout', (event) => {
  if ((event.target as Element).closest('[data-tooltip]')) tooltip.hidden = true;
});
app.addEventListener('focusin', (event) => {
  const punt = (event.target as Element).closest('[data-tooltip]');
  if (punt) toonTooltip(punt);
});
app.addEventListener('focusout', () => {
  tooltip.hidden = true;
});
