export interface DemoItem {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
}

export function generateDemoData(count: number): DemoItem[] {
  const roles = ['管理员', '编辑', '查看者', '开发者', '测试员']
  const statuses: DemoItem['status'][] = ['active', 'inactive', 'pending']

  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `用户 ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: roles[index % roles.length]!,
    status: statuses[index % statuses.length]!,
  }))
}
