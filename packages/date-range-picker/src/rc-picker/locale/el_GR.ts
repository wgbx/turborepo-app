import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'el_GR',
  today: 'Σήμερα',
  now: 'Τώρα',
  backToToday: 'Πίσω στη σημερινή μέρα',
  ok: 'OK',
  clear: 'Καθαρισμός',
  week: 'Εβδομάδα',
  month: 'Μήνας',
  year: 'Έτος',
  timeSelect: 'Επιλογή ώρας',
  dateSelect: 'Επιλογή ημερομηνίας',
  monthSelect: 'Επιλογή μήνα',
  yearSelect: 'Επιλογή έτους',
  decadeSelect: 'Επιλογή δεκαετίας',

  previousMonth: 'Προηγούμενος μήνας (PageUp)',
  nextMonth: 'Επόμενος μήνας (PageDown)',
  previousYear: 'Προηγούμενο έτος (Control + αριστερά)',
  nextYear: 'Επόμενο έτος (Control + δεξιά)',
  previousDecade: 'Προηγούμενη δεκαετία',
  nextDecade: 'Επόμενη δεκαετία',
  previousCentury: 'Προηγούμενος αιώνας',
  nextCentury: 'Επόμενος αιώνας',
}

export default locale
