import { commonLocale } from './common'
import type { Locale } from '../interface'

const locale: Locale = {
  ...commonLocale,
  locale: 'ko_KR',
  today: '오늘',
  now: '현재 시각',
  backToToday: '오늘로 돌아가기',
  ok: '확인',
  clear: '지우기',
  week: '주',
  month: '월',
  year: '년',
  timeSelect: '시간 선택',
  dateSelect: '날짜 선택',
  monthSelect: '달 선택',
  yearSelect: '연 선택',
  decadeSelect: '연대 선택',
  yearFormat: 'YYYY년',
  monthBeforeYear: false,
  previousMonth: '이전 달 (PageUp)',
  nextMonth: '다음 달 (PageDown)',
  previousYear: '이전 해 (Control + left)',
  nextYear: '다음 해 (Control + right)',
  previousDecade: '이전 연대',
  nextDecade: '다음 연대',
  previousCentury: '이전 세기',
  nextCentury: '다음 세기',
}

export default locale
