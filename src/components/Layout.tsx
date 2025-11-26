import {
  BookOpenIcon,
  Check,
  HomeIcon,
  Languages,
  LayoutDashboardIcon,
  LogInIcon,
  MoonIcon,
  PaletteIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/stores/themeStore';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * 应用布局组件
 * 包含顶部导航栏
 */
const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
];

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { theme, toggleTheme } = useThemeStore();
  const { t, i18n } = useTranslation();

  const navItems = [
    { path: '/', labelKey: 'common.home', icon: HomeIcon },
    { path: '/dashboard', labelKey: 'common.dashboard', icon: LayoutDashboardIcon },
    { path: '/examples', labelKey: 'common.examples', icon: PaletteIcon },
    { path: '/about', labelKey: 'common.about', icon: BookOpenIcon },
  ];

  const isActive = (path: string) => location.pathname === path;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const getCurrentLanguage = () => {
    return i18n.language.split('-')[0];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          {/* Logo */}
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              T
            </div>
            <span className="hidden font-bold sm:inline-block">Template</span>
          </Link>

          {/* 主导航 */}
          <nav className="flex items-center space-x-1 flex-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                size="sm"
                asChild
                className={cn('gap-2', isActive(item.path) && 'bg-muted')}
              >
                <Link to={item.path}>
                  <item.icon className="h-4 w-4" />
                  <span className="hidden md:inline">{t(item.labelKey)}</span>
                </Link>
              </Button>
            ))}
          </nav>

          {/* 右侧操作 */}
          <div className="flex items-center gap-2">
            {/* 语言切换 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn('mr-2 h-4 w-4', getCurrentLanguage() === lang.code ? 'opacity-100' : 'opacity-0')}
                    />
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 主题切换 */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </Button>

            {/* 设置 */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <SettingsIcon className="h-4 w-4" />
              </Link>
            </Button>

            {/* 登录 */}
            <Button variant="outline" size="sm" asChild className="gap-2">
              <Link to="/login">
                <LogInIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{t('common.login')}</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* 页面内容 */}
      <main>{children}</main>
    </div>
  );
};
