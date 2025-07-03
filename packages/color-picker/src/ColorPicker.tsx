'use client'

import React, { useState, useRef } from 'react'
import { Popover, Button, Input, Space, Card } from 'ui'
import { HexColorPicker, HexColorInput } from 'react-colorful'
import { useMemoizedFn } from 'ahooks'

export interface ColorPickerProps {
  value?: string
  onChange?: (color: string) => void
  showInput?: boolean
  showPresets?: boolean
  showEyeDropper?: boolean
  placement?:
    | 'top'
    | 'topLeft'
    | 'topRight'
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'left'
    | 'leftTop'
    | 'leftBottom'
    | 'right'
    | 'rightTop'
    | 'rightBottom'
  trigger?: 'click' | 'hover'
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  className?: string
  style?: React.CSSProperties
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value,
  onChange,
  showInput = true,
  showPresets = true,
  showEyeDropper = true,
  placement = 'bottomLeft',
  trigger = 'click',
  disabled = false,
  size = 'middle',
  className,
  style,
}) => {
  const isControlled = typeof value === 'string'
  const [innerColor, setInnerColor] = useState(value ?? '#1890ff')
  const color = isControlled ? value! : innerColor
  const [isOpen, setIsOpen] = useState(false)
  const [isEyeDropperActive, setIsEyeDropperActive] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const predefinedColors = [
    '#f5222d',
    '#fa8c16',
    '#fadb14',
    '#52c41a',
    '#1890ff',
    '#722ed1',
    '#eb2f96',
    '#fa541c',
    '#13c2c2',
    '#2f54eb',
    '#faad14',
    '#a0d911',
  ]

  const isEyeDropperSupported = typeof window !== 'undefined' && 'EyeDropper' in window

  const handleColorChange = useMemoizedFn((newColor: string) => {
    if (!isControlled) setInnerColor(newColor)
    onChange?.(newColor)
  })

  const handleEyeDropper = useMemoizedFn(async () => {
    if (!isEyeDropperSupported || disabled) return
    try {
      setIsEyeDropperActive(true)
      const eyeDropper = new (window as any).EyeDropper()
      const result = await eyeDropper.open()
      const selectedColor = result.sRGBHex
      handleColorChange(selectedColor)
    } catch (error) {
    } finally {
      setIsEyeDropperActive(false)
    }
  })

  const getButtonSize = useMemoizedFn(() => {
    switch (size) {
      case 'small':
        return { width: '32px', height: '32px' }
      case 'large':
        return { width: '48px', height: '48px' }
      default:
        return { width: '40px', height: '40px' }
    }
  })

  const getInputSize = useMemoizedFn(() => {
    switch (size) {
      case 'small':
        return { width: '100px' }
      case 'large':
        return { width: '140px' }
      default:
        return { width: '120px' }
    }
  })

  const colorPickerContent = (
    <Card size="small" style={{ width: '280px' }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <HexColorPicker color={color} onChange={handleColorChange} style={{ width: '100%', height: '200px' }} />
        </div>

        {showPresets && (
          <div>
            <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>预设颜色</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4px' }}>
              {predefinedColors.map((preColor) => (
                <div
                  key={preColor}
                  onClick={() => handleColorChange(preColor)}
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: preColor,
                    border: color === preColor ? '2px solid #1890ff' : '1px solid #d9d9d9',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500' }}>预览</div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                height: 40,
                border: '1px solid #e5e6eb',
                borderRadius: 6,
                background: '#fff',
                overflow: 'hidden',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 56,
                  fontSize: 15,
                  color: '#222',
                  background: '#fafbfc',
                  borderRight: '1px solid #e5e6eb',
                  fontWeight: 500,
                }}
              >
                Hex
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 32,
                  fontSize: 16,
                  color: '#bdbdbd',
                  background: '#fff',
                }}
              >
                #
              </span>
              <HexColorInput
                color={color.replace(/^#/, '')}
                onChange={(v) => handleColorChange('#' + v.replace(/[^0-9a-fA-F]/g, '').slice(0, 6))}
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#222',
                  background: '#fff',
                  height: 40,
                  padding: '0 4px',
                  minWidth: 0,
                }}
                maxLength={6}
                aria-label="hex color"
                autoComplete="off"
              />
            </div>
            {showEyeDropper && isEyeDropperSupported && (
              <Button
                type="text"
                size="small"
                disabled={disabled || isEyeDropperActive}
                onClick={handleEyeDropper}
                style={{
                  width: 40,
                  height: 40,
                  minWidth: 40,
                  minHeight: 40,
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #d9d9d9',
                  borderRadius: 6,
                  background: isEyeDropperActive ? '#f0f0f0' : '#fff',
                  marginLeft: 0,
                  cursor: isEyeDropperActive ? 'not-allowed' : 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
                title="吸管工具"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2L22 6L12 16L8 12L18 2Z" />
                  <path d="M2 22L8 16" />
                  <path d="M16 8L22 2" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </Space>
    </Card>
  )

  return (
    <div className={`color-picker ${className || ''}`} ref={pickerRef} style={style}>
      <Space>
        <Popover
          content={colorPickerContent}
          trigger={trigger}
          placement={placement}
          open={isOpen}
          onOpenChange={setIsOpen}
          overlayStyle={{ zIndex: 1000 }}
        >
          <Button
            disabled={disabled}
            style={{
              backgroundColor: color,
              border: '2px solid #d9d9d9',
              borderRadius: '6px',
              ...getButtonSize(),
            }}
          />
        </Popover>

        {showInput && (
          <Input
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            placeholder="#000000"
            disabled={disabled}
            style={getInputSize()}
          />
        )}
      </Space>
    </div>
  )
}

export default ColorPicker
