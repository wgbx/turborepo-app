'use client'

import { useAtom } from 'jotai'
import { Card, Typography, Progress, Statistic, Row, Col, Divider } from 'ui'
import { todosAtom, completedTodosAtom, activeTodosAtom, filteredTodosAtom, todoStatsAtom, filterAtom } from './atoms'

const { Title, Text, Paragraph } = Typography

export default function ComputedDemo() {
  const [todos] = useAtom(todosAtom)
  const [completedTodos] = useAtom(completedTodosAtom)
  const [activeTodos] = useAtom(activeTodosAtom)
  const [filteredTodos] = useAtom(filteredTodosAtom)
  const [stats] = useAtom(todoStatsAtom)
  const [filter, setFilter] = useAtom(filterAtom)

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>计算状态（派生状态）</Title>
        <Paragraph>展示如何使用 Jotai 创建基于其他原子的计算状态，实现响应式的数据派生。</Paragraph>
      </div>

      {/* 统计信息 */}
      <Card title="统计信息" className="shadow-sm">
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="总任务数" value={stats.total} valueStyle={{ color: '#3f8600' }} />
          </Col>
          <Col span={6}>
            <Statistic title="已完成" value={stats.completed} valueStyle={{ color: '#1890ff' }} />
          </Col>
          <Col span={6}>
            <Statistic title="进行中" value={stats.active} valueStyle={{ color: '#faad14' }} />
          </Col>
          <Col span={6}>
            <Statistic title="完成率" value={stats.percentage} suffix="%" valueStyle={{ color: '#722ed1' }} />
          </Col>
        </Row>

        <Divider />

        <div className="space-y-2">
          <Text strong>完成进度：</Text>
          <Progress
            percent={stats.percentage}
            status={stats.percentage === 100 ? 'success' : 'active'}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
      </Card>

      {/* 任务分类 */}
      <Card title="任务分类" className="shadow-sm">
        <div className="space-y-4">
          <div>
            <Text strong>已完成任务 ({completedTodos.length})：</Text>
            <div className="mt-2 space-y-1">
              {completedTodos.map((todo: any) => (
                <div key={todo.id} className="flex items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <Text delete>{todo.text}</Text>
                </div>
              ))}
            </div>
          </div>

          <Divider />

          <div>
            <Text strong>进行中任务 ({activeTodos.length})：</Text>
            <div className="mt-2 space-y-1">
              {activeTodos.map((todo: any) => (
                <div key={todo.id} className="flex items-center space-x-2">
                  <span className="text-blue-500">○</span>
                  <Text>{todo.text}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 筛选功能 */}
      <Card title="筛选功能" className="shadow-sm">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              全部 ({todos.length})
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-md ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              进行中 ({activeTodos.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              已完成 ({completedTodos.length})
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <Text strong>筛选结果 ({filteredTodos.length} 项)：</Text>
            <div className="mt-2 space-y-1">
              {filteredTodos.map((todo: any) => (
                <div key={todo.id} className="flex items-center space-x-2">
                  <span className={todo.completed ? 'text-green-500' : 'text-blue-500'}>{todo.completed ? '✓' : '○'}</span>
                  <Text delete={todo.completed}>{todo.text}</Text>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" className="shadow-sm">
        <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
            {`// 基础原子
const todosAtom = atom([
  { id: 1, text: '学习 Jotai', completed: false },
  { id: 2, text: '构建项目', completed: true },
])

// 计算原子 - 派生状态
const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => todo.completed)
})

const activeTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter(todo => !todo.completed)
})

const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom)
  const completed = get(completedTodosAtom)

  return {
    total: todos.length,
    completed: completed.length,
    active: todos.length - completed.length,
    percentage: todos.length > 0
      ? Math.round((completed.length / todos.length) * 100)
      : 0,
  }
})

// 在组件中使用
const [stats] = useAtom(todoStatsAtom)
const [completedTodos] = useAtom(completedTodosAtom)
const [activeTodos] = useAtom(activeTodosAtom)`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
