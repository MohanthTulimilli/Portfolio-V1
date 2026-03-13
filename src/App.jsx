import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';

function App() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:projectId" element={<CaseStudy />} />
      </Routes>
    </div>
  );
}

export default App;
