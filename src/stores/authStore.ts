import { create } from 'zustand';
import type { User } from '@/types/user';
import { storage } from '@/utils/storage';

// 重新导出 User 类型以保持向后兼容
export type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;

  // Actions
  setAuth: (user: User, token: string, refreshToken: string) => void;
  clearAuth: () => void;
  /** 登出（仅清除状态，跳转由调用方处理） */
  logout: () => void;
  updateUser: (user: User) => void;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: (user, token, refreshToken) => {
    storage.setToken(token);
    storage.setRefreshToken(refreshToken);
    storage.setUser(user);
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: () => {
    storage.clearAuth();
    set({ user: null, token: null, isAuthenticated: false });
  },

  logout: () => {
    storage.clearAuth();
    set({ user: null, token: null, isAuthenticated: false });
    // 注意：跳转由调用方通过 navigate('/login') 处理
  },

  updateUser: (user) => {
    storage.setUser(user);
    set({ user });
  },

  initAuth: () => {
    const token = storage.getToken();
    const user = storage.getUser();
    if (token && user) {
      set({ user, token, isAuthenticated: true });
    }
  },
}));
