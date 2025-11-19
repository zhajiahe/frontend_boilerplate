import { Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 dark:from-emerald-950 dark:to-slate-900">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-foreground">{t('welcome_to_template')}</h1>
        <p className="text-xl text-muted-foreground">{t('start_building')}</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button asChild>
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              {t('react_docs')}
            </a>
          </Button>
          <Button asChild variant="secondary">
            <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
              {t('shadcn_docs')}
            </a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/zhajiahe/frontend_boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="w-4 h-4" />
              {t('github_repo')}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
