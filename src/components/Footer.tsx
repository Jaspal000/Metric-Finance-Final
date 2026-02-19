import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Check, Shield, Loader2, Globe, Lock, Zap } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';
import { Flags } from './Flags';

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

  const regionLinks = [
    { name: 'Global', href: '#', flag: 'globe' as const },
    { name: 'USA', href: '#usa-calculators', flag: 'us' as const },
    { name: 'UK', href: '#uk-calculators', flag: 'uk' as const },
    { name: 'Canada', href: '#canada-calculators', flag: 'ca' as const },
    { name: 'Australia', href: '#australia-calculators', flag: 'au' as const },
  ];

  const resourceLinks = [
    { name: 'Financial Guides', href: '/guides' },
    { name: 'Calculators Directory', href: '/#all-calculators' },
    { name: 'Most Popular Tools', href: '/#popular' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ];

  const trustItems = [
    { icon: Zap, label: 'Bank-Grade Accuracy' },
    { icon: Lock, label: 'No Data Tracking' },
    { icon: Globe, label: '10+ Regional Tools' },
  ];

  return (
    <footer className="bg-white border-t border-slate-200">
      {/* Email Subscription */}
      <div className="metric-container py-12 border-b border-slate-200">
        <div className="max-w-xl mx-auto text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Get Financial Tips & Updates
          </h3>
          <p className="text-slate-600 mb-6">
            Subscribe to receive our free Financial Planning Checklist and weekly insights.
          </p>

          {subscribed ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex items-center justify-center gap-3">
              <div className="w-9 h-9 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 text-white" />
              </div>
              <p className="text-sm font-medium text-[#2563eb]">{successMessage}</p>
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
                    className="w-full pl-10 pr-4 py-3 min-h-[48px] rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
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
                <p className="text-xs text-red-600 mt-2 text-center">{error}</p>
              )}
              <p className="text-xs text-slate-500 mt-3 flex items-center justify-center gap-1">
                <Shield size={12} />
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="metric-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12">
          {/* Column 1: Brand & Regions */}
          <div>
            <span className="md:hidden">
              <Logo variant="full" size="md" className="mb-6" />
            </span>
            <span className="hidden md:block">
              <Logo variant="full" size="xl" className="mb-6" />
            </span>
            <p className="text-slate-600 text-sm mb-8">
              Precision-driven financial decision tools. Plan mortgages, taxes, 
              retirement, and investments with accurate, instant calculators.
            </p>
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Metric Finance. All rights reserved.
            </p>
            
            {/* Regional Links with Flags */}
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Regions</h4>
            <ul className="space-y-3">
              {regionLinks.map((region) => (
                <li key={region.name}>
                  <a
                    href={region.href}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-[#2563eb] transition-colors"
                  >
                    {region.flag === 'globe' ? (
                      <Globe className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <span className="w-4 h-4 flex-shrink-0">
                        <Flags flag={region.flag} size={16} />
                      </span>
                    )}
                    <span>{region.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-600 hover:text-[#2563eb] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div>
            <h4 className="font-bold text-slate-900 mb-4 text-sm">Legal & Support</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-slate-600 hover:text-[#2563eb] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="metric-container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#2563eb]" />
                </div>
                <span className="text-xs font-medium text-slate-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer & Copyright */}
      <div className="bg-slate-50 border-t border-slate-200">
        <div className="metric-container py-6 space-y-4">
          <p className="text-xs text-slate-500 text-center">
            <strong>Disclaimer:</strong> All calculations are estimates for informational purposes only 
            and do not constitute financial advice. Please consult a qualified financial advisor 
            for personalized guidance.
          </p>
          <p className="text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Metric Finance. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
