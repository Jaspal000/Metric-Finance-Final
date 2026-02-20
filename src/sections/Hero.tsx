import { Link } from 'react-router-dom';
import { ArrowRight, Check, Hexagon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-slate-900 w-screen -ml-[calc((100vw-100%)/2)] -mt-1 md:-mt-2 lg:-mt-3">
      {/* Subtle Geometric Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <svg
          className="absolute right-0 top-0 w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid Lines - Subtle Blue Tint */}
          <g stroke="#2563EB" strokeWidth="0.5" opacity="0.1">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={100 + i * 40} y1="0" x2={100 + i * 40} y2="600" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={50 + i * 40} x2="800" y2={50 + i * 40} />
            ))}
          </g>
          
          {/* Geometric Shapes - Very Subtle */}
          <g stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.05">
            <circle cx="700" cy="150" r="40" />
            <rect x="480" y="380" width="60" height="60" transform="rotate(15 510 410)" />
            <polygon points="600,520 630,480 660,520" />
          </g>

          {/* Compound Interest Formula Watermark - "Equation of Precision" */}
          <g opacity="0.08" pointerEvents="none">
            {/* Formula: A = P(1 + r/n)^(nt) */}
            <text x="80" y="120" fontSize="28" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563EB" letterSpacing="2">
              A = P(1 +
            </text>
            <text x="320" y="120" fontSize="28" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563EB">
              r
            </text>
            <line x1="320" y1="135" x2="350" y2="135" stroke="#2563EB" strokeWidth="1" />
            <text x="325" y="160" fontSize="28" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563EB">
              n
            </text>
            <text x="360" y="120" fontSize="28" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563EB">
              )
            </text>
            
            {/* Superscript nt */}
            <text x="375" y="100" fontSize="20" fontFamily="Georgia, serif" fontStyle="italic" fill="#2563EB">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-[#2563eb] rounded-full mb-8">
              <Hexagon className="w-3.5 h-3.5 text-[#2563eb]" />
              <span className="text-xs font-bold text-[#2563eb] uppercase tracking-wider">
                Institutional Grade Calculators
              </span>
            </div>
            
            {/* Main Headline - Serif with Mixed Colors */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-serif">
              <span className="text-white">Financial Clarity,</span>
              <br className="hidden md:block" />
              <span className="text-[#2563eb] italic">Precisely Calculated</span>
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              Professional-grade financial tools trusted by analysts and investors. Model your wealth with the precision of a private banking desk.
            </p>
            
            {/* CTAs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                to="/us"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Explore All Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 min-h-[48px] rounded-lg border-2 border-white text-white font-bold hover:bg-white hover:text-slate-900 transition-all duration-200"
              >
                Read Financial Guides
              </Link>
            </div>

            {/* Trust & Accuracy Endorsement Bar */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 pt-6 border-t border-slate-700 border-opacity-40">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-[#2563eb]">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-300">Bank-Grade Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-[#2563eb]">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-300">No Data Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-[#2563eb]">
                  <Check className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-300">Instant PDF Reports</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
