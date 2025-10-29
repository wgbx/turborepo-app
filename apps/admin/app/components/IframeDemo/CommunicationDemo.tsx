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
        setReceivedMessages((prev) => [...prev, `Received message from iframe: ${event.data}`])
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const sendMessageToIframe = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*')
      setReceivedMessages((prev) => [...prev, `Sent message to iframe: ${message}`])
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
          <h2>🎯 Iframe Content Page</h2>
          <p>This is an embedded page that can communicate with the parent page.</p>

          <div>
            <input type="text" id="messageInput" placeholder="Enter message to send to parent" />
            <button onclick="sendMessage()">Send Message to Parent</button>
          </div>

          <div style="margin-top: 20px;">
            <strong>Received Messages:</strong>
            <div id="messages"></div>
          </div>
        </div>

        <script>
          function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value;
            if (message) {
              window.parent.postMessage(message, '*');
              addMessageToList('Sent: ' + message);
              input.value = '';
            }
          }

          window.addEventListener('message', function(event) {
            addMessageToList('Received: ' + event.data);
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
      <Card title="Iframe Communication with Parent Page">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Alert
            message="postMessage API"
            description="Use window.postMessage() to implement cross-domain iframe communication, which is a secure communication method."
            type="info"
            showIcon
          />

          <div>
            <Typography.Text strong>Send Message to Iframe:</Typography.Text>
            <Space.Compact style={{ width: '100%', marginTop: 8 }}>
              <Input
                placeholder="Enter message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onPressEnter={sendMessageToIframe}
              />
              <Button type="primary" onClick={sendMessageToIframe}>
                Send
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
            <Typography.Text strong>Communication Log:</Typography.Text>
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
                <Typography.Text type="secondary">No messages yet</Typography.Text>
              ) : (
                receivedMessages.map((msg, index) => (
                  <div key={index} style={{ marginBottom: 8 }}>
                    <Tag color={msg.includes('Sent') ? 'blue' : 'green'}>{msg}</Tag>
                  </div>
                ))
              )}
            </div>
          </div>
        </Space>
      </Card>

      <Card title="Security Guidelines">
        <Space direction="vertical" size="small">
          <Typography.Paragraph>
            <Typography.Text strong>Important Notes:</Typography.Text>
          </Typography.Paragraph>
          <ul style={{ paddingLeft: 20 }}>
            <li>Always verify message origin (event.origin)</li>
            <li>Do not trust all data from iframe</li>
            <li>Use sandbox attribute to restrict iframe capabilities</li>
            <li>Avoid passing sensitive information in postMessage</li>
            <li>Consider using Content Security Policy (CSP)</li>
          </ul>
        </Space>
      </Card>
    </Space>
  )
}
