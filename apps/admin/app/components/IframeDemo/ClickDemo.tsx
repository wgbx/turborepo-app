'use client'

import { useState, useEffect } from 'react'
import { Card, Space, Typography, Button, Modal, Spin, Input } from 'ui'

interface ClickDemoProps {
  closeSignal?: boolean
}

export default function ClickDemo({ closeSignal }: ClickDemoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [url, setUrl] = useState('https://embed.staging.pear.us/wgbx/post/aaq4ky')
  const [iframeUrl, setIframeUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (closeSignal) {
      handleCloseModal()
      handleCloseFullscreen()
    }
  }, [closeSignal])

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
          Exit Fullscreen
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
              <Spin size="large" tip="Loading..." />
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
      <Card title="Click to Load Iframe">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text strong>Enter URL:</Typography.Text>
            <Input
              placeholder="Please enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size="large"
              style={{ marginTop: 8 }}
            />
          </div>

          <div>
            <Typography.Text strong>Choose Opening Method:</Typography.Text>
            <Typography.Paragraph type="secondary" style={{ marginTop: 8 }}>
              Click button to load iframe in different ways
            </Typography.Paragraph>
          </div>

          <Space wrap size="middle">
            <Button type="primary" size="large" onClick={handleOpenModal}>
              Open in Modal
            </Button>
            <Button type="primary" size="large" onClick={handleOpenFullscreen}>
              Open in Fullscreen
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
              <Spin size="large" tip="Loading..." />
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
