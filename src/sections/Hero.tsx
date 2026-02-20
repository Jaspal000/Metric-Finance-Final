import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, ShieldCheck, EyeOff, FileText } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white w-full m-0 p-0" style={{ backgroundColor: 'white' }}>
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

          {/* Compound Interest Formula - Large Watermark (Desktop Only) */}
          <g opacity="0.08" pointerEvents="none" className="hidden lg:block">
            {/* Large formula watermark for desktop - centered horizontally */}
            <text x="400" y="280" fontSize="72" fontFamily="Georgia, serif" fontStyle="italic" fill="#94a3b8" letterSpacing="2" fontWeight="300">
              A = P(1 +
            </text>
            <text x="770" y="280" fontSize="72" fontFamily="Georgia, serif" fontStyle="italic" fill="#94a3b8" fontWeight="300">
              r
            </text>
            <line x1="755" y1="310" x2="825" y2="310" stroke="#94a3b8" strokeWidth="3" />
            <text x="790" y="370" fontSize="72" fontFamily="Georgia, serif" fontStyle="italic" fill="#94a3b8" fontWeight="300">
              n
            </text>
            <text x="870" y="280" fontSize="72" fontFamily="Georgia, serif" fontStyle="italic" fill="#94a3b8" fontWeight="300">
              )
            </text>
            
            {/* Superscript nt */}
            <text x="910" y="200" fontSize="54" fontFamily="Georgia, serif" fontStyle="italic" fill="#94a3b8" fontWeight="300">
              nt
            </text>
          </g>

          {/* Mobile Formula Watermark - Below Badge Area */}
          <g opacity="0.10" pointerEvents="none" className="lg:hidden">
            {/* Mobile version as subtle background watermark */}
            <text x="200" y="280" fontSize="48" fontFamily="Georgia, serif" fontStyle="italic" fill="#cbd5e1" letterSpacing="1" fontWeight="300">
              A = P(1 +
            </text>
            <text x="500" y="280" fontSize="48" fontFamily="Georgia, serif" fontStyle="italic" fill="#cbd5e1" fontWeight="300">
              r
            </text>
            <line x1="490" y1="305" x2="550" y2="305" stroke="#cbd5e1" strokeWidth="2" />
            <text x="520" y="350" fontSize="48" fontFamily="Georgia, serif" fontStyle="italic" fill="#cbd5e1" fontWeight="300">
              n
            </text>
            <text x="580" y="280" fontSize="48" fontFamily="Georgia, serif" fontStyle="italic" fill="#cbd5e1" fontWeight="300">
              )
            </text>
            
            {/* Superscript nt */}
            <text x="620" y="220" fontSize="36" fontFamily="Georgia, serif" fontStyle="italic" fill="#cbd5e1" fontWeight="300">
              nt
            </text>
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="metric-container relative z-10">
        <div className="py-6 md:py-8 lg:py-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* "Institutional Grade" Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#2563eb] rounded-full mb-8">
              <Hexagon className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">
                Institutional Grade Calculators
              </span>
            </div>
            
            {/* Main Headline - Serif with Mixed Colors */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.3] mb-6 font-serif overflow-visible">
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
