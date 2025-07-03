export interface VirtualScrollItem {
  id: string | number
}

export interface VirtualScrollProps<T extends VirtualScrollItem> {
  items: T[]
  height: number
  itemHeight: number
  renderItem: (item: T, index: number) => React.ReactNode
  overscan?: number
  className?: string
  style?: React.CSSProperties
}
