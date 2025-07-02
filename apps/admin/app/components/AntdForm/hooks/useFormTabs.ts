import { useState, useCallback } from 'react'
import { App } from 'ui'
import { UseFormTabsOptions } from '../types'

export const useFormTabs = ({ tabs, form, onFinishFailed }: UseFormTabsOptions) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.key || '1')
  const { message } = App.useApp()

  const handleTabChange = useCallback((key: string) => {
    setActiveTab(key)
  }, [])

  const getTabByField = useCallback(
    (fieldName: string): string => {
      const targetTab = tabs.find((tab) => tab.fields.includes(fieldName))
      return targetTab?.key || tabs[0]?.key || '1'
    },
    [tabs],
  )

  const scrollToErrorField = useCallback(
    (fieldName: string) => {
      try {
        form.scrollToField(fieldName, {
          behavior: 'smooth',
          block: 'center',
        })
      } catch (error) {
        console.warn('Failed to scroll to field:', fieldName, error)
      }
    },
    [form],
  )

  const handleFinishFailed = useCallback(
    (errorInfo: any) => {
      console.log('表单验证失败:', errorInfo)
      message.error('请检查表单填写是否正确')

      const firstErrorField = errorInfo.errorFields?.[0]
      if (firstErrorField) {
        const fieldName = firstErrorField.name?.[0]
        if (fieldName) {
          const targetTab = getTabByField(fieldName)

          if (activeTab !== targetTab) {
            setActiveTab(targetTab)
            setTimeout(() => {
              scrollToErrorField(fieldName)
            }, 100)
          } else {
            scrollToErrorField(fieldName)
          }
        }
      }

      onFinishFailed?.(errorInfo)
    },
    [activeTab, getTabByField, scrollToErrorField, message, onFinishFailed],
  )

  const resetForm = useCallback(() => {
    try {
      form.resetFields()
      setActiveTab(tabs[0]?.key || '1')
    } catch (error) {
      console.warn('Failed to reset form:', error)
    }
  }, [form, tabs])

  return {
    activeTab,
    handleTabChange,
    handleFinishFailed,
    resetForm,
  }
}
