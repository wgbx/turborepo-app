'use client'

import { useState } from 'react'
import { Card, Button, Space, Input, Alert, Divider, Tag, List, Avatar, Switch } from 'ui'
import { useRequest } from 'ahooks'

interface CacheConfig {
  cacheKey: string
  staleTime: number
  gcTime: number
}

interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  status: string
  lastActive: string
}

const mockFetchUsers = async (): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: '管理员',
      status: 'active',
      lastActive: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: '用户',
      status: 'active',
      lastActive: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: '用户',
      status: 'inactive',
      lastActive: new Date().toLocaleTimeString(),
    },
  ]
}

const mockFetchUserById = async (id: number): Promise<User> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const users = [
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
      role: '管理员',
      status: 'active',
      lastActive: new Date().toLocaleTimeString(),
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
      role: '用户',
      status: 'active',
      lastActive: new Date().toLocaleTimeString(),
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
      role: '用户',
      status: 'inactive',
      lastActive: new Date().toLocaleTimeString(),
    },
  ]

  const user = users.find((u) => u.id === id)
  if (!user) {
    throw new Error('用户不存在')
  }

  return user
}

export function CacheDemo() {
  const [cacheConfig, setCacheConfig] = useState<CacheConfig>({
    cacheKey: 'users',
    staleTime: 5000,
    gcTime: 10000,
  })

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [useCache, setUseCache] = useState(true)

  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refresh: refreshUsers,
  } = useRequest(mockFetchUsers, {
    cacheKey: useCache ? cacheConfig.cacheKey : undefined,
    staleTime: useCache ? cacheConfig.staleTime : 0,
    cacheTime: useCache ? cacheConfig.gcTime : 0,
    onSuccess: (data) => {
      console.log('用户列表加载成功:', data)
    },
  })

  const {
    data: selectedUser,
    loading: userLoading,
    error: userError,
    run: fetchUser,
  } = useRequest(mockFetchUserById, {
    manual: true,
    cacheKey: useCache ? `user-${selectedUserId}` : undefined,
    staleTime: useCache ? 3000 : 0,
    cacheTime: useCache ? 5000 : 0,
    onSuccess: (data) => {
      console.log('用户详情加载成功:', data)
    },
  })

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
    fetchUser(userId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <Card title="缓存管理" size="small">
        <div className="space-y-4">
          <Alert message="缓存功能演示" description="展示 useRequest 的缓存功能：数据缓存、缓存失效、垃圾回收等" type="info" showIcon />

          <div className="space-y-4 mt-4">
            <Card title="缓存配置" size="small">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch checked={useCache} onChange={setUseCache} size="small" />
                  <span className="text-sm">启用缓存</span>
                </div>

                {useCache && (
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">缓存键</label>
                      <Input
                        value={cacheConfig.cacheKey}
                        onChange={(e) => setCacheConfig({ ...cacheConfig, cacheKey: e.target.value })}
                        size="small"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">过期时间(ms)</label>
                      <Input
                        type="number"
                        value={cacheConfig.staleTime}
                        onChange={(e) => setCacheConfig({ ...cacheConfig, staleTime: parseInt(e.target.value) || 0 })}
                        size="small"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">垃圾回收时间(ms)</label>
                      <Input
                        type="number"
                        value={cacheConfig.gcTime}
                        onChange={(e) => setCacheConfig({ ...cacheConfig, gcTime: parseInt(e.target.value) || 0 })}
                        size="small"
                      />
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button type="primary" onClick={refreshUsers} loading={usersLoading}>
                    刷新用户列表
                  </Button>
                  <Button onClick={() => setSelectedUserId(null)}>清除选中</Button>
                </div>

                <div className="text-xs text-gray-600 space-y-1">
                  <div>• 过期时间: 数据在指定时间后变为过期状态，但仍可使用</div>
                  <div>• 垃圾回收时间: 数据在指定时间后被完全清除</div>
                  <div>• 缓存键: 用于标识缓存数据的唯一键</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="用户列表" size="small">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">用户数量: {users?.length || 0}</span>
                    <Tag color={useCache ? 'green' : 'orange'}>{useCache ? '缓存已启用' : '缓存已禁用'}</Tag>
                  </div>

                  {usersError && <Alert message="加载失败" description={usersError.message} type="error" />}

                  {usersLoading ? (
                    <div className="text-center py-8">
                      <span className="text-sm text-gray-500">正在加载用户列表...</span>
                    </div>
                  ) : (
                    <List
                      dataSource={users}
                      renderItem={(user) => (
                        <List.Item key={user.id} className="cursor-pointer hover:bg-gray-50" onClick={() => handleUserClick(user.id)}>
                          <List.Item.Meta
                            avatar={<Avatar src={user.avatar} alt={user.name} />}
                            title={
                              <div className="flex justify-between items-center">
                                <span>{user.name}</span>
                                <Tag color={getStatusColor(user.status)}>{user.status === 'active' ? '活跃' : '非活跃'}</Tag>
                              </div>
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
                    <div className="text-center py-8">
                      <span className="text-sm text-gray-500">正在加载用户详情...</span>
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
                          <Tag color={getStatusColor(selectedUser.status)}>{selectedUser.status === 'active' ? '活跃' : '非活跃'}</Tag>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">最后活跃:</span>
                          <span>{selectedUser.lastActive}</span>
                        </div>
                      </div>

                      <div className="p-2 bg-blue-50 rounded text-xs text-blue-700">
                        <div>缓存信息:</div>
                        <div>• 缓存键: user-{selectedUserId}</div>
                        <div>• 过期时间: 3秒</div>
                        <div>• 垃圾回收: 5秒</div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </Card>
            </div>

            <Card title="缓存功能要点" size="small">
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>缓存键:</strong> 通过 cacheKey 设置缓存标识，相同键的数据会共享缓存
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>过期时间:</strong> staleTime 设置数据过期时间，过期后仍可使用但会标记为过期
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>垃圾回收:</strong> gcTime 设置数据完全清除时间，超过时间后数据被删除
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>缓存共享:</strong> 相同 cacheKey 的请求会共享缓存数据
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>缓存失效:</strong> 通过 refresh 方法可以强制刷新缓存
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-500">•</span>
                  <span>
                    <strong>性能优化:</strong> 合理使用缓存可以减少网络请求，提升用户体验
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  )
}
