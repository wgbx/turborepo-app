import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'ja_JP',
  today: '今日',
  now: '現在時刻',
  backToToday: '今日に戻る',
  ok: '確定',
  timeSelect: '時間を選択',
  dateSelect: '日時を選択',
  weekSelect: '週を選択',
  clear: 'クリア',
  week: '週',
  month: '月',
  year: '年',
  previousMonth: '前月 (ページアップキー)',
  nextMonth: '翌月 (ページダウンキー)',
  monthSelect: '月を選択',
  yearSelect: '年を選択',
  decadeSelect: '年代を選択',
  yearFormat: 'YYYY年',
  previousYear: '前年 (Controlを押しながら左キー)',
  nextYear: '翌年 (Controlを押しながら右キー)',
  previousDecade: '前の年代',
  nextDecade: '次の年代',
  previousCentury: '前の世紀',
  nextCentury: '次の世紀',
  monthBeforeYear: false,
}

export default locale
