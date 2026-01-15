import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { createLoginSchema, type LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/stores/authStore';

/**
 * 登录页面
 * 使用 React Hook Form + Zod 进行表单验证
 */
export const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { toast } = useToast();

  // 使用 i18n 创建 schema
  const loginSchema = useMemo(() => createLoginSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      // TODO: 替换为真实的 API 调用
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockUser = {
        id: '1',
        username: data.username,
        nickname: data.username,
        email: `${data.username}@example.com`,
      };

      setAuth(mockUser, 'mock-access-token', 'mock-refresh-token');

      toast({
        title: t('auth.login_success'),
        description: t('auth.login_success_desc', { username: data.username }),
      });

      navigate('/');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('auth.login_failed_desc');
      toast({
        title: t('auth.login_failed'),
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 dark:from-emerald-950 dark:to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{t('auth.login')}</CardTitle>
          <CardDescription className="text-center">{t('auth.login_subtitle')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.username')}</Label>
              <Input
                id="username"
                placeholder={t('auth.enter_username')}
                disabled={isSubmitting}
                {...register('username')}
                aria-invalid={!!errors.username}
              />
              {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('auth.enter_password')}
                disabled={isSubmitting}
                {...register('password')}
                aria-invalid={!!errors.password}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('auth.logging_in') : t('auth.login')}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <span>{t('auth.no_account')}</span>
              <Link to="/register" className="ml-1 text-primary hover:underline">
                {t('auth.register_now')}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
