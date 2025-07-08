'use client'

import { useState } from 'react'
import { Card, Button, Space, Input, Select, Switch, Alert, Divider, Tag, Progress } from 'ui'
import { useRequest } from 'ahooks'

interface SearchParams {
  keyword: string
  status: string
  page: number
  pageSize: number
}

interface SearchResult {
  total: number
  data: Array<{
    id: number
    name: string
    status: string
    createdAt: string
  }>
}

const mockSearch = async (params: SearchParams): Promise<SearchResult> => {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  const mockData = [
    { id: 1, name: '项目A', status: 'active', createdAt: '2024-01-01' },
    { id: 2, name: '项目B', status: 'inactive', createdAt: '2024-01-02' },
    { id: 3, name: '项目C', status: 'pending', createdAt: '2024-01-03' },
    { id: 4, name: '项目D', status: 'active', createdAt: '2024-01-04' },
    { id: 5, name: '项目E', status: 'inactive', createdAt: '2024-01-05' },
  ]

  const filteredData = mockData.filter((item) => {
    const keywordMatch = !params.keyword || item.name.includes(params.keyword)
    const statusMatch = !params.status || item.status === params.status
    return keywordMatch && statusMatch
  })

  const start = (params.page - 1) * params.pageSize
  const end = start + params.pageSize
  const paginatedData = filteredData.slice(start, end)

  return {
    total: filteredData.length,
    data: paginatedData,
  }
}

const uploadFile = async (file: File): Promise<{ url: string; size: number }> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('文件大小不能超过5MB')
  }

  return {
    url: `https://example.com/uploads/${file.name}`,
    size: file.size,
  }
}

export function AdvancedDemo() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    keyword: '',
    status: '',
    page: 1,
    pageSize: 3,
  })

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    data: searchResult,
    loading: searchLoading,
    error: searchError,
    run: runSearch,
  } = useRequest(mockSearch, {
    manual: true,
    defaultParams: [searchParams],
  })

  const {
    data: uploadResult,
    loading: uploadLoading,
    error: uploadError,
    run: runUpload,
  } = useRequest(uploadFile, {
    manual: true,
  })

  const handleSearch = () => {
    runSearch(searchParams)
  }

  const handleUpload = () => {
    if (selectedFile) {
      runUpload(selectedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'green'
      case 'inactive':
        return 'red'
      case 'pending':
        return 'orange'
      default:
        return 'default'
    }
  }

  return (
    <div className="space-y-6">
      <Card title="高级用法" size="small">
        <div className="space-y-4">
          <Alert
            message="高级配置演示"
            description="展示 useRequest 的高级功能：参数传递、依赖更新、错误处理、文件上传等"
            type="info"
            showIcon
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
            <Card title="条件搜索" size="small">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">关键词</label>
                    <Input
                      placeholder="输入搜索关键词"
                      value={searchParams.keyword}
                      onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">状态</label>
                    <Select
                      style={{ width: '100%' }}
                      placeholder="选择状态"
                      value={searchParams.status}
                      onChange={(value) => setSearchParams({ ...searchParams, status: value })}
                      allowClear
                    >
                      <Select.Option value="active">活跃</Select.Option>
                      <Select.Option value="inactive">非活跃</Select.Option>
                      <Select.Option value="pending">待审核</Select.Option>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Space>
                    <Button type="primary" onClick={handleSearch} loading={searchLoading}>
                      搜索
                    </Button>
                    <Button
                      onClick={() => {
                        setSearchParams({ keyword: '', status: '', page: 1, pageSize: 3 })
                        runSearch({ keyword: '', status: '', page: 1, pageSize: 3 })
                      }}
                    >
                      重置
                    </Button>
                  </Space>
                  <span className="text-sm text-gray-500">共 {searchResult?.total || 0} 条记录</span>
                </div>

                {searchError && <Alert message="搜索失败" description={searchError.message} type="error" />}

                {searchResult && (
                  <div className="space-y-2">
                    {searchResult.data.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.createdAt}</div>
                        </div>
                        <Tag color={getStatusColor(item.status)}>
                          {item.status === 'active' ? '活跃' : item.status === 'inactive' ? '非活跃' : '待审核'}
                        </Tag>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            <Card title="文件上传" size="small">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">选择文件</label>
                  <Input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx" />
                </div>

                {selectedFile && (
                  <div className="p-3 border rounded bg-gray-50">
                    <div className="text-sm">
                      <div>文件名: {selectedFile.name}</div>
                      <div>大小: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                      <div>类型: {selectedFile.type || '未知'}</div>
                    </div>
                  </div>
                )}

                <Button type="primary" onClick={handleUpload} loading={uploadLoading} disabled={!selectedFile} block>
                  上传文件
                </Button>

                {uploadError && <Alert message="上传失败" description={uploadError.message} type="error" />}

                {uploadResult && (
                  <div className="p-3 border rounded bg-green-50">
                    <div className="text-sm text-green-800">
                      <div>上传成功!</div>
                      <div>文件地址: {uploadResult.url}</div>
                      <div>文件大小: {(uploadResult.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card title="useRequest 高级用法要点" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>参数传递:</strong> 通过 run 方法传递参数，支持动态参数更新
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>依赖更新:</strong> 使用 refreshDeps 监听依赖变化自动重新请求
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>错误处理:</strong> 通过 onError 回调处理特定错误逻辑
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>成功回调:</strong> 通过 onSuccess 回调处理请求成功后的逻辑
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>取消请求:</strong> 使用 cancel 方法取消正在进行的请求
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-500">•</span>
                <span>
                  <strong>请求去重:</strong> 相同请求会自动去重，避免重复请求
                </span>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  )
}
