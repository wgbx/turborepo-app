import { UserItem, CreateUserData, UpdateUserData, PaginatedResponse, QueryParams } from './types'

const mockUsers: UserItem[] = [
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangsan',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisi',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=wangwu',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
]

let users = [...mockUsers]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const userApi = {
  async getUsers(params: QueryParams = {}): Promise<PaginatedResponse<UserItem>> {
    await delay(500)

    let filteredUsers = [...users]

    if (params.search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(params.search!.toLowerCase()) || user.email.toLowerCase().includes(params.search!.toLowerCase()),
      )
    }

    if (params.status) {
      filteredUsers = filteredUsers.filter((user) => user.status === params.status)
    }

    if (params.role) {
      filteredUsers = filteredUsers.filter((user) => user.role === params.role)
    }

    const page = params.page || 1
    const pageSize = params.pageSize || 10
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const paginatedUsers = filteredUsers.slice(start, end)

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredUsers.length / pageSize),
    }
  },

  async getUser(id: number): Promise<UserItem> {
    await delay(300)
    const user = users.find((u) => u.id === id)
    if (!user) {
      throw new Error('用户不存在')
    }
    return user
  },

  async createUser(data: CreateUserData): Promise<UserItem> {
    await delay(800)

    const newUser: UserItem = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      ...data,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    users.push(newUser)
    return newUser
  },

  async updateUser(data: UpdateUserData): Promise<UserItem> {
    await delay(600)

    const index = users.findIndex((u) => u.id === data.id)
    if (index === -1) {
      throw new Error('用户不存在')
    }

    const updatedUser: UserItem = {
      ...users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    } as UserItem

    users[index] = updatedUser
    return updatedUser
  },

  async deleteUser(id: number): Promise<void> {
    await delay(400)

    const index = users.findIndex((u) => u.id === id)
    if (index === -1) {
      throw new Error('用户不存在')
    }

    users.splice(index, 1)
  },
}
