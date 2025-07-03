# 货币处理最佳实践组件库

专注于解决货币处理中的精度问题和格式化需求。组件采用分层架构设计，提供完整的货币精度处理、格式化和转换解决方案。

## 核心问题

### 1. JavaScript 浮点数精度问题

- 0.1 + 0.2 ≠ 0.3 的经典问题
- 货币计算中的精度丢失
- 财务系统对精度的严格要求

### 2. 货币格式化需求

- 不同货币的符号位置（$100 vs 100¥）
- 千分位分隔符（1,234.56 vs 1.234,56）
- 小数位数处理（美元2位，日元0位）
- 负数显示格式

### 3. 货币转换精度

- 汇率计算的精度控制
- 交叉汇率计算
- 转换结果的准确性保证

## 组件架构

```
Currency (主组件)
├── PrecisionDemo (精度处理演示)
├── FormatDemo (货币格式化演示)
└── ConversionDemo (货币转换演示)
```

## 核心功能

### 精度处理 (PrecisionDemo)

- **安全数学运算**: safeAdd、safeSubtract、safeMultiply、safeDivide
- **精度控制**: 通过 Math.pow(10, precision) 和 Math.round() 确保精度
- **对比演示**: 普通计算 vs 安全计算的差异对比
- **实时计算**: 动态调整参数查看精度差异

### 货币格式化 (FormatDemo)

- **符号位置**: 支持符号在前或后
- **分组分隔符**: 不同货币的分隔符配置
- **精度配置**: 根据货币类型自动调整精度
- **负数格式**: 支持前缀和后缀负数格式
- **实时预览**: 格式化结果的实时展示

### 货币转换 (ConversionDemo)

- **安全转换**: 使用精度安全的转换算法
- **汇率计算**: 基于 USD 基准的交叉汇率
- **货币比较**: 多货币之间的价值比较
- **错误处理**: 完善的错误处理和用户提示

## 工具函数

### 精度处理函数

```tsx
import { safeAdd, safeSubtract, safeMultiply, safeDivide } from './utils/currencyUtils'

// 安全加法
const result = safeAdd(0.1, 0.2, 2) // 0.30

// 安全减法
const result = safeSubtract(1.0, 0.3, 2) // 0.70

// 安全乘法
const result = safeMultiply(0.1, 0.2, 2) // 0.02

// 安全除法
const result = safeDivide(1.0, 3.0, 2) // 0.33
```

### 格式化函数

```tsx
import { formatCurrency } from './utils/currencyUtils'

// 基本格式化
formatCurrency(1234.56, 'USD') // "$1,234.56"

// 自定义选项
formatCurrency(1234.56, 'USD', {
  showSymbol: true,
  showCode: true,
  useGrouping: true,
}) // "$1,234.56 USD"

// 不同货币格式
formatCurrency(1234.56, 'EUR') // "€1.234,56"
formatCurrency(1234, 'JPY') // "¥1,234"
```

### 转换函数

```tsx
import { convertCurrency, compareCurrencies } from './utils/currencyUtils'

// 货币转换
const result = convertCurrency(100, 'USD', 'CNY') // 720.00

// 货币比较
const comparison = compareCurrencies(100, 'USD', 'CNY', 'EUR')
// { amount1: 720, amount2: 85, difference: 635, differencePercent: 88.19 }
```

## 货币配置

```tsx
interface CurrencyConfig {
  code: string
  name: string
  symbol: string
  precision: number
  symbolPosition: 'before' | 'after'
  thousandsSeparator: string
  decimalSeparator: string
  negativeFormat: 'prefix' | 'suffix'
  exchangeRate: number
}
```

### 支持的货币

- **USD**: 美元 ($, 2位小数, 逗号分隔)
- **EUR**: 欧元 (€, 2位小数, 点分隔)
- **CNY**: 人民币 (¥, 2位小数, 逗号分隔)
- **JPY**: 日元 (¥, 0位小数, 逗号分隔)
- **GBP**: 英镑 (£, 2位小数, 逗号分隔)

## 设计原则

1. **精度优先**: 所有计算都使用安全数学运算
2. **配置驱动**: 通过配置支持不同货币的格式化需求
3. **错误处理**: 完善的错误处理和用户友好的提示
4. **性能优化**: 高效的算法和缓存机制
5. **类型安全**: 完整的 TypeScript 类型支持
6. **可扩展性**: 易于添加新的货币和格式化规则

## 应用场景

- **电商系统**: 多货币价格显示和计算
- **财务系统**: 精确的货币计算和报表
- **银行应用**: 汇率转换和货币管理
- **国际支付**: 多货币支付处理
- **报表系统**: 多货币数据展示

## 最佳实践

1. **始终使用安全数学运算**: 避免直接使用 JavaScript 的 +、-、\*、/ 运算符
2. **根据业务需求设置精度**: 不同场景可能需要不同的精度
3. **统一货币格式化**: 使用统一的格式化函数确保一致性
4. **处理边界情况**: 考虑负数、零值、无效输入等边界情况
5. **性能考虑**: 对于大量计算，考虑使用缓存和批量处理

## 演示

在管理后台的"货币管理"标签页中可以查看所有功能的演示效果，包括：

- 精度处理对比演示
- 货币格式化实时预览
- 货币转换和比较功能

每个演示都提供了详细的说明和实际应用场景。
