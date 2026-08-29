import { icoon } from '../icons';
import type { DashboardData, Product, ProductCategorie } from '../types';

function euro(bedrag: number): string {
  return bedrag.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
}

function renderProduct(product: Product): string {
  return `
    <article class="product" style="--product-kleur: ${product.kleur}">
      ${product.bijnaOp ? '<span class="product__voorraad">Bijna op</span>' : ''}
      <span class="product__icoon">${icoon(product.vorm, 22)}</span>
      <p class="product__naam">${product.naam}</p>
      <p class="product__variant">${product.variant}</p>
      <p class="product__prijs">${euro(product.prijs)}</p>
    </article>`;
}

function renderSectie(
  titel: string,
  categorie: ProductCategorie,
  producten: Product[],
): string {
  return `
    <section class="snack-sectie" data-categorie="${categorie}" aria-label="${titel}">
      <h2 class="sectietitel">${titel} <span class="snack-sectie__aantal">${producten.length}</span></h2>
      <div class="product-raster">${producten.map(renderProduct).join('')}</div>
    </section>`;
}

export function renderSnackkastPagina(data: DashboardData): string {
  const drankjes = data.snackkast.producten.filter((p) => p.categorie === 'drankjes');
  const snacks = data.snackkast.producten.filter((p) => p.categorie === 'snacks');

  return `
    <header class="paginakop">
      <div>
        <h1 class="paginakop__titel">Snackkast</h1>
        <p class="paginakop__datum">Vul je balans bij via Tikkie en koop producten uit je balans</p>
      </div>
    </header>

    <section class="kaart balans">
      <div>
        <p class="balans__label">Jouw snackkast-balans</p>
        <p class="balans__bedrag">${euro(data.snackkast.balans)}</p>
      </div>
      <button class="knop-primair" type="button">${icoon('euro', 16)} Balans bijvullen</button>
    </section>

    <section class="kaart aankopen" aria-labelledby="aankopen-titel">
      <header class="kaart__kop">
        <h2 id="aankopen-titel">${icoon('winkelmand', 17)} Recente aankopen</h2>
        <span class="aankopen__periode">afgelopen 24 uur</span>
      </header>
      ${
        data.snackkast.recenteAankopen.length === 0
          ? '<p class="voortgang__leeg">Geen aankopen in de afgelopen 24 uur.</p>'
          : `<ul class="aankopen__lijst">${data.snackkast.recenteAankopen
              .map(
                (aankoop) => `
                <li class="aankopen__rij">
                  <span>${aankoop.product}</span>
                  <span class="aankopen__meta">${aankoop.datum}</span>
                  <span class="aankopen__bedrag">${euro(aankoop.bedrag)}</span>
                </li>`,
              )
              .join('')}</ul>`
      }
    </section>

    <div class="tabs" role="group" aria-label="Filter producten">
      <button class="tab is-actief" type="button" data-filter="alles">
        Alles <span class="tab__aantal">${data.snackkast.producten.length}</span>
      </button>
      <button class="tab" type="button" data-filter="drankjes">
        Drankjes <span class="tab__aantal">${drankjes.length}</span>
      </button>
      <button class="tab" type="button" data-filter="snacks">
        Snacks <span class="tab__aantal">${snacks.length}</span>
      </button>
    </div>

    ${renderSectie('Drankjes', 'drankjes', drankjes)}
    ${renderSectie('Snacks', 'snacks', snacks)}`;
}
