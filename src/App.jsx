import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import { SkeletonGrid, SkeletonAbout } from './components/SkeletonLoader';
import { routerBase } from './utils/baseUrl';

// Code splitting: Lazy load pages
const Home = lazy(() => import('./views/Home'));
const About = lazy(() => import('./views/About'));
const Portfolio = lazy(() => import('./views/Portfolio'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<div className="loading-container"><SkeletonGrid count={3} /></div>}>
              <Home />
            </Suspense>
          } 
        />
        <Route 
          path="/about" 
          element={
            <Suspense fallback={<div className="loading-container"><SkeletonAbout /></div>}>
              <About />
            </Suspense>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <Suspense fallback={<div className="loading-container"><SkeletonGrid count={6} /></div>}>
              <Portfolio />
            </Suspense>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router basename={routerBase}>
      <AppShell />
    </Router>
  );
}

function AppShell() {
  const location = useLocation();
  const hideHeader = location.pathname === '/';

  return (
    <div className="App">
      <ScrollToTop />
      {!hideHeader && <Header />}
      <AnimatedRoutes />
    </div>
  );
}

export default App;
