'use client'

import { useState } from 'react'
import { Card, Button, Space, List, Avatar, Tag, Spin, Alert, Divider, Input, Select } from 'ui'
import { useUsers, useUser } from './hooks/useUsers'
import { QueryClient, useQueryClient } from '@tanstack/react-query'

export function CacheDemo() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const queryClient = useQueryClient()

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers({
    page: 1,
    pageSize: 5,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  })

  const { data: selectedUser, isLoading: userLoading, error: userError } = useUser(selectedUserId!)

  const handleClearCache = () => {
    queryClient.clear()
  }

  const handleInvalidateUsers = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
  }

  const handlePrefetchUser = (userId: number) => {
    queryClient.prefetchQuery({
      queryKey: ['users', 'detail', userId],
      queryFn: () => fetch(`/api/users/${userId}`).then((res) => res.json()),
    })
  }

  const getCacheInfo = () => {
    const queries = queryClient.getQueryCache().getAll()
    const mutations = queryClient.getMutationCache().getAll()

    return {
      totalQueries: queries.length,
      totalMutations: mutations.length,
      userQueries: queries.filter((q) => q.queryKey[0] === 'users').length,
    }
  }

  const cacheInfo = getCacheInfo()

  return (
    <div className="space-y-6">
      <Card title="React Query 缓存演示">
        <div className="space-y-4">
          <Alert
            message="缓存效果演示"
            description="通过以下操作来感受 React Query 的缓存机制：1. 切换用户查看详情 2. 修改搜索条件 3. 清除缓存 4. 观察加载状态"
            type="info"
            showIcon
          />

          <Card title="缓存控制面板" size="small">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-blue-50 rounded">
                  <div className="font-bold text-blue-600">{cacheInfo.totalQueries}</div>
                  <div>总查询数</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="font-bold text-green-600">{cacheInfo.userQueries}</div>
                  <div>用户查询数</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded">
                  <div className="font-bold text-purple-600">{cacheInfo.totalMutations}</div>
                  <div>突变数</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleClearCache} danger>
                  清除所有缓存
                </Button>
                <Button onClick={handleInvalidateUsers}>失效用户查询</Button>
                <Button onClick={() => window.location.reload()}>刷新页面</Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="用户列表 (观察缓存效果)" size="small">
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="搜索用户" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: 150 }} />
                  <Select
                    placeholder="状态筛选"
                    value={statusFilter}
                    onChange={setStatusFilter}
                    style={{ width: 120 }}
                    allowClear
                    options={[
                      { label: '活跃', value: 'active' },
                      { label: '非活跃', value: 'inactive' },
                      { label: '待审核', value: 'pending' },
                    ]}
                  />
                </div>

                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <Spin size="large" />
                  </div>
                ) : usersError ? (
                  <Alert message="加载失败" description={usersError.message} type="error" />
                ) : (
                  <List
                    dataSource={usersData?.data}
                    renderItem={(user) => (
                      <List.Item
                        key={user.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => setSelectedUserId(user.id)}
                        actions={[
                          <Button
                            key="prefetch"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handlePrefetchUser(user.id)
                            }}
                          >
                            预取
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={user.avatar} alt={user.name} />}
                          title={
                            <Space>
                              <span>{user.name}</span>
                              <Tag color={user.status === 'active' ? 'green' : user.status === 'inactive' ? 'red' : 'orange'}>
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

            <Card title="用户详情 (缓存对比)" size="small">
              <div className="space-y-4">
                {!selectedUserId ? (
                  <div className="text-center text-gray-500 py-8">
                    点击左侧用户查看详情
                    <br />
                    <small>观察首次加载和缓存加载的区别</small>
                  </div>
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
                        <Tag color={selectedUser.status === 'active' ? 'green' : selectedUser.status === 'inactive' ? 'red' : 'orange'}>
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

                    <Alert
                      message="缓存提示"
                      description="再次点击同一用户时，数据会立即显示（无加载状态），这就是缓存的效果！"
                      type="success"
                      showIcon
                    />
                  </div>
                ) : null}
              </div>
            </Card>
          </div>

          <Card title="缓存体验指南" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">1.</span>
                <span>
                  <strong>首次加载:</strong> 点击用户查看详情，会看到加载状态
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">2.</span>
                <span>
                  <strong>缓存效果:</strong> 再次点击同一用户，数据立即显示，无加载状态
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">3.</span>
                <span>
                  <strong>搜索缓存:</strong> 修改搜索条件，观察列表是否重新加载
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">4.</span>
                <span>
                  <strong>清除缓存:</strong> 点击"清除所有缓存"后，所有数据都会重新加载
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">5.</span>
                <span>
                  <strong>预取缓存:</strong> 点击用户列表中的"预取"按钮，提前加载用户详情
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">6.</span>
                <span>
                  <strong>页面刷新:</strong> 刷新页面后，缓存会被清除，所有数据重新加载
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
