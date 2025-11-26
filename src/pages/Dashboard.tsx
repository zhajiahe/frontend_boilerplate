import { ActivityIcon, BarChart3Icon, TrendingUpIcon, UsersIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * 仪表盘示例页面
 * 展示如何使用 Card 组件构建数据展示页面
 */
export const Dashboard = () => {
  const { t } = useTranslation();

  const stats = [
    {
      titleKey: 'dashboard.stats.total_users',
      value: '1,234',
      descKey: 'dashboard.stats.growth',
      icon: UsersIcon,
    },
    {
      titleKey: 'dashboard.stats.active_users',
      value: '567',
      descKey: 'dashboard.stats.today_active',
      icon: ActivityIcon,
    },
    {
      titleKey: 'dashboard.stats.revenue',
      value: '¥12,345',
      descKey: 'dashboard.stats.monthly_total',
      icon: TrendingUpIcon,
    },
    {
      titleKey: 'dashboard.stats.orders',
      value: '89',
      descKey: 'dashboard.stats.pending',
      icon: BarChart3Icon,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* 页面头部 */}
      <div className="border-b bg-card/50">
        <div className="container py-8 px-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('dashboard.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('dashboard.subtitle')}</p>
        </div>
      </div>

      <div className="container py-8 px-4 space-y-8">
        {/* 统计卡片 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.titleKey} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{t(stat.titleKey)}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{t(stat.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 内容区域 */}
        <div className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>{t('dashboard.overview')}</CardTitle>
              <CardDescription>{t('dashboard.overview_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3Icon className="h-16 w-16 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">{t('dashboard.chart_area')}</p>
                <p className="text-sm mt-2">{t('dashboard.chart_hint')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
              <CardDescription>{t('dashboard.recent_activity_desc')}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      U{i}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{t('dashboard.user_action', { num: i })}</p>
                      <p className="text-xs text-muted-foreground">{t('dashboard.minutes_ago', { num: i * 10 })}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
