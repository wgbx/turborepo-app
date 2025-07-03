'use client'

import { useState } from 'react'
import { Card, Button, Space, List, Avatar, Tag, Spin, Alert, Divider } from 'ui'
import { useInfiniteUsers, useUser } from './hooks/useUsers'

export function ReactQueryDemo() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: infiniteLoading,
    error: infiniteError,
  } = useInfiniteUsers({ pageSize: 3 })

  const { data: selectedUser, isLoading: userLoading, error: userError } = useUser(selectedUserId!)

  const allUsers = infiniteData?.pages.flatMap((page) => page.data) || []

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

  return (
    <div className="space-y-6">
      <Card title="React Query 最佳实践演示">
        <div className="space-y-4">
          <Alert
            message="React Query 特性展示"
            description="本演示展示了 React Query 的核心功能：无限滚动查询、单个数据查询、缓存管理、乐观更新等"
            type="info"
            showIcon
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="无限滚动查询" size="small">
              <div className="space-y-4">
                {infiniteLoading ? (
                  <div className="flex justify-center py-8">
                    <Spin size="large" />
                  </div>
                ) : infiniteError ? (
                  <Alert message="加载失败" description={infiniteError.message} type="error" />
                ) : (
                  <>
                    <List
                      dataSource={allUsers}
                      renderItem={(user) => (
                        <List.Item key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedUserId(user.id)}>
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

                    {hasNextPage && (
                      <div className="flex justify-center">
                        <Button onClick={() => fetchNextPage()} loading={isFetchingNextPage}>
                          {isFetchingNextPage ? '加载中...' : '加载更多'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>

            <Card title="单个用户详情" size="small">
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

          <Card title="React Query 最佳实践要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>查询键管理:</strong> 使用统一的查询键结构，便于缓存管理和失效
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>乐观更新:</strong> 在突变前立即更新UI，提升用户体验
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>错误处理:</strong> 在突变失败时回滚乐观更新
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>缓存策略:</strong> 合理设置 staleTime 和 gcTime
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>无限滚动:</strong> 使用 useInfiniteQuery 实现分页加载
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>条件查询:</strong> 使用 enabled 选项控制查询执行
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
