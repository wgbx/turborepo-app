import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { userApi } from '../api'
import { QueryParams, CreateUserData, UpdateUserData } from '../types'

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: QueryParams) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
}

export function useUsers(params: QueryParams = {}) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => userApi.getUsers(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useInfiniteUsers(params: Omit<QueryParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: userKeys.list(params),
    queryFn: ({ pageParam = 1 }) => userApi.getUsers({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useUser(id: number) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      queryClient.setQueryData(userKeys.detail(newUser.id), newUser)
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.updateUser,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: userKeys.detail(updatedUser.id) })

      const previousUser = queryClient.getQueryData(userKeys.detail(updatedUser.id))

      queryClient.setQueryData(userKeys.detail(updatedUser.id), (old: any) => ({
        ...old,
        ...updatedUser,
      }))

      return { previousUser }
    },
    onError: (err, updatedUser, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(userKeys.detail(updatedUser.id), context.previousUser)
      }
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userApi.deleteUser,
    onMutate: async (userId) => {
      await queryClient.cancelQueries({ queryKey: userKeys.lists() })

      const previousUsers = queryClient.getQueriesData({ queryKey: userKeys.lists() })

      queryClient.setQueriesData({ queryKey: userKeys.lists() }, (old: any) => {
        if (!old?.data) return old
        return {
          ...old,
          data: old.data.filter((user: any) => user.id !== userId),
          total: old.total - 1,
        }
      })

      return { previousUsers }
    },
    onError: (err, userId, context) => {
      if (context?.previousUsers) {
        context.previousUsers.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() })
    },
  })
}
