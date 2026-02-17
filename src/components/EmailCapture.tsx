import React, { useState } from 'react';
import { Mail, Send, Check, Download, Shield, Loader2 } from 'lucide-react';
import { sendEmail } from '@/utils/emailService';
import type { EmailType } from '@/utils/emailService';

interface EmailCaptureProps {
  variant?: 'inline' | 'card' | 'minimal';
  context?: 'calculator' | 'general' | 'lead-magnet';
  /** Optional pre-formatted results string to include in the email body */
  resultsData?: string;
  className?: string;
}

const CONTEXT_TO_EMAIL_TYPE: Record<string, EmailType> = {
  calculator: 'saveResults',
  'lead-magnet': 'subscribe',
  general: 'subscribe',
};

export const EmailCapture: React.FC<EmailCaptureProps> = ({
  variant = 'inline',
  context = 'general',
  resultsData,
  className = '',
}) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    const emailType = CONTEXT_TO_EMAIL_TYPE[context] ?? 'subscribe';
    const payload: Record<string, unknown> = { email };
    if (resultsData) payload.results = resultsData;

    const result = await sendEmail(emailType, payload);

    setIsSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
      setSuccessMessage(result.message);
      setEmail('');
    } else {
      setError(result.message);
    }
  };

  const content = {
    calculator: {
      title: 'Save Your Results',
      description: 'Email this calculation to yourself for future reference.',
      buttonText: 'Send Results',
    },
    'lead-magnet': {
      title: 'Free Financial Planning Checklist',
      description: 'Get our comprehensive PDF checklist to organize your finances.',
      buttonText: 'Get Free Checklist',
    },
    general: {
      title: 'Stay Updated',
      description: 'Get notified when we add new calculators and features.',
      buttonText: 'Subscribe',
    },
  };

  const currentContent = content[context];

  // --- Success state (replaces entire form) ----------------------------------
  if (submitted) {
    return (
      <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3 ${className}`}>
        <div className="w-9 h-9 bg-[#2563eb] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-white" />
        </div>
        <p className="text-sm font-medium text-[#2563eb]">{successMessage}</p>
      </div>
    );
  }

  // --- Error message fragment -------------------------------------------------
  const errorEl = error ? (
    <p className="text-xs text-red-600 mt-1.5">{error}</p>
  ) : null;

  // --- Minimal variant --------------------------------------------------------
  if (variant === 'minimal') {
    return (
      <div className={className}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 overflow-visible">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 min-w-0 px-3 py-2.5 min-h-[44px] text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 min-h-[44px] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap flex-shrink-0 ${
              isSubmitting
                ? 'bg-slate-400 text-white cursor-wait'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isSubmitting ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
        {errorEl}
      </div>
    );
  }

  // --- Card variant -----------------------------------------------------------
  if (variant === 'card') {
    return (
      <div className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            {context === 'lead-magnet' ? (
              <Download className="w-5 h-5 text-blue-600" />
            ) : (
              <Mail className="w-5 h-5 text-blue-600" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{currentContent.title}</h4>
            <p className="text-sm text-slate-600">{currentContent.description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isSubmitting}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-blue-400 text-white cursor-wait'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send size={18} />
                {currentContent.buttonText}
              </>
            )}
          </button>
          {errorEl}
        </form>
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Shield size={12} />
          We never share your email. Unsubscribe anytime.
        </p>
      </div>
    );
  }

  // --- Inline variant (default) -----------------------------------------------
  return (
    <div className={`bg-slate-50 rounded-lg p-4 overflow-visible ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-900">{currentContent.title}</h4>
            <p className="text-sm text-slate-600">{currentContent.description}</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 min-w-0 px-4 py-2.5 min-h-[44px] rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 min-h-[44px] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0 ${
              isSubmitting
                ? 'bg-slate-400 text-white cursor-wait'
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {isSubmitting ? 'Sending...' : currentContent.buttonText}
          </button>
        </form>
        {errorEl}
      </div>
    </div>
  );
};

export default EmailCapture;
