import React from 'react'
import { Form, Input, Select, DatePicker } from 'ui'
import { FormFieldConfig } from '../types'

const { Option } = Select

interface FormFieldProps {
  field: FormFieldConfig
}

export const FormField: React.FC<FormFieldProps> = ({ field }) => {
  const { name, label, type, rules, options, placeholder, maxLength, rows, prefix } = field

  const renderField = () => {
    switch (type) {
      case 'input':
        return <Input placeholder={placeholder} />

      case 'email':
        return <Input placeholder={placeholder} type="email" />

      case 'phone':
        return <Input placeholder={placeholder} />

      case 'select':
        return (
          <Select placeholder={placeholder}>
            {options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )

      case 'date':
        return <DatePicker placeholder={placeholder} style={{ width: '100%' }} />

      case 'textarea':
        return <Input.TextArea rows={rows || 4} placeholder={placeholder} showCount maxLength={maxLength} />

      case 'salary':
        return <Input placeholder={placeholder} prefix={prefix} />

      case 'skills':
        return (
          <Select mode="multiple" placeholder={placeholder}>
            {options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        )

      default:
        return <Input placeholder={placeholder} />
    }
  }

  return (
    <Form.Item label={label} name={name} rules={rules}>
      {renderField()}
    </Form.Item>
  )
}
