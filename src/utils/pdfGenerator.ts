/**
 * PDF Generation Utility for Metric Finance
 * Dynamically generates PDF reports from calculator results
 */

interface PDFData {
  calculatorName: string;
  results: Record<string, string | number>;
  timestamp?: Date;
}

export const generatePDF = async (data: PDFData): Promise<void> => {
  try {
    // Dynamically import html2pdf to avoid bundling it for users who don't use PDF feature
    const html2pdf = (await import('html2pdf.js')).default;

    const { calculatorName, results, timestamp = new Date() } = data;

    // Create HTML content for PDF
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #2563eb; margin: 0 0 5px 0; font-size: 32px;">Metric Finance</h1>
          <p style="margin: 0; color: #64748b; font-size: 14px;">Financial Calculation Report</p>
        </div>

        <!-- Calculator Name -->
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="color: #0f172a; margin: 0 0 10px 0; font-size: 24px;">${calculatorName}</h2>
          <p style="color: #64748b; margin: 0; font-size: 12px;">Generated on ${timestamp.toLocaleDateString()} at ${timestamp.toLocaleTimeString()}</p>
        </div>

        <!-- Results Table -->
        <div style="margin-bottom: 30px;">
          <h3 style="color: #0f172a; margin-bottom: 15px; font-size: 18px;">Calculation Results</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
              ${Object.entries(results)
                .map(
                  ([key, value], index) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'}; border-bottom: 1px solid #e2e8f0;">
                  <td style="padding: 12px 15px; font-weight: 500; color: #475569; width: 40%;">${formatKey(key)}</td>
                  <td style="padding: 12px 15px; text-align: right; color: #0f172a; font-weight: 600;">${formatValue(value)}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>

        <!-- Disclaimer -->
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; font-size: 12px; color: #92400e;">
          <strong>Disclaimer:</strong> This calculation is for informational purposes only and does not constitute financial advice. 
          Please consult a qualified financial advisor for personalized guidance.
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 11px;">
          <p style="margin: 0;">Metric Finance © ${new Date().getFullYear()} | www.metricfinance.com</p>
        </div>
      </div>
    `;

    // PDF options
    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${calculatorName.replace(/\s+/g, '-').toLowerCase()}-report.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
    };

    // Generate PDF
    html2pdf().set(options).from(element).save();
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
};

/**
 * Format object keys for display (e.g., 'monthlyPayment' -> 'Monthly Payment')
 */
const formatKey = (key: string): string => {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

/**
 * Format values for display (e.g., numbers to currency/percentage)
 */
const formatValue = (value: string | number): string => {
  if (typeof value === 'number') {
    // Check if it looks like a percentage (0-100)
    if (value >= 0 && value <= 100 && value.toString().includes('.')) {
      return `${value.toFixed(2)}%`;
    }
    // Check if it looks like currency (large numbers)
    if (value > 999) {
      return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return String(value);
};
