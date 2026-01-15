import { CheckCircle2Icon, ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * 关于页面
 * 展示项目信息和技术栈
 */
export const About = () => {
  const { t } = useTranslation();

  const techStack = [
    { name: 'React 18', descKey: 'react', url: 'https://react.dev' },
    { name: 'TypeScript', descKey: 'typescript', url: 'https://www.typescriptlang.org' },
    { name: 'Vite', descKey: 'vite', url: 'https://vitejs.dev' },
    { name: 'TanStack Query', descKey: 'tanstack', url: 'https://tanstack.com/query' },
    { name: 'React Hook Form', descKey: 'rhf', url: 'https://react-hook-form.com' },
    { name: 'Zod', descKey: 'zod', url: 'https://zod.dev' },
    { name: 'Zustand', descKey: 'zustand', url: 'https://zustand-demo.pmnd.rs' },
    { name: 'Vitest', descKey: 'vitest', url: 'https://vitest.dev' },
    { name: 'shadcn/ui', descKey: 'shadcn', url: 'https://ui.shadcn.com' },
    { name: 'Tailwind CSS', descKey: 'tailwind', url: 'https://tailwindcss.com' },
    { name: 'React Router', descKey: 'router', url: 'https://reactrouter.com' },
    { name: 'i18next', descKey: 'i18next', url: 'https://www.i18next.com' },
  ];

  const featureKeys = [
    'ready_to_use',
    'typescript',
    'form_validation',
    'data_fetching',
    'state_management',
    'testing',
    'i18n',
    'dark_mode',
    'code_quality',
  ];

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* 页面头部 */}
      <div className="border-b bg-gradient-to-r from-emerald-500/10 to-blue-500/10">
        <div className="container py-12 px-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">{t('about.title')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('about.subtitle')}</p>
        </div>
      </div>

      <div className="container py-8 px-4 space-y-8">
        {/* 特性列表 */}
        <Card>
          <CardHeader>
            <CardTitle>✨ {t('about.features')}</CardTitle>
            <CardDescription>{t('about.features_desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {featureKeys.map((key) => (
                <div key={key} className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm">{t(`about.feature_list.${key}`)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 技术栈 */}
        <div>
          <h2 className="text-2xl font-bold mb-4">🛠️ {t('about.tech_stack')}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map((tech) => (
              <Card key={tech.name} className="group hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {tech.name}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      asChild
                    >
                      <a href={tech.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{t(`about.tech_desc.${tech.descKey}`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 快速开始 */}
        <Card>
          <CardHeader>
            <CardTitle>🚀 {t('about.quick_start')}</CardTitle>
            <CardDescription>{t('about.quick_start_desc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
                  <code>{`# Install dependencies
bun install

# Start dev server
bun run dev

# Run tests
bun run test:run

# Build for production
bun run build`}</code>
                </pre>
              </div>
              <p className="text-sm text-muted-foreground">{t('about.more_info')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
