import dayjs from 'dayjs'

export const USER_FORM_PRESET_DATA = {
  name: '李四',
  email: 'lisi@example.com',
  phone: '13900139000',
  role: 'user',
  joinDate: dayjs('2023-01-15'),
  department: 'hr',
  description: '这是ReactHookForm的预设描述信息。',
  salary: '12000',
  skills: ['javascript', 'vue', 'git'],
  experience: '3年前端开发经验，熟悉Vue、JavaScript等技术栈。',
}

export const EMPTY_DATA = {
  name: '',
  email: '',
  phone: '',
  role: '',
  joinDate: undefined,
  department: '',
  description: '',
}
