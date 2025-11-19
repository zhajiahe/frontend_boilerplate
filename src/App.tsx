import { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Toaster } from '@/components/ui/toaster';
import { Home } from '@/pages/Home';

function App() {
  return (
    <Suspense fallback="loading">
      <Router basename="/web/">
        <LanguageSwitcher />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Toaster />
      </Router>
    </Suspense>
  );
}

export default App;
