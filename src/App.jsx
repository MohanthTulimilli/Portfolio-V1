import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import LoadingSpinner from './components/LoadingSpinner';
import NotFound from './pages/NotFound';

// Optional: add delay to see loading spinner when testing (remove in production)
const delay = (ms) => (m) => new Promise((r) => setTimeout(() => r(m), ms));
const Home = lazy(() => import('./pages/Home').then(delay(800)));
const CaseStudy = lazy(() => import('./pages/CaseStudy').then(delay(800)));

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:projectId" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <BackToTop />
    </div>
  );
}

export default App;
