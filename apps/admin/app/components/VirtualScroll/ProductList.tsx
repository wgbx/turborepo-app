'use client'

import { Image, Tag, Space, Typography, Button } from 'ui'
import VirtualScroll from './index'
import { VirtualScrollItem } from './types'
import { defaultImage } from 'constant'

const { Text, Title } = Typography

export interface ProductItem extends VirtualScrollItem {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image?: string
  description: string
}

export interface ProductListProps {
  products: ProductItem[]
  height?: number
  itemHeight?: number
  className?: string
  onEdit?: (product: ProductItem) => void
  onDelete?: (product: ProductItem) => void
}

export default function ProductList({ products, height = 600, itemHeight = 100, className = '', onEdit, onDelete }: ProductListProps) {
  const renderProductItem = (product: ProductItem) => (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <Space>
        <Image width={60} height={60} src={product.image ?? defaultImage} alt={product.name} className="rounded-lg object-cover" />
        <div>
          <Title level={5} className="mb-1">
            {product.name}
          </Title>
          <Text type="secondary" className="text-sm mb-1">
            {product.description}
          </Text>
          <Space>
            <Tag color="blue">{product.category}</Tag>
            <Tag color={product.stock > 0 ? 'success' : 'error'}>{product.stock > 0 ? `库存: ${product.stock}` : '缺货'}</Tag>
          </Space>
        </div>
      </Space>
      <div className="flex items-center space-x-2">
        <Text strong className="text-lg text-red-500">
          ¥{product.price.toFixed(2)}
        </Text>
        <Space>
          {onEdit && (
            <Button size="small" onClick={() => onEdit(product)}>
              编辑
            </Button>
          )}
          {onDelete && (
            <Button size="small" danger onClick={() => onDelete(product)}>
              删除
            </Button>
          )}
        </Space>
      </div>
    </div>
  )

  return (
    <VirtualScroll
      items={products}
      height={height}
      itemHeight={itemHeight}
      renderItem={renderProductItem}
      className={`bg-white rounded-lg ${className}`}
    />
  )
}
