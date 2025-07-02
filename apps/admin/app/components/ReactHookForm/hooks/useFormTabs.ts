import { useState, useCallback } from 'react'
import { App } from 'ui'
import { UseFormTabsOptions } from '../types'

export const useFormTabs = ({ tabs, onFinish, onFinishFailed, reset }: UseFormTabsOptions) => {
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

  const scrollToErrorField = useCallback((fieldName: string) => {
    try {
      const element = document.querySelector(`[name="${fieldName}"]`)
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      }
    } catch (error) {
      console.warn('Failed to scroll to field:', fieldName, error)
    }
  }, [])

  const handleFinishFailed = useCallback(
    (errors: Record<string, unknown>) => {
      console.log('表单验证失败:', errors)
      message.error('请检查表单填写是否正确')

      const firstErrorField = Object.keys(errors)[0]
      if (firstErrorField) {
        const targetTab = getTabByField(firstErrorField)

        if (activeTab !== targetTab) {
          setActiveTab(targetTab)
          setTimeout(() => {
            scrollToErrorField(firstErrorField)
          }, 100)
        } else {
          scrollToErrorField(firstErrorField)
        }
      }

      onFinishFailed?.(errors)
    },
    [activeTab, getTabByField, scrollToErrorField, message, onFinishFailed],
  )

  const handleSubmit = useCallback(() => {
    // This will be handled by react-hook-form's handleSubmit
    // We just need to trigger the form submission
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement
    if (submitButton) {
      submitButton.click()
    }
  }, [])

  const resetForm = useCallback(() => {
    try {
      setActiveTab(tabs[0]?.key || '1')
      // 调用 react-hook-form 的 reset 函数来重置表单数据
      if (reset) {
        reset()
      }
    } catch (error) {
      console.warn('Failed to reset form:', error)
    }
  }, [tabs, reset])

  return {
    activeTab,
    handleTabChange,
    handleSubmit,
    handleFinishFailed,
    resetForm,
  }
}
