# @color-picker

一个现代化、易用的拾色器组件，支持 HEX 颜色选择、预设色板、吸管（EyeDropper）取色、输入框美化等功能，适用于 React/Next.js 项目。

## ✨ 特性

- 支持 HEX 颜色选择，输入框美观，带 Hex/# 前缀
- 支持吸管（EyeDropper）工具，浏览器支持时可直接取色
- 支持预设颜色块，快速选择常用色
- 支持受控/非受控两种用法
- 支持禁用、不同尺寸、弹窗位置等多种配置
- 适配 Ant Design 风格，UI 现代美观

## 📦 安装

在 monorepo 根目录下：

```bash
pnpm add color-picker
```

或在单独项目下：

```bash
npm install color-picker
```

## 🛠️ 用法

```tsx
import { ColorPicker } from 'color-picker'

export default function Demo() {
  const [color, setColor] = useState('#1890ff')
  return <ColorPicker value={color} onChange={setColor} />
}
```

### 典型场景

- 受控用法：
  ```tsx
  <ColorPicker value={color} onChange={setColor} />
  ```
- 非受控用法：
  ```tsx
  <ColorPicker defaultValue="#1890ff" onChange={...} />
  ```
- 吸管工具（自动判断浏览器支持）：
  ```tsx
  <ColorPicker showEyeDropper />
  ```
- 只用输入框/只用色板：
  ```tsx
  <ColorPicker showInput={false} />
  <ColorPicker showPresets={false} />
  ```

## ⚙️ API

| 属性           | 说明             | 类型                             | 默认值       |
| -------------- | ---------------- | -------------------------------- | ------------ |
| value          | 当前颜色（受控） | `string`                         | -            |
| onChange       | 颜色变化回调     | `(color: string) => void`        | -            |
| showInput      | 是否显示输入框   | `boolean`                        | `true`       |
| showPresets    | 是否显示预设色板 | `boolean`                        | `true`       |
| showEyeDropper | 是否显示吸管工具 | `boolean`                        | `true`       |
| placement      | 弹窗位置         | 见下表                           | `bottomLeft` |
| trigger        | 触发方式         | `'click' \| 'hover'`             | `click`      |
| disabled       | 是否禁用         | `boolean`                        | `false`      |
| size           | 尺寸             | `'small' \| 'middle' \| 'large'` | `middle`     |
| className      | 自定义类名       | `string`                         | -            |
| style          | 自定义样式       | `React.CSSProperties`            | -            |

### placement 可选值

- top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, leftTop, leftBottom, right, rightTop, rightBottom

## 🧪 预览效果

- 输入框左侧为"Hex"标签，中间为"#"，右侧为输入框，风格美观
- 支持吸管按钮，点击可用浏览器原生 EyeDropper 取色
- 支持预设色块、禁用、不同尺寸等

## 🖱️ 吸管工具说明

- 仅在浏览器支持 `window.EyeDropper` 时显示
- 点击吸管按钮后可在页面任意位置取色，自动填充到输入框
- 可通过 `showEyeDropper={false}` 隐藏

## 📝 许可证

MIT
