import { icoon } from '../icons';
import { begroeting } from '../components/header';
import { renderMededelingen } from '../components/mededelingen';
import { sessieAandacht } from './sessiesBeheer';
import type { DashboardData, MioOverzichtRij } from '../types';

function initialen(naam: string): string {
  const delen = naam.split(' ');
  const achter = delen[delen.length - 1];
  return (delen[0][0] + achter[0]).toUpperCase();
}

function renderMioRij(mio: MioOverzichtRij): string {
  const percentage = Math.round((mio.itemsAfgerond / mio.itemsTotaal) * 100);

  return `
    <tr>
      <td>
        <span class="mio-rij">
          <span class="avatar avatar--klein" aria-hidden="true">${initialen(mio.naam)}</span>
          <span class="mio-rij__naam">${mio.naam}</span>
        </span>
      </td>
      <td><span class="badge badge--blauw">${mio.skill}</span></td>
      <td>Week ${mio.week}</td>
      <td>
        <span class="mio-rij__voortgang">
          <span class="meter voortgang-rij__meter"><span class="meter__vulling ${percentage < 40 ? 'is-laag' : ''}" style="width: ${percentage}%"></span></span>
          <span class="mio-rij__percentage">${percentage}%</span>
        </span>
      </td>
      <td>${mio.laatsteSessie ?? '<span class="mio-rij__leeg">Nog geen</span>'}</td>
      <td class="tabel__acties"><a href="#" class="knop-ghost-klein">Detail</a></td>
    </tr>`;
}

interface Actie {
  icoon: string;
  tekst: string;
  route: string;
  knop: string;
}

/**
 * Alles wat vandaag aandacht vraagt, automatisch verzameld uit de data —
 * zodat een begeleider niet zelf alle pagina's hoeft af te lopen.
 */
function bepaalActies(data: DashboardData): Actie[] {
  const acties: Actie[] = [];
  const vandaag = new Date();
  const dagLetter = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'][vandaag.getDay()];
  const werkdag = !['Za', 'Zo'].includes(dagLetter);

  const vandaagDatum = `${String(vandaag.getDate()).padStart(2, '0')}-${String(vandaag.getMonth() + 1).padStart(2, '0')}-${vandaag.getFullYear()}`;
  if (werkdag && !data.overdrachten.some((o) => o.datum === vandaagDatum)) {
    acties.push({ icoon: 'pijlRechts', tekst: 'De overdracht van vandaag is nog niet ingevuld', route: 'overdrachten', knop: 'Invullen' });
  }

  const wachtOpSessie = data.mios.filter(sessieAandacht);
  if (wachtOpSessie.length > 0) {
    acties.push({
      icoon: 'koptelefoon',
      tekst: `${wachtOpSessie.length} MIO's wachten op een meeluistersessie (7+ dagen of nog geen)`,
      route: 'meeluistersessies',
      knop: 'Inplannen',
    });
  }

  const teBespreken = data.crediteringen.filter((c) => c.status === 'onbesproken');
  teBespreken.forEach((creditering) => {
    acties.push({
      icoon: 'euro',
      tekst: `Creditering van ${creditering.mio} bespreken (${creditering.omschrijving.toLowerCase()})`,
      route: 'crediteringen',
      knop: 'Bespreken',
    });
  });

  const klaarVoorCertificering = data.mios.filter(
    (mio) => mio.itemsAfgerond / mio.itemsTotaal >= 0.9,
  );
  if (klaarVoorCertificering.length > 0) {
    acties.push({
      icoon: 'diploma',
      tekst: `${klaarVoorCertificering.map((m) => m.naam).join(' en ')} ${klaarVoorCertificering.length === 1 ? 'is' : 'zijn'} klaar voor certificering`,
      route: 'certificeringen',
      knop: 'Starten',
    });
  }

  if (data.teamPlanning.nietDoorgegeven.length > 0) {
    acties.push({
      icoon: 'kalender',
      tekst: `${data.teamPlanning.nietDoorgegeven.length} begeleiders moeten hun beschikbaarheid nog doorgeven`,
      route: 'teamplanning',
      knop: 'Bekijken',
    });
  }

  const metKluis = new Set(data.kluisjes.filter((k) => k.mio).map((k) => k.mio));
  const zonderKluis = data.mios.filter((mio) => !metKluis.has(mio.naam)).length;
  if (zonderKluis > 0) {
    acties.push({
      icoon: 'kluis',
      tekst: `${zonderKluis} MIO's hebben nog geen kluisje`,
      route: 'kluisjes',
      knop: 'Toewijzen',
    });
  }

  return acties;
}

function renderActielijst(data: DashboardData): string {
  const acties = bepaalActies(data);
  if (acties.length === 0) {
    return `
      <section class="kaart actielijst" aria-labelledby="acties-titel">
        <header class="kaart__kop">
          <h2 id="acties-titel">Vandaag te doen</h2>
        </header>
        <p class="voortgang__leeg">Niets te doen — alles is bij. Lekker bezig!</p>
      </section>`;
  }

  return `
    <section class="kaart actielijst" aria-labelledby="acties-titel">
      <header class="kaart__kop">
        <h2 id="acties-titel">Vandaag te doen</h2>
        <span class="teller">${acties.length} ${acties.length === 1 ? 'actie' : 'acties'}</span>
      </header>
      <ul>
        ${acties
          .map(
            (actie) => `
          <li class="actie">
            <span class="actie__icoon">${icoon(actie.icoon, 16)}</span>
            <span class="actie__tekst">${actie.tekst}</span>
            <a href="#/${actie.route}" class="knop-link">${actie.knop} ${icoon('pijlRechts', 14)}</a>
          </li>`,
          )
          .join('')}
      </ul>
    </section>`;
}

export function renderBegeleiderDashboard(data: DashboardData): string {
  const nu = new Date();
  const datum = new Intl.DateTimeFormat('nl-NL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(nu);

  const dezeWeek = data.overdrachten.filter((o) =>
    ['24-08-2026', '25-08-2026', '26-08-2026', '27-08-2026', '28-08-2026'].includes(o.datum),
  ).length;

  const statistieken = [
    { icoon: 'koptelefoon', label: "Actieve MIO's", waarde: String(data.mios.length) },
    { icoon: 'pijlRechts', label: 'Overdrachten totaal', waarde: String(data.overdrachtenTotaal) },
    { icoon: 'kalender', label: 'Overdrachten deze week', waarde: `${dezeWeek}/5` },
    {
      icoon: 'euro',
      label: 'Crediteringen te bespreken',
      waarde: String(data.crediteringen.filter((c) => c.status === 'onbesproken').length),
    },
  ];

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">${begroeting(nu.getHours())}, ${data.begeleider.voornaam}</h1>
        <p class="paginakop__datum">${datum.charAt(0).toUpperCase() + datum.slice(1)}</p>
      </div>
      <div class="paginakop__acties">
        <a href="#/overdrachten" class="knop-ghost-klein">Overdracht invullen</a>
        <button class="knop-primair" type="button">+ Nieuw bericht</button>
      </div>
    </header>

    ${renderMededelingen(data.mededelingen)}

    ${renderActielijst(data)}

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

    <section class="kaart" aria-labelledby="mios-titel">
      <header class="kaart__kop">
        <h2 id="mios-titel">MIO's overzicht</h2>
        <a href="#/trainingsvoortgang" class="knop-ghost-klein">Beheren</a>
      </header>
      <div class="tabel-scroll">
        <table class="tabel">
          <thead>
            <tr>
              <th scope="col">Naam</th>
              <th scope="col">Skill</th>
              <th scope="col">Week</th>
              <th scope="col">Voortgang</th>
              <th scope="col">Laatste sessie</th>
              <th scope="col"><span class="visueel-verborgen">Actie</span></th>
            </tr>
          </thead>
          <tbody>${data.mios.map(renderMioRij).join('')}</tbody>
        </table>
      </div>
    </section>`;
}
