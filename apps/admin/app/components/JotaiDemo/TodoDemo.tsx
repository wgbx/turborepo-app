'use client'

import { useState } from 'react'
import { useAtom } from 'jotai'
import { Card, Typography, Input, Button, Space, List, Checkbox, Tag, DeleteOutlined, PlusOutlined } from 'ui'
import { todosAtom, filterAtom, filteredTodosAtom, todoStatsAtom } from './atoms'

const { Title, Text, Paragraph } = Typography
const { Search } = Input

export default function TodoDemo() {
  const [todos, setTodos] = useAtom(todosAtom)
  const [filter, setFilter] = useAtom(filterAtom)
  const [filteredTodos] = useAtom(filteredTodosAtom)
  const [stats] = useAtom(todoStatsAtom)
  const [newTodo, setNewTodo] = useState('')

  const addTodo = (text: string) => {
    if (text.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      }
      setTodos((prev) => [...prev, newTodoItem])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const getFilterColor = (filterType: string) => {
    return filter === filterType ? 'blue' : 'default'
  }

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>Todo 应用</Title>
        <Paragraph>一个完整的 Todo 应用，展示 Jotai 在实际项目中的应用。</Paragraph>
      </div>

      {/* 统计信息 */}
      <Card title="任务统计" className="shadow-sm">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-sm text-gray-600">总任务</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">已完成</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{stats.active}</div>
            <div className="text-sm text-gray-600">进行中</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{stats.percentage}%</div>
            <div className="text-sm text-gray-600">完成率</div>
          </div>
        </div>
      </Card>

      {/* 添加任务 */}
      <Card title="添加任务" className="shadow-sm">
        <Space.Compact style={{ width: '100%' }}>
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="输入新任务..."
            onPressEnter={() => addTodo(newTodo)}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => addTodo(newTodo)}>
            添加
          </Button>
        </Space.Compact>
      </Card>

      {/* 筛选器 */}
      <Card title="任务筛选" className="shadow-sm">
        <Space>
          <Tag color={getFilterColor('all')} onClick={() => setFilter('all')} style={{ cursor: 'pointer' }}>
            全部 ({stats.total})
          </Tag>
          <Tag color={getFilterColor('active')} onClick={() => setFilter('active')} style={{ cursor: 'pointer' }}>
            进行中 ({stats.active})
          </Tag>
          <Tag color={getFilterColor('completed')} onClick={() => setFilter('completed')} style={{ cursor: 'pointer' }}>
            已完成 ({stats.completed})
          </Tag>
        </Space>

        {stats.completed > 0 && (
          <Button size="small" danger className="ml-4" onClick={clearCompleted}>
            清除已完成
          </Button>
        )}
      </Card>

      {/* 任务列表 */}
      <Card title="任务列表" className="shadow-sm">
        {filteredTodos.length > 0 ? (
          <List
            dataSource={filteredTodos}
            renderItem={(todo: any) => (
              <List.Item
                actions={[
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => deleteTodo(todo.id)}>
                    删除
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />}
                  title={
                    <div className="flex items-center space-x-2">
                      <span className={todo.completed ? 'line-through text-gray-500' : ''}>{todo.text}</span>
                      {todo.completed && <Tag color="green">已完成</Tag>}
                    </div>
                  }
                  description={
                    <Text type="secondary" className="text-xs">
                      创建时间: {new Date(todo.createdAt).toLocaleString()}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            {filter === 'all' ? '暂无任务' : `暂无${filter === 'active' ? '进行中' : '已完成'}的任务`}
          </div>
        )}
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" className="shadow-sm">
        <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
            {`// Todo 相关原子
const todosAtom = atomWithStorage('todos', [
  { id: 1, text: '学习 Jotai', completed: false },
  { id: 2, text: '构建项目', completed: true },
])

const filterAtom = atom('all')

// 计算原子
const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)

  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed)
    case 'completed':
      return todos.filter(todo => todo.completed)
    default:
      return todos
  }
})

// 在组件中使用
const [todos, setTodos] = useAtom(todosAtom)
const [filter, setFilter] = useAtom(filterAtom)
const [filteredTodos] = useAtom(filteredTodosAtom)

// 添加任务
const addTodo = (text: string) => {
  const newTodo = { id: Date.now(), text, completed: false }
  setTodos(prev => [...prev, newTodo])
}

// 切换任务状态
const toggleTodo = (id: number) => {
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  )
}

// 删除任务
const deleteTodo = (id: number) => {
  setTodos(prev => prev.filter(todo => todo.id !== id))
}`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
