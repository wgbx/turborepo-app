'use client'

import { useState } from 'react'
import { Card, Space, Typography, Button, Modal, Spin, Input } from 'ui'

export default function ClickDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [url, setUrl] = useState('https://embed.staging.pear.us/demi-release/post/48g8aa')
  const [iframeUrl, setIframeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenModal = () => {
    setIframeUrl(url)
    setIsLoading(true)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setIframeUrl('')
    setIsLoading(false)
  }

  const handleOpenFullscreen = () => {
    setIframeUrl(url)
    setIsLoading(true)
    setIsFullscreen(true)
  }

  const handleCloseFullscreen = () => {
    setIsFullscreen(false)
    setIframeUrl('')
    setIsLoading(false)
  }

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  if (isFullscreen) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          backgroundColor: '#fff',
        }}
      >
        <Button
          type="primary"
          onClick={handleCloseFullscreen}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10000,
          }}
        >
          退出全屏
        </Button>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
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
                height: '100%',
                border: 'none',
                display: isLoading ? 'none' : 'block',
              }}
              title="Fullscreen Iframe"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              allow="camera; microphone; geolocation"
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="点击加载 Iframe">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text strong>输入网址：</Typography.Text>
            <Input placeholder="请输入网址" value={url} onChange={(e) => setUrl(e.target.value)} size="large" style={{ marginTop: 8 }} />
          </div>

          <div>
            <Typography.Text strong>选择打开方式：</Typography.Text>
            <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
              点击按钮后以不同方式加载 iframe
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle">
            <Button type="primary" size="large" onClick={handleOpenModal}>
              以弹窗方式打开
            </Button>
            <Button type="primary" size="large" onClick={handleOpenFullscreen}>
              以全屏方式打开
            </Button>
          </Space>
        </Space>
      </Card>

      <Modal styles={{ content: { padding: 0 } }} title="" open={isModalOpen} onCancel={handleCloseModal} width="70%" footer={null}>
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
              title="Modal Iframe"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              allow="camera; microphone; geolocation"
            />
          )}
        </div>
      </Modal>
    </Space>
  )
}
