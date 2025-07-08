'use client'

import { useState } from 'react'
import { Card, Button, Space, Switch, Alert, Divider, Tag, Progress, Statistic } from 'ui'
import { useRequest } from 'ahooks'

interface SystemStatus {
  cpu: number
  memory: number
  disk: number
  network: number
  timestamp: string
  status: 'normal' | 'warning' | 'error'
}

const fetchSystemStatus = async (): Promise<SystemStatus> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const cpu = Math.random() * 100
  const memory = Math.random() * 100
  const disk = Math.random() * 100
  const network = Math.random() * 100

  let status: 'normal' | 'warning' | 'error' = 'normal'
  if (cpu > 80 || memory > 80 || disk > 80) {
    status = 'warning'
  }
  if (cpu > 95 || memory > 95 || disk > 95) {
    status = 'error'
  }

  return {
    cpu: Math.round(cpu),
    memory: Math.round(memory),
    disk: Math.round(disk),
    network: Math.round(network),
    timestamp: new Date().toLocaleTimeString(),
    status,
  }
}

const fetchNotifications = async (): Promise<Array<{ id: number; message: string; type: string; time: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const notifications = [
    { id: 1, message: '系统更新完成', type: 'success', time: new Date().toLocaleTimeString() },
    { id: 2, message: '新用户注册', type: 'info', time: new Date().toLocaleTimeString() },
    { id: 3, message: '数据库备份开始', type: 'warning', time: new Date().toLocaleTimeString() },
  ]

  if (Math.random() > 0.7) {
    notifications.push({
      id: Date.now(),
      message: `新的系统事件 ${Date.now()}`,
      type: 'info',
      time: new Date().toLocaleTimeString(),
    })
  }

  return notifications
}

export function PollingDemo() {
  const [pollingEnabled, setPollingEnabled] = useState(true)
  const [notificationPollingEnabled, setNotificationPollingEnabled] = useState(true)

  const {
    data: systemStatus,
    loading: systemLoading,
    error: systemError,
    run: runSystemPolling,
    cancel: cancelSystemPolling,
  } = useRequest(fetchSystemStatus, {
    pollingInterval: 3000,
    pollingWhenHidden: false,
    onSuccess: (data) => {
      console.log('系统状态更新:', data)
    },
  })

  const {
    data: notifications,
    loading: notificationLoading,
    error: notificationError,
    run: runNotificationPolling,
    cancel: cancelNotificationPolling,
  } = useRequest(fetchNotifications, {
    pollingInterval: 5000,
    pollingWhenHidden: false,
    onSuccess: (data) => {
      console.log('通知更新:', data)
    },
  })

  const handleSystemPollingToggle = (checked: boolean) => {
    setPollingEnabled(checked)
    if (checked) {
      runSystemPolling()
    } else {
      cancelSystemPolling()
    }
  }

  const handleNotificationPollingToggle = (checked: boolean) => {
    setNotificationPollingEnabled(checked)
    if (checked) {
      runNotificationPolling()
    } else {
      cancelNotificationPolling()
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'green'
      case 'warning':
        return 'orange'
      case 'error':
        return 'red'
      default:
        return 'default'
    }
  }

  const getProgressColor = (value: number) => {
    if (value > 80) return 'red'
    if (value > 60) return 'orange'
    return 'green'
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'green'
      case 'warning':
        return 'orange'
      case 'error':
        return 'red'
      default:
        return 'blue'
    }
  }

  return (
    <div className="space-y-6">
      <Card title="轮询请求" size="small">
        <div className="space-y-4">
          <Alert
            message="轮询功能演示"
            description="展示 useRequest 的轮询功能：系统监控、实时通知、可控制的轮询间隔"
            type="info"
            showIcon
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Card title="系统监控" size="small">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">系统状态监控</span>
                  <Space>
                    <Switch checked={pollingEnabled} onChange={handleSystemPollingToggle} size="small" />
                    <span className="text-xs text-gray-500">{pollingEnabled ? '轮询中' : '已停止'}</span>
                  </Space>
                </div>

                {systemError && <Alert message="监控失败" description={systemError.message} type="error" />}

                {systemStatus && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Statistic
                        title="CPU 使用率"
                        value={systemStatus.cpu}
                        suffix="%"
                        valueStyle={{ color: getProgressColor(systemStatus.cpu) }}
                      />
                      <Statistic
                        title="内存使用率"
                        value={systemStatus.memory}
                        suffix="%"
                        valueStyle={{ color: getProgressColor(systemStatus.memory) }}
                      />
                    </div>

                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU</span>
                          <span>{systemStatus.cpu}%</span>
                        </div>
                        <Progress percent={systemStatus.cpu} strokeColor={getProgressColor(systemStatus.cpu)} size="small" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>内存</span>
                          <span>{systemStatus.memory}%</span>
                        </div>
                        <Progress percent={systemStatus.memory} strokeColor={getProgressColor(systemStatus.memory)} size="small" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>磁盘</span>
                          <span>{systemStatus.disk}%</span>
                        </div>
                        <Progress percent={systemStatus.disk} strokeColor={getProgressColor(systemStatus.disk)} size="small" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>网络</span>
                          <span>{systemStatus.network}%</span>
                        </div>
                        <Progress percent={systemStatus.network} strokeColor={getProgressColor(systemStatus.network)} size="small" />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Tag color={getStatusColor(systemStatus.status)}>
                        {systemStatus.status === 'normal' ? '正常' : systemStatus.status === 'warning' ? '警告' : '错误'}
                      </Tag>
                      <span className="text-xs text-gray-500">更新时间: {systemStatus.timestamp}</span>
                    </div>
                  </div>
                )}

                {systemLoading && (
                  <div className="text-center py-4">
                    <span className="text-sm text-gray-500">正在更新系统状态...</span>
                  </div>
                )}
              </div>
            </Card>

            <Card title="实时通知" size="small">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">通知中心</span>
                  <Space>
                    <Switch checked={notificationPollingEnabled} onChange={handleNotificationPollingToggle} size="small" />
                    <span className="text-xs text-gray-500">{notificationPollingEnabled ? '轮询中' : '已停止'}</span>
                  </Space>
                </div>

                {notificationError && <Alert message="通知获取失败" description={notificationError.message} type="error" />}

                {notifications && (
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="p-3 border rounded bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm">{notification.message}</div>
                            <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                          </div>
                          <Tag color={getNotificationColor(notification.type)}>
                            {notification.type === 'success'
                              ? '成功'
                              : notification.type === 'warning'
                                ? '警告'
                                : notification.type === 'error'
                                  ? '错误'
                                  : '信息'}
                          </Tag>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {notificationLoading && (
                  <div className="text-center py-4">
                    <span className="text-sm text-gray-500">正在获取通知...</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card title="轮询功能要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>轮询间隔:</strong> 通过 pollingInterval 设置轮询间隔时间（毫秒）
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>页面隐藏控制:</strong> pollingWhenHidden 控制页面隐藏时是否继续轮询
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>手动控制:</strong> 通过 run 和 cancel 方法手动控制轮询的开始和停止
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>条件轮询:</strong> 使用 ready 选项控制何时开始轮询
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>错误处理:</strong> 轮询过程中的错误会自动处理，不会中断轮询
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>性能优化:</strong> 合理设置轮询间隔，避免过于频繁的请求
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
