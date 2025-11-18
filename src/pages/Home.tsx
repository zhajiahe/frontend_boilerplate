export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 dark:from-emerald-950 dark:to-slate-900">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-foreground">
          欢迎使用前端模板
        </h1>
        <p className="text-xl text-muted-foreground">
          开始构建你的应用吧！
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            React 文档
          </a>
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            shadcn/ui 文档
          </a>
        </div>
      </div>
    </div>
  );
};
