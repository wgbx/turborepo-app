'use client'

import { useState } from 'react'
import { List, Avatar, Tag, Button, Input, Select, Space, Pagination, Spin, Empty, message } from 'ui'
import { useUsers, useDeleteUser } from './hooks/useUsers'
import { UserItem } from './types'

interface UserListProps {
  onEdit: (user: UserItem) => void
}

export function UserList({ onEdit }: UserListProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [page, setPage] = useState(1)
  const pageSize = 5

  const { data, isLoading, error } = useUsers({
    page,
    pageSize,
    search: search || undefined,
    status: status || undefined,
    role: role || undefined,
  })

  const deleteUserMutation = useDeleteUser()

  const handleDelete = async (user: UserItem) => {
    try {
      await deleteUserMutation.mutateAsync(user.id)
      message.success('用户删除成功')
    } catch (error) {
      message.error('删除失败')
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case '管理员':
        return 'blue'
      case '编辑':
        return 'purple'
      case '用户':
        return 'default'
      default:
        return 'default'
    }
  }

  if (error) {
    return <div className="text-red-500">加载失败: {error.message}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Input
          placeholder="搜索用户姓名或邮箱"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 200 }}
          allowClear
        />
        <Select
          placeholder="状态筛选"
          value={status}
          onChange={setStatus}
          style={{ width: 120 }}
          allowClear
          options={[
            { label: '活跃', value: 'active' },
            { label: '非活跃', value: 'inactive' },
            { label: '待审核', value: 'pending' },
          ]}
        />
        <Select
          placeholder="角色筛选"
          value={role}
          onChange={setRole}
          style={{ width: 120 }}
          allowClear
          options={[
            { label: '管理员', value: '管理员' },
            { label: '编辑', value: '编辑' },
            { label: '用户', value: '用户' },
          ]}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Spin size="large" />
        </div>
      ) : data?.data.length === 0 ? (
        <Empty description="暂无用户数据" />
      ) : (
        <>
          <List
            dataSource={data?.data}
            renderItem={(user) => (
              <List.Item
                key={user.id}
                actions={[
                  <Button key="edit" type="link" onClick={() => onEdit(user)}>
                    编辑
                  </Button>,
                  <Button key="delete" type="link" danger loading={deleteUserMutation.isPending} onClick={() => handleDelete(user)}>
                    删除
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={user.avatar} alt={user.name} />}
                  title={
                    <Space>
                      <span>{user.name}</span>
                      <Tag color={getStatusColor(user.status)}>
                        {user.status === 'active' ? '活跃' : user.status === 'inactive' ? '非活跃' : '待审核'}
                      </Tag>
                      <Tag color={getRoleColor(user.role)}>{user.role}</Tag>
                    </Space>
                  }
                  description={
                    <div className="space-y-1">
                      <div>{user.email}</div>
                      <div className="text-xs text-gray-500">创建时间: {new Date(user.createdAt).toLocaleDateString()}</div>
                    </div>
                  }
                />
              </List.Item>
            )}
          />

          {data && data.totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                current={page}
                total={data.total}
                pageSize={pageSize}
                onChange={setPage}
                showSizeChanger={false}
                showQuickJumper
                showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
