import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 基础计数器原子
export const countAtom = atom(0)

// 用户信息原子
export const userAtom = atom({
  name: '',
  email: '',
  age: 0,
})

// 主题原子（持久化到 localStorage）
export const themeAtom = atomWithStorage('theme', 'light')

// 异步用户数据原子
export const usersAtom = atom([])
export const loadingAtom = atom(false)

// Todo 相关原子
export const todosAtom = atomWithStorage('todos', [
  { id: 1, text: '学习 Jotai', completed: false },
  { id: 2, text: '构建项目', completed: true },
])

export const filterAtom = atom('all') // all, active, completed

// 表单状态原子
export const formDataAtom = atom({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

export const formErrorsAtom = atom<{
  username?: string
  email?: string
  password?: string
  confirmPassword?: string
}>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

// 计算原子 - 基于其他原子的派生状态
export const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => todo.completed)
})

export const activeTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => !todo.completed)
})

export const filteredTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  const filter = get(filterAtom)

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed)
    case 'completed':
      return todos.filter((todo) => todo.completed)
    default:
      return todos
  }
})

export const todoStatsAtom = atom((get) => {
  const todos = get(todosAtom)
  const completed = get(completedTodosAtom)

  return {
    total: todos.length,
    completed: completed.length,
    active: todos.length - completed.length,
    percentage: todos.length > 0 ? Math.round((completed.length / todos.length) * 100) : 0,
  }
})
