import React from 'react'
import { Form } from 'ui'
import { TabFormConfig, UserFormData } from '../types'
import { FormField } from './FormField'

interface TabFormProps {
  config: TabFormConfig
  form: any
  onFinish: (values: UserFormData) => void
  onFinishFailed: (errorInfo: any) => void
}

export const TabForm: React.FC<TabFormProps> = ({ config, form, onFinish, onFinishFailed }) => {
  const { key, fields } = config

  const renderFields = () => {
    const gridFields = fields.filter((field) => ['input', 'email', 'phone', 'select', 'date'].includes(field.type))
    const fullWidthFields = fields.filter((field) => ['textarea', 'salary', 'skills'].includes(field.type))

    return (
      <>
        {gridFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridFields.map((field) => (
              <FormField key={field.name} field={field} />
            ))}
          </div>
        )}

        {fullWidthFields.map((field) => (
          <FormField key={field.name} field={field} />
        ))}
      </>
    )
  }

  return (
    <Form form={form} name={`${key}Form`} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      {renderFields()}
    </Form>
  )
}
