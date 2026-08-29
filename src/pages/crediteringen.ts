import { icoon } from '../icons';
import type { Creditering, DashboardData } from '../types';

function euro(bedrag: number): string {
  return bedrag.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
}

function renderCrediteringDetail(creditering: Creditering): string {
  const afkeuring = creditering.afgekeurdDoor
    ? `<div class="creditering__afkeuring">
         <p class="creditering__afkeuring-kop">Afgekeurd door ${creditering.afgekeurdDoor}</p>
         <p>${creditering.toelichting ?? ''}</p>
       </div>`
    : '';

  return `
    <div class="creditering">
      <div class="creditering__regel">
        <div>
          <p class="creditering__omschrijving">${creditering.omschrijving}</p>
          <p class="creditering__meta">${creditering.datum} · ${creditering.reden}
            <span class="badge">${creditering.referentie}</span></p>
        </div>
        <div class="creditering__bedrag">
          <p class="is-negatief">${euro(creditering.bedrag)}</p>
          <p class="creditering__status">Onterecht · te bespreken</p>
        </div>
      </div>
      ${afkeuring}
      <button class="knop-ghost-klein" type="button" data-besproken="${creditering.referentie}">
        Deze besproken
      </button>
    </div>`;
}

function renderBundel(mio: string, crediteringen: Creditering[]): string {
  const totaal = crediteringen.reduce((som, c) => som + c.bedrag, 0);
  const refs = crediteringen.map((c) => c.referentie).join(',');

  return `
    <article class="kaart bundel">
      <header class="bundel__kop">
        <div>
          <p class="bundel__naam">${mio}</p>
          <p class="bundel__samenvatting">
            ${crediteringen.length} ${crediteringen.length === 1 ? 'creditering' : 'crediteringen'} · ${euro(totaal)}
          </p>
        </div>
        <button class="knop-primair" type="button" data-besproken="${refs}">
          ${icoon('vinkje', 15)} Alles besproken
        </button>
      </header>
      ${crediteringen.map(renderCrediteringDetail).join('')}
    </article>`;
}

function renderAfgehandeld(creditering: Creditering): string {
  return `
    <li class="afgehandeld">
      <span class="afgehandeld__vink">${icoon('vinkje', 12)}</span>
      <span class="afgehandeld__naam">${creditering.mio}</span>
      <span class="afgehandeld__omschrijving">${creditering.omschrijving} · ${creditering.datum}</span>
      <span class="afgehandeld__bedrag">${euro(creditering.bedrag)}</span>
    </li>`;
}

export function renderCrediteringenPagina(data: DashboardData): string {
  const onbesproken = data.crediteringen.filter((c) => c.status === 'onbesproken');
  const afgehandeld = data.crediteringen.filter((c) => c.status === 'afgehandeld');

  // Bundel onbesproken crediteringen per MIO.
  const perMio = new Map<string, Creditering[]>();
  onbesproken.forEach((c) => {
    perMio.set(c.mio, [...(perMio.get(c.mio) ?? []), c]);
  });

  const bundels = [...perMio.entries()]
    .map(([mio, crediteringen]) => renderBundel(mio, crediteringen))
    .join('');

  const leeg = `
    <section class="kaart placeholder">
      <span class="placeholder__icoon">${icoon('vinkje', 24)}</span>
      <h2>Niets te bespreken</h2>
      <p>Alle crediteringen zijn afgehandeld. Lekker bezig!</p>
    </section>`;

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Crediteringen</h1>
        <p class="paginakop__datum">Onterecht bevonden crediteringen bespreek je met de MIO en vink je daarna af</p>
      </div>
    </header>

    <div class="tabs" role="group" aria-label="Filter crediteringen">
      <button class="tab is-actief" type="button" data-filter="onbesproken">
        Onbesproken <span class="tab__aantal">${onbesproken.length}</span>
      </button>
      <button class="tab" type="button" data-filter="afgehandeld">
        Afgehandeld <span class="tab__aantal">${afgehandeld.length}</span>
      </button>
      <button class="tab" type="button" data-filter="alles">Alles</button>
    </div>

    <section data-categorie="onbesproken" aria-label="Nog te bespreken">
      ${
        onbesproken.length === 0
          ? leeg
          : `<p class="crediteringen__intro">Gebundeld per MIO, zodat je alles van één persoon in één
             gesprek kunt afhandelen. Met <strong>Alles besproken</strong> vink je de hele bundel in één keer af.</p>
             ${bundels}`
      }
    </section>

    <section data-categorie="afgehandeld" aria-label="Afgehandeld" hidden>
      <div class="kaart">
        <header class="kaart__kop"><h2>Afgehandeld</h2></header>
        ${
          afgehandeld.length === 0
            ? '<p class="voortgang__leeg">Nog niets afgehandeld.</p>'
            : `<ul>${afgehandeld.map(renderAfgehandeld).join('')}</ul>`
        }
      </div>
    </section>`;
}
