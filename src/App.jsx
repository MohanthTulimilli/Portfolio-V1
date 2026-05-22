import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import LoadingSpinner from './components/LoadingSpinner';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const CaseStudy = lazy(() => import('./pages/CaseStudy'));

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/project/:projectId" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <BackToTop />
      <CookieConsent />
    </div>
  );
}

export default App;
