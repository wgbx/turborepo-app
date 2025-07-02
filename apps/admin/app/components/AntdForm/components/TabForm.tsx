import React from 'react'
import { TabFormConfig } from '../types'
import { FormField } from './FormField'

interface TabFormProps {
  config: TabFormConfig
}

export const TabForm: React.FC<TabFormProps> = ({ config }) => {
  const { fields } = config

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

  return <div className="pt-4">{renderFields()}</div>
}
