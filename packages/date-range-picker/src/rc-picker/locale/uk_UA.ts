import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'uk_UA',
  today: 'Сьогодні',
  now: 'Зараз',
  backToToday: 'Поточна дата',
  ok: 'OK',
  clear: 'Очистити',
  week: 'Тиждень',
  month: 'Місяць',
  year: 'Рік',
  timeSelect: 'Обрати час',
  dateSelect: 'Обрати дату',
  monthSelect: 'Обрати місяць',
  yearSelect: 'Обрати рік',
  decadeSelect: 'Обрати десятиріччя',

  previousMonth: 'Попередній місяць (PageUp)',
  nextMonth: 'Наступний місяць (PageDown)',
  previousYear: 'Попередній рік (Control + left)',
  nextYear: 'Наступний рік (Control + right)',
  previousDecade: 'Попереднє десятиріччя',
  nextDecade: 'Наступне десятиріччя',
  previousCentury: 'Попереднє століття',
  nextCentury: 'Наступне століття',
}

export default locale
