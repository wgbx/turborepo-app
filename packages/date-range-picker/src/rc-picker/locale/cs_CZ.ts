import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'cs_CZ',
  today: 'Dnes',
  now: 'Nyní',
  backToToday: 'Zpět na dnešek',
  ok: 'OK',
  clear: 'Vymazat',
  week: 'Týden',
  month: 'Měsíc',
  year: 'Rok',
  timeSelect: 'Vybrat čas',
  dateSelect: 'Vybrat datum',
  monthSelect: 'Vyberte měsíc',
  yearSelect: 'Vyberte rok',
  decadeSelect: 'Vyberte dekádu',

  previousMonth: 'Předchozí měsíc (PageUp)',
  nextMonth: 'Následující (PageDown)',
  previousYear: 'Předchozí rok (Control + left)',
  nextYear: 'Následující rok (Control + right)',
  previousDecade: 'Předchozí dekáda',
  nextDecade: 'Následující dekáda',
  previousCentury: 'Předchozí století',
  nextCentury: 'Následující století',
}

export default locale
