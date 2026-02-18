import React, { useState } from 'react';
import { Download, Check, Loader2, AlertCircle, Shield } from 'lucide-react';
import { generatePDF } from '@/utils/pdfService';

interface GeneratePDFProps {
  variant?: 'inline' | 'card' | 'minimal';
  calculatorName: string;
  resultsData: string;
  className?: string;
}

export const GeneratePDF: React.FC<GeneratePDFProps> = ({
  variant = 'inline',
  calculatorName,
  resultsData,
  className = '',
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState('');

  const handleGeneratePDF = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setError('');

    try {
      await generatePDF({
        calculatorName,
        resultsData,
      });
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      setIsGenerating(false);
    }
  };

  const resetState = () => {
    setGenerated(false);
    setError('');
    setIsGenerating(false);
  };

  // --- Success state (replaces entire form) ----------------------------------
  if (generated) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Check className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm font-medium text-green-700">Success! Your PDF is ready to download.</p>
        </div>
        <button
          onClick={resetState}
          className="text-xs font-medium text-green-600 hover:text-green-700 px-3 py-1 hover:bg-green-100 rounded transition-colors"
        >
          Generate Another
        </button>
      </div>
    );
  }

  // --- Error message fragment -------------------------------------------------
  const errorEl = error ? (
    <div className="flex items-start gap-2 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-red-700">{error}</p>
    </div>
  ) : null;

  // --- Minimal variant --------------------------------------------------------
  if (variant === 'minimal') {
    return (
      <div className={className}>
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`px-5 py-2.5 min-h-[44px] text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap ${
            isGenerating
              ? 'bg-slate-400 text-white cursor-wait'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isGenerating ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Download size={14} />
          )}
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </button>
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
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">Generate PDF Report</h4>
            <p className="text-sm text-slate-600">Download your calculation results as a professional PDF</p>
          </div>
        </div>
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isGenerating
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download size={18} />
              Generate PDF Report
            </>
          )}
        </button>
        {errorEl}
        <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
          <Shield size={12} />
          Your data is generated locally and never sent to our servers.
        </p>
      </div>
    );
  }

  // --- Inline variant (default) -----------------------------------------------
  return (
    <div className={`bg-slate-50 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-slate-900">Generate PDF Report</h4>
            <p className="text-sm text-slate-600">Download your results as a professional PDF document</p>
          </div>
        </div>
        <button
          onClick={handleGeneratePDF}
          disabled={isGenerating}
          className={`px-5 py-2.5 min-h-[44px] rounded-lg font-medium transition-colors flex items-center justify-center gap-2 whitespace-nowrap ${
            isGenerating
              ? 'bg-slate-400 text-white cursor-wait'
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isGenerating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Download size={16} />
          )}
          {isGenerating ? 'Generating...' : 'Generate PDF'}
        </button>
        {errorEl}
      </div>
    </div>
  );
};

export default GeneratePDF;
