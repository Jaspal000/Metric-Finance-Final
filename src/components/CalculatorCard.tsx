import { Link } from 'react-router-dom';
import { ArrowRight, Home, PiggyBank, FileText, DollarSign, Activity, TrendingUp, Car, Building, Calculator as CalculatorIcon } from 'lucide-react';
import type { Calculator } from '@/types';

interface CalculatorCardProps {
  calculator: Calculator;
  variant?: 'default' | 'compact' | 'horizontal';
}

const iconMap: Record<string, React.ElementType> = {
  Home,
  PiggyBank,
  FileText,
  DollarSign,
  Activity,
  TrendingUp,
  Car,
  Building,
};

// Category color mapping for high-contrast badges
const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  'Home Buying': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  'Property': { bg: 'bg-indigo-100', text: 'text-indigo-700', border: 'border-indigo-200' },
  'Retirement': { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200' },
  'Taxes': { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  'Income': { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
  'Health': { bg: 'bg-rose-100', text: 'text-rose-700', border: 'border-rose-200' },
  'Investing': { bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
  'Auto': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-200' },
};

export const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  calculator,
  variant = 'default'
}) => {
  const Icon = iconMap[calculator.icon] || CalculatorIcon;
  const href = `/${calculator.region}/${calculator.slug}`;
  const categoryStyle = categoryColors[calculator.category] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };

  if (variant === 'compact') {
    return (
      <Link
        to={href}
        className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white hover:shadow-md transition-all"
      >
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
          <Icon className="w-5 h-5 text-[#2563eb]" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 truncate">{calculator.shortName}</h4>
          <p className="text-xs text-slate-500 truncate">{calculator.category}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors" />
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link
        to={href}
        className="group flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 hover:border-[#2563eb] hover:shadow-lg transition-all duration-300"
      >
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition-colors">
          <Icon className="w-6 h-6 text-[#2563eb]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-slate-900 truncate">{calculator.name}</h3>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#2563eb] transition-colors flex-shrink-0" />
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">{calculator.description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className="group calculator-card block bg-white"
    >
      {/* Category Badge - Top Right */}
      <span className={`category-badge ${categoryStyle.bg} ${categoryStyle.text} border ${categoryStyle.border}`}>
        {calculator.category}
      </span>

      <div className="flex items-start justify-between mb-4 pr-28">
        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors">
          <Icon className="w-6 h-6 text-[#2563eb]" />
        </div>
      </div>
      
      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#2563eb] transition-colors line-clamp-1">
        {calculator.name}
      </h3>
      
      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
        {calculator.description}
      </p>
      
      <div className="flex items-center text-sm font-bold text-[#2563eb]">
        Calculate Now
        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};

export default CalculatorCard;
