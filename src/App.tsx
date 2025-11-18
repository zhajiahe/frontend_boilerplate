import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Toaster } from '@/components/ui/toaster';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

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
