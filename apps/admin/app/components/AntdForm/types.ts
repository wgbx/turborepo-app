export interface FormInstance {
  validateFields: () => Promise<any>
  resetFields: () => void
  submit: () => void
  scrollToField: (name: string, options?: any) => void
}

export interface UserFormData {
  name: string
  email: string
  role: string
  joinDate: any
  description: string
  phone: string
  department: string
  salary: string
  skills: string[]
  experience: string
}

export interface TabConfig {
  key: string
  title: string
  fields: string[]
}

export interface UseFormTabsOptions {
  tabs: TabConfig[]
  form: FormInstance
  onFinish: (values: UserFormData) => void
  onFinishFailed?: (errorInfo: any) => void
}

export interface FormFieldConfig {
  name: string
  label: string
  type: 'input' | 'email' | 'phone' | 'select' | 'date' | 'textarea' | 'salary' | 'skills'
  required?: boolean
  rules?: any
  options?: { value: string; label: string }[]
  placeholder?: string
  maxLength?: number
  rows?: number
  prefix?: string
}

export interface TabFormConfig {
  key: string
  title: string
  fields: FormFieldConfig[]
}

export interface FormValidationError {
  name: string[]
  errors: string[]
}
