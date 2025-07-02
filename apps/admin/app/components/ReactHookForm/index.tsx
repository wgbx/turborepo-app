'use client'

import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Tabs, App } from 'ui'
import { UserFormData, TabConfig, userFormSchema } from './types'
import { FORM_CONFIG } from './constants'
import { useFormTabs } from './hooks/useFormTabs'
import { TabForm } from './components/TabForm'
import { FormActions } from './components/FormActions'

const ReactHookForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { message } = App.useApp()
  const formRef = useRef<{ reset: () => void }>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    control,
  } = useForm<UserFormData>({
    resolver: yupResolver(userFormSchema),
    mode: 'onChange',
  })

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
      reset()
    } catch (error) {
      console.error('提交失败:', error)
      message.error('提交失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const {
    activeTab,
    handleTabChange,
    handleSubmit: handleFormSubmit,
    handleFinishFailed,
    resetForm,
  } = useFormTabs({
    tabs: tabsConfig,
    onFinish: handleFinish,
    reset,
  })

  const tabItems = FORM_CONFIG.map((config) => ({
    key: config.key,
    label: config.title,
    children: (
      <TabForm
        ref={formRef}
        config={config}
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
        control={control}
        handleSubmit={handleSubmit}
        onFinish={handleFinish}
        onFinishFailed={handleFinishFailed}
      />
    ),
  }))

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">用户信息表单 (React Hook Form)</h2>

      <Tabs activeKey={activeTab} onChange={handleTabChange} defaultActiveKey="1" type="card" size="large" items={tabItems} />

      <FormActions onSubmit={handleFormSubmit} onReset={resetForm} loading={loading} />
    </div>
  )
}

export default ReactHookForm
