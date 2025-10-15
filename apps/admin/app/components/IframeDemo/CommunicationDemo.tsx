'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, Space, Typography, Input, Button, Alert, Tag } from 'ui'

export default function CommunicationDemo() {
  const [message, setMessage] = useState('')
  const [receivedMessages, setReceivedMessages] = useState<string[]>([])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'string') {
        setReceivedMessages((prev) => [...prev, `收到来自 iframe 的消息: ${event.data}`])
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const sendMessageToIframe = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*')
      setReceivedMessages((prev) => [...prev, `发送消息到 iframe: ${message}`])
      setMessage('')
    }
  }

  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            margin: 0;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 24px;
            backdrop-filter: blur(10px);
          }
          h2 {
            margin-top: 0;
          }
          .message-box {
            background: rgba(255, 255, 255, 0.2);
            padding: 12px;
            border-radius: 6px;
            margin: 10px 0;
            word-break: break-all;
          }
          button {
            background: white;
            color: #667eea;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            margin-top: 10px;
          }
          button:hover {
            background: #f0f0f0;
          }
          input {
            width: 100%;
            padding: 10px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 6px;
            background: rgba(255, 255, 255, 0.1);
            color: white;
            font-size: 14px;
            box-sizing: border-box;
          }
          input::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>🎯 Iframe 内容页面</h2>
          <p>这是一个嵌入的页面，可以与父页面进行通信。</p>

          <div>
            <input type="text" id="messageInput" placeholder="输入消息发送给父页面" />
            <button onclick="sendMessage()">发送消息到父页面</button>
          </div>

          <div style="margin-top: 20px;">
            <strong>接收到的消息：</strong>
            <div id="messages"></div>
          </div>
        </div>

        <script>
          function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value;
            if (message) {
              window.parent.postMessage(message, '*');
              addMessageToList('发送: ' + message);
              input.value = '';
            }
          }

          window.addEventListener('message', function(event) {
            addMessageToList('接收: ' + event.data);
          });

          function addMessageToList(message) {
            const messagesDiv = document.getElementById('messages');
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-box';
            messageDiv.textContent = message + ' (' + new Date().toLocaleTimeString() + ')';
            messagesDiv.insertBefore(messageDiv, messagesDiv.firstChild);
          }

          document.getElementById('messageInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
              sendMessage();
            }
          });
        </script>
      </body>
    </html>
  `

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="Iframe 与父页面通信">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="postMessage API"
            description="使用 window.postMessage() 实现跨域的 iframe 通信，这是一种安全的通信方式。"
            type="info"
            showIcon
          />

          <div>
            <Typography.Text strong>发送消息到 Iframe：</Typography.Text>
            <Space.Compact style={{ width: '100%', marginTop: 8 }}>
              <Input
                placeholder="输入消息"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={sendMessageToIframe}
              />
              <Button type="primary" onClick={sendMessageToIframe}>
                发送
              </Button>
            </Space.Compact>
          </div>

          <div>
            <iframe
              ref={iframeRef}
              srcDoc={iframeHtml}
              style={{
                width: '100%',
                height: '400px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
              }}
              title="Communication Iframe Demo"
            />
          </div>

          <div>
            <Typography.Text strong>通信日志：</Typography.Text>
            <div
              style={{
                marginTop: 8,
                padding: 16,
                background: '#f5f5f5',
                borderRadius: 6,
                maxHeight: 200,
                overflowY: 'auto',
              }}
            >
              {receivedMessages.length === 0 ? (
                <Typography.Text type="secondary">暂无消息</Typography.Text>
              ) : (
                receivedMessages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <Tag color={msg.includes('发送') ? 'blue' : 'green'}>{msg}</Tag>
                  </div>
                ))
              )}
            </div>
          </div>
        </Space>
      </Card>

      <Card title="安全性说明">
        <Space direction="vertical" size="small">
          <Typography.Paragraph>
            <Typography.Text strong>重要提示：</Typography.Text>
          </Typography.Paragraph>
          <ul style={{ paddingLeft: 20 }}>
            <li>始终验证消息来源（event.origin）</li>
            <li>不要信任来自 iframe 的所有数据</li>
            <li>使用 sandbox 属性限制 iframe 的能力</li>
            <li>避免在 postMessage 中传递敏感信息</li>
            <li>考虑使用内容安全策略（CSP）</li>
          </ul>
        </Space>
      </Card>
    </Space>
  )
}
