import { useState } from 'react'
import { Button, Popover } from 'ui'
import { RangePicker } from './rc-picker'
import dayjs, { Dayjs } from 'dayjs'
import generateConfig from './rc-picker/generate/dayjs'
import './rc-picker/assets/index.css'

const presets = [
  {
    label: '最近7天',
    value: [dayjs().subtract(6, 'day'), dayjs()],
  },
  {
    label: '最近30天',
    value: [dayjs().subtract(29, 'day'), dayjs()],
  },
  {
    label: '最近90天',
    value: [dayjs().subtract(89, 'day'), dayjs()],
  },
  {
    label: '本季度',
    value: [
      dayjs()
        .startOf('month')
        .subtract(dayjs().month() % 3, 'month'),
      dayjs()
        .endOf('month')
        .add(2 - (dayjs().month() % 3), 'month'),
    ],
  },
  {
    label: '本年度',
    value: [dayjs().startOf('year'), dayjs().endOf('year')],
  },
]

export interface DateRangePickerProps {
  value?: [Dayjs, Dayjs]
  onChange?: (val: [Dayjs, Dayjs]) => void
  timeZone?: string
  [key: string]: any
}

export default function DateRangePicker({ onChange, value, timeZone, ...props }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<[Dayjs, Dayjs]>(
    value || (presets[0]?.value as [Dayjs, Dayjs]) || [dayjs().subtract(6, 'day'), dayjs()],
  )
  const [tempRange, setTempRange] = useState<[Dayjs | null, Dayjs | null]>([range[0], range[1]])

  const handlePanelChange = (dates: [Dayjs | null, Dayjs | null]) => {
    setTempRange(dates)
  }

  const handleOk = () => {
    if (tempRange[0] && tempRange[1]) {
      const finalRange: [Dayjs, Dayjs] = [tempRange[0], tempRange[1]]
      setRange(finalRange)
      onChange?.(finalRange)
      setOpen(false)
    }
  }

  const handleCancel = () => {
    setTempRange([range[0], range[1]])
    setOpen(false)
  }

  const handlePresetClick = (preset: any) => {
    const newRange = preset.value as [Dayjs, Dayjs]
    setRange(newRange)
    setTempRange([newRange[0], newRange[1]])
    onChange?.(newRange)
  }

  return (
    <RangePicker
      prefixCls="rc-picker"
      value={tempRange}
      onChange={handlePanelChange as any}
      generateConfig={generateConfig}
      disabledDate={undefined}
      minDate={undefined}
      maxDate={undefined}
      prevIcon={undefined}
      nextIcon={undefined}
      superPrevIcon={undefined}
      superNextIcon={undefined}
      open={open}
      onOpenChange={setOpen}
      inputReadOnly={true}
      locale={{
        locale: 'zh-cn',
        today: '今天',
        now: '此刻',
        backToToday: '回到今天',
        ok: '确定',
        clear: '清除',
        week: '周',
        month: '月',
        year: '年',
        previousMonth: '上个月',
        nextMonth: '下个月',
        previousYear: '上一年',
        nextYear: '下一年',
        previousDecade: '上十年',
        nextDecade: '下十年',
        previousCentury: '上一世纪',
        nextCentury: '下一世纪',
        timeSelect: '选择时间',
        dateSelect: '选择日期',
        weekSelect: '选择周',
        monthSelect: '选择月',
        yearSelect: '选择年',
        decadeSelect: '选择十年',
        yearFormat: 'YYYY',
        fieldDateFormat: 'YYYY-MM-DD',
        cellDateFormat: 'D',
        fieldDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
        monthBeforeYear: true,
      }}
      {...props}
    />
  )
}
