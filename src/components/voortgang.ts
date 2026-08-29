import { icoon } from '../icons';
import type { Meeluistersessie, Trainingen, Training, Voortgang } from '../types';

function renderTrainingRij(training: Training): string {
  return `
    <li class="training ${training.afgerond ? 'is-afgerond' : ''}">
      <span class="training__vink">${training.afgerond ? icoon('vinkje', 13) : ''}</span>
      <span class="training__naam">${training.naam}</span>
      ${training.afgerond ? '' : '<span class="training__status">Nog te doen</span>'}
    </li>`;
}

export function renderVoortgang(
  voortgang: Voortgang,
  sessie: Meeluistersessie | null,
  trainingen: Trainingen,
): string {
  const alleTrainingen = [...trainingen.elearnings, ...trainingen.masterclasses];
  const afgerond = alleTrainingen.filter((t) => t.afgerond).length;

  const leerdoel = voortgang.leerdoel
    ? `<p class="voortgang__leerdoel">${voortgang.leerdoel}</p>`
    : `<p class="voortgang__leeg">Nog geen leerdoel voor deze week.</p>
       <button class="knop-primair" type="button" data-actie="leerdoel">${icoon('sparkle', 16)} Leerdoel toevoegen</button>`;

  const sessieBlok = sessie
    ? `<div class="voortgang__sessie">
         <p class="voortgang__sessie-datum">${sessie.datum}</p>
         <p class="voortgang__sessie-coach">met ${sessie.coach}</p>
         <a href="#" class="knop-link">${icoon('afspelen', 16)} Bekijken</a>
       </div>`
    : `<p class="voortgang__leeg">Nog geen meeluistersessie gehad.</p>`;

  return `
    <section class="kaart voortgang" aria-labelledby="voortgang-titel">
      <header class="kaart__kop">
        <h2 id="voortgang-titel">Mijn voortgang</h2>
        <span class="badge badge--groen">Fase: ${voortgang.fase}</span>
      </header>

      <div class="voortgang__samenvatting">
        <div class="voortgang__week">
          <span class="voortgang__week-label">Week</span>
          <span class="voortgang__week-getal">${voortgang.week}</span>
        </div>
        <div class="voortgang__fase">
          <p class="voortgang__skill">
            Skill: <span class="badge">${voortgang.skillVan}</span>
            ${icoon('pijlRechts', 14)}
            <span class="badge badge--groen">${voortgang.skillNaar}</span>
          </p>
          <div class="meter" role="progressbar" aria-valuenow="${voortgang.percentage}"
               aria-valuemin="0" aria-valuemax="100"
               aria-label="Voortgang fase ${voortgang.fase}">
            <div class="meter__vulling" style="width: ${voortgang.percentage}%"></div>
          </div>
          <p class="voortgang__percentage">${voortgang.percentage}% van deze fase voltooid</p>
        </div>
      </div>

      <div class="voortgang__rij">
        <div class="voortgang__blok">
          <h3>Leerdoel van deze week</h3>
          ${leerdoel}
        </div>

        <div class="voortgang__blok">
          <h3>Laatste meeluistersessie</h3>
          ${sessieBlok}
        </div>
      </div>

      <div class="voortgang__blok">
        <div class="voortgang__blok-kop">
          <h3>Mijn trainingen</h3>
          <span class="teller">${afgerond}/${alleTrainingen.length}</span>
        </div>
        <div class="voortgang__kolommen">
          <div>
            <p class="voortgang__groep">E-learnings</p>
            <ul>${trainingen.elearnings.map(renderTrainingRij).join('')}</ul>
          </div>
          <div>
            <p class="voortgang__groep">Masterclasses</p>
            <ul>${trainingen.masterclasses.map(renderTrainingRij).join('')}</ul>
          </div>
        </div>
      </div>
    </section>`;
}
