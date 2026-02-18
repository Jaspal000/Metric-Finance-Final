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

    // Build the PDF content HTML
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    container.innerHTML = `
      <!-- Header with Logo and Divider -->
      <div style="text-align: center; margin-bottom: 40px; padding-bottom: 30px; border-bottom: 3px solid #2563EB;">
        <h1 style="font-size: 36px; font-weight: bold; color: #1f2937; margin: 0 0 15px 0; letter-spacing: -0.5px;">Metric Finance</h1>
        <p style="font-size: 20px; color: #4b5563; margin: 0; font-weight: 500;">${data.calculatorName}</p>
        <p style="font-size: 13px; color: #9ca3af; margin: 15px 0 0 0;">Generated on ${dateStr} at ${timeStr}</p>
      </div>

      <!-- Results Section -->
      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 18px; font-weight: 700; color: #1f2937; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Calculation Results</h2>
        <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 10px; padding: 25px; font-size: 14px; line-height: 2; color: #374151; white-space: pre-wrap; font-family: 'Courier New', monospace; font-weight: 500;">
${data.resultsData}
        </div>
      </div>

      <!-- Footer Section -->
      <div style="margin-top: 50px; padding-top: 25px; border-top: 2px solid #e5e7eb; font-size: 13px; color: #6b7280; text-align: center;">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #1f2937;">Thank you for using Metric Finance</p>
        <p style="margin: 0 0 12px 0; font-style: italic;">"Plan smarter, decide better."</p>
        <div style="height: 1px; background-color: #e5e7eb; margin: 12px 0;"></div>
        <p style="margin: 12px 0 0 0; font-size: 12px;">© 2024 Metric Finance. All rights reserved. | metricfinance.com</p>
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
