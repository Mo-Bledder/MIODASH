import { icoon } from '../icons';
import type { DashboardData, Game } from '../types';

// Kleine illustraties per spel, getekend met KPN-kleuren.
const illustraties: Record<string, string> = {
  wordle: (() => {
    const kleuren = [
      ['#e3e3e3', '#ff8811', '#e3e3e3', '#e3e3e3', '#e3e3e3'],
      ['#e3e3e3', '#00a800', '#ff8811', '#e3e3e3', '#e3e3e3'],
      ['#00a800', '#00a800', '#00a800', '#00a800', '#00a800'],
    ];
    const tegels = kleuren
      .flatMap((rij, r) =>
        rij.map(
          (kleur, k) =>
            `<rect x="${k * 20}" y="${r * 20}" width="16" height="16" rx="3.5" fill="${kleur}"/>`,
        ),
      )
      .join('');
    return `<svg viewBox="0 0 96 56" width="96" height="56" aria-hidden="true">${tegels}</svg>`;
  })(),

  woordgraden: (() => {
    const balken = [
      { breedte: 38, kleur: '#e3e3e3' },
      { breedte: 58, kleur: '#ffc570' },
      { breedte: 74, kleur: '#ff8811' },
      { breedte: 96, kleur: '#00a800' },
    ];
    const rechthoeken = balken
      .map(
        (balk, i) =>
          `<rect x="0" y="${i * 15}" width="${balk.breedte}" height="9" rx="4.5" fill="${balk.kleur}"/>`,
      )
      .join('');
    return `<svg viewBox="0 0 96 56" width="96" height="56" aria-hidden="true">${rechthoeken}</svg>`;
  })(),

  challengemio: (() => {
    const vakken: string[] = [];
    for (let rij = 0; rij < 4; rij++) {
      for (let kolom = 0; kolom < 6; kolom++) {
        const donker = (rij + kolom) % 2 === 1;
        vakken.push(
          `<rect x="${kolom * 16}" y="${rij * 14}" width="16" height="14" fill="${donker ? '#adf694' : '#f0fcf0'}"/>`,
        );
      }
    }
    return `<svg viewBox="0 0 96 56" width="96" height="56" aria-hidden="true">
      <g>${vakken.join('')}</g>
      <text x="24" y="12" font-size="13" text-anchor="middle" fill="#333333">&#9822;</text>
      <text x="72" y="54" font-size="13" text-anchor="middle" fill="#333333">&#9818;</text>
    </svg>`;
  })(),
};

function renderGame(game: Game): string {
  return `
    <article class="kaart game">
      <div class="game__beeld">${illustraties[game.illustratie] ?? ''}</div>
      <h2 class="game__naam">${game.naam}</h2>
      <p class="game__omschrijving">${game.omschrijving}</p>
      <a href="#" class="knop-link">Spelen ${icoon('pijlRechts', 15)}</a>
    </article>`;
}

export function renderGamesPagina(data: DashboardData): string {
  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Games</h1>
        <p class="paginakop__datum">Even iets anders dan werk — kies een spel</p>
      </div>
    </header>

    <div class="game-kaarten">${data.games.map(renderGame).join('')}</div>`;
}
