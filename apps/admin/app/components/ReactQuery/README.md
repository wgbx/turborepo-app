# React Query 最佳实践组件库

这是一个基于 @tanstack/react-query 的最佳实践组件库，展示了 React Query 的核心功能和最佳实践。组件采用分层架构设计，提供完整的数据获取、缓存管理和状态同步解决方案。

## 组件架构

```
ReactQuery (主组件)
├── UserList (用户列表组件)
├── UserForm (用户表单组件)
└── ReactQueryDemo (演示组件)
```

## 核心功能

### 数据查询 (useQuery)

- **分页查询**: 支持搜索、筛选、分页的用户列表
- **单个数据查询**: 根据ID获取用户详情
- **无限滚动**: 使用 useInfiniteQuery 实现无限加载
- **缓存管理**: 合理的 staleTime 和 gcTime 配置

### 数据突变 (useMutation)

- **创建用户**: 添加新用户到系统
- **更新用户**: 编辑现有用户信息
- **删除用户**: 移除用户记录
- **乐观更新**: 立即更新UI，提升用户体验

### 最佳实践

- **查询键管理**: 统一的查询键结构
- **错误处理**: 完善的错误处理和回滚机制
- **加载状态**: 优雅的加载和错误状态展示
- **类型安全**: 完整的 TypeScript 类型支持

## 主要组件

### ReactQuery

主组件，整合了所有功能模块，提供完整的用户管理界面。

```tsx
import ReactQuery from '@admin/components/ReactQuery'

function MyComponent() {
  return <ReactQuery />
}
```

### UserList

用户列表组件，展示分页、搜索、筛选功能。

```tsx
import { UserList } from '@admin/components/ReactQuery/UserList'

function MyComponent() {
  const handleEdit = (user) => {
    console.log('编辑用户:', user)
  }

  return <UserList onEdit={handleEdit} />
}
```

### UserForm

用户表单组件，支持创建和编辑用户。

```tsx
import { UserForm } from '@admin/components/ReactQuery/UserForm'

function MyComponent() {
  const handleSuccess = () => {
    console.log('操作成功')
  }

  return <UserForm user={editingUser} onSuccess={handleSuccess} />
}
```

### ReactQueryDemo

演示组件，展示 React Query 的各种特性和最佳实践。

```tsx
import { ReactQueryDemo } from '@admin/components/ReactQuery/ReactQueryDemo'

function MyComponent() {
  return <ReactQueryDemo />
}
```

## API 服务

### userApi

模拟的用户管理 API，包含完整的 CRUD 操作。

```tsx
import { userApi } from '@admin/components/ReactQuery/api'

// 获取用户列表
const users = await userApi.getUsers({ page: 1, pageSize: 10 })

// 获取单个用户
const user = await userApi.getUser(1)

// 创建用户
const newUser = await userApi.createUser(userData)

// 更新用户
const updatedUser = await userApi.updateUser({ id: 1, ...userData })

// 删除用户
await userApi.deleteUser(1)
```

## React Query Hooks

### useUsers

分页查询用户列表。

```tsx
import { useUsers } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const { data, isLoading, error } = useUsers({
    page: 1,
    pageSize: 10,
    search: '张三',
    status: 'active',
  })
}
```

### useInfiniteUsers

无限滚动查询用户列表。

```tsx
import { useInfiniteUsers } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteUsers({ pageSize: 10 })
}
```

### useUser

查询单个用户详情。

```tsx
import { useUser } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const { data: user, isLoading } = useUser(1)
}
```

### useCreateUser

创建用户突变。

```tsx
import { useCreateUser } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const createUserMutation = useCreateUser()

  const handleCreate = async (userData) => {
    await createUserMutation.mutateAsync(userData)
  }
}
```

### useUpdateUser

更新用户突变，包含乐观更新。

```tsx
import { useUpdateUser } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const updateUserMutation = useUpdateUser()

  const handleUpdate = async (userData) => {
    await updateUserMutation.mutateAsync(userData)
  }
}
```

### useDeleteUser

删除用户突变，包含乐观更新。

```tsx
import { useDeleteUser } from '@admin/components/ReactQuery/hooks/useUsers'

function MyComponent() {
  const deleteUserMutation = useDeleteUser()

  const handleDelete = async (userId) => {
    await deleteUserMutation.mutateAsync(userId)
  }
}
```

## 类型定义

```tsx
// 用户项目接口
interface UserItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
  createdAt: string
  updatedAt: string
}

// 创建用户数据接口
interface CreateUserData {
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
}

// 更新用户数据接口
interface UpdateUserData extends Partial<CreateUserData> {
  id: number
}

// 分页响应接口
interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// 查询参数接口
interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  role?: string
}
```

## 查询键管理

使用统一的查询键结构，便于缓存管理和失效：

```tsx
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: QueryParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}
```

## 依赖

- `@tanstack/react-query`: React Query 核心库
- `ui`: Ant Design 组件库
- `tailwindcss`: CSS 框架

## 设计原则

1. **数据获取分离**: 将数据获取逻辑从组件中分离
2. **缓存优先**: 合理利用 React Query 的缓存机制
3. **乐观更新**: 提升用户体验的响应式更新
4. **错误处理**: 完善的错误处理和用户反馈
5. **类型安全**: 完整的 TypeScript 类型支持
6. **性能优化**: 合理的查询配置和缓存策略

## 最佳实践要点

1. **查询键管理**: 使用统一的查询键结构
2. **乐观更新**: 在突变前立即更新UI
3. **错误处理**: 在突变失败时回滚乐观更新
4. **缓存策略**: 合理设置 staleTime 和 gcTime
5. **无限滚动**: 使用 useInfiniteQuery 实现分页加载
6. **条件查询**: 使用 enabled 选项控制查询执行
7. **类型安全**: 完整的 TypeScript 类型定义
8. **组件分离**: 将数据逻辑和UI逻辑分离

## 演示

在管理后台的"React Query"标签页中可以查看所有功能的演示效果，包括：

- 用户列表的分页、搜索、筛选
- 用户创建、编辑、删除操作
- 无限滚动查询演示
- 单个用户详情查询
- 乐观更新效果展示

每个功能都展示了 React Query 的最佳实践和核心特性。
