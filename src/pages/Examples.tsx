import { CheckIcon, CodeIcon, CopyIcon, DatabaseIcon, LayoutIcon, PaletteIcon } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: t('examples.copied'),
      description: t('examples.copied_to_clipboard'),
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `import { Button } from '@/components/ui/button';

<Button variant="default">
  Click me
</Button>`;

  return (
    <div className="min-h-screen bg-background">
      {/* 页面头部 */}
      <div className="border-b bg-card">
        <div className="container py-6 px-4">
          <h1 className="text-3xl font-bold tracking-tight">{t('examples.title')}</h1>
          <p className="text-muted-foreground mt-1">{t('examples.subtitle')}</p>
        </div>
      </div>

      <div className="container py-6 px-4">
        <Tabs defaultValue="buttons" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="buttons" className="gap-2">
              <PaletteIcon size={16} />
              <span className="hidden sm:inline">{t('examples.buttons')}</span>
            </TabsTrigger>
            <TabsTrigger value="forms" className="gap-2">
              <LayoutIcon size={16} />
              <span className="hidden sm:inline">{t('examples.forms')}</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="gap-2">
              <CodeIcon size={16} />
              <span className="hidden sm:inline">{t('examples.feedback')}</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2">
              <DatabaseIcon size={16} />
              <span className="hidden sm:inline">{t('examples.data')}</span>
            </TabsTrigger>
          </TabsList>

          {/* 按钮示例 */}
          <TabsContent value="buttons" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('examples.button_variants')}</CardTitle>
                <CardDescription>{t('examples.button_variants_desc')}</CardDescription>
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
                <CardTitle>{t('examples.button_sizes')}</CardTitle>
                <CardDescription>{t('examples.button_sizes_desc')}</CardDescription>
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
                <CardTitle>{t('examples.code_example')}</CardTitle>
                <CardDescription>{t('examples.code_example_desc')}</CardDescription>
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
                <CardTitle>{t('examples.input')}</CardTitle>
                <CardDescription>{t('examples.input_desc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="example-input">{t('examples.text_input')}</Label>
                  <Input
                    id="example-input"
                    placeholder={t('examples.enter_content')}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  {inputValue && (
                    <p className="text-sm text-muted-foreground">{t('examples.you_entered', { value: inputValue })}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email-input">{t('examples.email')}</Label>
                  <Input id="email-input" type="email" placeholder="your@email.com" />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password-input">{t('examples.password')}</Label>
                  <Input id="password-input" type="password" placeholder="••••••••" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t('examples.switch')}</CardTitle>
                <CardDescription>{t('examples.switch_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Switch id="example-switch" checked={switchValue} onCheckedChange={setSwitchValue} />
                  <Label htmlFor="example-switch">
                    {t('examples.enable_feature')} ({switchValue ? t('examples.on') : t('examples.off')})
                  </Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 反馈示例 */}
          <TabsContent value="feedback" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('examples.toast')}</CardTitle>
                <CardDescription>{t('examples.toast_desc')}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Button
                  onClick={() =>
                    toast({
                      title: t('examples.success_title'),
                      description: t('examples.success_desc'),
                    })
                  }
                >
                  {t('examples.default_toast')}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() =>
                    toast({
                      title: t('examples.error_title'),
                      description: t('examples.error_desc'),
                      variant: 'destructive',
                    })
                  }
                >
                  {t('examples.error_toast')}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据示例 */}
          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('examples.tanstack_query')}</CardTitle>
                <CardDescription>{t('examples.tanstack_query_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { useApiQuery } from '@/hooks/useApi';

// Fetch user list
const { data, isLoading, error } = useApiQuery(
  ['users'],
  '/api/users'
);

if (isLoading) return <div>Loading...</div>;
if (error) return <div>Error</div>;

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
                <CardTitle>{t('examples.mutation_example')}</CardTitle>
                <CardDescription>{t('examples.mutation_example_desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{`import { useApiMutation } from '@/hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const mutation = useApiMutation('/api/users', 'post', {
  onSuccess: () => {
    // Refresh user list after success
    queryClient.invalidateQueries(['users']);
  },
});

// Trigger mutation
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
