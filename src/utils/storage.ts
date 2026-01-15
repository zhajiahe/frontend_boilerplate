import type { User } from '@/types/user';

/**
 * 本地存储工具类
 */

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme',
} as const;

export const storage = {
  // 获取 token
  getToken: (): string | null => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN),

  // 设置 token
  setToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token),

  // 移除 token
  removeToken: (): void => localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),

  // 获取 refresh token
  getRefreshToken: (): string | null => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN),

  // 设置 refresh token
  setRefreshToken: (token: string): void => localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token),

  // 移除 refresh token
  removeRefreshToken: (): void => localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),

  // 获取用户信息
  getUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    if (!user) return null;
    try {
      return JSON.parse(user) as User;
    } catch {
      return null;
    }
  },

  // 设置用户信息
  setUser: (user: User): void => localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user)),

  // 移除用户信息
  removeUser: (): void => localStorage.removeItem(STORAGE_KEYS.USER),

  // 获取主题
  getTheme: (): 'light' | 'dark' | null => {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    if (theme === 'light' || theme === 'dark') return theme;
    return null;
  },

  // 设置主题
  setTheme: (theme: 'light' | 'dark'): void => localStorage.setItem(STORAGE_KEYS.THEME, theme),

  // 清除所有认证信息
  clearAuth: (): void => {
    storage.removeToken();
    storage.removeRefreshToken();
    storage.removeUser();
  },
};
