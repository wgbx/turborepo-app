'use client'

import { useState } from 'react'
import { Card, Button, Space, Input, Alert, Divider, Tag, Progress, Statistic } from 'ui'
import { useRequest } from 'ahooks'

interface RetryConfig {
  retryCount: number
  retryDelay: number
  retryInterval: number
}

const mockUnreliableRequest = async (shouldFail: boolean = false): Promise<{ message: string; timestamp: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (shouldFail) {
    throw new Error('模拟网络错误，请求失败')
  }

  return {
    message: '请求成功',
    timestamp: new Date().toLocaleTimeString(),
  }
}

const mockDataSync = async (data: string): Promise<{ success: boolean; message: string; retryCount: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const random = Math.random()
  if (random < 0.7) {
    throw new Error(`数据同步失败 (${Math.round(random * 100)}%)`)
  }

  return {
    success: true,
    message: `数据 "${data}" 同步成功`,
    retryCount: 0,
  }
}

export function RetryDemo() {
  const [retryConfig, setRetryConfig] = useState<RetryConfig>({
    retryCount: 3,
    retryDelay: 1000,
    retryInterval: 2000,
  })

  const [syncData, setSyncData] = useState('')
  const [shouldFail, setShouldFail] = useState(false)

  const {
    data: retryResult,
    loading: retryLoading,
    error: retryError,
    run: runRetry,
    cancel: cancelRetry,
  } = useRequest(mockUnreliableRequest, {
    manual: true,
    retryCount: retryConfig.retryCount,
    onSuccess: (data) => {
      console.log('重试成功:', data)
    },
    onError: (error) => {
      console.log('重试失败:', error)
    },
  })

  const {
    data: syncResult,
    loading: syncLoading,
    error: syncError,
    run: runSync,
  } = useRequest(mockDataSync, {
    manual: true,
    retryCount: 5,
    onSuccess: (data) => {
      console.log('数据同步成功:', data)
    },
    onError: (error) => {
      console.log('数据同步失败:', error)
    },
  })

  const handleRetryTest = () => {
    runRetry(shouldFail)
  }

  const handleDataSync = () => {
    if (syncData.trim()) {
      runSync(syncData)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="重试机制" size="small">
        <div className="space-y-4">
          <Alert
            message="重试功能演示"
            description="展示 useRequest 的重试机制：自动重试、可配置重试次数、延迟和间隔"
            type="info"
            showIcon
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Card title="基础重试测试" size="small">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">重试配置</label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">重试次数</label>
                        <Input
                          type="number"
                          min="0"
                          max="10"
                          value={retryConfig.retryCount}
                          onChange={(e) => setRetryConfig({ ...retryConfig, retryCount: parseInt(e.target.value) || 0 })}
                          size="small"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">重试延迟(ms)</label>
                        <Input
                          type="number"
                          min="0"
                          value={retryConfig.retryDelay}
                          onChange={(e) => setRetryConfig({ ...retryConfig, retryDelay: parseInt(e.target.value) || 0 })}
                          size="small"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">重试间隔(ms)</label>
                        <Input
                          type="number"
                          min="0"
                          value={retryConfig.retryInterval}
                          onChange={(e) => setRetryConfig({ ...retryConfig, retryInterval: parseInt(e.target.value) || 0 })}
                          size="small"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="shouldFail" checked={shouldFail} onChange={(e) => setShouldFail(e.target.checked)} />
                    <label htmlFor="shouldFail" className="text-sm">
                      模拟失败请求
                    </label>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button type="primary" onClick={handleRetryTest} loading={retryLoading}>
                    开始重试测试
                  </Button>
                  <Button onClick={cancelRetry} disabled={!retryLoading}>
                    取消重试
                  </Button>
                </div>

                {retryError && (
                  <Alert
                    message="重试失败"
                    description={`经过 ${retryConfig.retryCount} 次重试后仍然失败: ${retryError.message}`}
                    type="error"
                  />
                )}

                {retryResult && (
                  <div className="p-3 border rounded bg-green-50">
                    <div className="text-sm text-green-800">
                      <div>✓ {retryResult.message}</div>
                      <div className="text-xs mt-1">时间: {retryResult.timestamp}</div>
                    </div>
                  </div>
                )}

                {retryLoading && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">正在重试请求...</div>
                    <Progress percent={75} size="small" />
                  </div>
                )}
              </div>
            </Card>

            <Card title="数据同步重试" size="small">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">同步数据</label>
                  <Input placeholder="输入要同步的数据..." value={syncData} onChange={(e) => setSyncData(e.target.value)} allowClear />
                  <div className="text-xs text-gray-500 mt-1">70% 概率失败，会自动重试 5 次</div>
                </div>

                <Button type="primary" onClick={handleDataSync} loading={syncLoading} disabled={!syncData.trim()} block>
                  开始数据同步
                </Button>

                {syncError && <Alert message="数据同步失败" description={`经过 5 次重试后仍然失败: ${syncError.message}`} type="error" />}

                {syncResult && (
                  <div className="p-3 border rounded bg-green-50">
                    <div className="text-sm text-green-800">
                      <div>✓ {syncResult.message}</div>
                      <div className="text-xs mt-1">重试次数: {syncResult.retryCount}</div>
                    </div>
                  </div>
                )}

                {syncLoading && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">正在同步数据...</div>
                    <Progress percent={60} size="small" />
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium">重试策略说明:</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>• 首次失败后等待 1 秒开始重试</div>
                    <div>• 每次重试间隔 2 秒</div>
                    <div>• 最多重试 5 次</div>
                    <div>• 重试过程中可以取消</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card title="重试机制要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>重试次数:</strong> 通过 retryCount 设置最大重试次数
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>重试延迟:</strong> retryDelay 设置首次重试的延迟时间
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>重试间隔:</strong> retryInterval 设置后续重试的间隔时间
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>指数退避:</strong> 支持指数退避算法，避免频繁重试
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>取消重试:</strong> 通过 cancel 方法可以取消正在进行的重试
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>错误处理:</strong> 重试失败后可以通过 onError 回调处理
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
