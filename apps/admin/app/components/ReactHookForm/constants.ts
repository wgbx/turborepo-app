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
        placeholder: '请输入姓名',
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'email',
        required: true,
        placeholder: '请输入邮箱',
      },
      {
        name: 'phone',
        label: '手机号',
        type: 'phone',
        required: true,
        placeholder: '请输入手机号',
      },
      {
        name: 'role',
        label: '角色',
        type: 'select',
        required: true,
        placeholder: '请选择角色',
        options: [...ROLE_OPTIONS],
      },
      {
        name: 'joinDate',
        label: '入职日期',
        type: 'date',
        required: true,
        placeholder: '请选择入职日期',
      },
      {
        name: 'department',
        label: '部门',
        type: 'select',
        required: true,
        placeholder: '请选择部门',
        options: [...DEPARTMENT_OPTIONS],
      },
      {
        name: 'description',
        label: '描述',
        type: 'textarea',
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
        placeholder: '请输入薪资',
        prefix: '¥',
      },
      {
        name: 'skills',
        label: '技能',
        type: 'skills',
        required: true,
        placeholder: '请选择技能',
        options: [...SKILL_OPTIONS],
      },
      {
        name: 'experience',
        label: '工作经验',
        type: 'textarea',
        required: true,
        placeholder: '请详细描述您的工作经验...',
        maxLength: 500,
        rows: 6,
      },
    ],
  },
]
