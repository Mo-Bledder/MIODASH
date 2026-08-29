import { icoon } from '../icons';
import type { DashboardData, Sessie, SessieScore } from '../types';

const scoreUitleg: Record<SessieScore, string> = {
  G: 'Goed',
  V: 'Voldoende',
  N: 'Nog te verbeteren',
  A: 'Aandachtspunt',
};

function renderScore(score: SessieScore): string {
  return `<span class="score score--${score.toLowerCase()}" title="${scoreUitleg[score]}">${score}</span>`;
}

function renderSessie(sessie: Sessie): string {
  return `
    <tr>
      <td class="sessies__datum">${sessie.datum}</td>
      <td>${sessie.begeleider}</td>
      <td>${sessie.gesprekken} ${sessie.gesprekken === 1 ? 'gesprek' : 'gesprekken'}</td>
      <td><span class="sessies__scores">${sessie.scores.map(renderScore).join('')}</span></td>
      <td class="sessies__actie"><a href="#" class="knop-link">${icoon('afspelen', 15)} Bekijken</a></td>
    </tr>`;
}

export function renderSessiesPagina(data: DashboardData): string {
  const legenda = (Object.keys(scoreUitleg) as SessieScore[])
    .map((score) => `<span class="sessies__legenda-item">${renderScore(score)} ${scoreUitleg[score]}</span>`)
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Mijn meeluistersessies</h1>
        <p class="paginakop__datum">Alle sessies met je begeleiders</p>
      </div>
      <span class="badge badge--groen">${data.sessies.length} sessies</span>
    </header>

    <section class="kaart" aria-labelledby="sessies-titel">
      <header class="kaart__kop">
        <h2 id="sessies-titel">Alle sessies</h2>
      </header>
      <div class="tabel-scroll">
        <table class="tabel sessies">
          <thead>
            <tr>
              <th scope="col">Datum</th>
              <th scope="col">Begeleider</th>
              <th scope="col">Gesprekken</th>
              <th scope="col">Scores</th>
              <th scope="col"><span class="visueel-verborgen">Actie</span></th>
            </tr>
          </thead>
          <tbody>${data.sessies.map(renderSessie).join('')}</tbody>
        </table>
      </div>
      <p class="sessies__legenda">${legenda}</p>
    </section>`;
}
