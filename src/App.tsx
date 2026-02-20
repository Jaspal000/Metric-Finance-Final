// App component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

// Pages
import Home from '@/pages/Home';
import Region from '@/pages/Region';
import CalculatorPage from '@/pages/CalculatorPage';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Disclaimer from '@/pages/Disclaimer';

import './App.css';

function App() {
  return (
    <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col overflow-x-hidden m-0 p-0">
          <Navigation />
          <div className="flex-1 w-full">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />
              
              {/* Region Pages */}
              <Route path="/us" element={<Region />} />
              <Route path="/uk" element={<Region />} />
              <Route path="/ca" element={<Region />} />
              <Route path="/au" element={<Region />} />
              
              {/* Calculator Pages */}
              <Route path="/:region/:slug" element={<CalculatorPage />} />
              
              {/* Blog */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Legal Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              
              {/* 404 - Redirect to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
    </Router>
  );
}

export default App;
