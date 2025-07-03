'use client'

import { Avatar, Tag, Space, Typography } from 'ui'
import VirtualScroll from './index'
import { VirtualScrollItem } from './types'

const { Text } = Typography

export interface UserItem extends VirtualScrollItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
}

export interface UserListProps {
  users: UserItem[]
  height?: number
  itemHeight?: number
  className?: string
}

export default function UserList({ users, height = 600, itemHeight = 72, className = '' }: UserListProps) {
  const renderUserItem = (user: UserItem) => (
    <div className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <Space>
        <Avatar size={32} src={user.avatar} className="bg-blue-500">
          {user.name.charAt(0)}
        </Avatar>
        <div>
          <Text strong className="text-gray-900">
            {user.name}
          </Text>
          <br />
          <Text type="secondary" className="text-sm">
            {user.email}
          </Text>
        </div>
      </Space>
      <Space>
        <Tag color="default">{user.role}</Tag>
        <Tag color={user.status === 'active' ? 'success' : user.status === 'inactive' ? 'error' : 'warning'}>
          {user.status === 'active' ? '活跃' : user.status === 'inactive' ? '非活跃' : '待处理'}
        </Tag>
      </Space>
    </div>
  )

  return (
    <VirtualScroll
      items={users}
      height={height}
      itemHeight={itemHeight}
      renderItem={renderUserItem}
      className={`bg-white rounded-lg ${className}`}
    />
  )
}
