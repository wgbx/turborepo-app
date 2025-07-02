import { TabFormConfig } from './types'

export const ROLE_OPTIONS = [
  { value: 'admin', label: '管理员' },
  { value: 'user', label: '普通用户' },
  { value: 'editor', label: '编辑者' },
  { value: 'viewer', label: '查看者' },
] as const

export const DEPARTMENT_OPTIONS = [
  { value: 'tech', label: '技术部' },
  { value: 'hr', label: '人力资源部' },
  { value: 'finance', label: '财务部' },
  { value: 'marketing', label: '市场部' },
  { value: 'sales', label: '销售部' },
] as const

export const SKILL_OPTIONS = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'sql', label: 'SQL' },
  { value: 'git', label: 'Git' },
] as const

export const FORM_VALIDATION_RULES = {
  name: [
    { required: true, message: '请输入姓名！' },
    { min: 2, message: '姓名至少2个字符！' },
  ],
  email: [
    { required: true, message: '请输入邮箱！' },
    { type: 'email', message: '请输入有效的邮箱地址！' },
  ],
  phone: [
    { required: true, message: '请输入手机号！' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号！' },
  ],
  role: [{ required: true, message: '请选择角色！' }],
  joinDate: [{ required: true, message: '请选择入职日期！' }],
  department: [{ required: true, message: '请选择部门！' }],
  description: [{ max: 200, message: '描述不能超过200个字符！' }],
  salary: [
    { required: true, message: '请输入薪资！' },
    { pattern: /^\d+(\.\d{1,2})?$/, message: '请输入有效的薪资数字！' },
  ],
  skills: [{ required: true, message: '请选择技能！' }],
  experience: [{ required: true, message: '请输入工作经验！' }],
} as const

export const FORM_CONFIG: TabFormConfig[] = [
  {
    key: '1',
    title: '基本信息',
    fields: [
      {
        name: 'name',
        label: '姓名',
        type: 'input',
        required: true,
        rules: FORM_VALIDATION_RULES.name,
        placeholder: '请输入姓名',
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        required: true,
        rules: FORM_VALIDATION_RULES.email,
        placeholder: '请输入邮箱',
      },
      {
        name: 'phone',
        label: '手机号',
        type: 'phone',
        required: true,
        rules: FORM_VALIDATION_RULES.phone,
        placeholder: '请输入手机号',
      },
      {
        name: 'role',
        label: '角色',
        type: 'select',
        required: true,
        rules: FORM_VALIDATION_RULES.role,
        placeholder: '请选择角色',
        options: [...ROLE_OPTIONS],
      },
      {
        name: 'joinDate',
        label: '入职日期',
        type: 'date',
        required: true,
        rules: FORM_VALIDATION_RULES.joinDate,
        placeholder: '请选择入职日期',
      },
      {
        name: 'department',
        label: '部门',
        type: 'select',
        required: true,
        rules: FORM_VALIDATION_RULES.department,
        placeholder: '请选择部门',
        options: [...DEPARTMENT_OPTIONS],
      },
      {
        name: 'description',
        label: '描述',
        type: 'textarea',
        rules: FORM_VALIDATION_RULES.description,
        placeholder: '请输入描述信息（可选）',
        maxLength: 200,
        rows: 4,
      },
    ],
  },
  {
    key: '2',
    title: '详细信息',
    fields: [
      {
        name: 'salary',
        label: '薪资',
        type: 'salary',
        required: true,
        rules: FORM_VALIDATION_RULES.salary,
        placeholder: '请输入薪资',
        prefix: '¥',
      },
      {
        name: 'skills',
        label: '技能',
        type: 'skills',
        required: true,
        rules: FORM_VALIDATION_RULES.skills,
        placeholder: '请选择技能',
        options: [...SKILL_OPTIONS],
      },
      {
        name: 'experience',
        label: '工作经验',
        type: 'textarea',
        required: true,
        rules: FORM_VALIDATION_RULES.experience,
        placeholder: '请详细描述您的工作经验...',
        maxLength: 500,
        rows: 6,
      },
    ],
  },
]
