# Turborepo 现代化前端项目

一个基于 Turborepo 构建的现代化前端项目，采用 Monorepo 架构管理多个应用，集成了最新的前端技术栈。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
# 启动所有应用
pnpm dev

# 或启动特定应用
pnpm dev --filter=admin
```

### 构建项目

```bash
pnpm build
```

## 📁 项目结构

```
turborepo-app-0507/
├── apps/
│   ├── admin/                    # 管理后台应用
│   ├── web/                      # 前端应用
│   └── docs/                     # 文档应用
├── packages/
│   ├── ui/                       # 共享 UI 组件
│   ├── eslint-config/            # ESLint 配置
│   ├── typescript-config/        # TypeScript 配置
│   ├── utils/                    # 工具函数
│   └── color-picker/             # 现代化拾色器组件
└── README.md                     # 项目文档
```

## 🛠️ 技术栈

- **Monorepo 架构** - 使用 Turborepo 管理多应用项目
- **React 18** - 最新的 React 特性和最佳实践
- **TypeScript** - 完整的类型安全
- **Next.js 14** - 现代化的 React 框架
- **Ant Design 5.x** - 企业级 UI 组件库
- **Tailwind CSS** - 原子化 CSS 框架

## 🎯 特色功能

### AntdForm 表单组件

高质量的表单组件，支持多标签页表单、智能错误处理和自动滚动定位。

**详细文档：** [AntdForm 组件文档](./apps/admin/app/components/AntdForm/README.md)

### ReactHookForm 表单组件

基于 react-hook-form + yup 的高性能表单组件，支持多标签页、类型安全校验。

**详细文档：** [ReactHookForm 组件文档](./apps/admin/app/components/ReactHookForm/README.md)

### VirtualScroll 虚拟滚动组件

高性能的虚拟滚动组件库，支持大数据量列表渲染，包含用户列表和产品列表等业务组件。

**详细文档：** [VirtualScroll 组件文档](./apps/admin/app/components/VirtualScroll/README.md)

### ReactQuery 数据管理组件

基于 @tanstack/react-query 的最佳实践组件库，展示数据查询、缓存管理、乐观更新等核心功能。

**详细文档：** [ReactQuery 组件文档](./apps/admin/app/components/ReactQuery/README.md)

### Currency 货币处理组件

专注于解决货币处理中的精度问题和格式化需求，提供安全数学运算、货币格式化和转换功能。

**详细文档：** [Currency 组件文档](./apps/admin/app/components/Currency/README.md)

### ColorPicker 拾色器组件

现代化拾色器，支持吸管工具、预设色板、输入美化等

**详细文档：** [ColorPicker 组件文档](./packages/color-picker/README.md)

### Jotai 状态管理组件

基于 Jotai 的原子化状态管理组件，展示轻量级状态管理的最佳实践，包括基础状态、异步状态、计算状态、表单状态和完整的 Todo 应用。

**详细文档：** [Jotai 组件文档](./apps/admin/app/components/JotaiDemo/README.md)

## 📚 相关文档

- [Turborepo 官方文档](https://turborepo.com/docs) - Monorepo 管理指南
- [Next.js 文档](https://nextjs.org/docs) - React 框架文档
- [Ant Design 文档](https://ant.design/docs/react/introduce-cn) - UI 组件库文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📝 许可证

MIT License
