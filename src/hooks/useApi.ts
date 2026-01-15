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
 * const mutation = useApiMutationWithRefresh('/users', 'post', {
 *   invalidateQueries: [['users']],
 *   onError: (error) => console.error(error),
 * });
 * ```
 */

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/**
 * 通用 GET 请求 Hook
 */
export function useApiQuery<TData = unknown>(
  queryKey: readonly unknown[],
  url: string,
  params?: Record<string, unknown>,
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
export function useApiMutation<TData = unknown, TVariables = unknown>(
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

interface MutationWithRefreshOptions<TData, TVariables> {
  /** 成功后需要刷新的查询 key 列表 */
  invalidateQueries: readonly unknown[][];
  /** 成功回调 */
  onSuccess?: (data: TData, variables: TVariables) => void;
  /** 错误回调 */
  onError?: (error: Error, variables: TVariables) => void;
}

/**
 * 带自动刷新和错误处理的 Mutation Hook
 */
export function useApiMutationWithRefresh<TData = unknown, TVariables = unknown>(
  url: string,
  method: Exclude<HttpMethod, 'get'> = 'post',
  options: MutationWithRefreshOptions<TData, TVariables>
) {
  const queryClient = useQueryClient();

  return useMutation<TData, Error, TVariables>({
    mutationFn: async (variables) => {
      const response = await request[method]<TData>(url, variables);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // 刷新指定的查询
      for (const queryKey of options.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey });
      }
      // 调用用户的成功回调
      options.onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      // 调用用户的错误回调
      options.onError?.(error, variables);
    },
  });
}
