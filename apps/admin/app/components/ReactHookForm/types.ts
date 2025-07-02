import * as yup from 'yup'

export interface TabConfig {
  key: string
  title: string
  fields: string[]
}

export interface UseFormTabsOptions {
  tabs: TabConfig[]
  onFinish: (values: UserFormData) => void
  onFinishFailed?: (errorInfo: Record<string, unknown>) => void
  reset?: () => void
  handleSubmit?: (onSubmit: (data: UserFormData) => void, onError: (errors: any) => void) => void
}

export interface FormFieldConfig {
  name: string
  label: string
  type: 'input' | 'email' | 'phone' | 'select' | 'date' | 'textarea' | 'salary' | 'skills'
  required?: boolean
  rules?: Record<string, unknown>
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

export const userFormSchema = yup.object({
  name: yup.string().min(2, '姓名至少2个字符！').required('请输入姓名！'),
  email: yup.string().email('请输入有效的邮箱地址！').required('请输入邮箱！'),
  phone: yup
    .string()
    .matches(/^1[3-9]\d{9}$/, '请输入有效的手机号！')
    .required('请输入手机号！'),
  role: yup.string().min(1, '请选择角色！').required('请选择角色！'),
  joinDate: yup.mixed().required('请选择入职日期！'),
  department: yup.string().min(1, '请选择部门！').required('请选择部门！'),
  description: yup.string().max(200, '描述不能超过200个字符！').optional().default(''),
  salary: yup
    .string()
    .matches(/^\d+(\.\d{1,2})?$/, '请输入有效的薪资数字！')
    .required('请输入薪资！'),
  skills: yup.array().of(yup.string().required()).min(1, '请选择技能！').required('请选择技能！'),
  experience: yup.string().min(1, '请输入工作经验！').required('请输入工作经验！'),
})

export type UserFormData = yup.InferType<typeof userFormSchema>
