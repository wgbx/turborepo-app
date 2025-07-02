# AntdForm 组件

一个基于 Ant Design 的高质量表单组件，支持多标签页表单、自动错误跳转和滚动定位。

> 📖 **项目主页:** [返回项目根目录](../../../../../README.md)

## 🚀 特性

- **多标签页表单** - 支持将复杂表单拆分为多个标签页
- **智能错误处理** - 自动跳转到包含错误字段的标签页
- **平滑滚动定位** - 自动滚动到错误字段位置
- **类型安全** - 完整的 TypeScript 类型定义
- **可配置** - 通过配置文件定义表单结构和验证规则
- **组件化设计** - 高度模块化，易于维护和扩展
- **错误边界处理** - 完善的错误处理和用户反馈

## 📁 项目结构

```
AntdForm/
├── components/
│   ├── FormField.tsx      # 动态表单字段组件
│   ├── TabForm.tsx        # 标签页表单组件
│   └── FormActions.tsx    # 表单操作按钮组件
├── hooks/
│   └── useFormTabs.ts     # 表单标签页逻辑 Hook
├── constants.ts           # 表单配置和常量
├── types.ts              # TypeScript 类型定义
├── index.tsx             # 主组件
└── README.md             # 文档
```

## 🛠️ 使用方法

### 基本使用

```tsx
import AntdForm from './components/AntdForm'

function App() {
  return <AntdForm />
}
```

### 自定义配置

```tsx
// 在 constants.ts 中修改表单配置
export const FORM_CONFIG: TabFormConfig[] = [
  {
    key: '1',
    title: '基本信息',
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入姓名！' },
          { min: 2, message: '姓名至少2个字符！' },
        ],
        placeholder: '请输入姓名',
      },
      // ... 更多字段
    ],
  },
]
```

## 🎯 核心功能

### 1. 动态表单字段渲染

`FormField` 组件根据配置动态渲染不同类型的表单字段：

- `input` - 普通输入框
- `email` - 邮箱输入框
- `phone` - 手机号输入框
- `select` - 下拉选择框
- `date` - 日期选择器
- `textarea` - 多行文本域
- `salary` - 薪资输入框（带货币符号）
- `skills` - 多选技能选择器

### 2. 智能错误处理

`useFormTabs` Hook 提供：

- 自动检测错误字段所属的标签页
- 自动跳转到包含错误的标签页
- 平滑滚动到错误字段位置
- 错误状态管理和用户反馈

### 3. 响应式布局

- 网格布局：输入框、选择框等使用 2 列网格
- 全宽布局：文本域、多选框等使用全宽布局
- 移动端适配：在小屏幕上自动调整为单列布局

## 🔧 技术栈

- **React 18** - 使用最新的 React 特性
- **TypeScript** - 完整的类型安全
- **Ant Design 5.x** - 使用最新的 Antd API
- **Tailwind CSS** - 响应式样式
- **React Hooks** - 自定义 Hook 管理状态

## 📋 最佳实践

### 1. 类型安全

```tsx
// 使用严格的类型定义
interface UserFormData {
  name: string
  email: string
  // ... 其他字段
}
```

### 2. 错误处理

```tsx
// 使用 try-catch 包装异步操作
const handleFinish = async (values: UserFormData) => {
  try {
    setLoading(true)
    await submitData(values)
    message.success('提交成功！')
  } catch (error) {
    message.error('提交失败，请重试')
  } finally {
    setLoading(false)
  }
}
```

### 3. 性能优化

```tsx
// 使用 useCallback 优化函数引用
const handleTabChange = useCallback((key: string) => {
  setActiveTab(key)
}, [])
```

## 🎨 样式定制

组件使用 Tailwind CSS 类名，可以通过以下方式定制样式：

```tsx
// 修改容器样式
<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
  {/* 表单内容 */}
</div>

// 修改网格布局
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* 表单字段 */}
</div>
```

## 🔄 扩展性

### 添加新的字段类型

1. 在 `types.ts` 中扩展 `FormFieldConfig` 的 `type` 类型
2. 在 `FormField.tsx` 中添加对应的渲染逻辑
3. 在 `constants.ts` 中使用新的字段类型

### 添加新的验证规则

```tsx
// 在 constants.ts 中添加新的验证规则
export const FORM_VALIDATION_RULES = {
  // ... 现有规则
  customField: [
    { required: true, message: '此字段为必填项！' },
    { pattern: /^[A-Za-z]+$/, message: '只能输入字母！' },
  ],
}
```

## 🐛 故障排除

### 常见问题

1. **表单验证失败不跳转**

   - 检查字段名是否在 `TabConfig` 中正确配置
   - 确保 `useFormTabs` Hook 正确使用

2. **样式显示异常**

   - 确保 Tailwind CSS 正确配置
   - 检查 Antd 主题是否正确加载

3. **TypeScript 类型错误**
   - 确保所有类型定义正确导入
   - 检查接口定义是否完整
