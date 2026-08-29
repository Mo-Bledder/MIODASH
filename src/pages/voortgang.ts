import { icoon } from '../icons';
import type { DashboardData, TrajectOnderdeel, Workshop } from '../types';

function renderOnderdeel(onderdeel: TrajectOnderdeel): string {
  const klaar = onderdeel.afgerond >= onderdeel.totaal;
  const percentage = (onderdeel.afgerond / onderdeel.totaal) * 100;

  return `
    <li class="onderdeel ${klaar ? 'is-klaar' : ''}">
      <span class="onderdeel__status">${klaar ? icoon('vinkje', 12) : ''}</span>
      <span class="badge onderdeel__week">${onderdeel.week}</span>
      <span class="onderdeel__naam">${onderdeel.naam}</span>
      <span class="meter onderdeel__meter"><span class="meter__vulling" style="width: ${percentage}%"></span></span>
      <span class="onderdeel__teller">${onderdeel.afgerond}/${onderdeel.totaal}</span>
    </li>`;
}

function renderWorkshop(workshop: Workshop): string {
  return `
    <li class="training ${workshop.afgerond ? 'is-afgerond' : ''}">
      <span class="training__vink">${workshop.afgerond ? icoon('vinkje', 13) : ''}</span>
      <span class="training__naam">${workshop.naam}</span>
    </li>`;
}

export function renderVoortgangPagina(data: DashboardData): string {
  const onderdelen = data.traject.flatMap((fase) => fase.onderdelen);
  const totaal = onderdelen.reduce((som, o) => som + o.totaal, 0);
  const afgerond = onderdelen.reduce((som, o) => som + o.afgerond, 0);
  const percentage = totaal === 0 ? 0 : Math.round((afgerond / totaal) * 100);

  const dagenAanwezig = data.aanwezigheid.reduce((som, w) => som + w.dagen, 0);
  const elearningsAfgerond = data.trainingen.elearnings.filter((t) => t.afgerond).length;
  const workshopsAfgerond = data.workshops.filter((w) => w.afgerond).length;
  const maxDagen = 5;

  const statistieken = [
    { icoon: 'kalender', label: 'Dagen aanwezig', waarde: dagenAanwezig },
    { icoon: 'diploma', label: 'Trainingen gevolgd', waarde: data.activiteiten.length },
    { icoon: 'koptelefoon', label: 'Meeluistersessies', waarde: data.sessies.length },
    { icoon: 'checkCirkel', label: 'E-learnings afgerond', waarde: elearningsAfgerond },
  ];

  const fases = data.traject
    .map(
      (fase) => `
      <div class="traject__fase">
        <p class="traject__fasetitel">${fase.naam}</p>
        <ul class="traject__lijst">${fase.onderdelen.map(renderOnderdeel).join('')}</ul>
      </div>`,
    )
    .join('');

  const aanwezigheidRijen = data.aanwezigheid
    .map(
      (week) => `
      <li class="aanwezigheid__rij">
        <span class="aanwezigheid__week">Week ${week.week}</span>
        <span class="aanwezigheid__balk"><span style="width: ${(week.dagen / maxDagen) * 100}%"></span></span>
        <span class="aanwezigheid__dagen">${week.dagen} ${week.dagen === 1 ? 'dag' : 'dagen'}</span>
      </li>`,
    )
    .join('');

  const activiteiten = data.activiteiten
    .map(
      (activiteit) => `
      <li class="activiteit">
        <span class="activiteit__datum">${activiteit.datum}</span>
        <span class="activiteit__naam">${activiteit.type}</span>
        <span class="badge">${activiteit.skill}</span>
      </li>`,
    )
    .join('');

  const leerdoel = data.voortgang.leerdoel
    ? `<p class="voortgang__leerdoel">${data.voortgang.leerdoel}</p>`
    : `<p class="voortgang__leeg">Er is nog geen leerdoel aangemaakt.</p>
       <button class="knop-primair" type="button">${icoon('sparkle', 16)} Leerdoel toevoegen</button>`;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn voortgang</h1>
        <p class="paginakop__datum">Jouw trainingsvoortgang en aanwezigheid</p>
      </div>
      <span class="badge badge--groen">Week ${data.voortgang.week} · Fase: ${data.voortgang.fase}</span>
    </header>

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

    <div class="hoofd__raster hoofd__raster--voortgang">
      <section class="kaart traject" aria-labelledby="traject-titel">
        <header class="kaart__kop">
          <h2 id="traject-titel">Mijn traject</h2>
          <span class="teller">${afgerond} van ${totaal} onderdelen · ${percentage}%</span>
        </header>
        <div class="traject__totaal">
          <div class="meter"><div class="meter__vulling" style="width: ${percentage}%"></div></div>
        </div>
        ${fases}
      </section>

      <div class="voortgang-kolom">
        <section class="kaart" aria-labelledby="leerdoel-titel">
          <header class="kaart__kop"><h2 id="leerdoel-titel">Mijn leerdoel</h2></header>
          ${leerdoel}
        </section>

        <section class="kaart" aria-labelledby="workshops-titel">
          <header class="kaart__kop">
            <h2 id="workshops-titel">Mijn workshops</h2>
            <span class="teller">${workshopsAfgerond}/${data.workshops.length}</span>
          </header>
          <ul>${data.workshops.map(renderWorkshop).join('')}</ul>
        </section>

        <section class="kaart" aria-labelledby="aanwezigheid-titel">
          <header class="kaart__kop">
            <h2 id="aanwezigheid-titel">Mijn aanwezigheid</h2>
            <span class="teller">${dagenAanwezig} dagen</span>
          </header>
          <ul class="aanwezigheid">${aanwezigheidRijen}</ul>
        </section>

        <section class="kaart" aria-labelledby="activiteiten-titel">
          <header class="kaart__kop"><h2 id="activiteiten-titel">Mijn activiteiten</h2></header>
          <ul class="activiteiten">${activiteiten}</ul>
        </section>
      </div>
    </div>`;
}
