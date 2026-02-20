import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, ShieldCheck, EyeOff, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white w-full m-0 p-0">
      {/* Mathematical 3x3 Grid Watermark - Light Gray (#f1f5f9) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* 3x3 Mathematical Grid - Light Gray Watermark (5-10% opacity) */}
          <g stroke="#cbd5e1" strokeWidth="1" opacity="0.08">
            {/* Vertical lines */}
            <line x1="200" y1="0" x2="200" y2="800" />
            <line x1="400" y1="0" x2="400" y2="800" />
            <line x1="600" y1="0" x2="600" y2="800" />
            <line x1="800" y1="0" x2="800" y2="800" />
            <line x1="1000" y1="0" x2="1000" y2="800" />
            
            {/* Horizontal lines */}
            <line x1="0" y1="200" x2="1200" y2="200" />
            <line x1="0" y1="400" x2="1200" y2="400" />
            <line x1="0" y1="600" x2="1200" y2="600" />
          </g>
          
          {/* Grid intersection points - subtle circles */}
          <g fill="#cbd5e1" opacity="0.05">
            {[200, 400, 600, 800, 1000].map(x =>
              [200, 400, 600].map(y =>
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
              )
            ).flat()}
          </g>

          {/* Compound Interest Formula Watermark - Mathematical Precision */}
          <g opacity="0.08" pointerEvents="none">
            {/* Formula: A = P(1 + r/n)^(nt) - "Equation of Precision" */}
            <text x="50" y="720" fontSize="32" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563eb" letterSpacing="1">
              A = P(1 +
            </text>
            <text x="320" y="720" fontSize="32" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563eb">
              r
            </text>
            <line x1="320" y1="735" x2="360" y2="735" stroke="#2563eb" strokeWidth="1.5" />
            <text x="328" y="765" fontSize="32" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563eb">
              n
            </text>
            <text x="370" y="720" fontSize="32" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563eb">
              )
            </text>
            
            {/* Superscript nt */}
            <text x="385" y="695" fontSize="22" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563eb">
              nt
            </text>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="metric-container relative z-10">
        <div className="py-12 md:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* "Institutional Grade" Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#2563eb] rounded-full mb-8">
              <Hexagon className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">
                Institutional Grade Calculators
              </span>
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
