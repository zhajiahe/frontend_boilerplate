import { create } from 'zustand';
import { storage } from '@/utils/storage';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'light',

  setTheme: (theme) => {
    set({ theme });
    storage.setTheme(theme);
    // 应用主题到 document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(newTheme);
  },

  initTheme: () => {
    const savedTheme = storage.getTheme();
    const theme = savedTheme || 'light';
    get().setTheme(theme);
  },
}));
