import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppInitializer } from '@/components/AppInitializer';
import { Layout } from '@/components/Layout';
import { Toaster } from '@/components/ui/toaster';
import { About } from '@/pages/About';
import { Dashboard } from '@/pages/Dashboard';
import { Examples } from '@/pages/Examples';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { Settings } from '@/pages/Settings';

/**
 * 加载状态组件
 */
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">加载中...</div>
  </div>
);

/**
 * 应用根组件
 *
 * 路由配置说明：
 * - basename: 使用 Vite 的 BASE_URL 配置
 * - 也可通过环境变量 VITE_BASE_PATH 覆盖
 */
function App() {
  // 从 Vite 的 BASE_URL 或环境变量读取 base path
  const basePath = import.meta.env.VITE_BASE_PATH || import.meta.env.BASE_URL || '/';

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Router basename={basePath}>
        <AppInitializer>
          <Routes>
            {/* 带导航栏的页面 */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/examples"
              element={
                <Layout>
                  <Examples />
                </Layout>
              }
            />
            <Route
              path="/about"
              element={
                <Layout>
                  <About />
                </Layout>
              }
            />
            <Route
              path="/settings"
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
            />

            {/* 不带导航栏的页面（认证页面） */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
          <Toaster />
        </AppInitializer>
      </Router>
    </Suspense>
  );
}

export default App;
