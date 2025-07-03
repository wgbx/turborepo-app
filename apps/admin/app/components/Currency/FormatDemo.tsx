'use client'

import { useState } from 'react'
import { Card, Input, Select, Checkbox, Table, Typography } from 'ui'
import { formatCurrency, getAllCurrencies } from './utils/currencyUtils'

const { Title, Text } = Typography

export function FormatDemo() {
  const [amount, setAmount] = useState('1234.56')
  const [currencyCode, setCurrencyCode] = useState('USD')
  const [showSymbol, setShowSymbol] = useState(true)
  const [showCode, setShowCode] = useState(false)
  const [useGrouping, setUseGrouping] = useState(true)

  const currencies = getAllCurrencies()

  const formatExamples = () => {
    const numAmount = parseFloat(amount) || 0
    const config = currencies.find((c) => c.code === currencyCode)

    if (!config) return []

    const examples = [
      {
        key: 'default',
        name: '默认格式',
        result: formatCurrency(numAmount, currencyCode),
        description: '使用货币默认配置',
      },
      {
        key: 'no-symbol',
        name: '无符号',
        result: formatCurrency(numAmount, currencyCode, { showSymbol: false }),
        description: '不显示货币符号',
      },
      {
        key: 'show-code',
        name: '显示代码',
        result: formatCurrency(numAmount, currencyCode, { showCode: true }),
        description: '显示货币代码',
      },
      {
        key: 'no-grouping',
        name: '无分组',
        result: formatCurrency(numAmount, currencyCode, { useGrouping: false }),
        description: '不使用千分位分隔符',
      },
      {
        key: 'custom-precision',
        name: '自定义精度',
        result: formatCurrency(numAmount, currencyCode, { precision: 4 }),
        description: '使用4位小数精度',
      },
      {
        key: 'full-format',
        name: '完整格式',
        result: formatCurrency(numAmount, currencyCode, {
          showSymbol: true,
          showCode: true,
          useGrouping: true,
        }),
        description: '显示符号、代码和分组',
      },
    ]

    if (numAmount < 0) {
      examples.push({
        key: 'negative',
        name: '负数格式',
        result: formatCurrency(-numAmount, currencyCode),
        description: '负数格式化处理',
      })
    }

    return examples
  }

  const columns = [
    {
      title: '格式类型',
      dataIndex: 'name',
      key: 'name',
      width: 120,
    },
    {
      title: '格式化结果',
      dataIndex: 'result',
      key: 'result',
      width: 200,
      render: (value: string) => (
        <Text code className="text-blue-600">
          {value}
        </Text>
      ),
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
  ]

  const currencyConfig = currencies.find((c) => c.code === currencyCode)

  return (
    <Card title="货币格式化演示" className="mb-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Text strong>金额</Text>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="例如: 1234.56" />
          </div>
          <div>
            <Text strong>货币</Text>
            <Select value={currencyCode} onChange={setCurrencyCode} style={{ width: '100%' }}>
              {currencies.map((currency) => (
                <Select.Option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong>格式化选项</Text>
            <div className="space-y-2 mt-2">
              <Checkbox checked={showSymbol} onChange={(e) => setShowSymbol(e.target.checked)}>
                显示符号
              </Checkbox>
              <Checkbox checked={showCode} onChange={(e) => setShowCode(e.target.checked)}>
                显示代码
              </Checkbox>
              <Checkbox checked={useGrouping} onChange={(e) => setUseGrouping(e.target.checked)}>
                使用分组
              </Checkbox>
            </div>
          </div>
          <div>
            <Text strong>当前配置</Text>
            <div className="text-sm space-y-1 mt-2">
              <div>符号: {currencyConfig?.symbol}</div>
              <div>位置: {currencyConfig?.symbolPosition}</div>
              <div>精度: {currencyConfig?.precision}</div>
              <div>分隔符: {currencyConfig?.thousandsSeparator}</div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded">
          <Text strong>实时预览:</Text>
          <div className="text-lg font-mono text-blue-600 mt-2">
            {formatCurrency(parseFloat(amount) || 0, currencyCode, { showSymbol, showCode, useGrouping })}
          </div>
        </div>

        <Table columns={columns} dataSource={formatExamples()} pagination={false} size="small" />

        <div className="bg-gray-50 p-4 rounded">
          <Title level={5}>格式化特性</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Text strong>符号位置</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>before: 符号在前 ($100)</li>
                <li>after: 符号在后 (100€)</li>
              </ul>
            </div>
            <div>
              <Text strong>精度处理</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>美元: 2位小数 ($100.00)</li>
                <li>日元: 0位小数 (¥100)</li>
                <li>可自定义精度</li>
              </ul>
            </div>
            <div>
              <Text strong>分组分隔符</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>美元: 逗号 ($1,234.56)</li>
                <li>欧元: 点 (€1.234,56)</li>
                <li>可禁用分组</li>
              </ul>
            </div>
            <div>
              <Text strong>负数格式</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>prefix: 前缀 (-$100)</li>
                <li>suffix: 后缀 ($100-)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
