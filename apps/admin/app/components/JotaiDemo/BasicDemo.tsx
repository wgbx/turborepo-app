'use client'

import { useAtom } from 'jotai'
import { Button, Card, Space, Typography, Switch, Divider } from 'ui'
import { countAtom, userAtom, themeAtom } from './atoms'

const { Title, Text, Paragraph } = Typography

export default function BasicDemo() {
  const [count, setCount] = useAtom(countAtom)
  const [user, setUser] = useAtom(userAtom)
  const [theme, setTheme] = useAtom(themeAtom)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)
  const reset = () => setCount(0)

  const updateUser = (field: string, value: string | number) => {
    setUser((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>基础原子状态</Title>
        <Paragraph>展示 Jotai 的基础用法：计数器、用户信息和主题切换。</Paragraph>
      </div>

      {/* 计数器示例 */}
      <Card title="计数器" className="shadow-sm">
        <div className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">{count}</div>
          <Space>
            <Button type="primary" onClick={increment}>
              增加
            </Button>
            <Button onClick={decrement}>减少</Button>
            <Button onClick={reset}>重置</Button>
          </Space>
        </div>
      </Card>

      {/* 用户信息示例 */}
      <Card title="用户信息" className="shadow-sm">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Text strong>姓名：</Text>
              <input
                type="text"
                value={user.name}
                onChange={(e) => updateUser('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入姓名"
              />
            </div>
            <div>
              <Text strong>邮箱：</Text>
              <input
                type="email"
                value={user.email}
                onChange={(e) => updateUser('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入邮箱"
              />
            </div>
            <div>
              <Text strong>年龄：</Text>
              <input
                type="number"
                value={user.age}
                onChange={(e) => updateUser('age', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="请输入年龄"
              />
            </div>
          </div>

          <Divider />

          <div className="bg-gray-50 p-4 rounded-md">
            <Text strong>当前用户信息：</Text>
            <pre className="mt-2 text-sm text-gray-700">{JSON.stringify(user, null, 2)}</pre>
          </div>
        </div>
      </Card>

      {/* 主题切换示例 */}
      <Card title="主题切换（持久化）" className="shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <Text strong>当前主题：</Text>
            <Text className="ml-2" type={theme === 'light' ? 'secondary' : 'warning'}>
              {theme === 'light' ? '浅色主题' : '深色主题'}
            </Text>
          </div>
          <div className="flex items-center space-x-2">
            <Text>浅色</Text>
            <Switch checked={theme === 'dark'} onChange={toggleTheme} checkedChildren="🌙" unCheckedChildren="☀️" />
            <Text>深色</Text>
          </div>
        </div>
        <Paragraph className="mt-4 text-sm text-gray-500">主题设置会自动保存到 localStorage，刷新页面后依然保持。</Paragraph>
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" className="shadow-sm">
        <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
            {`// 定义原子
const countAtom = atom(0)
const userAtom = atom({ name: '', email: '', age: 0 })
const themeAtom = atomWithStorage('theme', 'light')

// 在组件中使用
const [count, setCount] = useAtom(countAtom)
const [user, setUser] = useAtom(userAtom)
const [theme, setTheme] = useAtom(themeAtom)

// 更新状态
setCount(prev => prev + 1)
setUser(prev => ({ ...prev, name: '新名字' }))
setTheme('dark')`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
