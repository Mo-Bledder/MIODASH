import type { AgendaItem, DashboardData } from '../types';

const DAG_START = 8 * 60;
const DAG_EIND = 18 * 60;
const dagen = [
  { naam: 'maandag', datum: '24-08-2026' },
  { naam: 'dinsdag', datum: '25-08-2026' },
  { naam: 'woensdag', datum: '26-08-2026' },
  { naam: 'donderdag', datum: '27-08-2026' },
  { naam: 'vrijdag', datum: '28-08-2026' },
];

function minuten(tijd: string): number {
  const [uur, minuut] = tijd.split(':').map(Number);
  return uur * 60 + minuut;
}

function renderItem(item: AgendaItem): string {
  const top = ((minuten(item.start) - DAG_START) / (DAG_EIND - DAG_START)) * 100;
  const hoogte = ((minuten(item.eind) - minuten(item.start)) / (DAG_EIND - DAG_START)) * 100;

  return `
    <article class="agenda__item agenda__item--${item.soort} ${item.status ? `is-${item.status}` : ''}"
             style="top: ${top.toFixed(2)}%; height: ${hoogte.toFixed(2)}%"
             title="${item.start}–${item.eind}">
      <p class="agenda__titel">${item.status === 'geannuleerd' ? '⊘ ' : ''}${item.titel}
        ${item.status === 'placeholder' ? '<span class="agenda__chip">Placeholder</span>' : ''}</p>
      ${item.personen ? `<p class="agenda__personen">${item.personen}</p>` : ''}
      ${item.notitie ? `<p class="agenda__notitie">${item.notitie}</p>` : ''}
    </article>`;
}

export function renderAgendaPagina(data: DashboardData): string {
  const uren = Array.from({ length: 11 }, (_, i) => {
    const top = ((i * 60) / (DAG_EIND - DAG_START)) * 100;
    return `<span class="agenda__uur" style="top: ${top.toFixed(2)}%">${String(8 + i).padStart(2, '0')}:00</span>`;
  }).join('');

  const kolommen = dagen
    .map(
      (dag, i) => `
      <div class="agenda__kolom">
        <header class="agenda__dagkop">
          <p class="agenda__dagnaam">${dag.naam}</p>
          <p class="agenda__datum">${dag.datum}</p>
        </header>
        <div class="agenda__vlak">
          ${data.agenda.filter((item) => item.dag === i).map(renderItem).join('')}
        </div>
      </div>`,
    )
    .join('');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Agenda</h1>
        <p class="paginakop__datum">Trainingen, sessies en meetings voor het hele team</p>
      </div>
      <div class="paginakop__acties">
        <button class="knop-ghost-klein" type="button">Concepten</button>
        <button class="knop-primair" type="button">+ Inplannen</button>
      </div>
    </header>

    <div class="weeknav">
      <button class="knop-ghost-klein" type="button">← Vorige week</button>
      <p class="weeknav__titel">Week 35 — 24-08-2026 t/m 28-08-2026</p>
      <button class="knop-ghost-klein" type="button">Volgende week →</button>
      <span class="badge badge--geel">Deze week</span>
    </div>

    <section class="kaart agenda-kaart" aria-label="Weekagenda">
      <div class="agenda">
        <div class="agenda__tijden">${uren}</div>
        ${kolommen}
      </div>
      <p class="agenda__legenda">
        <span class="agenda__legenda-item"><span class="agenda__blok agenda__blok--training"></span> Training</span>
        <span class="agenda__legenda-item"><span class="agenda__blok agenda__blok--skill"></span> Sessie / skill</span>
        <span class="agenda__legenda-item"><span class="agenda__blok agenda__blok--meeting"></span> Meeting</span>
        <span class="agenda__legenda-item"><span class="agenda__blok agenda__blok--geannuleerd"></span> Geannuleerd</span>
      </p>
    </section>`;
}
