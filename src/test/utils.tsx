import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type RenderOptions, render } from '@testing-library/react';
import i18n from 'i18next';
import type { ReactElement, ReactNode } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

// 初始化测试用 i18n
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  resources: {
    en: {
      translation: {
        common: {
          loading: 'Loading...',
        },
        auth: {
          username: 'Username',
          email: 'Email',
          password: 'Password',
          confirm_password: 'Confirm Password',
          enter_username: 'Enter username',
          enter_email: 'Enter email',
          enter_password: 'Enter password',
          enter_password_again: 'Enter password again',
          register: 'Register',
          registering: 'Registering...',
          register_success: 'Registration Successful',
          login_success_desc: 'Welcome back, {{username}}!',
        },
        examples: {
          form_example: 'Registration Form Example',
          form_example_desc: 'Form validation with React Hook Form + Zod',
        },
        validation: {
          username_min: 'Username must be at least 3 characters',
          username_max: 'Username must be at most 20 characters',
          username_pattern: 'Username can only contain letters, numbers, and underscores',
          email_invalid: 'Please enter a valid email address',
          password_min: 'Password must be at least 6 characters',
          password_max: 'Password must be at most 50 characters',
          password_mismatch: 'Passwords do not match',
        },
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

// 创建测试用的 QueryClient
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

interface WrapperProps {
  children: ReactNode;
}

// 测试包装器
const AllProviders = ({ children }: WrapperProps) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>{children}</BrowserRouter>
      </I18nextProvider>
    </QueryClientProvider>
  );
};

// 自定义 render 函数
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options });

// 重新导出所有 testing-library 工具
export * from '@testing-library/react';
export { customRender as render };
