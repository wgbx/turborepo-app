'use client'

import React, { useState } from 'react'
import { Card, Space, Typography, Row, Col } from 'ui'
import { ColorPicker } from 'color-picker'
import { useMemoizedFn } from 'ahooks'

export default function ColorPickerDemo() {
  const [primaryColor, setPrimaryColor] = useState('#1890ff')
  const [secondaryColor, setSecondaryColor] = useState('#52c41a')
  const [accentColor, setAccentColor] = useState('#fadb14')
  const [customColor, setCustomColor] = useState('#722ed1')
  const [smallColor, setSmallColor] = useState('#f5222d')
  const [mediumColor, setMediumColor] = useState('#fa8c16')
  const [largeColor, setLargeColor] = useState('#fadb14')
  const [noPresetsColor, setNoPresetsColor] = useState('#eb2f96')
  const [hoverColor, setHoverColor] = useState('#13c2c2')
  const [bottomLeftColor, setBottomLeftColor] = useState('#faad14')
  const [bottomRightColor, setBottomRightColor] = useState('#a0d911')
  const [rightColor, setRightColor] = useState('#fa541c')

  const handlePrimaryChange = useMemoizedFn((c: string) => {
    setPrimaryColor((prev) => (c !== prev ? c : prev))
  })
  const handleSecondaryChange = useMemoizedFn((c: string) => {
    setSecondaryColor((prev) => (c !== prev ? c : prev))
  })
  const handleAccentChange = useMemoizedFn((c: string) => {
    setAccentColor((prev) => (c !== prev ? c : prev))
  })
  const handleCustomChange = useMemoizedFn((c: string) => {
    setCustomColor((prev) => (c !== prev ? c : prev))
  })
  const handleSmallChange = useMemoizedFn((c: string) => {
    setSmallColor((prev) => (c !== prev ? c : prev))
  })
  const handleMediumChange = useMemoizedFn((c: string) => {
    setMediumColor((prev) => (c !== prev ? c : prev))
  })
  const handleLargeChange = useMemoizedFn((c: string) => {
    setLargeColor((prev) => (c !== prev ? c : prev))
  })
  const handleNoPresetsChange = useMemoizedFn((c: string) => {
    setNoPresetsColor((prev) => (c !== prev ? c : prev))
  })
  const handleHoverChange = useMemoizedFn((c: string) => {
    setHoverColor((prev) => (c !== prev ? c : prev))
  })
  const handleBottomLeftChange = useMemoizedFn((c: string) => {
    setBottomLeftColor((prev) => (c !== prev ? c : prev))
  })
  const handleBottomRightChange = useMemoizedFn((c: string) => {
    setBottomRightColor((prev) => (c !== prev ? c : prev))
  })
  const handleRightChange = useMemoizedFn((c: string) => {
    setRightColor((prev) => (c !== prev ? c : prev))
  })

  return (
    <div className="color-picker-demo">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Typography.Title level={3}>弹窗拾色器演示</Typography.Title>

        <Card title="基础拾色器" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" size="middle">
            <div>
              <Typography.Text strong>主色调：</Typography.Text>
              <ColorPicker value={primaryColor} onChange={handlePrimaryChange} />
            </div>
            <div>
              <Typography.Text strong>辅助色：</Typography.Text>
              <ColorPicker value={secondaryColor} onChange={handleSecondaryChange} />
            </div>
            <div>
              <Typography.Text strong>强调色：</Typography.Text>
              <ColorPicker value={accentColor} onChange={handleAccentChange} />
            </div>
          </Space>
        </Card>

        <Card title="不同尺寸" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" size="middle">
            <div>
              <Typography.Text strong>小尺寸：</Typography.Text>
              <ColorPicker value={smallColor} onChange={handleSmallChange} size="small" />
            </div>
            <div>
              <Typography.Text strong>中等尺寸：</Typography.Text>
              <ColorPicker value={mediumColor} onChange={handleMediumChange} size="middle" />
            </div>
            <div>
              <Typography.Text strong>大尺寸：</Typography.Text>
              <ColorPicker value={largeColor} onChange={handleLargeChange} size="large" />
            </div>
          </Space>
        </Card>

        <Card title="自定义配置" style={{ marginBottom: '16px' }}>
          <Space direction="vertical" size="middle">
            <div>
              <Typography.Text strong>仅颜色选择器（无输入框）：</Typography.Text>
              <ColorPicker value={customColor} onChange={handleCustomChange} showInput={false} />
            </div>
            <div>
              <Typography.Text strong>仅输入框（无预设颜色）：</Typography.Text>
              <ColorPicker value={noPresetsColor} onChange={handleNoPresetsChange} showPresets={false} />
            </div>
            <div>
              <Typography.Text strong>悬停触发：</Typography.Text>
              <ColorPicker value={hoverColor} onChange={handleHoverChange} trigger="hover" />
            </div>
            <div>
              <Typography.Text strong>禁用状态：</Typography.Text>
              <ColorPicker value="#2f54eb" disabled={true} />
            </div>
            <div>
              <Typography.Text strong>吸管工具（预览右侧）：</Typography.Text>
              <ColorPicker value={customColor} onChange={handleCustomChange} showEyeDropper={true} />
            </div>
            <div>
              <Typography.Text strong>隐藏吸管工具：</Typography.Text>
              <ColorPicker value={noPresetsColor} onChange={handleNoPresetsChange} showEyeDropper={false} />
            </div>
          </Space>
        </Card>

        <Card title="不同位置" style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Typography.Text strong>底部左侧：</Typography.Text>
              <ColorPicker value={bottomLeftColor} onChange={handleBottomLeftChange} placement="bottomLeft" />
            </Col>
            <Col span={8}>
              <Typography.Text strong>底部右侧：</Typography.Text>
              <ColorPicker value={bottomRightColor} onChange={handleBottomRightChange} placement="bottomRight" />
            </Col>
            <Col span={8}>
              <Typography.Text strong>右侧：</Typography.Text>
              <ColorPicker value={rightColor} onChange={handleRightChange} placement="right" />
            </Col>
          </Row>
        </Card>

        <Card title="颜色预览">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Typography.Text strong>当前选择的颜色：</Typography.Text>
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: primaryColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(primaryColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>主色调</div>
                <div>{primaryColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: secondaryColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(secondaryColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>辅助色</div>
                <div>{secondaryColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: accentColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(accentColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>强调色</div>
                <div>{accentColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: customColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(customColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>自定义色</div>
                <div>{customColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: smallColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(smallColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>小尺寸</div>
                <div>{smallColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: mediumColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(mediumColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>中等尺寸</div>
                <div>{mediumColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: largeColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(largeColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>大尺寸</div>
                <div>{largeColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: noPresetsColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(noPresetsColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>无预设</div>
                <div>{noPresetsColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: hoverColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(hoverColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>悬停触发</div>
                <div>{hoverColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: bottomLeftColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(bottomLeftColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>底部左侧</div>
                <div>{bottomLeftColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: bottomRightColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(bottomRightColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>底部右侧</div>
                <div>{bottomRightColor}</div>
              </div>
              <div
                style={{
                  width: '120px',
                  height: '80px',
                  backgroundColor: rightColor,
                  border: '1px solid #d9d9d9',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getContrastColor(rightColor),
                  fontSize: '12px',
                  fontWeight: '500',
                  flexDirection: 'column',
                }}
              >
                <div>右侧</div>
                <div>{rightColor}</div>
              </div>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#ffffff'
}
