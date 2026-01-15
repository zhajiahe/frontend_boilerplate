import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * 应用初始化组件
 * 负责初始化主题、认证状态等
 */
export const AppInitializer = ({ children }: AppInitializerProps) => {
  const [initialized, setInitialized] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    // 直接从 store 获取 actions，避免依赖项变化
    const { initTheme } = useThemeStore.getState();
    const { initAuth } = useAuthStore.getState();

    // 初始化主题
    initTheme();
    // 初始化认证状态
    initAuth();
    // 标记初始化完成
    setInitialized(true);
  }, []); // 空依赖数组，只在挂载时执行一次

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">{t('common.loading')}</div>
      </div>
    );
  }

  return <>{children}</>;
};
