'use client'

import { useEffect } from 'react'
import { Form, Input, Select, Button, message } from 'ui'
import { useCreateUser, useUpdateUser } from './hooks/useUsers'
import { UserItem, CreateUserData } from './types'

interface UserFormProps {
  user?: UserItem | null
  onSuccess: () => void
}

export function UserForm({ user, onSuccess }: UserFormProps) {
  const [form] = Form.useForm()
  const createUserMutation = useCreateUser()
  const updateUserMutation = useUpdateUser()

  const isEditing = !!user

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      })
    } else {
      form.resetFields()
    }
  }, [user, form])

  const handleSubmit = async (values: CreateUserData) => {
    try {
      if (isEditing) {
        await updateUserMutation.mutateAsync({ id: user!.id, ...values })
        message.success('用户更新成功')
      } else {
        await createUserMutation.mutateAsync(values)
        message.success('用户创建成功')
      }
      onSuccess()
    } catch (error) {
      message.error(isEditing ? '更新失败' : '创建失败')
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        status: 'active',
        role: '用户',
      }}
    >
      <Form.Item
        label="姓名"
        name="name"
        rules={[
          { required: true, message: '请输入姓名' },
          { min: 2, max: 20, message: '姓名长度在2-20个字符之间' },
        ]}
      >
        <Input placeholder="请输入用户姓名" />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input placeholder="请输入邮箱地址" />
      </Form.Item>

      <Form.Item label="角色" name="role" rules={[{ required: true, message: '请选择角色' }]}>
        <Select
          placeholder="请选择用户角色"
          options={[
            { label: '管理员', value: '管理员' },
            { label: '编辑', value: '编辑' },
            { label: '用户', value: '用户' },
          ]}
        />
      </Form.Item>

      <Form.Item label="状态" name="status" rules={[{ required: true, message: '请选择状态' }]}>
        <Select
          placeholder="请选择用户状态"
          options={[
            { label: '活跃', value: 'active' },
            { label: '非活跃', value: 'inactive' },
            { label: '待审核', value: 'pending' },
          ]}
        />
      </Form.Item>

      <Form.Item className="mb-0">
        <div className="flex justify-end gap-2">
          <Button onClick={onSuccess}>取消</Button>
          <Button type="primary" htmlType="submit" loading={createUserMutation.isPending || updateUserMutation.isPending}>
            {isEditing ? '更新' : '创建'}
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
