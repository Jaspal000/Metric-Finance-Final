import React, { useState } from 'react';
import { FileText, Download, Loader2, Check, AlertCircle } from 'lucide-react';
import { generatePDF } from '@/utils/pdfGenerator';

interface PDFCaptureProps {
  calculatorName: string;
  results: Record<string, string | number>;
  className?: string;
}

type PDFState = 'idle' | 'generating' | 'success' | 'error';

export const PDFCapture: React.FC<PDFCaptureProps> = ({
  calculatorName,
  results,
  className = '',
}) => {
  const [state, setState] = useState<PDFState>('idle');
  const [error, setError] = useState('');

  const handleGeneratePDF = async () => {
    setState('generating');
    setError('');

    try {
      await generatePDF({
        calculatorName,
        results,
        timestamp: new Date(),
      });

      setState('success');

      // Reset to idle after 4 seconds
      setTimeout(() => {
        setState('idle');
      }, 4000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      setState('error');

      // Reset to idle after 3 seconds
      setTimeout(() => {
        setState('idle');
      }, 3000);
    }
  };

  return (
    <div className={`bg-white rounded-xl border border-slate-200 p-6 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900">Generate PDF Report</h4>
          <p className="text-sm text-slate-600">Download your calculation results as a professional PDF</p>
        </div>
      </div>

      {/* Button States */}
      {state === 'idle' && (
        <button
          onClick={handleGeneratePDF}
          className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FileText size={18} />
          Generate PDF Report
        </button>
      )}

      {state === 'generating' && (
        <div className="w-full py-3 px-4 bg-blue-100 text-blue-700 font-medium rounded-lg flex items-center justify-center gap-2">
          <Loader2 size={18} className="animate-spin" />
          Generating PDF...
        </div>
      )}

      {state === 'success' && (
        <div className="w-full py-3 px-4 bg-green-50 border border-green-200 text-green-700 font-medium rounded-lg flex items-center justify-center gap-2">
          <Check size={18} />
          Success! Your PDF is ready to download
        </div>
      )}

      {state === 'error' && (
        <div className="w-full py-3 px-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-red-700">Error</p>
              <p className="text-sm text-red-600 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Reassurance */}
      <p className="text-xs text-slate-500 mt-4 text-center">
        Your data is processed locally and never stored on our servers.
      </p>
    </div>
  );
};

export default PDFCapture;
