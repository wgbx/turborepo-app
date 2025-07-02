import React from 'react'
import { Button } from 'ui'

interface FormActionsProps {
  onReset: () => void
  loading?: boolean
}

export const FormActions: React.FC<FormActionsProps> = ({ onReset, loading = false }) => {
  return (
    <div className="mt-6 flex gap-4">
      <Button type="primary" htmlType="submit" size="large" loading={loading}>
        提交
      </Button>
      <Button size="large" onClick={onReset} disabled={loading}>
        重置
      </Button>
    </div>
  )
}
