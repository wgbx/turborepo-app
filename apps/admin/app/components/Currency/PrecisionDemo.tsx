'use client'

import { useState } from 'react'
import { Card, Input, Button, Table, Alert, Space, Typography } from 'ui'
import { safeAdd, safeSubtract, safeMultiply, safeDivide } from './utils/currencyUtils'

const { Title, Text } = Typography

export function PrecisionDemo() {
  const [a, setA] = useState('0.1')
  const [b, setB] = useState('0.2')
  const [precision, setPrecision] = useState('2')

  const calculateResults = () => {
    const numA = parseFloat(a)
    const numB = parseFloat(b)
    const prec = parseInt(precision)

    return {
      normal: {
        add: numA + numB,
        subtract: numA - numB,
        multiply: numA * numB,
        divide: numA / numB,
      },
      safe: {
        add: safeAdd(numA, numB, prec),
        subtract: safeSubtract(numA, numB, prec),
        multiply: safeMultiply(numA, numB, prec),
        divide: safeDivide(numA, numB, prec),
      },
    }
  }

  const results = calculateResults()

  const columns = [
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 120,
    },
    {
      title: '普通计算',
      dataIndex: 'normal',
      key: 'normal',
      width: 200,
      render: (value: number) => (
        <Text code className="text-red-600">
          {value.toString()}
        </Text>
      ),
    },
    {
      title: '安全计算',
      dataIndex: 'safe',
      key: 'safe',
      width: 200,
      render: (value: number) => (
        <Text code className="text-green-600">
          {value.toString()}
        </Text>
      ),
    },
    {
      title: '差异',
      key: 'difference',
      width: 150,
      render: (_: any, record: any) => {
        const diff = Math.abs(record.normal - record.safe)
        return <Text className={diff > 0.0001 ? 'text-orange-600' : 'text-gray-500'}>{diff.toFixed(10)}</Text>
      },
    },
  ]

  const dataSource = [
    {
      key: 'add',
      operation: '加法',
      normal: results.normal.add,
      safe: results.safe.add,
    },
    {
      key: 'subtract',
      operation: '减法',
      normal: results.normal.subtract,
      safe: results.safe.subtract,
    },
    {
      key: 'multiply',
      operation: '乘法',
      normal: results.normal.multiply,
      safe: results.safe.multiply,
    },
    {
      key: 'divide',
      operation: '除法',
      normal: results.normal.divide,
      safe: results.safe.divide,
    },
  ]

  return (
    <Card title="精度处理演示" className="mb-6">
      <div className="space-y-6">
        <Alert
          message="JavaScript 浮点数精度问题"
          description="JavaScript 使用 IEEE 754 标准表示浮点数，导致 0.1 + 0.2 ≠ 0.3 等精度问题。在货币计算中，这种精度丢失是不可接受的。"
          type="warning"
          showIcon
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Text strong>数值 A</Text>
            <Input value={a} onChange={(e) => setA(e.target.value)} placeholder="例如: 0.1" />
          </div>
          <div>
            <Text strong>数值 B</Text>
            <Input value={b} onChange={(e) => setB(e.target.value)} placeholder="例如: 0.2" />
          </div>
          <div>
            <Text strong>精度</Text>
            <Input value={precision} onChange={(e) => setPrecision(e.target.value)} placeholder="例如: 2" />
          </div>
          <div className="flex items-end">
            <Button type="primary" onClick={() => {}}>
              重新计算
            </Button>
          </div>
        </div>

        <Table columns={columns} dataSource={dataSource} pagination={false} size="small" />

        <div className="bg-gray-50 p-4 rounded">
          <Title level={5}>关键差异</Title>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>普通计算</strong>: 直接使用 JavaScript 的 +、-、*、/ 运算符
            </li>
            <li>
              <strong>安全计算</strong>: 使用 safeAdd、safeSubtract、safeMultiply、safeDivide 函数
            </li>
            <li>
              <strong>精度控制</strong>: 通过 Math.pow(10, precision) 和 Math.round() 确保精度
            </li>
            <li>
              <strong>应用场景</strong>: 货币计算、财务系统、价格计算等对精度要求严格的场景
            </li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
