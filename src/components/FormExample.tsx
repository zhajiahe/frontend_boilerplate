import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { type RegisterFormData, registerSchema } from '@/lib/validations';

/**
 * 表单示例组件
 * 展示 React Hook Form + Zod 的用法
 * 复用 validations.ts 中的 registerSchema
 */
export const FormExample = () => {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    // 模拟 API 请求
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('表单数据:', data);
    toast({
      title: '提交成功',
      description: `欢迎, ${data.username}!`,
    });

    reset();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>注册表单示例</CardTitle>
        <CardDescription>使用 React Hook Form + Zod 进行表单验证</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 用户名 */}
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input
              id="username"
              placeholder="请输入用户名"
              {...register('username')}
              aria-invalid={!!errors.username}
            />
            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
          </div>

          {/* 邮箱 */}
          <div className="space-y-2">
            <Label htmlFor="email">邮箱</Label>
            <Input
              id="email"
              type="email"
              placeholder="请输入邮箱"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              placeholder="请输入密码"
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          {/* 确认密码 */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">确认密码</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              {...register('confirmPassword')}
              aria-invalid={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '提交中...' : '注册'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
