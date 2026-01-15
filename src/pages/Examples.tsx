import { CheckIcon, CodeIcon, CopyIcon, DatabaseIcon, LayoutIcon, PaletteIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

/**
 * 组件示例页面
 * 展示模板中可用的 UI 组件用法
 */
export const Examples = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: '已复制',
      description: '代码已复制到剪贴板',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `import { Button } from '@/components/ui/button';

<Button variant="default">
  点击我
</Button>`;

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="border-b bg-card">
        <div className="container py-6 px-4">
          <h1 className="text-3xl font-bold tracking-tight">组件示例</h1>
          <p className="text-muted-foreground mt-1">探索模板中可用的 UI 组件</p>
        </div>
      </div>

      <div className="container py-6 px-4">
        <Tabs defaultValue="buttons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="buttons" className="gap-2">
              <PaletteIcon size={16} />
              <span className="hidden sm:inline">按钮</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="gap-2">
              <LayoutIcon size={16} />
              <span className="hidden sm:inline">表单</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <CodeIcon size={16} />
              <span className="hidden sm:inline">反馈</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <DatabaseIcon size={16} />
              <span className="hidden sm:inline">数据</span>
            </TabsTrigger>
          </TabsList>

          {/* 按钮示例 */}
          <TabsContent value="buttons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>按钮变体</CardTitle>
                <CardDescription>不同样式的按钮组件</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button variant="default">Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>按钮尺寸</CardTitle>
                <CardDescription>不同大小的按钮</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <CheckIcon className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>代码示例</CardTitle>
                <CardDescription>如何使用按钮组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{codeExample}</code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(codeExample)}
                  >
                    {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 表单示例 */}
          <TabsContent value="forms" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>输入框</CardTitle>
                <CardDescription>基础表单输入组件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="example-input">文本输入</Label>
                  <Input
                    id="example-input"
                    placeholder="请输入内容..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {inputValue && <p className="text-sm text-muted-foreground">你输入了: {inputValue}</p>}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-input">邮箱</Label>
                  <Input id="email-input" type="email" placeholder="your@email.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-input">密码</Label>
                  <Input id="password-input" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>开关</CardTitle>
                <CardDescription>切换开关组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Switch id="example-switch" checked={switchValue} onCheckedChange={setSwitchValue} />
                  <Label htmlFor="example-switch">启用功能 ({switchValue ? '开启' : '关闭'})</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 反馈示例 */}
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Toast 通知</CardTitle>
                <CardDescription>消息提示组件</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button
                  onClick={() =>
                    toast({
                      title: '操作成功',
                      description: '您的更改已保存',
                    })
                  }
                >
                  默认通知
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    toast({
                      title: '操作失败',
                      description: '请检查您的输入',
                      variant: 'destructive',
                    })
                  }
                >
                  错误通知
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据示例 */}
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>TanStack Query 示例</CardTitle>
                <CardDescription>使用 TanStack Query 进行数据获取</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { useApiQuery } from '@/hooks/useApi';

// 获取用户列表
const { data, isLoading, error } = useApiQuery(
  ['users'],
  '/api/users'
);

if (isLoading) return <div>加载中...</div>;
if (error) return <div>出错了</div>;

return (
  <ul>
    {data?.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);`}</code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mutation 示例</CardTitle>
                <CardDescription>使用 TanStack Query 进行数据变更</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { useApiMutation } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const mutation = useApiMutation('/api/users', 'post', {
  onSuccess: () => {
    // 成功后刷新用户列表
    queryClient.invalidateQueries(['users']);
  },
});

// 触发 mutation
mutation.mutate({ name: 'New User' });`}</code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

