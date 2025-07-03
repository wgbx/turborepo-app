'use client'

import { useState } from 'react'
import { Input, Card, Tag, Avatar, Space, Typography, Row, Col, Tabs } from 'ui'
import VirtualScroll from './index'
import UserList, { UserItem } from './UserList'
import ProductList, { ProductItem } from './ProductList'
import { generateDemoData, DemoItem } from './utils'

const { Text, Title } = Typography

function generateUserData(count: number): UserItem[] {
  const roles = ['管理员', '编辑', '查看者', '开发者', '测试员']
  const statuses: UserItem['status'][] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户 ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: roles[index % roles.length]!,
    status: statuses[index % statuses.length]!,
  }))
}

function generateProductData(count: number): ProductItem[] {
  const categories = ['电子产品', '服装', '食品', '家居', '图书']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `产品 ${index + 1}`,
    price: Math.floor(Math.random() * 1000) + 10,
    category: categories[index % categories.length]!,
    stock: Math.floor(Math.random() * 100),
    description: `这是产品 ${index + 1} 的详细描述信息`,
  }))
}

export default function VirtualScrollDemo() {
  const [itemCount, setItemCount] = useState(10000)
  const demoData = generateDemoData(itemCount)
  const userData = generateUserData(itemCount)
  const productData = generateProductData(itemCount)

  const renderBasicItem = (item: DemoItem) => (
    <div className="flex items-center justify-between w-full h-full">
      <div className="flex items-center space-x-4 gap-1 p-2 px-4">
        <Avatar size={32} className="bg-blue-500">
          {item.id}
        </Avatar>
        <div className="flex flex-row gap-1">
          <Text strong className="text-gray-900">
            {item.name}
          </Text>
          <Text type="secondary" className="text-sm">
            {item.email}
          </Text>
        </div>
      </div>
      <Space>
        <Tag color="default">{item.role}</Tag>
        <Tag color={item.status === 'active' ? 'success' : item.status === 'inactive' ? 'error' : 'warning'}>
          {item.status === 'active' ? '活跃' : item.status === 'inactive' ? '非活跃' : '待处理'}
        </Tag>
      </Space>
    </div>
  )

  const handleEditProduct = (product: ProductItem) => {
    console.log('编辑产品:', product)
  }

  const handleDeleteProduct = (product: ProductItem) => {
    console.log('删除产品:', product)
  }

  const tabItems = [
    {
      key: 'basic',
      label: '基础虚拟滚动',
      children: (
        <Card title="基础虚拟滚动组件" className="shadow-sm">
          <VirtualScroll items={demoData} height={400} itemHeight={60} renderItem={renderBasicItem} className="bg-gray-50 rounded-lg" />
        </Card>
      ),
    },
    {
      key: 'user-list',
      label: '用户列表',
      children: (
        <Card title="用户列表组件" className="shadow-sm">
          <UserList users={userData} height={400} />
        </Card>
      ),
    },
    {
      key: 'product-list',
      label: '产品列表',
      children: (
        <Card title="产品列表组件" className="shadow-sm">
          <ProductList products={productData} height={400} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
        </Card>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <Row gutter={16} align="middle">
          <Col>
            <Text strong>数据量:</Text>
          </Col>
          <Col>
            <Input
              type="number"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              min={100}
              max={100000}
              className="w-32"
            />
          </Col>
          <Col>
            <Text type="secondary">条记录</Text>
          </Col>
        </Row>
      </Card>

      <Card
        title={
          <div className="py-2">
            <Title level={4} className="mb-1">
              虚拟滚动组件演示
            </Title>
            <Text type="secondary" className="text-sm">
              当前显示 {itemCount.toLocaleString()} 条记录，展示不同的使用方式
            </Text>
          </div>
        }
        className="shadow-sm"
      >
        <Tabs items={tabItems} />
      </Card>
    </div>
  )
}
