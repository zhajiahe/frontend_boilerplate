import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="absolute top-4 right-4 flex gap-2">
      <Button
        variant={i18n.language === 'en' ? 'primary' : 'secondary'}
        onClick={() => changeLanguage('en')}
      >
        English
      </Button>
      <Button
        variant={i18n.language === 'zh' ? 'primary' : 'secondary'}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </Button>
    </div>
  );
};
