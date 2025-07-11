import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'km',
  today: 'ថ្ងៃនេះ',
  now: 'ឥឡូវ​នេះ',
  backToToday: 'ត្រលប់ទៅថ្ងៃនេះ',
  ok: 'កំណត់',
  timeSelect: 'រយៈពេលជ្រើសរើស',
  dateSelect: 'ជ្រើសរើសកាលបរិច្ឆេទ',
  weekSelect: 'ជ្រើសរើសសប្តាហ៍',
  clear: 'ច្បាស់',
  week: 'សប្តាហ៍',
  month: 'ខែ',
  year: 'ឆ្នាំ',
  previousMonth: 'ខែមុន (ឡើងទំព័រ)',
  nextMonth: 'ខែបន្ទាប់ (ប៊ូតុងចុះទំព័រ)',
  monthSelect: 'ជ្រើសរើសខែ',
  yearSelect: 'ជ្រើសរើសឆ្នាំ',
  decadeSelect: 'ជ្រើសរើសអាយុ',

  previousYear: 'ឆ្នាំមុន (Controlគ្រាប់ចុចបូកព្រួញខាងឆ្វេង)',
  nextYear: 'ឆ្នាំក្រោយ (Control គ្រាប់ចុចបូកព្រួញស្ដាំ)',
  previousDecade: 'ជំនាន់ចុងក្រោយ',
  nextDecade: 'ជំនាន់​ក្រោយ',
  previousCentury: 'សតវត្សចុងក្រោយ',
  nextCentury: 'សតវត្សរ៍បន្ទាប់',
  monthBeforeYear: false,
}

export default locale
