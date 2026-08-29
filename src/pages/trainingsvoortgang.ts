import type { DashboardData, MioOverzichtRij } from '../types';

function renderMioRij(mio: MioOverzichtRij): string {
  const percentage = Math.round((mio.itemsAfgerond / mio.itemsTotaal) * 100);

  return `
    <li class="voortgang-rij">
      <span class="voortgang-rij__naam">${mio.naam}</span>
      <span class="badge">Week ${mio.week}</span>
      <span class="badge badge--blauw">${mio.skill}</span>
      <span class="meter voortgang-rij__meter"><span class="meter__vulling" style="width: ${percentage}%"></span></span>
      <span class="voortgang-rij__label">${mio.itemsAfgerond}/${mio.itemsTotaal} · ${percentage}%</span>
    </li>`;
}

export function renderTrainingsvoortgangPagina(data: DashboardData): string {
  const workshops = data.workshopVoortgang
    .map((workshop) => {
      const percentage = Math.round((workshop.afgerond / data.mios.length) * 100);
      return `
        <li class="voortgang-rij">
          <span class="voortgang-rij__naam">${workshop.naam}</span>
          <span class="meter voortgang-rij__meter"><span class="meter__vulling" style="width: ${percentage}%"></span></span>
          <span class="voortgang-rij__label">${workshop.afgerond}/${data.mios.length} MIO's</span>
        </li>`;
    })
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Trainingsvoortgang</h1>
        <p class="paginakop__datum">Vink per MIO de afgeronde items aan — de totaal-% verschijnt automatisch op hun profiel</p>
      </div>
    </header>

    <div class="tabs" role="group" aria-label="Weergave">
      <button class="tab is-actief" type="button" data-filter="per-mio">Per MIO</button>
      <button class="tab" type="button" data-filter="workshops">Workshops</button>
    </div>

    <section class="kaart" data-categorie="per-mio" aria-label="Voortgang per MIO">
      <ul class="voortgang-lijst">${data.mios.map(renderMioRij).join('')}</ul>
    </section>

    <section class="kaart" data-categorie="workshops" aria-label="Workshops" hidden>
      <ul class="voortgang-lijst">${workshops}</ul>
    </section>`;
}
