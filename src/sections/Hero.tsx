import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, ShieldCheck, EyeOff, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white w-full m-0 p-0">
      {/* Mathematical 3x3 Grid Watermark - Premium Institutional Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Dense Mathematical Grid - Premium Institutional Pattern */}
          <g stroke="#64748b" strokeWidth="1.2" opacity="0.18">
            {/* Vertical lines - Dense 100px spacing */}
            <line x1="100" y1="0" x2="100" y2="800" />
            <line x1="200" y1="0" x2="200" y2="800" />
            <line x1="300" y1="0" x2="300" y2="800" />
            <line x1="400" y1="0" x2="400" y2="800" />
            <line x1="500" y1="0" x2="500" y2="800" />
            <line x1="600" y1="0" x2="600" y2="800" />
            <line x1="700" y1="0" x2="700" y2="800" />
            <line x1="800" y1="0" x2="800" y2="800" />
            <line x1="900" y1="0" x2="900" y2="800" />
            <line x1="1000" y1="0" x2="1000" y2="800" />
            <line x1="1100" y1="0" x2="1100" y2="800" />
            
            {/* Horizontal lines - Dense 100px spacing */}
            <line x1="0" y1="100" x2="1200" y2="100" />
            <line x1="0" y1="200" x2="1200" y2="200" />
            <line x1="0" y1="300" x2="1200" y2="300" />
            <line x1="0" y1="400" x2="1200" y2="400" />
            <line x1="0" y1="500" x2="1200" y2="500" />
            <line x1="0" y1="600" x2="1200" y2="600" />
            <line x1="0" y1="700" x2="1200" y2="700" />
          </g>
          
          {/* Grid intersection points - visible circles */}
          <g fill="#64748b" opacity="0.14">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map(x =>
              [100, 200, 300, 400, 500, 600, 700].map(y =>
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" />
              )
            ).flat()}
          </g>


        </svg>
      </div>

      {/* Content */}
      <div className="metric-container relative z-10">
        <div className="py-6 md:py-8 lg:py-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* "Institutional Grade" Badge with Formula */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#2563eb] rounded-full">
                <Hexagon className="w-3.5 h-3.5 text-[#2563eb]" />
                <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">
                  Institutional Grade Calculators
                </span>
              </div>
              
              {/* Mathematical Formula - Right of Badge */}
              <div className="text-xs text-slate-500 font-serif italic flex items-center gap-1">
                <span>A = P(1 +</span>
                <span className="relative flex flex-col items-center">
                  <span>r</span>
                  <span className="h-px w-4 bg-slate-500 absolute top-3"></span>
                  <span className="relative top-2">n</span>
                </span>
                <span className="relative">
                  <span>)</span>
                  <sup className="text-xs ml-0.5">nt</sup>
                </span>
              </div>
            </div>
            
            {/* Main Headline - Serif with Mixed Colors */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
              <span className="text-slate-950">Financial Clarity,</span>
              <br className="hidden md:block" />
              <span className="text-[#2563eb] italic">Precisely Calculated</span>
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Professional-grade financial tools trusted by analysts and investors. Model your wealth with the precision of a private banking desk.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                to="/us"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore All Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg border-2 border-slate-300 text-slate-950 font-bold hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
              >
                Read Financial Guides
              </Link>
            </div>

            {/* Trust & Accuracy Endorsement Bar - Lifted Above-the-Fold */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 md:gap-10 mt-8 px-4">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-5 h-5 text-[#2563eb] flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-600">Bank-Grade Accuracy</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-5 h-5 text-[#2563eb] flex-shrink-0">
                  <EyeOff className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-600">No Data Tracking</span>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="w-5 h-5 text-[#2563eb] flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-600">Instant PDF Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
