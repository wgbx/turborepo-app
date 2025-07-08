'use client'

import { useState } from 'react'
import { Card, Button, Space, List, Avatar, Tag, Spin, Alert, Divider, Input, Select } from 'ui'
import { useRequest } from 'ahooks'

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
}

const mockUsers: User[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    role: '用户',
    status: 'active',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

const fetchUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return mockUsers
}

const fetchUserById = async (id: number): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  const user = mockUsers.find((u) => u.id === id)
  if (!user) {
    throw new Error('用户不存在')
  }
  return user
}

export function BasicDemo() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refresh: refreshUsers,
  } = useRequest(fetchUsers, {
    refreshDeps: [],
  })

  const {
    data: selectedUser,
    loading: userLoading,
    error: userError,
    run: fetchUser,
  } = useRequest(fetchUserById, {
    manual: true,
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      case 'pending':
        return 'orange'
      default:
        return 'default'
    }
  }

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
    fetchUser(userId)
  }

  return (
    <div className="space-y-6">
      <Card title="基础用法" size="small">
        <div className="space-y-4">
          <Alert
            message="基础请求演示"
            description="展示 useRequest 的基本用法：自动请求、手动请求、加载状态、错误处理"
            type="info"
            showIcon
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Card title="用户列表" size="small">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>用户数量: {users?.length || 0}</span>
                  <Button size="small" onClick={refreshUsers} loading={usersLoading}>
                    刷新
                  </Button>
                </div>

                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <Spin size="large" />
                  </div>
                ) : usersError ? (
                  <Alert message="加载失败" description={usersError.message} type="error" />
                ) : (
                  <List
                    dataSource={users}
                    renderItem={(user) => (
                      <List.Item key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleUserClick(user.id)}>
                        <List.Item.Meta
                          avatar={<Avatar src={user.avatar} alt={user.name} />}
                          title={
                            <Space>
                              <span>{user.name}</span>
                              <Tag color={getStatusColor(user.status)}>
                                {user.status === 'active' ? '活跃' : user.status === 'inactive' ? '非活跃' : '待审核'}
                              </Tag>
                            </Space>
                          }
                          description={user.email}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </div>
            </Card>

            <Card title="用户详情" size="small">
              <div className="space-y-4">
                {!selectedUserId ? (
                  <div className="text-center text-gray-500 py-8">点击左侧用户查看详情</div>
                ) : userLoading ? (
                  <div className="flex justify-center py-8">
                    <Spin size="large" />
                  </div>
                ) : userError ? (
                  <Alert message="加载失败" description={userError.message} type="error" />
                ) : selectedUser ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar size={64} src={selectedUser.avatar} alt={selectedUser.name} />
                      <div>
                        <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                        <p className="text-gray-600">{selectedUser.email}</p>
                      </div>
                    </div>

                    <Divider />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">角色:</span>
                        <Tag color="blue">{selectedUser.role}</Tag>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">状态:</span>
                        <Tag color={getStatusColor(selectedUser.status)}>
                          {selectedUser.status === 'active' ? '活跃' : selectedUser.status === 'inactive' ? '非活跃' : '待审核'}
                        </Tag>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">创建时间:</span>
                        <span>{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">更新时间:</span>
                        <span>{new Date(selectedUser.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </Card>
          </div>

          <Card title="useRequest 基础用法要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>自动请求:</strong> 组件挂载时自动执行请求函数
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>手动请求:</strong> 设置 manual: true，通过 run 方法手动触发
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>加载状态:</strong> loading 状态自动管理，无需手动维护
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>错误处理:</strong> error 状态自动捕获和处理
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>数据缓存:</strong> 相同请求会自动使用缓存数据
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>刷新功能:</strong> refresh 方法可以强制重新请求
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
