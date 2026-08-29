import type { DashboardData } from '../types';
import { renderHeader } from '../components/header';
import { renderMededelingen } from '../components/mededelingen';
import { renderVolgendeStap } from '../components/volgendeStap';
import { renderSnelkoppelingen } from '../components/snelkoppelingen';
import { renderVoortgang } from '../components/voortgang';
import { renderKpis } from '../components/kpis';
import { renderMijlpalen } from '../components/mijlpalen';

export function renderDashboardPagina(data: DashboardData): string {
  return `
    ${renderHeader(data.medewerker, data.mededelingen.length)}
    ${renderMededelingen(data.mededelingen)}
    ${renderVolgendeStap(data, 'buiten-mio')}
    <div class="hoofd__raster">
      ${renderSnelkoppelingen(data.snelkoppelingen)}
      ${renderVoortgang(data.voortgang, data.laatsteSessie, data.trainingen)}
    </div>
    ${renderKpis(data.kpis)}
    ${renderMijlpalen(data.mijlpalen)}`;
}
