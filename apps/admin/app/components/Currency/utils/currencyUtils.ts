import { CurrencyConfig, CurrencyFormatOptions, CurrencyValidationResult } from '../types'

const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    name: '美元',
    symbol: '$',
    precision: 2,
    symbolPosition: 'before',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    negativeFormat: 'prefix',
    exchangeRate: 1.0,
  },
  EUR: {
    code: 'EUR',
    name: '欧元',
    symbol: '€',
    precision: 2,
    symbolPosition: 'before',
    thousandsSeparator: '.',
    decimalSeparator: ',',
    negativeFormat: 'suffix',
    exchangeRate: 0.85,
  },
  CNY: {
    code: 'CNY',
    name: '人民币',
    symbol: '¥',
    precision: 2,
    symbolPosition: 'before',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    negativeFormat: 'prefix',
    exchangeRate: 7.2,
  },
  JPY: {
    code: 'JPY',
    name: '日元',
    symbol: '¥',
    precision: 0,
    symbolPosition: 'before',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    negativeFormat: 'prefix',
    exchangeRate: 150.0,
  },
  GBP: {
    code: 'GBP',
    name: '英镑',
    symbol: '£',
    precision: 2,
    symbolPosition: 'before',
    thousandsSeparator: ',',
    decimalSeparator: '.',
    negativeFormat: 'prefix',
    exchangeRate: 0.75,
  },
}

export function getCurrencyConfig(code: string): CurrencyConfig | null {
  return CURRENCY_CONFIGS[code.toUpperCase()] || null
}

export function getAllCurrencies(): CurrencyConfig[] {
  return Object.values(CURRENCY_CONFIGS)
}

export function validateCurrencyCode(code: string): CurrencyValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  if (!code) {
    errors.push('货币代码不能为空')
    return { isValid: false, errors, warnings }
  }

  if (code.length !== 3) {
    errors.push('货币代码必须是3位字符')
  }

  if (!/^[A-Z]{3}$/.test(code)) {
    errors.push('货币代码必须是3位大写字母')
  }

  if (!getCurrencyConfig(code)) {
    warnings.push(`货币代码 ${code} 不在支持列表中`)
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

export function safeAdd(a: number, b: number, precision: number = 2): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(a * multiplier + b * multiplier) / multiplier
}

export function safeSubtract(a: number, b: number, precision: number = 2): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(a * multiplier - b * multiplier) / multiplier
}

export function safeMultiply(a: number, b: number, precision: number = 2): number {
  const multiplier = Math.pow(10, precision)
  return Math.round(a * b * multiplier) / multiplier
}

export function safeDivide(a: number, b: number, precision: number = 2): number {
  if (b === 0) {
    return 0
  }
  const multiplier = Math.pow(10, precision)
  return Math.round((a / b) * multiplier) / multiplier
}

export function formatCurrency(amount: number, currencyCode: string, options: CurrencyFormatOptions = {}): string {
  const config = getCurrencyConfig(currencyCode)
  if (!config) {
    return `${amount} ${currencyCode}`
  }

  const { showSymbol = true, showCode = false, useGrouping = true } = options
  const precision = options.precision ?? config.precision

  const isNegative = amount < 0
  const absAmount = Math.abs(amount)
  const formattedAmount = absAmount.toFixed(precision)

  let result = formattedAmount

  if (useGrouping && precision > 0) {
    const parts = formattedAmount.split('.')
    if (parts[0]) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, config.thousandsSeparator)
      result = parts.join(config.decimalSeparator)
    }
  }

  if (isNegative) {
    if (config.negativeFormat === 'prefix') {
      result = `-${result}`
    } else {
      result = `${result}-`
    }
  }

  if (showSymbol) {
    if (config.symbolPosition === 'before') {
      result = `${config.symbol}${result}`
    } else {
      result = `${result}${config.symbol}`
    }
  }

  if (showCode) {
    result = `${result} ${currencyCode}`
  }

  return result
}

export function parseCurrencyAmount(value: string, currencyCode: string): number {
  const config = getCurrencyConfig(currencyCode)
  if (!config) {
    return parseFloat(value) || 0
  }

  let cleanValue = value.replace(new RegExp(`[${config.symbol}]`, 'g'), '')
  cleanValue = cleanValue.replace(new RegExp(`[${config.thousandsSeparator}]`, 'g'), '')
  cleanValue = cleanValue.replace(new RegExp(`[${config.decimalSeparator}]`, 'g'), '.')

  const amount = parseFloat(cleanValue)
  return isNaN(amount) ? 0 : amount
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  const fromConfig = getCurrencyConfig(fromCurrency)
  const toConfig = getCurrencyConfig(toCurrency)

  if (!fromConfig || !toConfig) {
    return 0
  }

  if (fromConfig.exchangeRate === 0) {
    return 0
  }

  const rate = safeDivide(toConfig.exchangeRate, fromConfig.exchangeRate, 6)
  const convertedAmount = safeMultiply(amount, rate, toConfig.precision)

  return convertedAmount
}

export function compareCurrencies(
  amount: number,
  currency1: string,
  currency2: string,
): { amount1: number; amount2: number; difference: number; differencePercent: number } {
  const amount1 = convertCurrency(amount, 'USD', currency1)
  const amount2 = convertCurrency(amount, 'USD', currency2)
  const difference = safeSubtract(amount1, amount2, 2)

  let differencePercent = 0
  if (amount1 !== 0) {
    differencePercent = safeMultiply(safeDivide(difference, amount1, 4), 100, 2)
  }

  return {
    amount1,
    amount2,
    difference,
    differencePercent,
  }
}
