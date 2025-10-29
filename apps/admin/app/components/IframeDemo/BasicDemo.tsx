'use client'

import { useState } from 'react'
import { Card, Space, Typography, Input, Button } from 'ui'

export default function BasicDemo() {
  const [url, setUrl] = useState('https://embed.staging.pear.us/wgbx/post/aaq4ky')
  const [currentUrl, setCurrentUrl] = useState('https://embed.staging.pear.us/wgbx/post/aaq4ky')

  const handleLoadUrl = () => {
    setCurrentUrl(url)
  }

  const presetUrls = [
    { label: 'Pear Official', url: 'https://release.pear.us/' },
    { label: 'Pear Admin', url: 'https://release.admin.pear.us/' },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="Basic Iframe Embedding">
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

          <div style={{ marginTop: 16 }}>
            <iframe
              src={currentUrl}
              style={{
                width: '100%',
                height: '600px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              }}
              title="Basic Iframe Demo"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              allow="camera; microphone; geolocation"
            />
          </div>
        </Space>
      </Card>
    </Space>
  )
}
