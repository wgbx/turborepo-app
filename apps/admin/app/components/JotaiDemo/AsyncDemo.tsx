'use client'

import { useAtom } from 'jotai'
import { Card, Button, Space, Typography, List, Avatar, Spin, Alert, UserOutlined, ReloadOutlined } from 'ui'
import { usersAtom, loadingAtom } from './atoms'

const { Title, Text, Paragraph } = Typography

// 模拟 API 调用
const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5')
  return response.json()
}

export default function AsyncDemo() {
  const [users, setUsers] = useAtom(usersAtom)
  const [loading, setLoading] = useAtom(loadingAtom)

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await fetchUsers()
      setUsers(data)
    } catch (error) {
      console.error('加载用户失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const clearUsers = () => {
    setUsers([])
  }

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>异步状态管理</Title>
        <Paragraph>展示如何使用 Jotai 管理异步状态，包括加载状态和数据缓存。</Paragraph>
      </div>

      {/* 操作按钮 */}
      <Card title="操作" className="shadow-sm">
        <Space>
          <Button type="primary" onClick={loadUsers} loading={loading} icon={<ReloadOutlined />}>
            加载用户数据
          </Button>
          <Button onClick={clearUsers}>清空数据</Button>
        </Space>
      </Card>

      {/* 用户列表 */}
      <Card title="用户列表" className="shadow-sm">
        {loading ? (
          <div className="text-center py-8">
            <Spin size="large" />
            <div className="mt-4 text-gray-500">正在加载用户数据...</div>
          </div>
        ) : users.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={user.name}
                  description={
                    <div>
                      <div>邮箱: {user.email}</div>
                      <div>公司: {user.company?.name}</div>
                      <div>网站: {user.website}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <Alert message="暂无数据" description="点击'加载用户数据'按钮来获取用户信息" type="info" showIcon />
        )}
      </Card>

      {/* 状态信息 */}
      <Card title="状态信息" className="shadow-sm">
        <div className="space-y-2">
          <div>
            <Text strong>加载状态：</Text>
            <Text type={loading ? 'warning' : 'success'}>{loading ? '加载中...' : '已完成'}</Text>
          </div>
          <div>
            <Text strong>用户数量：</Text>
            <Text>{users.length} 个用户</Text>
          </div>
          <div>
            <Text strong>最后更新：</Text>
            <Text>{new Date().toLocaleString()}</Text>
          </div>
        </div>
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" className="shadow-sm">
        <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
            {`// 定义异步状态原子
const usersAtom = atom([])
const loadingAtom = atom(false)

// 在组件中使用
const [users, setUsers] = useAtom(usersAtom)
const [loading, setLoading] = useAtom(loadingAtom)

// 异步操作
const loadUsers = async () => {
  try {
    setLoading(true)
    const data = await fetchUsers()
    setUsers(data)
  } catch (error) {
    console.error('加载失败:', error)
  } finally {
    setLoading(false)
  }
}

// 清空数据
const clearUsers = () => {
  setUsers([])
}`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
