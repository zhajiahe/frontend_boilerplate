import {
  type UseMutationOptions,
  type UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import request from '@/utils/request';

/**
 * TanStack Query + Axios 封装
 *
 * 使用方法：
 * ```tsx
 * // GET 请求
 * const { data, isLoading } = useApiQuery(['users'], '/users');
 *
 * // POST/PUT/DELETE 请求
 * const mutation = useApiMutation('/users', 'post');
 * mutation.mutate({ name: 'John' });
 *
 * // 带自动刷新
 * const mutation = useApiMutationWithRefresh('/users', 'post', [['users']]);
 * ```
 */

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/**
 * 通用 GET 请求 Hook
 */
export function useApiQuery<TData = any>(
  queryKey: readonly unknown[],
  url: string,
  params?: Record<string, any>,
  options?: Omit<UseQueryOptions<TData>, 'queryKey' | 'queryFn'>
) {
  return useQuery<TData>({
    queryKey,
    queryFn: async () => {
      const response = await request.get<TData>(url, { params });
      return response.data;
    },
    ...options,
  });
}

/**
 * 通用 Mutation Hook（POST/PUT/PATCH/DELETE）
 */
export function useApiMutation<TData = any, TVariables = any>(
  url: string,
  method: Exclude<HttpMethod, 'get'> = 'post',
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, 'mutationFn'>
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await request[method]<TData>(url, variables);
      return response.data;
    },
    ...options,
  });
}

/**
 * 带自动刷新的 Mutation Hook
 */
export function useApiMutationWithRefresh<TData = any, TVariables = any>(
  url: string,
  method: Exclude<HttpMethod, 'get'> = 'post',
  invalidateQueries: readonly unknown[][]
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await request[method]<TData>(url, variables);
      return response.data;
    },
    onSuccess: () => {
      for (const queryKey of invalidateQueries) {
        queryClient.invalidateQueries({ queryKey });
      }
    },
  });
}
