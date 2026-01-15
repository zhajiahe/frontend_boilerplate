import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';

/**
 * 获取登录页路径
 * 使用环境变量配置的 base path
 */
const getLoginPath = () => {
  const basePath = import.meta.env.VITE_BASE_PATH || '';
  return `${basePath}/login`.replace(/\/+/g, '/');
};

/**
 * 清除认证信息并重定向到登录页
 */
const clearAuthAndRedirect = () => {
  storage.clearAuth();

  const currentPath = window.location.pathname;
  const loginPath = getLoginPath();
  if (!currentPath.includes('/login') && !currentPath.includes('/register')) {
    window.location.href = loginPath;
  }
};

/**
 * Axios 请求实例
 *
 * 配置说明：
 * - baseURL: 通过环境变量 VITE_API_BASE_URL 配置，默认为 '/api/v1'
 * - timeout: 请求超时时间，默认 30 秒
 */
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 请求拦截器
 * 自动添加 Authorization header
 */
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 * 处理业务错误和认证失败
 */
request.interceptors.response.use(
  (response) => {
    // 检查 BaseResponse 格式的错误（如果后端使用统一响应格式）
    if (response.data && response.data.success === false) {
      const error = new Error(response.data.msg || 'Request failed') as Error & {
        response?: { data: unknown; status: number };
      };
      error.response = {
        data: response.data,
        status: response.data.code,
      };
      return Promise.reject(error);
    }
    return response;
  },
  async (error: AxiosError<{ msg?: string; code?: string }>) => {
    const status = error.response?.status;

    // 处理 401 未授权 - 直接清除认证
    if (status === 401) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    // 处理 403 禁止访问 - 可能是权限不足，不一定需要重新登录
    // 仅当响应明确表示 token 无效时才清除认证
    if (status === 403) {
      const errorCode = error.response?.data?.code || '';
      // 使用错误码判断，避免依赖语言特定的错误消息
      const tokenInvalidCodes = ['TOKEN_EXPIRED', 'TOKEN_INVALID', 'UNAUTHORIZED'];
      if (tokenInvalidCodes.includes(errorCode)) {
        clearAuthAndRedirect();
        return Promise.reject(error);
      }
    }

    // 增强错误信息
    if (error.response?.data?.msg) {
      error.message = error.response.data.msg;
    }

    return Promise.reject(error);
  }
);

export default request;
