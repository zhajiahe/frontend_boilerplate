import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 默认缓存时间 5 分钟
      staleTime: 5 * 60 * 1000,
      // 默认缓存保留时间 30 分钟
      gcTime: 30 * 60 * 1000,
      // 窗口聚焦时重新获取
      refetchOnWindowFocus: false,
      // 重连时重新获取
      refetchOnReconnect: true,
      // 重试次数
      retry: 1,
    },
    mutations: {
      // mutation 重试次数
      retry: 0,
    },
  },
});

