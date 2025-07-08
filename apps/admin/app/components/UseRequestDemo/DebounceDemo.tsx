'use client'

import { useState } from 'react'
import { Card, Button, Space, Input, Alert, Divider, Tag, List, Avatar } from 'ui'
import { useRequest } from 'ahooks'

interface SearchResult {
  id: number
  title: string
  description: string
  type: string
  score: number
}

const mockSearch = async (keyword: string): Promise<SearchResult[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  if (!keyword.trim()) {
    return []
  }

  const mockData = [
    { id: 1, title: 'React 开发指南', description: 'React 框架的完整开发指南', type: '文档', score: 95 },
    { id: 2, title: 'TypeScript 入门', description: 'TypeScript 语言基础教程', type: '教程', score: 88 },
    { id: 3, title: 'Vue.js 实战', description: 'Vue.js 框架实战项目', type: '项目', score: 92 },
    { id: 4, title: 'Node.js 后端开发', description: 'Node.js 服务器端开发指南', type: '文档', score: 85 },
    { id: 5, title: '前端工程化', description: '现代前端工程化实践', type: '教程', score: 90 },
  ]

  return mockData.filter(
    (item) => item.title.toLowerCase().includes(keyword.toLowerCase()) || item.description.toLowerCase().includes(keyword.toLowerCase()),
  )
}

const mockValidateEmail = async (email: string): Promise<{ valid: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const valid = emailRegex.test(email)

  if (!valid) {
    return { valid: false, message: '邮箱格式不正确' }
  }

  const existingEmails = ['test@example.com', 'admin@example.com', 'user@example.com']
  if (existingEmails.includes(email)) {
    return { valid: false, message: '该邮箱已被注册' }
  }

  return { valid: true, message: '邮箱可用' }
}

export function DebounceDemo() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [email, setEmail] = useState('')

  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
    run: runSearch,
  } = useRequest(mockSearch, {
    manual: true,
    debounceWait: 500,
    onSuccess: (data) => {
      console.log('搜索结果:', data)
    },
  })

  const {
    data: emailValidation,
    loading: emailLoading,
    error: emailError,
    run: runEmailValidation,
  } = useRequest(mockValidateEmail, {
    manual: true,
    debounceWait: 800,
    onSuccess: (data) => {
      console.log('邮箱验证结果:', data)
    },
  })

  const handleSearchChange = (value: string) => {
    setSearchKeyword(value)
    if (value.trim()) {
      runSearch(value)
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (value.trim()) {
      runEmailValidation(value)
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case '文档':
        return 'blue'
      case '教程':
        return 'green'
      case '项目':
        return 'orange'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <Card title="防抖请求" size="small">
        <div className="space-y-4">
          <Alert message="防抖功能演示" description="展示 useRequest 的防抖功能：搜索建议、表单验证、避免频繁请求" type="info" showIcon />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Card title="搜索防抖" size="small">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">搜索关键词</label>
                  <Input
                    placeholder="输入搜索关键词..."
                    value={searchKeyword}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    allowClear
                  />
                  <div className="text-xs text-gray-500 mt-1">输入后 500ms 自动搜索，避免频繁请求</div>
                </div>

                {searchError && <Alert message="搜索失败" description={searchError.message} type="error" />}

                {searchLoading && (
                  <div className="text-center py-4">
                    <span className="text-sm text-gray-500">正在搜索...</span>
                  </div>
                )}

                {searchResults && searchResults.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">找到 {searchResults.length} 个结果</div>
                    <List
                      dataSource={searchResults}
                      renderItem={(item) => (
                        <List.Item key={item.id} className="p-3 border rounded hover:bg-gray-50">
                          <List.Item.Meta
                            avatar={<Avatar style={{ backgroundColor: '#1890ff' }}>{item.type[0]}</Avatar>}
                            title={
                              <div className="flex justify-between items-center">
                                <span>{item.title}</span>
                                <Tag color={getTypeColor(item.type)}>{item.type}</Tag>
                              </div>
                            }
                            description={
                              <div>
                                <div className="text-sm">{item.description}</div>
                                <div className="text-xs text-gray-500 mt-1">相关度: {item.score}%</div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                )}

                {searchResults && searchResults.length === 0 && searchKeyword.trim() && !searchLoading && (
                  <div className="text-center py-8 text-gray-500">未找到相关结果</div>
                )}
              </div>
            </Card>

            <Card title="邮箱验证防抖" size="small">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">邮箱地址</label>
                  <Input placeholder="输入邮箱地址..." value={email} onChange={(e) => handleEmailChange(e.target.value)} allowClear />
                  <div className="text-xs text-gray-500 mt-1">输入后 800ms 自动验证，避免频繁验证</div>
                </div>

                {emailError && <Alert message="验证失败" description={emailError.message} type="error" />}

                {emailLoading && (
                  <div className="text-center py-4">
                    <span className="text-sm text-gray-500">正在验证邮箱...</span>
                  </div>
                )}

                {emailValidation && (
                  <div className="p-3 border rounded">
                    <div className="flex items-center space-x-2">
                      <Tag color={emailValidation.valid ? 'green' : 'red'}>{emailValidation.valid ? '✓' : '✗'}</Tag>
                      <span className={emailValidation.valid ? 'text-green-600' : 'text-red-600'}>{emailValidation.message}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="text-sm font-medium">测试邮箱:</div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-600">• test@example.com (已注册)</div>
                    <div className="text-xs text-gray-600">• admin@example.com (已注册)</div>
                    <div className="text-xs text-gray-600">• user@example.com (已注册)</div>
                    <div className="text-xs text-gray-600">• 其他邮箱 (可用)</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <Card title="防抖功能要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>防抖延迟:</strong> 通过 debounceWait 设置防抖延迟时间（毫秒）
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>自动触发:</strong> 用户停止输入指定时间后自动触发请求
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>取消请求:</strong> 在防抖期间的新请求会取消之前的请求
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>性能优化:</strong> 减少不必要的网络请求，提升用户体验
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>适用场景:</strong> 搜索建议、表单验证、实时过滤等
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>延迟设置:</strong> 根据业务需求合理设置防抖延迟时间
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
