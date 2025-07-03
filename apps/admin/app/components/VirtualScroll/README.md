# 虚拟滚动组件库

这是一个高性能的虚拟滚动组件库，基于Ant Design和Tailwind CSS构建。组件采用分层架构设计，提供从基础虚拟滚动到具体业务组件的完整解决方案。

## 组件架构

```
VirtualScroll (核心组件)
├── UserList (用户列表组件)
└── ProductList (产品列表组件)
```

## 核心组件

### VirtualScroll

最基础的虚拟滚动组件，只负责核心的虚拟滚动逻辑，不包含任何样式和业务逻辑。

```tsx
import VirtualScroll from '@admin/components/VirtualScroll'

const items = [
  { id: 1, name: '项目1' },
  { id: 2, name: '项目2' },
]

function MyComponent() {
  const renderItem = (item) => <div key={item.id}>{item.name}</div>

  return <VirtualScroll items={items} height={600} itemHeight={50} renderItem={renderItem} />
}
```

## 业务组件

### UserList

专门用于显示用户列表的组件，包含头像、姓名、邮箱、角色、状态等信息。内置了列表样式和悬停效果。

```tsx
import UserList from '@admin/components/VirtualScroll/UserList'

const users = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    avatar: 'https://example.com/avatar.jpg',
  },
]

function MyComponent() {
  return <UserList users={users} height={600} />
}
```

### ProductList

专门用于显示产品列表的组件，包含图片、名称、价格、分类、库存等信息。内置了列表样式、悬停效果和操作按钮。

```tsx
import ProductList from '@admin/components/VirtualScroll/ProductList'

const products = [
  {
    id: 1,
    name: 'iPhone 15',
    price: 5999,
    category: '电子产品',
    stock: 50,
    description: '最新款iPhone',
    image: 'https://example.com/iphone.jpg',
  },
]

function MyComponent() {
  const handleEdit = (product) => {
    console.log('编辑产品:', product)
  }

  const handleDelete = (product) => {
    console.log('删除产品:', product)
  }

  return <ProductList products={products} height={600} onEdit={handleEdit} onDelete={handleDelete} />
}
```

## 参数说明

### VirtualScroll

- `items`: 数据数组，每个项目必须包含唯一的id字段
- `height`: 容器高度（像素）
- `itemHeight`: 每个项目的高度（像素）
- `renderItem`: 渲染函数，接收item和index参数
- `overscan`: 预渲染的项目数量，默认为5
- `className`: 容器的CSS类名
- `style`: 容器的内联样式

### UserList

- `users`: 用户数据数组，每个用户必须包含id、name、email、role、status字段
- `height`: 容器高度，默认为600
- `itemHeight`: 项目高度，默认为72
- `className`: 自定义CSS类名

### ProductList

- `products`: 产品数据数组，每个产品必须包含id、name、price、category、stock、description字段
- `height`: 容器高度，默认为600
- `itemHeight`: 项目高度，默认为100
- `className`: 自定义CSS类名
- `onEdit`: 编辑产品回调函数
- `onDelete`: 删除产品回调函数

## 类型定义

```tsx
// 基础虚拟滚动项目接口
interface VirtualScrollItem {
  id: string | number
}

// 用户项目接口
interface UserItem extends VirtualScrollItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  avatar?: string
}

// 产品项目接口
interface ProductItem extends VirtualScrollItem {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image?: string
  description: string
}
```

## 依赖

- `ui`: Ant Design组件库
- `tailwindcss`: CSS框架
- `constant`: 常量包（用于默认图片）

## 设计原则

1. **单一职责**: 每个组件只负责自己的核心功能
2. **可复用性**: 基础组件可以在不同场景下复用
3. **可扩展性**: 可以轻松创建新的业务组件
4. **类型安全**: 完整的TypeScript类型支持
5. **性能优先**: 虚拟滚动确保大数据量下的流畅体验
6. **样式统一**: 业务组件内置统一的列表样式和交互效果

## 演示

在管理后台的"虚拟滚动"标签页中可以查看所有组件的演示效果，包括：

- 基础虚拟滚动组件
- 用户列表组件
- 产品列表组件

每个组件都支持动态调整数据量，可以测试不同数据规模下的性能表现。
