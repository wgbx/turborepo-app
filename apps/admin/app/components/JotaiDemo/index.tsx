'use client'

import { useState } from 'react'
import { Tabs } from 'ui'
import BasicDemo from './BasicDemo'
import AsyncDemo from './AsyncDemo'
import ComputedDemo from './ComputedDemo'
import FormDemo from './FormDemo'
import TodoDemo from './TodoDemo'

export default function JotaiDemo() {
  const [activeTab, setActiveTab] = useState('basic')

  const tabItems = [
    {
      key: 'basic',
      label: '基础用法',
      children: <BasicDemo />,
    },
    {
      key: 'async',
      label: '异步状态',
      children: <AsyncDemo />,
    },
    {
      key: 'computed',
      label: '计算状态',
      children: <ComputedDemo />,
    },
    {
      key: 'form',
      label: '表单状态',
      children: <FormDemo />,
    },
    {
      key: 'todo',
      label: 'Todo 应用',
      children: <TodoDemo />,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Jotai 状态管理演示</h2>
        <p className="text-gray-600">Jotai 是一个轻量级的 React 状态管理库，提供原子化的状态管理方案。</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        defaultActiveKey="basic"
        type="card"
        size="large"
        items={tabItems}
        style={{ minHeight: '500px' }}
      />
    </div>
  )
}
