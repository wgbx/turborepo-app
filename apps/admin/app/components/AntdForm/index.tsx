'use client'

import { useState } from 'react'
import { Form, Tabs, App } from 'ui'
import { UserFormData, TabConfig } from './types'
import { FORM_CONFIG } from './constants'
import { useFormTabs } from './hooks/useFormTabs'
import { TabForm } from './components/TabForm'
import { FormActions } from './components/FormActions'
import { USER_FORM_PRESET_DATA } from 'constant'

const AntdForm: React.FC = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()

  const tabsConfig: TabConfig[] = FORM_CONFIG.map((config) => ({
    key: config.key,
    title: config.title,
    fields: config.fields.map((field) => field.name),
  }))

  const handleFinish = async (values: UserFormData) => {
    try {
      setLoading(true)
      console.log('表单数据:', values)

      await new Promise((resolve) => setTimeout(resolve, 1000))

      message.success('表单提交成功！')
      form.resetFields()
    } catch (error) {
      console.error('提交失败:', error)
      message.error('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const handlePreset = () => {
    form.setFieldsValue({ ...USER_FORM_PRESET_DATA })
  }

  const { activeTab, handleTabChange, handleFinishFailed, resetForm } = useFormTabs({
    tabs: tabsConfig,
    form,
    onFinish: handleFinish,
  })

  const tabItems = FORM_CONFIG.map((config) => ({
    key: config.key,
    label: config.title,
    children: <TabForm config={config} />,
  }))

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">用户信息表单</h2>

      <Form form={form} layout="vertical" onFinish={handleFinish} onFinishFailed={handleFinishFailed} autoComplete="off">
        <Tabs activeKey={activeTab} onChange={handleTabChange} defaultActiveKey="1" type="card" size="large" items={tabItems} />

        <FormActions onReset={resetForm} onPreset={handlePreset} loading={loading} />
      </Form>
    </div>
  )
}

export default AntdForm
