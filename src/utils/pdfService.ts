/**
 * PDF Generation Service for Metric Finance Calculators
 * Generates professional PDF reports with calculator results
 */

export interface PDFData {
  calculatorName: string;
  resultsData: string; // Pre-formatted results string
  timestamp?: Date;
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Generate and download a PDF report with calculator results
 * Uses HTML2Canvas and jsPDF for client-side PDF generation
 */
export async function generatePDF(data: PDFData): Promise<void> {
  try {
    // Dynamically import jsPDF and html2canvas to keep bundle size minimal
    const { jsPDF } = await import('jspdf');
    const html2canvas = (await import('html2canvas')).default;

    // Create a temporary container with PDF content
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '-9999px';
    container.style.width = '800px';
    container.style.backgroundColor = 'white';
    container.style.padding = '40px';
    container.style.fontFamily = 'system-ui, -apple-system, sans-serif';

    // Build the PDF content HTML with professional table layout
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Parse results data into lines for table display
    const resultLines = data.resultsData
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    // Separate input and results based on divider
    const dividerIndex = resultLines.indexOf('---');
    const inputs = dividerIndex >= 0 ? resultLines.slice(0, dividerIndex) : [];
    const results = dividerIndex >= 0 ? resultLines.slice(dividerIndex + 1) : resultLines;

    // Build table rows HTML
    let inputRows = '';
    inputs.forEach((line, index) => {
      const bgColor = index % 2 === 0 ? '#f9fafb' : '#ffffff';
      inputRows += `
        <tr style="background-color: ${bgColor}; border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 15px; font-size: 13px; color: #6b7280; max-width: 250px; word-break: break-word;">${escapeHtml(line)}</td>
        </tr>
      `;
    });

    let resultRows = '';
    results.forEach((line, index) => {
      const bgColor = index % 2 === 0 ? '#f9fafb' : '#ffffff';
      resultRows += `
        <tr style="background-color: ${bgColor}; border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 12px 15px; font-size: 13px; color: #1f2937; font-weight: 600; max-width: 250px; word-break: break-word;">${escapeHtml(line)}</td>
        </tr>
      `;
    });

    container.innerHTML = `
      <!-- Professional Header -->
      <div style="text-align: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 3px solid #2563EB;">
        <h1 style="font-size: 36px; font-weight: 800; color: #1f2937; margin: 0 0 8px 0; letter-spacing: -0.5px;">Metric Finance</h1>
        <h2 style="font-size: 20px; font-weight: 600; color: #4b5563; margin: 0 0 15px 0;">${escapeHtml(data.calculatorName)}</h2>
        <p style="font-size: 13px; color: #9ca3af; margin: 0;">Generated on ${dateStr} at ${timeStr}</p>
      </div>

      <!-- Inputs Section -->
      ${inputs.length > 0 ? `
        <div style="margin-bottom: 35px;">
          <h3 style="font-size: 14px; font-weight: 700; color: #1f2937; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Calculation Inputs</h3>
          <table style="width: 100%; border-collapse: collapse; font-family: 'Courier New', monospace;">
            <tbody>
              ${inputRows}
            </tbody>
          </table>
        </div>
      ` : ''}

      <!-- Results Section -->
      <div style="margin-bottom: 35px;">
        <h3 style="font-size: 14px; font-weight: 700; color: #1f2937; margin: 0 0 15px 0; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #2563EB; padding-bottom: 10px;">Calculation Results</h3>
        <table style="width: 100%; border-collapse: collapse; font-family: 'Courier New', monospace;">
          <tbody>
            ${resultRows}
          </tbody>
        </table>
      </div>

      <!-- Professional Footer -->
      <div style="margin-top: 50px; padding-top: 25px; border-top: 2px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: center;">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937; font-size: 14px;">Thank you for using Metric Finance</p>
        <p style="margin: 0 0 12px 0; font-style: italic; color: #4b5563;">"Plan smarter, decide better."</p>
        <div style="height: 1px; background-color: #e5e7eb; margin: 15px 0;"></div>
        <p style="margin: 12px 0 0 0; font-size: 11px;">© 2024 Metric Finance. All rights reserved. | metricfinance.com</p>
      </div>
    `;

    document.body.appendChild(container);

    try {
      // Convert HTML to canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      // Create PDF from canvas
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      let heightLeft = imgHeight;
      let position = 0;

      // Add image to PDF (may span multiple pages if needed)
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297; // A4 height in mm

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      // Generate filename
      const filename = `${data.calculatorName.replace(/\s+/g, '_')}_${dateStr.replace(/\s+/g, '_')}.pdf`;

      // Download the PDF
      pdf.save(filename);
    } finally {
      document.body.removeChild(container);
    }
  } catch (error) {
    console.error('PDF generation error:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
