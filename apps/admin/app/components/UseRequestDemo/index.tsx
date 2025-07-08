'use client'

import { useState } from 'react'
import { Card, Button, Space, List, Avatar, Tag, Spin, Alert, Divider, Input, Select, Switch, Progress } from 'ui'
import { BasicDemo } from './BasicDemo'
import { AdvancedDemo } from './AdvancedDemo'
import { PollingDemo } from './PollingDemo'
import { DebounceDemo } from './DebounceDemo'
import { RetryDemo } from './RetryDemo'
import { CacheDemo } from './CacheDemo'

export default function UseRequestDemo() {
  const [activeTab, setActiveTab] = useState('basic')

  const tabItems = [
    {
      key: 'basic',
      label: '基础用法',
      children: <BasicDemo />,
    },
    {
      key: 'advanced',
      label: '高级用法',
      children: <AdvancedDemo />,
    },
    {
      key: 'polling',
      label: '轮询请求',
      children: <PollingDemo />,
    },
    {
      key: 'debounce',
      label: '防抖请求',
      children: <DebounceDemo />,
    },
    {
      key: 'retry',
      label: '重试机制',
      children: <RetryDemo />,
    },
    {
      key: 'cache',
      label: '缓存管理',
      children: <CacheDemo />,
    },
  ]

  return (
    <div className="space-y-6">
      <Card title="useRequest 最佳实践" className="mb-6">
        <div className="space-y-4">
          <Alert
            message="useRequest 特性展示"
            description="本演示展示了 ahooks useRequest 的核心功能：基础请求、高级配置、轮询、防抖、重试、缓存等"
            type="info"
            showIcon
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">useRequest 功能演示</h3>
            </div>

            <div className="bg-white rounded-lg border">
              <div className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {tabItems.map((item) => (
                    <Button
                      key={item.key}
                      type={activeTab === item.key ? 'primary' : 'default'}
                      size="small"
                      onClick={() => setActiveTab(item.key)}
                      className="text-xs"
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              <Divider className="my-0" />

              <div className="p-6">{tabItems.find((item) => item.key === activeTab)?.children}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
