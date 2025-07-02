import React from 'react'
import { Button } from 'ui'

interface FormActionsProps {
  onSubmit: () => void
  onReset: () => void
  loading?: boolean
}

export const FormActions: React.FC<FormActionsProps> = ({ onSubmit, onReset, loading = false }) => {
  return (
    <div className="mt-6 flex gap-4">
      <Button type="primary" htmlType="submit" size="large" onClick={onSubmit} loading={loading}>
        提交
      </Button>
      <Button size="large" onClick={onReset} disabled={loading}>
        重置
      </Button>
    </div>
  )
}
