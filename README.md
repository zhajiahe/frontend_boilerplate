# React 前端模板

一个现代化的 Vite + React + TypeScript 前端项目模板，集成了最佳实践和常用工具。

[online demo](https://b0ddda1e.pinit.eth.limo/)(Powered by pinme)

## 🎯 特性

### 核心技术栈
- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速的构建工具
- **React Router** - 路由管理

### 数据获取与状态管理
- **TanStack Query** - 强大的数据获取和缓存库
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 客户端

### 表单处理
- **React Hook Form** - 高性能表单库
- **Zod** - TypeScript 优先的 Schema 验证
- **@hookform/resolvers** - 表单验证适配器

### UI 组件库
- **shadcn/ui** - 基于 Radix UI 的高质量组件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 美观的图标库

### 测试框架
- **Vitest** - 快速的单元测试框架
- **@testing-library/react** - React 组件测试
- **jsdom** - 浏览器环境模拟

### 开发工具
- **Biome** - 快速的代码检查和格式化工具
- **Orval** - 自动生成 API 类型定义
- **Bun** - 高效的包管理器和运行时

### 国际化
- **i18next** - 国际化框架
- **react-i18next** - React 集成

## 📁 项目结构

```
src/
├── components/             # 可复用组件
│   ├── ui/                 # shadcn/ui 组件
│   ├── FormExample.tsx     # 表单示例组件
│   └── index.ts            # 组件导出索引
├── hooks/                  # 自定义 Hooks
│   ├── useApi.ts           # TanStack Query 封装
│   ├── use-toast.ts        # Toast 通知
│   └── index.ts            # Hooks 导出索引
├── lib/                    # 库配置
│   ├── queryClient.ts      # TanStack Query 客户端
│   ├── validations.ts      # Zod 验证 Schema
│   └── utils.ts            # cn() 工具函数
├── pages/                  # 页面组件
├── stores/                 # Zustand 状态管理
├── types/                  # TypeScript 类型定义
├── test/                   # 测试配置
│   ├── setup.ts            # 测试初始化
│   └── utils.tsx           # 测试工具函数
├── utils/                  # 工具函数
│   ├── request.ts          # HTTP 请求封装
│   ├── storage.ts          # 本地存储工具
│   └── date.ts             # 日期格式化工具
├── App.tsx                 # 根组件
├── main.tsx                # 应用入口
├── i18n.ts                 # i18n 配置
└── index.css               # 全局样式
```

## 🚀 快速开始

### 1. 安装依赖

```bash
bun install
```

### 2. 启动开发服务器

```bash
bun run dev
```

访问 http://localhost:5173

### 3. 构建生产版本

```bash
bun run build
```

## 🛠️ 可用脚本

```bash
# 开发
bun run dev              # 启动开发服务器
bun run build            # 构建生产版本
bun run preview          # 预览生产构建

# 代码质量
bun run check            # 检查并自动修复
bun run format           # 格式化代码
bun run lint             # 检查代码问题

# 测试
bun run test             # 运行测试（监听模式）
bun run test:run         # 运行测试（单次）
bun run test:coverage    # 运行测试并生成覆盖率报告

# API 类型生成
bun run gen:apis         # 生成 API 类型定义
```

## 📝 开发指南

### 表单处理（React Hook Form + Zod）

使用预定义的验证 Schema：

```tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type LoginFormData, loginSchema } from '@/lib/validations';

const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm<LoginFormData>({
  resolver: zodResolver(loginSchema),
});

const onSubmit = async (data: LoginFormData) => {
  // 处理提交
};

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <Input {...register('username')} />
    {errors.username && <p>{errors.username.message}</p>}
    <Button type="submit" disabled={isSubmitting}>
      {isSubmitting ? '提交中...' : '提交'}
    </Button>
  </form>
);
```

使用 i18n 的验证 Schema（推荐）：

```tsx
import { useTranslation } from 'react-i18next';
import { createLoginSchema } from '@/lib/validations';

const { t } = useTranslation();
const loginSchema = useMemo(() => createLoginSchema(t), [t]);

// 然后像上面一样使用
```

自定义验证 Schema：

```tsx
import { z } from 'zod';
import { createEmailSchema, createPasswordSchema } from '@/lib/validations';

const myFormSchema = (t: TFunction) => z.object({
  email: createEmailSchema(t),
  password: createPasswordSchema(t),
  name: z.string().min(1, t('validation.name_required')),
});

type MyFormData = z.infer<ReturnType<typeof myFormSchema>>;
```

### 数据获取（TanStack Query）

```tsx
import { useApiQuery, useApiMutation, useApiMutationWithRefresh } from '@/hooks/useApi';

// GET 请求
const { data, isLoading, error } = useApiQuery(['users'], '/api/users');

// POST/PUT/DELETE 请求
const mutation = useApiMutation('/api/users', 'post');
mutation.mutate({ name: 'John' });

// 带自动刷新和错误处理
const mutation = useApiMutationWithRefresh('/api/users', 'post', {
  invalidateQueries: [['users']],
  onSuccess: (data) => console.log('Success:', data),
  onError: (error) => console.error('Error:', error),
});
```

### 状态管理（Zustand）

```tsx
import { create } from 'zustand';

interface MyState {
  count: number;
  increment: () => void;
}

export const useMyStore = create<MyState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// 使用
const { count, increment } = useMyStore();
```

### 测试

编写测试：

```tsx
// src/components/MyComponent.test.tsx
import { render, screen } from '@/test/utils';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

运行测试：

```bash
bun run test:run
```

### 添加 UI 组件

```bash
bunx shadcn@latest add button
bunx shadcn@latest add dialog
bunx shadcn@latest add input
```

## 📚 预定义验证 Schema

`src/lib/validations.ts` 包含常用的验证规则：

| Schema | 说明 |
|--------|------|
| `createUsernameSchema(t)` | 用户名（3-20字符，字母数字下划线） |
| `createEmailSchema(t)` | 邮箱格式验证 |
| `createPasswordSchema(t)` | 密码（6-50字符） |
| `createStrongPasswordSchema(t)` | 强密码（包含大小写、数字、特殊字符） |
| `createLoginSchema(t)` | 登录表单 |
| `createRegisterSchema(t)` | 注册表单 |
| `createProfileSchema(t)` | 个人资料 |

> 注：所有 `createXxxSchema(t)` 函数接受 i18next 的 `t` 函数以支持国际化。

## 🎨 样式指南

### Tailwind CSS

```tsx
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">Title</h1>
</div>
```

### 响应式设计

```tsx
<div className="w-full md:w-1/2 lg:w-1/3">
  {/* 移动端全宽，平板半宽，桌面1/3宽 */}
</div>
```

### 深色模式

主题切换已集成在 `useThemeStore` 中：

```tsx
import { useThemeStore } from '@/stores/themeStore';

const { theme, toggleTheme } = useThemeStore();
```

## 🤖 AI Agent 指南

参见 [AGENTS.md](./AGENTS.md) 了解如何让 AI 编码助手更好地理解和操作此项目。

## 📄 许可证

MIT License
