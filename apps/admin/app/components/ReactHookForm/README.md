# ReactHookForm 组件

这是一个使用 `react-hook-form` 和 `yup` 实现的表单组件，功能与 `AntdForm` 组件相同。

## 特性

- 使用 `react-hook-form` 进行表单状态管理
- 使用 `yup` 进行表单验证
- 支持分标签页的表单布局
- 支持多种表单字段类型（输入框、邮箱、手机号、选择器、日期选择器、文本域、薪资、技能多选）
- 响应式布局设计
- 表单验证错误处理和自动跳转到错误字段
- 支持表单重置功能
- 高性能的表单渲染和更新

## 依赖

```json
{
  "react-hook-form": "^7.59.0",
  "@hookform/resolvers": "^5.1.1",
  "yup": "^1.6.0"
}
```

## 关于 Yup

Yup 是一个 JavaScript 对象模式验证器，专门用于表单验证。它具有以下特点：

### 优势

- **简洁的API**: 链式调用，语法直观易读
- **丰富的验证规则**: 内置多种验证方法（字符串、数字、日期、数组等）
- **自定义验证**: 支持自定义验证函数
- **类型安全**: 与 TypeScript 良好集成
- **错误消息**: 支持国际化错误消息
- **条件验证**: 支持基于其他字段值的条件验证

### 与 Zod 的对比

| 特性       | Yup          | Zod          |
| ---------- | ------------ | ------------ |
| 包大小     | 较小 (~13KB) | 较大 (~30KB) |
| 学习曲线   | 平缓         | 较陡         |
| 类型推断   | 需要额外配置 | 原生支持     |
| 运行时验证 | 优秀         | 优秀         |
| 社区支持   | 成熟稳定     | 新兴活跃     |
| 语法风格   | 链式调用     | 函数式       |
| 错误消息   | 内置支持     | 需要配置     |

### 基本用法示例

```tsx
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().min(2, '姓名至少2个字符').required('姓名是必填项'),
  email: yup.string().email('请输入有效的邮箱').required('邮箱是必填项'),
  phone: yup
    .string()
    .matches(/^1\d{10}$/, '请输入有效的手机号')
    .required('手机号是必填项'),
  age: yup.number().min(18, '年龄必须大于18岁').max(100, '年龄不能超过100岁'),
})
```

## 使用方法

```tsx
import ReactHookForm from './components/ReactHookForm'

function App() {
  return (
    <div>
      <ReactHookForm />
    </div>
  )
}
```

## 组件结构

```
ReactHookForm/
├── index.tsx              # 主组件
├── types.ts               # 类型定义
├── constants.ts           # 常量配置
├── hooks/
│   └── useFormTabs.ts     # 标签页管理hook
├── components/
│   ├── TabForm.tsx        # 标签页表单组件
│   ├── FormField.tsx      # 表单字段组件
│   └── FormActions.tsx    # 表单操作按钮组件
└── README.md              # 说明文档
```

## 表单字段类型

- `input`: 普通输入框
- `email`: 邮箱输入框
- `phone`: 手机号输入框
- `select`: 下拉选择器
- `date`: 日期选择器
- `textarea`: 文本域
- `salary`: 薪资输入框（带前缀）
- `skills`: 技能多选器

## 表单验证规则

- 姓名：至少2个字符
- 邮箱：有效的邮箱格式
- 手机号：11位数字，以1开头
- 角色：必选
- 入职日期：必选
- 部门：必选
- 描述：最多200个字符（可选）
- 薪资：有效的数字格式
- 技能：至少选择一项
- 工作经验：必填

## 与 AntdForm 的区别

1. **表单状态管理**: 使用 `react-hook-form` 替代 Ant Design 的 Form
2. **验证方式**: 使用 `yup` schema 替代 Ant Design 的 rules
3. **错误处理**: 使用 `react-hook-form` 的错误状态
4. **性能**: `react-hook-form` 提供更好的性能优化，减少不必要的重渲染
5. **包大小**: 更小的包体积，yup 比 zod 更轻量

## 自定义配置

可以通过修改 `constants.ts` 文件来自定义表单配置：

```tsx
export const FORM_CONFIG: TabFormConfig[] = [
  {
    key: '1',
    title: '基本信息',
    fields: [
      // 自定义字段配置
    ],
  },
]
```

## 性能优势

- **按需渲染**: 只有变化的字段会重新渲染
- **内存优化**: 更好的内存使用效率
- **快速验证**: yup 提供高效的验证机制
- **类型安全**: 完整的 TypeScript 支持
- **轻量级**: yup 比 zod 更小，加载更快

## 注意事项

1. 确保在使用前已安装 `react-hook-form`、`@hookform/resolvers` 和 `yup` 依赖
2. 组件使用了 Ant Design 的 UI 组件，确保 `ui` 包中包含所需的组件
3. 表单验证使用 `yup`，确保验证规则正确配置
4. 组件支持响应式布局，在不同屏幕尺寸下会自动调整
5. 建议在生产环境中使用 `react-hook-form` 的 `mode` 选项来优化验证时机
6. yup 的验证规则支持链式调用，可以组合多个验证条件
