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
│   └── utils/                    # 工具函数
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

## 📚 相关文档

- [Turborepo 官方文档](https://turborepo.com/docs) - Monorepo 管理指南
- [Next.js 文档](https://nextjs.org/docs) - React 框架文档
- [Ant Design 文档](https://ant.design/docs/react/introduce-cn) - UI 组件库文档

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## �� 许可证

MIT License
