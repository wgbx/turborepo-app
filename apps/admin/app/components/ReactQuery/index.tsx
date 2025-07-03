'use client'

import { useState } from 'react'
import { Card, Button, Modal } from 'ui'
import { ReactQueryDemo } from './ReactQueryDemo'
import { CacheDemo } from './CacheDemo'
import { UserList } from './UserList'
import { UserForm } from './UserForm'
import { UserItem } from './types'

export default function ReactQuery() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<UserItem | null>(null)

  const handleAddUser = () => {
    setEditingUser(null)
    setIsModalVisible(true)
  }

  const handleEditUser = (user: UserItem) => {
    setEditingUser(user)
    setIsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsModalVisible(false)
    setEditingUser(null)
  }

  return (
    <div className="space-y-6">
      <Card title="React Query 最佳实践" className="mb-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">用户管理</h3>
            <Button type="primary" onClick={handleAddUser}>
              添加用户
            </Button>
          </div>

          <UserList onEdit={handleEditUser} />
        </div>
      </Card>

      <ReactQueryDemo />

      <CacheDemo />

      <Modal title={editingUser ? '编辑用户' : '添加用户'} open={isModalVisible} onCancel={handleModalClose} footer={null} width={600}>
        <UserForm user={editingUser} onSuccess={handleModalClose} />
      </Modal>
    </div>
  )
}
