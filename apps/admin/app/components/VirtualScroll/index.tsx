'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { VirtualScrollProps, VirtualScrollItem } from './types'

export default function VirtualScroll<T extends VirtualScrollItem>({
  items,
  height,
  itemHeight,
  renderItem,
  overscan = 5,
  className = '',
  style = {},
}: VirtualScrollProps<T>) {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const totalHeight = items.length * itemHeight
  const visibleCount = Math.ceil(height / itemHeight)
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(items.length - 1, Math.floor(scrollTop / itemHeight) + visibleCount + overscan)

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1)
  }, [items, startIndex, endIndex])

  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      setScrollTop(container.scrollTop)
    }
  }, [])

  return (
    <div ref={containerRef} className={`overflow-auto ${className}`} style={{ height, ...style }} onScroll={handleScroll}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: offsetY,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item.id}
              style={{
                height: itemHeight,
              }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
