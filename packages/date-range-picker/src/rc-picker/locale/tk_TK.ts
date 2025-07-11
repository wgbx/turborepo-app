import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'tk_TK',
  today: 'Şugün',
  now: 'Şuwagt',
  backToToday: 'Şugüne gaýt',
  ok: 'Bolýar',
  clear: 'Arassala',
  month: 'Aý',
  week: 'Hepde',
  year: 'Ýyl',
  timeSelect: 'Wagt saýla',
  dateSelect: 'Gün saýla',
  monthSelect: 'Aý saýla',
  yearSelect: 'Ýyl saýla',
  decadeSelect: 'On ýyllygy saýla',

  previousMonth: 'Öňki aý (PageUp)',
  nextMonth: 'Soňky aý (PageDown)',
  previousYear: 'Öňki ýyl (Control + çep)',
  nextYear: 'Soňky ýyl (Control + sag)',
  previousDecade: 'Öňki on ýyl',
  nextDecade: 'Soňky on ýyl',
  previousCentury: 'Öňki asyr',
  nextCentury: 'Soňky asyr',
}

export default locale
