# FastAPI + React 前端模板

这是一个现代化的 React + TypeScript 前端项目模板，专为 FastAPI 后端设计，包含完整的开发工具链和最佳实践。

## 🎯 特性

### 核心技术栈
- **React 18** - 现代化的 UI 框架
- **TypeScript** - 类型安全
- **Vite** - 快速的构建工具
- **React Router** - 路由管理
- **Zustand** - 轻量级状态管理
- **Axios** - HTTP 客户端

### UI 组件库
- **shadcn/ui** - 基于 Radix UI 的高质量组件
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Lucide React** - 美观的图标库

### 开发工具
- **Biome** - 快速的代码检查和格式化工具
- **Orval** - 自动生成 API 类型定义
- **pnpm** - 高效的包管理器

### 代码质量
- ✅ 统一的代码格式化
- ✅ 自动化的代码检查
- ✅ TypeScript 类型安全
- ✅ 组件化架构
- ✅ 工具函数库

## 📁 项目结构

```
frontend/
├── src/
│   ├── api/                    # API 类型定义（自动生成）
│   │   └── aPIDoc.ts
│   ├── components/             # 可复用组件
│   │   ├── ui/                 # shadcn/ui 组件
│   │   └── index.ts            # 组件导出索引
│   ├── hooks/                  # 自定义 Hooks
│   │   └── index.ts            # Hooks 导出索引
│   ├── pages/                  # 页面组件
│   ├── stores/                 # Zustand 状态管理
│   ├── utils/                  # 工具函数
│   │   ├── request.ts          # HTTP 请求封装
│   │   ├── storage.ts          # 本地存储工具
│   │   └── date.ts             # 日期格式化工具
│   ├── lib/                    # 第三方库配置
│   │   └── utils.ts            # cn() 工具函数
│   ├── App.tsx                 # 根组件
│   ├── main.tsx                # 应用入口
│   └── index.css               # 全局样式
├── public/                     # 静态资源
├── biome.json                  # Biome 配置
├── tailwind.config.ts          # Tailwind 配置
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 项目依赖
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 2. 配置环境变量

创建 `.env` 文件：

```env
# API 基础 URL
VITE_API_BASE_URL=http://localhost:8000

# 其他环境变量
VITE_APP_NAME=My App
```

### 3. 生成 API 类型（可选）

如果后端提供 OpenAPI 文档：

```bash
pnpm run gen:apis
```

### 4. 启动开发服务器

```bash
pnpm run dev
```

访问 http://localhost:5173

### 5. 构建生产版本

```bash
pnpm run build
```

## 📝 开发指南

### 添加新页面

1. 在 `src/pages/` 创建页面组件
2. 在 `src/App.tsx` 添加路由

```tsx
// src/pages/MyPage.tsx
export const MyPage = () => {
  return <div>My Page</div>;
};

// src/App.tsx
import { MyPage } from '@/pages/MyPage';

<Route path="/my-page" element={<MyPage />} />
```

### 添加新组件

1. 在 `src/components/` 创建组件
2. 在 `src/components/index.ts` 导出

```tsx
// src/components/MyComponent.tsx
export const MyComponent = () => {
  return <div>My Component</div>;
};

// src/components/index.ts
export { MyComponent } from './MyComponent';
```

### 状态管理

使用 Zustand 创建状态：

```tsx
// src/stores/myStore.ts
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
import { useMyStore } from '@/stores/myStore';

const MyComponent = () => {
  const { count, increment } = useMyStore();
  return <button onClick={increment}>{count}</button>;
};
```

### API 请求

使用封装的 request 工具：

```tsx
import request from '@/utils/request';

// GET 请求
const data = await request.get('/api/users');

// POST 请求
const result = await request.post('/api/users', { name: 'John' });

// 带参数的请求
const data = await request.get('/api/users', { params: { page: 1 } });
```

### 添加 UI 组件

使用 shadcn/ui CLI 添加组件：

```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add input
```

## 🛠️ 可用脚本

```bash
# 开发
pnpm run dev              # 启动开发服务器
pnpm run build            # 构建生产版本
pnpm run preview          # 预览生产构建

# 代码质量
pnpm run check            # 检查并自动修复
pnpm run format           # 格式化代码
pnpm run lint             # 检查代码问题

# API 类型生成
pnpm run gen:apis         # 生成 API 类型定义
```

## 🎨 样式指南

### Tailwind CSS

使用 Tailwind 实用类：

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

### 主题色

在 `tailwind.config.ts` 中自定义主题：

```ts
export default {
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        // ...
      },
    },
  },
};
```

## 📦 常用组件模式

### 表单组件

```tsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const MyForm = () => {
  const [value, setValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 处理提交
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入内容"
      />
      <Button type="submit">提交</Button>
    </form>
  );
};
```

### 列表组件

```tsx
interface Item {
  id: string;
  name: string;
}

export const MyList = ({ items }: { items: Item[] }) => {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="p-4 border rounded-lg">
          {item.name}
        </div>
      ))}
    </div>
  );
};
```

### 加载状态

```tsx
export const MyComponent = () => {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <div>加载中...</div>;
  }

  return <div>内容</div>;
};
```

## 🔧 配置说明

### TypeScript 配置

`tsconfig.json` 已配置路径别名：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

使用：

```tsx
import { MyComponent } from '@/components/MyComponent';
import request from '@/utils/request';
```

### Vite 配置

`vite.config.ts` 已配置：
- 路径别名
- 端口号
- 代理设置（可选）

### Biome 配置

`biome.json` 已配置：
- 2 空格缩进
- 单引号
- 120 字符行宽
- 自动组织导入

## 📚 最佳实践

### 1. 组件设计
- 保持组件小而专注
- 使用 TypeScript 类型
- 提取可复用逻辑到 hooks

### 2. 状态管理
- 本地状态用 useState
- 全局状态用 Zustand
- 服务器状态考虑 React Query

### 3. 性能优化
- 使用 React.memo 避免不必要的重渲染
- 使用 useCallback 和 useMemo
- 懒加载路由和组件

### 4. 代码组织
- 按功能组织文件
- 使用 index.ts 统一导出
- 保持导入路径简洁

### 5. 类型安全
- 为所有函数添加类型注解
- 避免使用 any
- 使用 Orval 生成 API 类型

## 📄 许可证

MIT License

