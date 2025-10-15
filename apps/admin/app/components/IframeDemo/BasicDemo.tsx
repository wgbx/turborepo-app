'use client'

import { useState } from 'react'
import { Card, Space, Typography, Input, Button } from 'ui'

export default function BasicDemo() {
  const [url, setUrl] = useState('https://react.dev/')
  const [currentUrl, setCurrentUrl] = useState('https://react.dev/')

  const handleLoadUrl = () => {
    setCurrentUrl(url)
  }

  const presetUrls = [
    { label: 'pear 官网', url: 'https://release.pear.us/' },
    { label: 'pear admin 官网', url: 'https://release.admin.pear.us/' },
    { label: 'react 官网', url: 'https://react.dev/' },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="基础 Iframe 嵌入">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Text strong>输入网址：</Typography.Text>
            <Space.Compact style={{ width: '100%', marginTop: 8 }}>
              <Input placeholder="请输入网址" value={url} onChange={(e) => setUrl(e.target.value)} onPressEnter={handleLoadUrl} />
              <Button type="primary" onClick={handleLoadUrl}>
                加载
              </Button>
            </Space.Compact>
          </div>

          <div>
            <Typography.Text strong>快捷链接：</Typography.Text>
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
