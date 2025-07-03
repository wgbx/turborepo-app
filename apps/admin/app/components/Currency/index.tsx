'use client'

import { Tabs } from 'ui'
import { FormatDemo } from './FormatDemo'
import { ConversionDemo } from './ConversionDemo'
import { PrecisionDemo } from './PrecisionDemo'

export default function Currency() {
  const tabItems = [
    {
      key: 'precision',
      label: '精度处理',
      children: <PrecisionDemo />,
    },
    {
      key: 'format',
      label: '货币格式化',
      children: <FormatDemo />,
    },
    {
      key: 'conversion',
      label: '货币转换',
      children: <ConversionDemo />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">货币处理最佳实践</h1>

        <div className="max-w-6xl mx-auto">
          <Tabs defaultActiveKey="precision" type="card" size="large" items={tabItems} tabPosition="left" style={{ minHeight: '600px' }} />
        </div>
      </div>
    </div>
  )
}
