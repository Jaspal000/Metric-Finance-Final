import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Check, Shield, Loader2 } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setError('');

    const result = await sendEmail('subscribe', { email, _subject: 'New Metric Finance Subscriber' });

    setIsSubmitting(false);

    if (result.ok) {
      setSubscribed(true);
      setSuccessMessage(result.message);
      setEmail('');
    } else {
      setError(result.message);
    }
  };

  const footerLinks = {
    'US Calculators': [
      { name: 'Mortgage Calculator', href: '/us/mortgage-calculator' },
      { name: '401(k) Calculator', href: '/us/401k-calculator' },
      { name: 'Tax Calculator', href: '/us/federal-tax-calculator' },
      { name: 'Salary Calculator', href: '/us/salary-calculator' },
      { name: 'BMI Calculator', href: '/us/bmi-calculator' },
      { name: 'Compound Interest', href: '/us/compound-interest-calculator' },
      { name: 'Car Loan', href: '/us/car-loan-calculator' },
    ],
    'International': [
      { name: 'UK Stamp Duty', href: '/uk/stamp-duty-calculator' },
      { name: 'Canada Mortgage', href: '/ca/mortgage-calculator' },
      { name: 'Australia Home Loan', href: '/au/home-loan-calculator' },
    ],
    'Company': [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Blog', href: '/blog' },
    ],
    'Legal': [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Use', href: '/terms' },
      { name: 'Financial Disclaimer', href: '/disclaimer' },
    ],
  };

  return (
    <footer className="bg-slate-900 border-0">
      {/* Geometric Grid Pattern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ position: 'relative' }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Grid Lines - Subtle Blue Tint */}
          <g stroke="#2563EB" strokeWidth="0.5" opacity="0.08">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v-${i}`} x1={100 + i * 40} y1="0" x2={100 + i * 40} y2="600" />
            ))}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`h-${i}`} x1="0" y1={50 + i * 40} x2="800" y2={50 + i * 40} />
            ))}
          </g>
          
          {/* Geometric Shapes - Very Subtle */}
          <g stroke="#2563EB" strokeWidth="1" fill="none" opacity="0.04">
            <circle cx="700" cy="150" r="40" />
            <rect x="480" y="380" width="60" height="60" transform="rotate(15 510 410)" />
            <polygon points="600,520 630,480 660,520" />
          </g>
        </svg>
      </div>

      {/* Email Subscription */}
      <div className="metric-container py-12 border-b border-slate-700 relative z-10">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-bold text-white mb-2">
            Get Financial Tips & Updates
          </h3>
          <p className="text-slate-300 mb-6">
            Subscribe to receive our free Financial Planning Checklist and weekly insights.
          </p>

          {subscribed ? (
            <div className="bg-blue-500/10 border border-[#2563eb] rounded-lg p-5 flex items-center justify-center gap-3">
              <div className="w-9 h-9 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-blue-300">{successMessage}</p>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] rounded-lg border border-slate-600 bg-slate-800/50 backdrop-blur text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-3 min-h-[48px] rounded-lg font-bold transition-colors flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-blue-400 text-white cursor-wait'
                      : 'bg-[#2563eb] text-white hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              {error && (
                <p className="text-xs text-red-400 mt-2 text-center">{error}</p>
              )}
              <p className="text-xs text-slate-400 mt-3 flex items-center justify-center gap-1">
                <Shield size={12} />
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="metric-container py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand Column - Upscaled Logo (25% larger) */}
          <div className="col-span-2">
            <span className="md:hidden block scale-110 origin-top-left mb-2">
              <Logo variant="full" size="md" className="brightness-0 invert" />
            </span>
            <span className="hidden md:block scale-125 origin-top-left mb-2">
              <Logo variant="full" size="lg" className="brightness-0 invert" />
            </span>
            <p className="text-slate-300 text-sm mb-4 max-w-xs">
              Precision-driven financial decision tools. Plan mortgages, taxes, 
              retirement, and investments with accurate, instant calculators.
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Metric Finance. All rights reserved.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-white mb-4 text-sm">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 hover:text-[#2563eb] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-slate-950/50 backdrop-blur border-t border-slate-700 relative z-10">
        <div className="metric-container py-6">
          <p className="text-xs text-slate-400 text-center">
            <strong>Disclaimer:</strong> All calculations are estimates for informational purposes only 
            and do not constitute financial advice. Please consult a qualified financial advisor 
            for personalized guidance.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
