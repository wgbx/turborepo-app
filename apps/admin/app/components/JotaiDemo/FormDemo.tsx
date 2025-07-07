'use client'

import { useAtom } from 'jotai'
import { Card, Typography, Input, Button, Space, Alert, Divider } from 'ui'
import { formDataAtom, formErrorsAtom } from './atoms'

const { Title, Text, Paragraph } = Typography
const { Password } = Input

export default function FormDemo() {
  const [formData, setFormData] = useAtom(formDataAtom)
  const [errors, setErrors] = useAtom(formErrorsAtom)

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // 清除对应字段的错误
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    // 用户名验证
    if (!formData.username.trim()) {
      newErrors.username = '用户名不能为空'
    } else if (formData.username.length < 3) {
      newErrors.username = '用户名至少3个字符'
    }

    // 邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = '邮箱不能为空'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    // 密码验证
    if (!formData.password) {
      newErrors.password = '密码不能为空'
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少6个字符'
    }

    // 确认密码验证
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      alert('表单验证通过！\n' + JSON.stringify(formData, null, 2))
    }
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    })
    setErrors({})
  }

  const hasErrors = Object.values(errors).some((error: any) => error)

  return (
    <div className="space-y-6">
      <div>
        <Title level={3}>表单状态管理</Title>
        <Paragraph>展示如何使用 Jotai 管理表单状态，包括字段值、验证错误和表单操作。</Paragraph>
      </div>

      {/* 表单 */}
      <Card title="用户注册表单" className="shadow-sm">
        <div className="space-y-4">
          {/* 用户名 */}
          <div>
            <Text strong>用户名：</Text>
            <Input
              value={formData.username}
              onChange={(e) => updateField('username', e.target.value)}
              placeholder="请输入用户名"
              status={errors.username ? 'error' : ''}
            />
            {errors.username && <div className="text-red-500 text-sm mt-1">{errors.username}</div>}
          </div>

          {/* 邮箱 */}
          <div>
            <Text strong>邮箱：</Text>
            <Input
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="请输入邮箱"
              status={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
          </div>

          {/* 密码 */}
          <div>
            <Text strong>密码：</Text>
            <Password
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="请输入密码"
              status={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
          </div>

          {/* 确认密码 */}
          <div>
            <Text strong>确认密码：</Text>
            <Password
              value={formData.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              placeholder="请再次输入密码"
              status={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword}</div>}
          </div>

          {/* 操作按钮 */}
          <Divider />
          <Space>
            <Button type="primary" onClick={handleSubmit}>
              提交表单
            </Button>
            <Button onClick={resetForm}>重置表单</Button>
          </Space>

          {/* 错误提示 */}
          {hasErrors && <Alert message="表单验证失败" description="请检查并修正上述错误" type="error" showIcon />}
        </div>
      </Card>

      {/* 表单状态 */}
      <Card title="表单状态" className="shadow-sm">
        <div className="space-y-4">
          <div>
            <Text strong>当前表单数据：</Text>
            <pre className="mt-2 bg-gray-50 p-3 rounded-md text-sm overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
          </div>

          <div>
            <Text strong>验证错误：</Text>
            <pre className="mt-2 bg-red-50 p-3 rounded-md text-sm overflow-x-auto">{JSON.stringify(errors, null, 2)}</pre>
          </div>
        </div>
      </Card>

      {/* 代码示例 */}
      <Card title="代码示例" className="shadow-sm">
        <div className="bg-gray-900 text-green-400 p-4 rounded-md overflow-x-auto">
          <pre className="text-sm">
            {`// 表单状态原子
const formDataAtom = atom({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const formErrorsAtom = atom({})

// 在组件中使用
const [formData, setFormData] = useAtom(formDataAtom)
const [errors, setErrors] = useAtom(formErrorsAtom)

// 更新字段
const updateField = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
  // 清除错误
  if (errors[field]) {
    setErrors(prev => ({ ...prev, [field]: '' }))
  }
}

// 表单验证
const validateForm = () => {
  const newErrors: any = {}
  // 验证逻辑...
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}

// 提交表单
const handleSubmit = () => {
  if (validateForm()) {
    // 提交逻辑...
  }
}`}
          </pre>
        </div>
      </Card>
    </div>
  )
}
