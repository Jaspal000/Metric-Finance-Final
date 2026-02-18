import { Link } from 'react-router-dom';
import Hero from '@/sections/Hero';
import FeaturedCalculators from '@/sections/FeaturedCalculators';
import BlogPreview from '@/sections/BlogPreview';
import { SEO } from '@/components/SEO';
import { generateOrganizationSchema, defaultSEO } from '@/utils/seo';
import { Globe, Shield, Zap, Clock, Lock, FileText } from 'lucide-react';

const Home: React.FC = () => {
  const seo = {
    ...defaultSEO,
    title: 'Metric Finance | Free Financial Calculators for Smarter Decisions',
    description: 'Plan mortgages, taxes, retirement, and investments with accurate, instant financial calculators. 100% free, no signup required. Available for US, UK, Canada, and Australia.',
  };

  const schema = generateOrganizationSchema();

  return (
    <>
      <SEO seo={seo} schema={schema} />
      
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="metric-section bg-white border-t border-slate-200">
          <div className="metric-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Why Choose Metric Finance?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Professional-grade financial tools designed for accuracy, speed, and ease of use.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#2563eb]" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Instant Results</h3>
                <p className="text-sm text-slate-600">
                  Get accurate calculations in real-time as you adjust your inputs.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">100% Free</h3>
                <p className="text-sm text-slate-600">
                  No hidden fees, no credit card required, no signup needed.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-violet-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Multi-Region</h3>
                <p className="text-sm text-slate-600">
                  Specialized calculators for US, UK, Canada, and Australia.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Professional PDF Reports</h3>
                <p className="text-sm text-slate-600">
                  Generate institutional-quality PDF reports of your calculations instantly.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedCalculators />
        
        {/* Premium CTA Section with Geometric Background */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          {/* Subtle Geometric SVG Pattern Background */}
          <div className="absolute inset-0 bg-white">
            <svg
              className="absolute inset-0 w-full h-full opacity-3"
              viewBox="0 0 1200 600"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
            >
              <defs>
                <pattern id="geo-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="1" fill="#2563eb" opacity="0.3" />
                  <line x1="0" y1="50" x2="100" y2="50" stroke="#2563eb" strokeWidth="0.5" opacity="0.15" />
                  <line x1="50" y1="0" x2="50" y2="100" stroke="#2563eb" strokeWidth="0.5" opacity="0.15" />
                  <path d="M0,0 L100,100 M100,0 L0,100" stroke="#2563eb" strokeWidth="0.5" opacity="0.1" />
                </pattern>
              </defs>
              <rect width="1200" height="600" fill="url(#geo-pattern)" />
            </svg>
          </div>

          {/* Radial Gradient Overlay for Legibility */}
          <div className="absolute inset-0 bg-gradient-radial from-white/80 via-white/85 to-white/90"></div>

          {/* Content */}
          <div className="relative z-10 metric-container text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Ready to Make Smarter Financial Decisions?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              Start exploring our free calculators and take control of your financial future today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                to="/us"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Explore US Calculators
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg border-2 border-slate-300 text-slate-900 font-bold hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                Read Financial Guides
              </Link>
            </div>

            {/* Professional Divider */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 opacity-60"></div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Trust & Accuracy</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 opacity-60"></div>
            </div>

            {/* Trust & Accuracy Endorsement Bar */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 max-w-3xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-[#2563eb] flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-600 font-medium">Bank-Grade Accuracy</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-[#2563eb] flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-600 font-medium">No Data Tracking</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 text-[#2563eb] flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs text-slate-600 font-medium">10+ Regional Tools</span>
              </div>
            </div>
          </div>
        </section>
        
        <BlogPreview />
      </main>
    </>
  );
};

export default Home;
