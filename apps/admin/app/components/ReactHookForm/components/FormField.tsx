import React from 'react'
import { Input, Select, DatePicker } from 'ui'
import { FormFieldConfig } from '../types'
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, Control, Controller } from 'react-hook-form'
import { UserFormData } from '../types'

const { Option } = Select

interface FormFieldProps {
  field: FormFieldConfig
  register: UseFormRegister<UserFormData>
  errors: FieldErrors<UserFormData>
  setValue: UseFormSetValue<UserFormData>
  watch: UseFormWatch<UserFormData>
  control: Control<UserFormData>
}

export const FormField: React.FC<FormFieldProps> = ({ field, errors, control }) => {
  const { name, label, type, options, placeholder, maxLength, rows, prefix } = field
  const error = errors[name as keyof UserFormData]

  const renderField = () => {
    switch (type) {
      case 'input':
      case 'email':
      case 'phone':
      case 'salary':
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => (
              <Input
                {...controllerField}
                placeholder={placeholder}
                type={type === 'email' ? 'email' : 'text'}
                prefix={type === 'salary' ? prefix : undefined}
                value={controllerField.value as string}
                status={error ? 'error' : undefined}
              />
            )}
          />
        )
      case 'select':
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                {...controllerField}
                placeholder={placeholder}
                status={error ? 'error' : undefined}
                style={{ width: '100%' }}
                value={controllerField.value ?? undefined}
                onChange={(value) => controllerField.onChange(value)}
              >
                {options?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
          />
        )
      case 'date':
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => (
              <DatePicker
                placeholder={placeholder}
                style={{ width: '100%' }}
                status={error ? 'error' : undefined}
                value={controllerField.value}
                onChange={(date) => controllerField.onChange(date)}
              />
            )}
          />
        )
      case 'textarea':
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => {
              let value = controllerField.value as string | number | undefined
              if (typeof value !== 'string' && typeof value !== 'number') value = ''
              return (
                <Input.TextArea
                  {...controllerField}
                  rows={rows || 4}
                  placeholder={placeholder}
                  showCount
                  maxLength={maxLength}
                  status={error ? 'error' : undefined}
                  value={value}
                />
              )
            }}
          />
        )
      case 'skills':
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => (
              <Select
                mode="multiple"
                placeholder={placeholder}
                status={error ? 'error' : undefined}
                style={{ width: '100%' }}
                value={controllerField.value ?? []}
                onChange={(value) => controllerField.onChange(value)}
              >
                {options?.map((option) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
          />
        )
      default:
        return (
          <Controller
            name={name as keyof UserFormData}
            control={control}
            render={({ field: controllerField }) => {
              let value = controllerField.value as string | number | undefined
              if (typeof value !== 'string' && typeof value !== 'number') value = ''
              return <Input {...controllerField} placeholder={placeholder} status={error ? 'error' : undefined} value={value} />
            }}
          />
        )
    }
  }

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {error && <div className="text-red-500 text-sm mt-1">{error.message?.toString()}</div>}
    </div>
  )
}
