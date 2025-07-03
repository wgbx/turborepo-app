export interface CurrencyItem {
  id: number
  code: string
  name: string
  symbol: string
  rate: number
  status: 'active' | 'inactive' | 'pending'
  precision: number
  createdAt: string
  updatedAt: string
}

export interface CreateCurrencyData {
  code: string
  name: string
  symbol: string
  rate: number
  status: 'active' | 'inactive' | 'pending'
  precision: number
}

export interface UpdateCurrencyData extends Partial<CreateCurrencyData> {
  id: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface QueryParams {
  page?: number
  pageSize?: number
  search?: string
  status?: string
  code?: string
}

export interface ConversionRequest {
  fromCurrency: string
  toCurrency: string
  amount: number
}

export interface ConversionResult {
  fromCurrency: string
  toCurrency: string
  amount: number
  convertedAmount: number
  rate: number
  timestamp: string
}

export interface ExchangeRate {
  fromCurrency: string
  toCurrency: string
  rate: number
  timestamp: string
}

export interface CurrencyHistoryItem {
  id: number
  currencyCode: string
  rate: number
  change: number
  changePercent: number
  timestamp: string
}

export interface CurrencyConfig {
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

export interface CurrencyCalculation {
  amount: number
  currency: string
  precision: number
}

export interface CurrencyFormatOptions {
  showSymbol?: boolean
  showCode?: boolean
  precision?: number
  useGrouping?: boolean
}

export interface ExchangeRateData {
  fromCurrency: string
  toCurrency: string
  rate: number
  precision: number
  lastUpdated: string
}

export interface CurrencyConversion {
  fromAmount: number
  fromCurrency: string
  toAmount: number
  toCurrency: string
  rate: number
  precision: number
}

export interface CurrencyValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface CurrencyComparison {
  currency1: CurrencyConfig
  currency2: CurrencyConfig
  amount: number
  result1: number
  result2: number
  difference: number
  differencePercent: number
}
