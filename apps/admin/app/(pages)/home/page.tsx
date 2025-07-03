'use client'

import { useState } from 'react'
import { Tabs } from 'ui'
import AntdForm from '@admin/components/AntdForm'
import ReactHookForm from '@admin/components/ReactHookForm'
import VirtualScrollDemo from '@admin/components/VirtualScroll/VirtualScrollDemo'

export default function Home() {
  const [activeTab, setActiveTab] = useState('antd')

  const tabItems = [
    {
      key: 'antd',
      label: 'Ant Design Form',
      children: <AntdForm />,
    },
    {
      key: 'react-hook-form',
      label: 'React Hook Form',
      children: <ReactHookForm />,
    },
    {
      key: 'virtual-scroll',
      label: '虚拟滚动',
      children: <VirtualScrollDemo />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">管理后台</h1>

        <div className="max-w-6xl mx-auto">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            defaultActiveKey="antd"
            type="card"
            size="large"
            items={tabItems}
            tabPosition="left"
            style={{ minHeight: '600px' }}
          />
        </div>
      </div>
    </div>
  )
}
