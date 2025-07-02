import React, { forwardRef, useImperativeHandle } from 'react'
import { TabFormConfig, UserFormData } from '../types'
import { FormField } from './FormField'
import { UseFormRegister, FieldErrors, UseFormSetValue, UseFormWatch, Control, UseFormHandleSubmit } from 'react-hook-form'

interface TabFormProps {
  config: TabFormConfig
  register: UseFormRegister<UserFormData>
  errors: FieldErrors<UserFormData>
  setValue: UseFormSetValue<UserFormData>
  watch: UseFormWatch<UserFormData>
  control: Control<UserFormData>
  handleSubmit: UseFormHandleSubmit<UserFormData>
  onFinish: (values: UserFormData) => void
  onFinishFailed: (errorInfo: Record<string, unknown>) => void
}

export const TabForm = forwardRef<{ reset: () => void }, TabFormProps>((props, ref) => {
  const { config, register, errors, setValue, watch, control, onFinish, onFinishFailed } = props
  const { fields } = config

  useImperativeHandle(ref, () => ({
    reset: () => {
      console.log('TabForm reset called')
    },
  }))

  const renderFields = () => {
    const gridFields = fields.filter((field) => ['input', 'email', 'phone', 'select', 'date'].includes(field.type))
    const fullWidthFields = fields.filter((field) => ['textarea', 'salary', 'skills'].includes(field.type))

    return (
      <>
        {gridFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gridFields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                register={register}
                errors={errors}
                setValue={setValue}
                watch={watch}
                control={control}
              />
            ))}
          </div>
        )}

        {fullWidthFields.map((field) => (
          <FormField
            key={field.name}
            field={field}
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            control={control}
          />
        ))}
      </>
    )
  }

  return <div className="space-y-4">{renderFields()}</div>
})

TabForm.displayName = 'TabForm'
