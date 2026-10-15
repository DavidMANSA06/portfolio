/**
 * Mise en forme des dates "AAAA" / "AAAA-MM" selon la langue.
 *   formatRange('fr', '2026-04', '2026-08') → "Avril – Août 2026"
 *   formatRange('en', '2023', '2024')        → "2023 – 2024"
 *   formatRange('fr', '2026-09')             → "Depuis sept. 2026"
 */
import type { Lang } from '../i18n/ui';

const locales: Record<Lang, string> = { fr: 'fr-FR', en: 'en-GB' };

function parts(value: string): { year: string; month?: number } {
  const [year = value, month] = value.split('-');
  return { year, month: month ? Number(month) : undefined };
}

function monthName(lang: Lang, month: number, style: 'long' | 'short'): string {
  const name = new Intl.DateTimeFormat(locales[lang], { month: style, timeZone: 'UTC' }).format(
    new Date(Date.UTC(2000, month - 1, 1)),
  );
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** "2026-04" → "Avril 2026" (ou "Avr. 2026" en style court) ; "2026" → "2026". */
export function formatYearMonth(lang: Lang, value: string, style: 'long' | 'short' = 'long') {
  const { year, month } = parts(value);
  return month ? `${monthName(lang, month, style)} ${year}` : year;
}

export function formatRange(
  lang: Lang,
  start: string,
  end?: string,
  style: 'long' | 'short' = 'long',
) {
  if (!end) return `${lang === 'fr' ? 'Depuis' : 'Since'} ${formatYearMonth(lang, start, style)}`;
  const s = parts(start);
  const e = parts(end);
  // Même année avec mois : on n'écrit l'année qu'une fois ("Avril – Août 2026")
  if (s.year === e.year && s.month && e.month) {
    return `${monthName(lang, s.month, style)} – ${monthName(lang, e.month, style)} ${e.year}`;
  }
  return `${formatYearMonth(lang, start, style)} – ${formatYearMonth(lang, end, style)}`;
}

/** Tri : le plus récent en premier (les chaînes "AAAA-MM" se comparent comme du texte). */
export function byStartDesc<T extends { data: { start: string } }>(a: T, b: T) {
  return b.data.start.localeCompare(a.data.start);
}
