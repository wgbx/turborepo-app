'use client'

import { useState } from 'react'
import { Card, Space, Typography, Button, Modal, Spin } from 'ui'

export default function ClickDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [iframeUrl, setIframeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = (url: string) => {
    setIframeUrl(url)
    setIsLoading(true)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIframeUrl('')
    setIsLoading(false)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const presetUrls = [
    { label: 'pear events', url: 'http://localhost:3000/events/embed/123' },
    { label: 'pear admin 官网', url: 'https://release.admin.pear.us/' },
    { label: 'React 官网', url: 'https://react.dev/' },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="点击加载 Iframe 弹窗">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text strong>选择要打开的网站：</Typography.Text>
            <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
              点击按钮后会在弹窗中加载对应的 iframe
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle">
            {presetUrls.map((preset) => (
              <Button key={preset.url} type="primary" size="large" onClick={() => handleOpenModal(preset.url)}>
                打开 {preset.label}
              </Button>
            ))}
          </Space>
        </Space>
      </Card>

      <Modal
        title=""
        open={isModalOpen}
        onCancel={handleCloseModal}
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <div style={{ position: 'relative', minHeight: '70vh' }}>
          {isLoading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                zIndex: 10,
              }}
            >
              <Spin size="large" tip="加载中..." />
            </div>
          )}
          {iframeUrl && (
            <iframe
              src={iframeUrl}
              onLoad={handleIframeLoad}
              style={{
                width: '100%',
                height: '70vh',
                border: 'none',
                display: isLoading ? 'none' : 'block',
              }}
              title="Click Demo Iframe"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              allow="camera; microphone; geolocation"
            />
          )}
        </div>
      </Modal>
    </Space>
  )
}
