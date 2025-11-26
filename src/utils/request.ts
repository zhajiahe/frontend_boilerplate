import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

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
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');

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
    const token = localStorage.getItem('access_token');
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
      const error: any = new Error(response.data.msg || '请求失败');
      error.response = {
        data: response.data,
        status: response.data.code,
      };
      return Promise.reject(error);
    }
    return response;
  },
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 处理 401/403 认证错误
    if (error.response?.status === 401 || error.response?.status === 403) {
      const errorMsg = error.response?.data?.msg || '';
      const isAuthError =
        errorMsg.includes('token') ||
        errorMsg.includes('认证') ||
        errorMsg.includes('授权') ||
        errorMsg.includes('登录') ||
        error.response?.status === 401;

      if (isAuthError && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          try {
            // TODO: 实现 refresh token 逻辑
            // const response = await axios.post('/api/v1/auth/refresh', { refresh_token: refreshToken });
            // localStorage.setItem('access_token', response.data.access_token);
            // return request(originalRequest);

            clearAuthAndRedirect();
            return Promise.reject(error);
          } catch (refreshError) {
            clearAuthAndRedirect();
            return Promise.reject(refreshError);
          }
        } else {
          clearAuthAndRedirect();
          return Promise.reject(error);
        }
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
