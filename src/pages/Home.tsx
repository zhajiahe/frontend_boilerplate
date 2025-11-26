import { ArrowRightIcon, SparklesIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/**
 * 首页组件
 * 模板的欢迎页面 - 内容垂直居中
 */
export const Home = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { path: '/dashboard', labelKey: 'home.quick_links.dashboard', descKey: 'home.quick_links.dashboard_desc' },
    { path: '/examples', labelKey: 'home.quick_links.examples', descKey: 'home.quick_links.examples_desc' },
    { path: '/about', labelKey: 'home.quick_links.about', descKey: 'home.quick_links.about_desc' },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 py-16">
      {/* Hero 区域 */}
      <div className="w-full max-w-4xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm">
          <SparklesIcon className="h-4 w-4 text-yellow-500" />
          <span>React + TypeScript + TanStack Query</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">{t('home.title')}</h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">{t('home.subtitle')}</p>

        <div className="flex gap-4 justify-center flex-wrap pt-4">
          <Button size="lg" asChild className="h-12 px-8">
            <Link to="/examples" className="gap-2">
              {t('home.explore')}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="h-12 px-8">
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              {t('home.react_docs')}
            </a>
          </Button>
        </div>
      </div>

      {/* 快速链接 */}
      <div className="w-full max-w-4xl mx-auto">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card className="h-full hover:shadow-lg hover:border-primary/50 transition-all duration-200 group">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {t(link.labelKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t(link.descKey)}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
