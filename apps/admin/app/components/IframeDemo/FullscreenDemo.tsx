'use client'

import { useState } from 'react'
import { Card, Space, Typography, Input, Button } from 'ui'

export default function FullscreenDemo() {
  const [url, setUrl] = useState('https://release.pear.us/')
  const [currentUrl, setCurrentUrl] = useState('https://release.pear.us/')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleLoadUrl = () => {
    setCurrentUrl(url)
  }

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const presetUrls = [
    { label: 'Pear Official', url: 'https://release.pear.us/' },
    { label: 'Pear Admin', url: 'https://release.admin.pear.us/' },
  ]

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
          onClick={handleFullscreen}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10000,
          }}
        >
          Exit Fullscreen
        </Button>
        <iframe
          src={currentUrl}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          title="Fullscreen Iframe Demo"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
          allow="camera; microphone; geolocation"
        />
      </div>
    )
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="Fullscreen Iframe Demo">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text strong>Enter URL:</Typography.Text>
            <Space.Compact style={{ width: '100%', marginTop: 8 }}>
              <Input placeholder="Please enter URL" value={url} onChange={(e) => setUrl(e.target.value)} onPressEnter={handleLoadUrl} />
              <Button type="primary" onClick={handleLoadUrl}>
                Load
              </Button>
            </Space.Compact>
          </div>

          <div>
            <Typography.Text strong>Quick Links:</Typography.Text>
            <Space wrap style={{ marginTop: 8 }}>
              {presetUrls.map((preset) => (
                <Button
                  key={preset.url}
                  onClick={() => {
                    setUrl(preset.url)
                    setCurrentUrl(preset.url)
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </Space>
          </div>

          <div>
            <Button type="primary" size="large" onClick={handleFullscreen}>
              Enter Fullscreen
            </Button>
            <Typography.Text type="secondary" style={{ marginLeft: 12 }}>
              Iframe will occupy the entire viewport with no borders or padding
            </Typography.Text>
          </div>

          <div style={{ marginTop: 16 }}>
            <iframe
              src={currentUrl}
              style={{
                width: '100%',
                height: '600px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              }}
              title="Fullscreen Iframe Demo"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              allow="camera; microphone; geolocation"
            />
          </div>
        </Space>
      </Card>
    </Space>
  )
}
