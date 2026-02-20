import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { getCalculatorsByRegion } from '@/data/regions';
import type { Region } from '@/types';

interface NavCategory {
  name: string;
  region: Region;
  href: string;
  calculators: { name: string; href: string; category: string }[];
}

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Build navigation categories with calculators
  const navCategories: NavCategory[] = [
    {
      name: 'US Tools',
      region: 'us',
      href: '/us',
      calculators: getCalculatorsByRegion('us').map(c => ({
        name: c.shortName,
        href: `/${c.region}/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'UK Tools',
      region: 'uk',
      href: '/uk',
      calculators: getCalculatorsByRegion('uk').map(c => ({
        name: c.shortName,
        href: `/${c.region}/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'Canada',
      region: 'ca',
      href: '/ca',
      calculators: getCalculatorsByRegion('ca').map(c => ({
        name: c.shortName,
        href: `/${c.region}/${c.slug}`,
        category: c.category,
      })),
    },
    {
      name: 'Australia',
      region: 'au',
      href: '/au',
      calculators: getCalculatorsByRegion('au').map(c => ({
        name: c.shortName,
        href: `/${c.region}/${c.slug}`,
        category: c.category,
      })),
    },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Handle dropdown hover with delay for better UX
  const handleMouseEnter = (categoryName: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(categoryName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  // Handle accordion toggle (auto-close others)
  const toggleAccordion = (categoryName: string) => {
    setExpandedAccordion(expandedAccordion === categoryName ? null : categoryName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedAccordion(null);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Main Header - White Theme for Seamless Integration */}
      <header className="sticky top-0 z-50 w-full bg-white border-0 m-0 p-0">
        <div className="flex items-center justify-center m-0 p-0">
          <nav className="flex items-center justify-between h-16 md:h-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 m-0 p-0">
            {/* Logo - Dark for white background */}
            <Link to="/" className="flex-shrink-0">
              <span className="md:hidden">
                <Logo variant="full" size="md" />
              </span>
              <span className="hidden md:block">
                <Logo variant="full" size="lg" />
              </span>
            </Link>

            {/* Desktop Navigation with Hover Dropdowns */}
            <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 min-h-[48px] rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-slate-950 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {navCategories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    to={category.href}
                    className={`flex items-center gap-1 px-4 py-2 min-h-[48px] rounded-lg text-sm font-semibold transition-colors ${
                      isActive(category.href)
                        ? 'text-slate-950 bg-slate-100'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                    }`}
                  >
                    {category.name}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  </Link>

                  {/* Dropdown Menu - Already white, just needs clean styling */}
                  {activeDropdown === category.name && (
                    <div className="absolute top-full left-0 pt-2.5 z-50">
                      {/* Invisible bridge to prevent flicker */}
                      <div className="absolute -top-2.5 left-0 right-0 h-2.5 bg-transparent" />
                      <div className="bg-white rounded-xl shadow-xl border-t-2 border-[#2563eb] py-2 min-w-[260px]">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {category.name} Calculators
                          </span>
                        </div>
                        {category.calculators.map((calc) => (
                          <Link
                            key={calc.href}
                            to={calc.href}
                            className="flex items-center justify-between px-4 py-2.5 min-h-[40px] text-sm text-slate-700 hover:bg-blue-50 hover:text-[#2563eb] transition-colors"
                          >
                            <span className="font-medium">{calc.name}</span>
                            <span className="text-xs text-slate-400">{calc.category}</span>
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <Link
                            to={category.href}
                            className="flex items-center gap-2 px-4 py-2 min-h-[40px] text-sm font-semibold text-[#2563eb] hover:bg-blue-50 transition-colors"
                          >
                            View All
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/blog"
                className={`flex items-center px-4 py-2 min-h-[48px] rounded-lg text-sm font-semibold transition-colors ${
                  isActive('/blog')
                    ? 'text-slate-950 bg-slate-100'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Blog
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="/#all-calculators"
                className="inline-flex items-center justify-center px-6 py-3 min-h-[48px] rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-lg text-slate-950 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer - Rendered at root level with z-[999] */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[999]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-lg"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-white z-10 p-4 border-b border-slate-200 flex items-center justify-between">
              <span className="font-bold text-lg text-slate-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center p-2 min-h-[48px] min-w-[48px] rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-1">
              {/* Home Link */}
              <Link
                to="/"
                className={`flex items-center px-4 py-3 min-h-[48px] rounded-xl text-base font-semibold transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Category Accordions */}
              {navCategories.map((category) => (
                <div key={category.name}>
                  <button
                    onClick={() => toggleAccordion(category.name)}
                    className={`w-full flex items-center justify-between px-4 py-3 min-h-[48px] rounded-xl text-base font-semibold transition-colors ${
                      isActive(category.href)
                        ? 'text-slate-900 bg-slate-100'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                    aria-expanded={expandedAccordion === category.name}
                  >
                    <span>{category.name}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${
                        expandedAccordion === category.name ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Accordion Content */}
                  {expandedAccordion === category.name && (
                    <div className="px-4 pb-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {category.calculators.map((calc) => (
                        <Link
                          key={calc.href}
                          to={calc.href}
                          className="flex items-center justify-between px-4 py-3 min-h-[44px] text-sm text-slate-600 hover:text-[#2563eb] transition-colors rounded-lg hover:bg-blue-50"
                        >
                          <span className="font-medium">{calc.name}</span>
                          <span className="text-xs text-slate-400">{calc.category}</span>
                        </Link>
                      ))}
                      <Link
                        to={category.href}
                        className="flex items-center gap-2 px-4 py-3 min-h-[44px] text-sm font-semibold text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        View All {category.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Blog Link */}
              <Link
                to="/blog"
                className={`flex items-center px-4 py-3 min-h-[48px] rounded-xl text-base font-semibold transition-colors ${
                  isActive('/blog')
                    ? 'text-slate-900 bg-slate-100'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Blog
              </Link>

              {/* CTA */}
              <div className="pt-6 mt-4 border-t border-slate-200">
                <a
                  href="/#all-calculators"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center w-full px-6 py-4 min-h-[48px] rounded-lg bg-[#2563eb] text-white font-bold hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
