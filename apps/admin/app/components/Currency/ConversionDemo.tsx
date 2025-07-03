'use client'

import { useState } from 'react'
import { Card, Input, Select, Button, Table, Alert, Space, Typography, Tag } from 'ui'
import { convertCurrency, compareCurrencies, getAllCurrencies } from './utils/currencyUtils'

const { Title, Text } = Typography

export function ConversionDemo() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('CNY')
  const [compareCurrency, setCompareCurrency] = useState('EUR')

  const currencies = getAllCurrencies()

  const handleConvert = () => {
    const numAmount = parseFloat(amount) || 0
    if (numAmount === 0) return null

    try {
      return convertCurrency(numAmount, fromCurrency, toCurrency)
    } catch (error) {
      console.error('转换错误:', error)
      return null
    }
  }

  const handleCompare = () => {
    const numAmount = parseFloat(amount) || 0
    if (numAmount === 0) return null

    try {
      return compareCurrencies(numAmount, toCurrency, compareCurrency)
    } catch (error) {
      console.error('比较错误:', error)
      return null
    }
  }

  const convertedAmount = handleConvert()
  const comparison = handleCompare()

  const conversionExamples = () => {
    const examples = [
      { from: 'USD', to: 'CNY', amount: 100 },
      { from: 'EUR', to: 'USD', amount: 100 },
      { from: 'JPY', to: 'USD', amount: 10000 },
      { from: 'GBP', to: 'EUR', amount: 100 },
    ]

    return examples.map((example) => {
      try {
        const result = convertCurrency(example.amount, example.from, example.to)
        return {
          key: `${example.from}-${example.to}`,
          from: `${example.amount} ${example.from}`,
          to: `${result.toFixed(2)} ${example.to}`,
          rate: (result / example.amount).toFixed(4),
        }
      } catch (error) {
        return {
          key: `${example.from}-${example.to}`,
          from: `${example.amount} ${example.from}`,
          to: '转换失败',
          rate: 'N/A',
        }
      }
    })
  }

  const columns = [
    {
      title: '源货币',
      dataIndex: 'from',
      key: 'from',
      width: 150,
    },
    {
      title: '目标货币',
      dataIndex: 'to',
      key: 'to',
      width: 150,
    },
    {
      title: '汇率',
      dataIndex: 'rate',
      key: 'rate',
      width: 120,
      render: (value: string) => (
        <Text code className="text-green-600">
          {value}
        </Text>
      ),
    },
  ]

  return (
    <Card title="货币转换演示" className="mb-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text strong>金额</Text>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="例如: 100" />
          </div>
          <div>
            <Text strong>从</Text>
            <Select value={fromCurrency} onChange={setFromCurrency} style={{ width: '100%' }}>
              {currencies.map((currency) => (
                <Select.Option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong>到</Text>
            <Select value={toCurrency} onChange={setToCurrency} style={{ width: '100%' }}>
              {currencies.map((currency) => (
                <Select.Option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </Select.Option>
              ))}
            </Select>
          </div>
          <div>
            <Text strong>比较货币</Text>
            <Select value={compareCurrency} onChange={setCompareCurrency} style={{ width: '100%' }}>
              {currencies.map((currency) => (
                <Select.Option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>

        {convertedAmount !== null ? (
          <Alert
            message="转换结果"
            description={
              <div className="space-y-2">
                <div className="text-lg">
                  {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
                </div>
                <div className="text-sm text-gray-500">
                  汇率: 1 {fromCurrency} = {(convertedAmount / parseFloat(amount)).toFixed(4)} {toCurrency}
                </div>
              </div>
            }
            type="success"
            showIcon
          />
        ) : (
          parseFloat(amount) > 0 && <Alert message="转换失败" description="请检查货币代码和金额是否有效" type="error" showIcon />
        )}

        {comparison && (
          <div className="bg-yellow-50 p-4 rounded">
            <Title level={5}>货币比较</Title>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <Text strong>{toCurrency}:</Text>
                <div className="text-lg font-mono text-blue-600">{comparison.amount1.toFixed(2)}</div>
              </div>
              <div>
                <Text strong>{compareCurrency}:</Text>
                <div className="text-lg font-mono text-green-600">{comparison.amount2.toFixed(2)}</div>
              </div>
              <div>
                <Text strong>差异:</Text>
                <div className="text-lg font-mono text-orange-600">
                  {comparison.difference.toFixed(2)} ({comparison.differencePercent.toFixed(2)}%)
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <Title level={5}>常用转换示例</Title>
          <Table columns={columns} dataSource={conversionExamples()} pagination={false} size="small" />
        </div>

        <div className="bg-gray-50 p-4 rounded">
          <Title level={5}>转换特性</Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Text strong>精度处理</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>使用安全数学运算</li>
                <li>避免浮点数精度问题</li>
                <li>根据目标货币调整精度</li>
              </ul>
            </div>
            <div>
              <Text strong>汇率计算</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>基于 USD 基准汇率</li>
                <li>交叉汇率计算</li>
                <li>实时汇率更新</li>
              </ul>
            </div>
            <div>
              <Text strong>错误处理</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>无效货币代码检查</li>
                <li>除零错误处理</li>
                <li>用户友好的错误提示</li>
              </ul>
            </div>
            <div>
              <Text strong>性能优化</Text>
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>汇率缓存机制</li>
                <li>批量转换支持</li>
                <li>内存使用优化</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
