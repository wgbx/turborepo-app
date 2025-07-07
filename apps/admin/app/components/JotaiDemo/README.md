# Jotai 状态管理组件

一个基于 Jotai 的状态管理演示组件，展示原子化状态管理的最佳实践。

## 🚀 特性

- **原子化状态管理** - 使用 Jotai 的原子概念管理状态
- **持久化存储** - 支持 localStorage 持久化
- **计算状态** - 基于其他原子的派生状态
- **异步状态** - 异步数据加载和状态管理
- **表单状态** - 完整的表单状态管理方案
- **Todo 应用** - 完整的实际应用示例
- **类型安全** - 完整的 TypeScript 类型定义

## 📁 项目结构

```
JotaiDemo/
├── atoms.ts              # 原子状态定义
├── index.tsx             # 主组件
├── BasicDemo.tsx         # 基础用法演示
├── AsyncDemo.tsx         # 异步状态演示
├── ComputedDemo.tsx      # 计算状态演示
├── FormDemo.tsx          # 表单状态演示
├── TodoDemo.tsx          # Todo 应用演示
└── README.md             # 文档
```

## 🛠️ 使用方法

### 基本使用

```tsx
import JotaiDemo from '@admin/components/JotaiDemo'

function App() {
  return <JotaiDemo />
}
```

### 定义原子

```tsx
// atoms.ts
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// 基础原子
export const countAtom = atom(0)

// 持久化原子
export const themeAtom = atomWithStorage('theme', 'light')

// 计算原子
export const doubleCountAtom = atom((get) => get(countAtom) * 2)
```

### 在组件中使用

```tsx
import { useAtom } from 'jotai'
import { countAtom, themeAtom } from './atoms'

function Counter() {
  const [count, setCount] = useAtom(countAtom)
  const [theme, setTheme] = useAtom(themeAtom)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
    </div>
  )
}
```

## 🎯 核心功能

### 1. 基础原子状态

- **计数器** - 简单的数值状态管理
- **用户信息** - 对象状态管理
- **主题切换** - 持久化状态管理

### 2. 异步状态管理

- **数据加载** - 异步数据获取和状态管理
- **加载状态** - 加载指示器状态
- **错误处理** - 异步操作错误处理

### 3. 计算状态（派生状态）

- **统计信息** - 基于基础数据的统计计算
- **筛选数据** - 根据条件筛选的数据
- **进度计算** - 完成进度百分比计算

### 4. 表单状态管理

- **字段值管理** - 表单字段状态
- **验证错误** - 表单验证错误状态
- **表单操作** - 提交、重置等操作

### 5. Todo 应用

- **任务管理** - 增删改查任务
- **状态切换** - 任务完成状态切换
- **筛选功能** - 按状态筛选任务
- **统计信息** - 任务完成统计

## 🔧 技术栈

- **Jotai** - 轻量级状态管理库
- **React 18** - 使用最新的 React 特性
- **TypeScript** - 完整的类型安全
- **Ant Design 5.x** - UI 组件库
- **Tailwind CSS** - 样式框架

## 📋 最佳实践

### 1. 原子设计原则

```tsx
// 好的做法：原子粒度适中
const userAtom = atom({ name: '', email: '', age: 0 })

// 避免：原子过于细粒度
const userNameAtom = atom('')
const userEmailAtom = atom('')
const userAgeAtom = atom(0)
```

### 2. 计算原子优化

```tsx
// 使用计算原子避免重复计算
const completedTodosAtom = atom((get) => {
  const todos = get(todosAtom)
  return todos.filter((todo) => todo.completed)
})

// 在组件中使用
const [completedTodos] = useAtom(completedTodosAtom)
```

### 3. 持久化策略

```tsx
// 只对需要持久化的状态使用 atomWithStorage
const themeAtom = atomWithStorage('theme', 'light')
const userPreferencesAtom = atomWithStorage('preferences', {})

// 临时状态使用普通 atom
const loadingAtom = atom(false)
const errorAtom = atom(null)
```

### 4. 异步状态管理

```tsx
// 分离加载状态和数据状态
const usersAtom = atom([])
const loadingAtom = atom(false)

// 在组件中统一管理
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
```

## 🎨 样式定制

组件使用 Tailwind CSS 类名，可以通过以下方式定制样式：

```tsx
// 修改卡片样式
<Card className="shadow-lg border-2 border-blue-200">
  {/* 内容 */}
</Card>

// 修改按钮样式
<Button className="bg-gradient-to-r from-blue-500 to-purple-500">
  自定义按钮
</Button>
```

## 🔄 扩展性

### 添加新的原子

1. 在 `atoms.ts` 中定义新的原子
2. 在相应的演示组件中使用
3. 更新类型定义（如果需要）

### 添加新的演示

1. 创建新的演示组件文件
2. 在 `index.tsx` 中添加新的标签页
3. 更新文档

### 集成到其他项目

```tsx
// 在 Provider 中包装应用
import { Provider } from 'jotai'

function App() {
  return (
    <Provider>
      <YourApp />
    </Provider>
  )
}
```

## 🐛 故障排除

### 常见问题

1. **原子未更新**

   - 检查是否正确使用 `useAtom`
   - 确保原子定义正确

2. **持久化不工作**

   - 检查 `atomWithStorage` 的使用
   - 确保 localStorage 可用

3. **计算原子性能问题**

   - 避免在计算原子中进行复杂计算
   - 考虑使用 `useMemo` 优化

4. **TypeScript 类型错误**

   - 确保所有类型定义正确
   - 检查原子类型是否匹配

## 📚 相关资源

- [Jotai 官方文档](https://jotai.org/) - 官方文档和指南
- [Jotai GitHub](https://github.com/pmndrs/jotai) - 源代码和示例
- [React 状态管理对比](https://jotai.org/docs/introduction/comparison) - 与其他状态管理库的对比
