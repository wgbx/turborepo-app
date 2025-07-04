import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'hu_HU',
  today: 'Ma', // 'Today',
  now: 'Most', // 'Now',
  backToToday: 'Vissza a mai napra', // 'Back to today',
  ok: 'OK',
  clear: 'Törlés', // 'Clear',
  week: 'Hét',
  month: 'Hónap', // 'Month',
  year: 'Év', // 'Year',
  timeSelect: 'Időpont kiválasztása', // 'Select time',
  dateSelect: 'Dátum kiválasztása', // 'Select date',
  monthSelect: 'Hónap kiválasztása', // 'Choose a month',
  yearSelect: 'Év kiválasztása', // 'Choose a year',
  decadeSelect: 'Évtized kiválasztása', // 'Choose a decade',

  dayFormat: 'DD', // 'D',

  previousMonth: 'Előző hónap (PageUp)', // 'Previous month (PageUp)',
  nextMonth: 'Következő hónap (PageDown)', // 'Next month (PageDown)',
  previousYear: 'Múlt év (Control + left)', // 'Last year (Control + left)',
  nextYear: 'Jövő év (Control + right)', // 'Next year (Control + right)',
  previousDecade: 'Előző évtized', // 'Last decade',
  nextDecade: 'Következő évtized', // 'Next decade',
  previousCentury: 'Múlt évszázad', // 'Last century',
  nextCentury: 'Jövő évszázad', // 'Next century',
}

export default locale
