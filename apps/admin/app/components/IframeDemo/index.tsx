'use client'

import { useState, useEffect, useCallback } from 'react'
import { Tabs } from 'ui'
import CommunicationDemo from './CommunicationDemo'
import ClickDemo from './ClickDemo'

export default function IframeDemo() {
  const [activeTab, setActiveTab] = useState('click')
  const [shouldCloseIframe, setShouldCloseIframe] = useState(false)

  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.data.type === 'CLOSE_IFRAME') {
      setShouldCloseIframe(true)
      setTimeout(() => setShouldCloseIframe(false), 100)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [handleMessage])

  const tabItems = [
    {
      key: 'click',
      label: 'Click Usage',
      children: <ClickDemo closeSignal={shouldCloseIframe} />,
    },
    // {
    //   key: 'fullscreen',
    //   label: 'Fullscreen Usage',
    //   children: <FullscreenDemo />,
    // },
    {
      key: 'communication',
      label: 'Iframe Communication',
      children: <CommunicationDemo />,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Iframe Embedding Demo</h2>
        <p className="text-gray-600">Demonstrate various use cases and best practices for iframe.</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        defaultActiveKey="basic"
        type="card"
        size="large"
        items={tabItems}
        style={{ minHeight: '500px' }}
      />
    </div>
  )
}
