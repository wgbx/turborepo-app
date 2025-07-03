import cls from 'classnames'
import * as React from 'react'
import { isSameOrAfter } from '../utils/dateUtil'
import { PickerHackContext, usePanelContext } from './context'

const HIDDEN_STYLE: React.CSSProperties = {
  visibility: 'hidden',
}

// 现代箭头图标组件
const ChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15,18 9,12 15,6"></polyline>
  </svg>
)

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
)

const DoubleChevronLeftIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="11,17 6,12 11,7"></polyline>
    <polyline points="18,17 13,12 18,7"></polyline>
  </svg>
)

const DoubleChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="13,17 18,12 13,7"></polyline>
    <polyline points="6,17 11,12 6,7"></polyline>
  </svg>
)

export interface HeaderProps<DateType extends object> {
  offset?: (distance: number, date: DateType) => DateType
  superOffset?: (distance: number, date: DateType) => DateType
  onChange?: (date: DateType) => void

  // Limitation
  getStart?: (date: DateType) => DateType
  getEnd?: (date: DateType) => DateType

  children?: React.ReactNode
}

function PanelHeader<DateType extends object>(props: HeaderProps<DateType>) {
  const {
    offset,
    superOffset,
    onChange,

    getStart,
    getEnd,

    children,
  } = props

  const {
    prefixCls,
    classNames,
    styles,

    // Icons - 使用现代SVG图标
    prevIcon = <ChevronLeftIcon />,
    nextIcon = <ChevronRightIcon />,
    superPrevIcon = <DoubleChevronLeftIcon />,
    superNextIcon = <DoubleChevronRightIcon />,

    // Limitation
    minDate,
    maxDate,
    generateConfig,
    locale,
    pickerValue,
    panelType: type,
  } = usePanelContext<DateType>()

  const headerPrefixCls = `${prefixCls}-header`

  const { hidePrev, hideNext, hideHeader } = React.useContext(PickerHackContext)

  // ======================= Limitation =======================
  const disabledOffsetPrev = React.useMemo(() => {
    if (!minDate || !offset || !getEnd) {
      return false
    }

    const prevPanelLimitDate = getEnd(offset(-1, pickerValue))

    return !isSameOrAfter(generateConfig, locale, prevPanelLimitDate, minDate, type)
  }, [minDate, offset, pickerValue, getEnd, generateConfig, locale, type])

  const disabledSuperOffsetPrev = React.useMemo(() => {
    if (!minDate || !superOffset || !getEnd) {
      return false
    }

    const prevPanelLimitDate = getEnd(superOffset(-1, pickerValue))

    return !isSameOrAfter(generateConfig, locale, prevPanelLimitDate, minDate, type)
  }, [minDate, superOffset, pickerValue, getEnd, generateConfig, locale, type])

  const disabledOffsetNext = React.useMemo(() => {
    if (!maxDate || !offset || !getStart) {
      return false
    }

    const nextPanelLimitDate = getStart(offset(1, pickerValue))

    return !isSameOrAfter(generateConfig, locale, maxDate, nextPanelLimitDate, type)
  }, [maxDate, offset, pickerValue, getStart, generateConfig, locale, type])

  const disabledSuperOffsetNext = React.useMemo(() => {
    if (!maxDate || !superOffset || !getStart) {
      return false
    }

    const nextPanelLimitDate = getStart(superOffset(1, pickerValue))

    return !isSameOrAfter(generateConfig, locale, maxDate, nextPanelLimitDate, type)
  }, [maxDate, superOffset, pickerValue, getStart, generateConfig, locale, type])

  // ========================= Offset =========================
  const onOffset = (distance: number) => {
    if (offset) {
      onChange(offset(distance, pickerValue))
    }
  }

  const onSuperOffset = (distance: number) => {
    if (superOffset) {
      onChange(superOffset(distance, pickerValue))
    }
  }

  // ========================= Render =========================
  if (hideHeader) {
    return null
  }

  const prevBtnCls = `${headerPrefixCls}-prev-btn`
  const nextBtnCls = `${headerPrefixCls}-next-btn`
  const superPrevBtnCls = `${headerPrefixCls}-super-prev-btn`
  const superNextBtnCls = `${headerPrefixCls}-super-next-btn`

  return (
    <div className={cls(headerPrefixCls, classNames.header)} style={styles.header}>
      {superOffset && (
        <button
          type="button"
          aria-label={locale.previousYear}
          onClick={() => onSuperOffset(-1)}
          tabIndex={-1}
          className={cls(superPrevBtnCls, disabledSuperOffsetPrev && `${superPrevBtnCls}-disabled`)}
          disabled={disabledSuperOffsetPrev}
          style={hidePrev ? HIDDEN_STYLE : {}}
        >
          {superPrevIcon}
        </button>
      )}
      {offset && (
        <button
          type="button"
          aria-label={locale.previousMonth}
          onClick={() => onOffset(-1)}
          tabIndex={-1}
          className={cls(prevBtnCls, disabledOffsetPrev && `${prevBtnCls}-disabled`)}
          disabled={disabledOffsetPrev}
          style={hidePrev ? HIDDEN_STYLE : {}}
        >
          {prevIcon}
        </button>
      )}
      <div className={`${headerPrefixCls}-view`}>{children}</div>
      {offset && (
        <button
          type="button"
          aria-label={locale.nextMonth}
          onClick={() => onOffset(1)}
          tabIndex={-1}
          className={cls(nextBtnCls, disabledOffsetNext && `${nextBtnCls}-disabled`)}
          disabled={disabledOffsetNext}
          style={hideNext ? HIDDEN_STYLE : {}}
        >
          {nextIcon}
        </button>
      )}
      {superOffset && (
        <button
          type="button"
          aria-label={locale.nextYear}
          onClick={() => onSuperOffset(1)}
          tabIndex={-1}
          className={cls(superNextBtnCls, disabledSuperOffsetNext && `${superNextBtnCls}-disabled`)}
          disabled={disabledSuperOffsetNext}
          style={hideNext ? HIDDEN_STYLE : {}}
        >
          {superNextIcon}
        </button>
      )}
    </div>
  )
}

export default PanelHeader
