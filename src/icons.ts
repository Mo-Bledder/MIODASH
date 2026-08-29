/**
 * Inline SVG-iconen (lijnstijl, 24×24, erven kleur via currentColor).
 * Eén consistente familie in plaats van losse emoji's — dat oogt rustiger.
 */

const paths: Record<string, string> = {
  dashboard: `<rect x="3.5" y="3.5" width="7" height="9" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="5" rx="1.5"/><rect x="13.5" y="12.5" width="7" height="8" rx="1.5"/><rect x="3.5" y="16.5" width="7" height="4" rx="1.5"/>`,
  trend: `<path d="M3.5 17.5 9 12l4 4 7.5-8.5"/><path d="M14.5 7.5h6V13"/>`,
  doel: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>`,
  koptelefoon: `<path d="M4 13a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="7" rx="2"/><rect x="17" y="13" width="4" height="7" rx="2"/>`,
  kluis: `<rect x="4.5" y="10" width="15" height="10.5" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15" r="1.6"/>`,
  gamepad: `<path d="M6.8 7.5h10.4a4.5 4.5 0 0 1 4.3 5.8l-1 3.4a2.8 2.8 0 0 1-4.9 1l-1.3-1.7H9.7l-1.3 1.7a2.8 2.8 0 0 1-4.9-1l-1-3.4a4.5 4.5 0 0 1 4.3-5.8z"/><path d="M8.2 10.6v3.2M6.6 12.2h3.2"/><path d="M15.4 11h.01M17.4 13h.01"/>`,
  koekje: `<path d="M20.5 12A8.5 8.5 0 1 1 12 3.5a2.7 2.7 0 0 0 2.7 3.3A2.7 2.7 0 0 0 17.2 9a2.7 2.7 0 0 0 3.3 3z"/><path d="M9 10h.01M14.5 13.5h.01M9.5 15.5h.01"/>`,
  instellingen: `<path d="M4 6.5h8m5 0h3M4 12h2m5 0h9M4 17.5h11m5 0h0"/><circle cx="14.5" cy="6.5" r="2"/><circle cx="8.5" cy="12" r="2"/><circle cx="17.5" cy="17.5" r="2"/>`,
  bel: `<path d="M18 10a6 6 0 1 0-12 0c0 5-2 6-2 6h16s-2-1-2-6"/><path d="M10.2 19.5a2 2 0 0 0 3.6 0"/>`,
  megafoon: `<path d="M3.5 10.5v3A1.5 1.5 0 0 0 5 15h2l7 4.5v-15L7 9H5a1.5 1.5 0 0 0-1.5 1.5z"/><path d="M17.5 9.5a4 4 0 0 1 0 5"/>`,
  kalender: `<rect x="3.5" y="5" width="17" height="16" rx="2"/><path d="M8 3v4M16 3v4M3.5 10.5h17"/>`,
  smartphone: `<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 17.5h2"/>`,
  wereld: `<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17"/><path d="M12 3.5c2.4 2.3 3.7 5.2 3.7 8.5s-1.3 6.2-3.7 8.5c-2.4-2.3-3.7-5.2-3.7-8.5s1.3-6.2 3.7-8.5z"/>`,
  klok: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>`,
  kopieer: `<rect x="9" y="9" width="11.5" height="11.5" rx="2"/><path d="M5.5 15H4.8A1.8 1.8 0 0 1 3 13.2V4.8A1.8 1.8 0 0 1 4.8 3h8.4A1.8 1.8 0 0 1 15 4.8v.7"/>`,
  extern: `<path d="M13.5 4.5h6v6"/><path d="M19.5 4.5 10.5 13.5"/><path d="M19.5 13.5v4a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-11a2 2 0 0 1 2-2h4"/>`,
  vinkje: `<path d="M4.5 12.5 10 18 19.5 7"/>`,
  sparkle: `<path d="M12 4.5 13.6 8.9 18 10.5l-4.4 1.6L12 16.5l-1.6-4.4L6 10.5l4.4-1.6z"/><path d="m18.5 15.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z"/>`,
  afspelen: `<circle cx="12" cy="12" r="8.5"/><path d="M10 9.2 15 12l-5 2.8z"/>`,
  telefoon: `<path d="M5 4h3.5L10.5 9 8 10.7a12 12 0 0 0 5.3 5.3L15 13.5l5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>`,
  checkCirkel: `<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.5 2.5 2.5 5-5.5"/>`,
  smiley: `<circle cx="12" cy="12" r="8.5"/><path d="M9 10h.01M15 10h.01"/><path d="M8.5 14.5a4.5 4.5 0 0 0 7 0"/>`,
  diamant: `<path d="M7.5 4.5h9L21 9.5 12 20 3 9.5z"/><path d="M3 9.5h18"/>`,
  euro: `<path d="M17.5 6.5A7 7 0 0 0 6.2 12a7 7 0 0 0 11.3 5.5"/><path d="M4 10.5h9M4 13.5h9"/>`,
  ster: `<path d="m12 4 2.3 4.9 5.2.7-3.8 3.7.9 5.2L12 16l-4.6 2.5.9-5.2L4.5 9.6l5.2-.7z"/>`,
  diploma: `<path d="M2.5 9.5 12 5l9.5 4.5L12 14z"/><path d="M6.5 11.7V16c0 1.6 2.5 3 5.5 3s5.5-1.4 5.5-3v-4.3"/><path d="M21.5 9.5V14"/>`,
  medaille: `<circle cx="12" cy="9" r="5.5"/><path d="m8.7 13.6-1.5 6.9L12 18l4.8 2.5-1.5-6.9"/>`,
  vlag: `<path d="M5 21V4"/><path d="M5 4.5h12.5L15 8.5l2.5 4H5"/>`,
  trofee: `<path d="M8 4.5h8V10a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3.2 3.8M16 6h3a3 3 0 0 1-3.2 3.8"/><path d="M12 14v2.5M9 20.5h6M10 16.5h4l.8 4H9.2z"/>`,
  sleutel: `<circle cx="8.5" cy="8.5" r="4.5"/><path d="m11.7 11.7 8.3 8.3"/><path d="m15.5 15.5 2.5-2.5M18 20l2.5-2.5"/>`,
  waarschuwing: `<path d="M12 4.5 21 19.5H3z"/><path d="M12 10.5v4M12 16.8h.01"/>`,
  winkelmand: `<path d="M4 7.5h16l-1.5 9a2 2 0 0 1-2 1.7h-9a2 2 0 0 1-2-1.7z"/><path d="M8.5 7.5 12 3l3.5 4.5"/><path d="M10 11.5v3M14 11.5v3"/>`,
  blikje: `<rect x="7.5" y="4.5" width="9" height="16" rx="2.5"/><path d="M7.5 8.5h9"/>`,
  fles: `<path d="M10 3.5h4M10.5 3.5v3.2l-2 3.3v9.5A1.5 1.5 0 0 0 10 21h4a1.5 1.5 0 0 0 1.5-1.5V10l-2-3.3V3.5"/>`,
  zakje: `<path d="M8.2 5 6.5 19.5A1.4 1.4 0 0 0 7.9 21h8.2a1.4 1.4 0 0 0 1.4-1.5L15.8 5z"/><path d="M8.2 5c0 1.4 1.7 2.4 3.8 2.4s3.8-1 3.8-2.4"/>`,
  snoep: `<circle cx="12" cy="12" r="4.2"/><path d="m16 10.5 3.5-2-1 3.5 1 3.5-3.5-2M8 10.5l-3.5-2 1 3.5-1 3.5 3.5-2"/>`,
  reep: `<rect x="4.5" y="8" width="15" height="8" rx="1.5"/><path d="M9.5 8v8M14.5 8v8"/>`,
  pijlRechts: `<path d="M4.5 12h15M13 5.5 19.5 12 13 18.5"/>`,
  chevronOnder: `<path d="m6 9.5 6 6 6-6"/>`,
};

export function icoon(naam: string, formaat = 20): string {
  const inhoud = paths[naam];
  if (!inhoud) return '';
  return `<svg class="icoon" width="${formaat}" height="${formaat}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inhoud}</svg>`;
}
