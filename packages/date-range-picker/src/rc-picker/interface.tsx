import type { AlignType, BuildInPlacements } from '@rc-component/trigger'
import type { GenerateConfig } from './generate'

export type NullableDateType<DateType> = DateType | null | undefined

export type Locale = {
  locale: string

  // ======================================================
  // ==                      Format                      ==
  // ======================================================

  // ==================== Input Format ====================
  // Input format
  /** @deprecated Please use `fieldDateFormat` instead */
  dateFormat?: string
  /** @deprecated Please use `fieldDateTimeFormat` instead */
  dateTimeFormat?: string
  /** Input field formatter like YYYY-MM-DD HH:mm:ss */
  fieldDateTimeFormat?: string
  /** Input field formatter like YYYY-MM-DD */
  fieldDateFormat?: string
  /** Input field formatter like HH:mm:ss */
  fieldTimeFormat?: string
  /** Input field formatter like YYYY-MM */
  fieldMonthFormat?: string
  /** Input field formatter like YYYY */
  fieldYearFormat?: string
  /** Input field formatter like wwww-go */
  fieldWeekFormat?: string
  /** Input field formatter like YYYY-Q */
  fieldQuarterFormat?: string

  // ===================== Date Panel =====================
  // Header Format
  /** Display month before year in date panel header */
  monthBeforeYear?: boolean
  /** year format in header panel */
  yearFormat?: string
  /** month format in header panel */
  monthFormat?: string

  // Cell format
  /** year format in body panel */
  cellYearFormat?: string
  /** quarter format in body panel */
  cellQuarterFormat?: string
  /** @deprecated Please use `cellDateFormat` instead */
  dayFormat?: string
  /** day format in body panel */
  cellDateFormat?: string
  /** meridiem format in body panel */
  cellMeridiemFormat?: string

  // ======================================================
  // ==                       MISC                       ==
  // ======================================================
  today: string
  now: string
  backToToday: string
  ok: string
  timeSelect: string
  dateSelect: string
  weekSelect?: string
  clear: string
  week: string
  month: string
  year: string
  previousMonth: string
  nextMonth: string
  monthSelect: string
  yearSelect: string
  decadeSelect: string

  previousYear: string
  nextYear: string
  previousDecade: string
  nextDecade: string
  previousCentury: string
  nextCentury: string

  shortWeekDays?: string[]
  shortMonths?: string[]
}

export type PanelMode = 'time' | 'date' | 'week' | 'month' | 'quarter' | 'year' | 'decade'

export type InternalMode = PanelMode | 'datetime'

export type PickerMode = Exclude<PanelMode, 'datetime' | 'decade'>

export type DisabledDate<DateType = any> = (
  date: DateType,
  info: {
    type: PanelMode
    /**
     * Only work in RangePicker.
     * Tell the first date user selected on this range selection.
     * This is not care about what field user click.
     */
    from?: DateType
  },
) => boolean

export interface BaseInfo {
  range?: 'start' | 'end'
}

export interface CellRenderInfo<DateType> extends BaseInfo {
  prefixCls: string
  // The cell wrapper element
  originNode: React.ReactElement
  today: DateType
  type: PanelMode
  locale?: Locale
  subType?: 'hour' | 'minute' | 'second' | 'millisecond' | 'meridiem'
}

export type CellRender<DateType, CurrentType = DateType | number | string> = (
  current: CurrentType,
  info: CellRenderInfo<DateType>,
) => React.ReactNode

export interface ValueDate<DateType = any> {
  label: React.ReactNode
  value: DateType | (() => DateType)
}

// ========================== Time ==========================
export interface DisabledTimes {
  disabledHours?: () => number[]
  disabledMinutes?: (hour: number) => number[]
  disabledSeconds?: (hour: number, minute: number) => number[]
  disabledMilliseconds?: (hour: number, minute: number, second: number) => number[]
}

export interface SharedTimeProps<DateType extends object = any> {
  /** Only work in picker is `time` */
  format?: string
  /** Only work in picker is `time` */
  showNow?: boolean
  /** Only work in picker is `time` */
  showHour?: boolean
  /** Only work in picker is `time` */
  showMinute?: boolean
  /** Only work in picker is `time` */
  showSecond?: boolean
  /** Only work in picker is `time` */
  showMillisecond?: boolean
  /** Only work in picker is `time` */
  use12Hours?: boolean
  /** Only work in picker is `time` */
  hourStep?: IntRange<1, 23>
  /** Only work in picker is `time` */
  minuteStep?: IntRange<1, 59>
  /** Only work in picker is `time` */
  secondStep?: IntRange<1, 59>
  /**
   * Only work in picker is `time`.
   * Note that too small step will cause performance issue.
   */
  millisecondStep?: IntRange<1, 999>
  /** Only work in picker is `time` */
  hideDisabledOptions?: boolean

  /** @deprecated Use `defaultOpenValue` instead */
  defaultValue?: DateType

  /** Set default value template when empty selection */
  defaultOpenValue?: DateType

  /** @deprecated Please use `disabledTime` instead. */
  disabledHours?: DisabledTimes['disabledHours']
  /** @deprecated Please use `disabledTime` instead. */
  disabledMinutes?: DisabledTimes['disabledMinutes']
  /** @deprecated Please use `disabledTime` instead. */
  disabledSeconds?: DisabledTimes['disabledSeconds']

  /** Only work in picker is `time` */
  disabledTime?: (date: DateType) => DisabledTimes

  /** Only work in picker is `time` */
  changeOnScroll?: boolean
}

export type RangeTimeProps<DateType extends object = any> = Omit<
  SharedTimeProps<DateType>,
  'defaultValue' | 'defaultOpenValue' | 'disabledTime'
> & {
  /** @deprecated Use `defaultOpenValue` instead. */
  defaultValue?: DateType[]
  defaultOpenValue?: DateType[]

  disabledTime?: (date: DateType, range: 'start' | 'end', info: { from?: DateType }) => DisabledTimes
}

// ======================= Components =======================
export type OnPanelChange<DateType> = (value: DateType, mode: PanelMode) => void

export type LimitDate<DateType extends object = any> =
  | DateType
  | ((info: {
      /**
       * Tell the first date user selected on this range selection.
       * This is not care about what field user click.
       */
      from?: DateType
    }) => DateType | null | undefined)

export interface SharedPanelProps<DateType extends object = any> {
  // Style
  prefixCls: string

  // Date Library
  locale: Locale
  generateConfig: GenerateConfig<DateType>

  // Value
  pickerValue: DateType
  onPickerValueChange: (date: DateType) => void
  value?: DateType
  /**
   * Should trigger when user select the cell.
   * PickerPanel will mark as `value` in single mode,
   * Or toggle `values` in multiple mode.
   */
  onSelect: (date: DateType) => void

  /**
   * Used for `multiple` mode.
   * When not `multiple`, it will be `[value]`.
   */
  values?: DateType[]

  // Mode
  onModeChange: (mode: PanelMode, date?: DateType) => void

  // Limitation
  disabledDate?: DisabledDate<DateType>
  minDate?: DateType
  maxDate?: DateType

  // Render
  cellRender?: CellRender<DateType>

  // Hover
  /** @private Only used for RangePicker passing. */
  hoverRangeValue: [start: DateType, end: DateType] | null
  /** @private Only used for SinglePicker passing. */
  hoverValue: DateType[] | null
  onHover?: (value: DateType | null) => void

  // Time
  /**
   * Only used for `date` mode.
   */
  showTime?: SharedTimeProps<DateType>

  // Week
  /**
   * Only used for `date` mode.
   */
  showWeek?: boolean

  // Icons
  prevIcon?: React.ReactNode
  nextIcon?: React.ReactNode
  superPrevIcon?: React.ReactNode
  superNextIcon?: React.ReactNode
}

export type Components<DateType extends object = any> = Partial<
  Record<InternalMode, React.ComponentType<SharedPanelProps<DateType>>> & {
    button?: React.ComponentType<any> | string
    input?: React.ComponentType<any> | string
  }
>

// ========================= Picker =========================
export type CustomFormat<DateType> = (value: DateType) => string

export type FormatType<DateType = any> = string | CustomFormat<DateType>

export type SharedHTMLAttrs = Omit<
  React.InputHTMLAttributes<HTMLDivElement>,
  | 'value'
  | 'defaultValue'
  | 'onChange'
  | 'placeholder'
  | 'id'
  | 'onInvalid'
  | 'disabled'
  | 'onFocus'
  | 'onBlur'
  | 'onSelect'
  | 'min'
  | 'max'
  | 'onKeyDown'
  | 'size'
  | 'prefix'
>

export type PickerFocusEventHandler = (e: React.FocusEvent<HTMLElement>, info: BaseInfo) => void

export type LegacyOnKeyDown = (event: React.KeyboardEvent<HTMLElement>, preventDefault: VoidFunction) => void

export type SemanticName = 'root' | 'prefix' | 'input' | 'suffix'

export type PanelSemanticName = 'root' | 'header' | 'body' | 'content' | 'item' | 'footer'

export interface SharedPickerProps<DateType extends object = any>
  extends SharedHTMLAttrs,
    Pick<
      SharedPanelProps<DateType>,
      // Icon
      'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon'
    > {
  // MISC
  direction?: 'ltr' | 'rtl'

  // Styles
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  rootClassName?: string

  styles?: Partial<Record<SemanticName, React.CSSProperties>> & {
    popup?: Partial<Record<PanelSemanticName, React.CSSProperties>>
  }
  classNames?: Partial<Record<SemanticName, string>> & {
    popup?: Partial<Record<PanelSemanticName, string>>
  }

  // Config
  locale: Locale
  generateConfig: GenerateConfig<DateType>

  // Picker
  picker?: PickerMode
  /** Only work when picker is `date` or `time` */
  showTime?: boolean | SharedTimeProps<DateType>
  /** Only work when picker is `date` */
  showWeek?: boolean
  /**
   * Config the input field parse and format.
   * When set `format.type`, it will force user input type with your input,
   * it's only support basic format mask: YYYY, MM, DD, HH, mm, ss, SSS.
   * Once use config mode, it must be fill with format your config.
   */
  format?:
    | FormatType<DateType>
    | FormatType<DateType>[]
    | {
        format: string
        type?: 'mask'
      }

  // Icons
  prefix?: React.ReactNode
  suffixIcon?: React.ReactNode
  allowClear?:
    | boolean
    | {
        clearIcon?: React.ReactNode
      }

  /** @deprecated Please use `allowClear.clearIcon` instead */
  clearIcon?: React.ReactNode

  // Active
  onFocus?: PickerFocusEventHandler
  onBlur?: PickerFocusEventHandler
  /** `preventDefault` is deprecated which will remove from future version. */
  onKeyDown?: LegacyOnKeyDown

  inputReadOnly?: boolean

  // range
  /** Default will always order of selection after submit */
  order?: boolean

  // Disabled
  disabledDate?: DisabledDate<DateType>
  /** Limit the selectable range. This will limit picker navigation also */
  minDate?: DateType
  /** Limit the selectable range. This will limit picker navigation also */
  maxDate?: DateType

  // Open
  defaultOpenValue?: DateType
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  popupAlign?: AlignType
  getPopupContainer?: (node: HTMLElement) => HTMLElement

  // Popup
  placement?: string
  builtinPlacements?: BuildInPlacements

  /**
   * By default. Only `time` or `datetime` show the confirm button in panel.
   * `true` to make every picker need confirm.
   * `false` to trigger change on every time panel closed by the mode = picker.
   */
  needConfirm?: boolean

  /**
   * @deprecated. This is removed and not work anymore.
   * Value will always be update if user type correct date type.
   * You can use `needConfirm` for confirm requirement.
   */
  changeOnBlur?: boolean

  /**
   * When user input invalidate date, keep it in the input field.
   * This is only used for strong a11y requirement which do not want modify after blur.
   */
  preserveInvalidOnBlur?: boolean

  // Motion
  transitionName?: string

  // Render
  components?: Components<DateType>
  /** @deprecated Please use `components.input` instead. */
  inputRender?: (props: React.InputHTMLAttributes<HTMLInputElement>) => React.ReactNode
  cellRender?: CellRender<DateType>
  /** @deprecated use cellRender instead of dateRender */
  dateRender?: (currentDate: DateType, today: DateType) => React.ReactNode
  /** @deprecated use cellRender instead of monthCellRender */
  monthCellRender?: (currentDate: DateType, locale: Locale) => React.ReactNode
  /**
   * When use `date` picker,
   * Show the button to set current datetime.
   */
  showNow?: boolean
  /** @deprecated Please use `showNow` instead */
  showToday?: boolean
  panelRender?: (originPanel: React.ReactNode) => React.ReactNode
  renderExtraFooter?: (mode: PanelMode) => React.ReactNode
}

// picker
export interface PickerRef {
  nativeElement: HTMLDivElement
  focus: (options?: FocusOptions) => void
  blur: VoidFunction
}

// rangePicker
export interface RangePickerRef extends Omit<PickerRef, 'focus'> {
  focus: (index?: number | (FocusOptions & { index?: number })) => void
}

// ======================== Selector ========================
export interface OpenConfig {
  index?: number
  /**
   * Keep open if prev state is open but set close within the same frame.
   * This is used for RangePicker input switch to another one.
   */
  inherit?: boolean
  /**
   * By default. Close popup will delay for one frame. `force` will trigger immediately.
   */
  force?: boolean
}

export type OnOpenChange = (open: boolean, config?: OpenConfig) => void
export interface SelectorProps<DateType = any> extends SharedHTMLAttrs {
  picker: PickerMode

  prefix?: React.ReactNode
  clearIcon?: React.ReactNode
  suffixIcon?: React.ReactNode
  className?: string
  style?: React.CSSProperties
  /** Add `-placeholder` className as a help info */
  activeHelp?: boolean
  focused: boolean
  onFocus: (event: React.FocusEvent<HTMLInputElement>, index?: number) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement>, index?: number) => void
  /** Trigger by `enter` key */
  onSubmit: VoidFunction
  /** `preventDefault` is deprecated which will remove from future version. */
  onKeyDown?: LegacyOnKeyDown
  locale: Locale
  generateConfig: GenerateConfig<DateType>

  // Direction
  direction?: 'ltr' | 'rtl'

  // Click
  onClick: React.MouseEventHandler<HTMLDivElement>

  // Clear
  onClear: VoidFunction

  // Change
  format: FormatType<DateType>[]
  /**
   * Convert with user typing for the format template.
   * This will force align the input with template mask.
   */
  maskFormat?: string
  onInputChange: VoidFunction
  onInvalid: (valid: boolean, index?: number) => void
  /** When user input invalidate date, keep it in the input field */
  /**
   * By default value in input field will be reset with previous valid value when blur.
   * Set to `false` will keep invalid text in input field when blur.
   */
  preserveInvalidOnBlur?: boolean

  // Open
  open: boolean
  /** Trigger when need open by selector */
  onOpenChange: OnOpenChange

  // Invalidate
  inputReadOnly?: boolean
}

// ========================== MISC ==========================
// https://stackoverflow.com/a/39495173; need TypeScript >= 4.5
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N ? Acc[number] : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type ReplaceListType<List, Type> = {
  [P in keyof List]: Type
}
