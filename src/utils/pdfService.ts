/**
 * Ultra-Lightweight PDF Generation Service for Metric Finance
 * Uses text-based vector rendering instead of heavy image conversion
 * Target file size: <500KB (vs 10MB with html2canvas)
 */

export interface PDFData {
  calculatorName: string;
  resultsData: string;
  timestamp?: Date;
}

/**
 * Escape text for safe PDF rendering
 */
function escapeText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

/**
 * Generate lightweight vector PDF with native fonts
 * No html2canvas dependency - pure text rendering
 */
export async function generatePDF(data: PDFData): Promise<void> {
  try {
    console.log('[v0] PDF generation started for:', data.calculatorName);
    
    // Dynamically import jsPDF only (no html2canvas)
    const { jsPDF } = await import('jspdf');
    console.log('[v0] jsPDF imported successfully');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    console.log('[v0] jsPDF instance created');

    // Constants for layout
    const pageWidth = 210;
    const pageHeight = 297;
    const margins = 20; // 2cm margins
    const contentWidth = pageWidth - margins * 2;
    let yPosition = margins;

    // Colors (using 'as const' for proper tuple type inference)
    const primaryBlue = [37, 99, 235] as const; // #2563EB
    const darkGray = [31, 41, 55] as const; // #1f2937
    const mediumGray = [107, 114, 128] as const; // #6b7280
    const lightGray = [248, 250, 252] as const; // #f8fafc
    const white = [255, 255, 255] as const; // White

    // --- HEADER WITH LOGO AND DIVIDER ---
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(28);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.text('Metric Finance', margins, yPosition);
    yPosition += 10;

    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(14);
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.text(data.calculatorName, margins, yPosition);
    yPosition += 8;

    // Timestamp
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

    pdf.setFontSize(9);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`Generated on ${dateStr} at ${timeStr}`, margins, yPosition);
    yPosition += 6;

    // Blue divider line
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.5);
    pdf.line(margins, yPosition + 2, pageWidth - margins, yPosition + 2);
    yPosition += 10;

    // --- PARSE RESULTS DATA ---
    const resultLines = data.resultsData
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const dividerIndex = resultLines.indexOf('---');
    const inputs = dividerIndex >= 0 ? resultLines.slice(0, dividerIndex) : [];
    const results = dividerIndex >= 0 ? resultLines.slice(dividerIndex + 1) : resultLines;

    console.log('[v0] Parsed results:', { inputs: inputs.length, results: results.length });

    // --- INPUTS SECTION ---
    if (inputs.length > 0) {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text('CALCULATION INPUTS', margins, yPosition);
      yPosition += 4;

      // Section divider
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setLineWidth(0.3);
      pdf.line(margins, yPosition, pageWidth - margins, yPosition);
      yPosition += 6;

      // Input table
      inputs.forEach((line, index) => {
        // Row background - use direct color values instead of spread
        const bgColor = index % 2 === 0 ? lightGray : white;
        pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        pdf.rect(margins, yPosition - 3, contentWidth, 6, 'F');
        
        // Row text
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
        pdf.text(escapeText(line), margins + 2, yPosition, { maxWidth: contentWidth - 4 });
        yPosition += 6;
      });

      yPosition += 4;
    }

    // --- RESULTS SECTION ---
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.text('CALCULATION RESULTS', margins, yPosition);
    yPosition += 4;

    // Section divider (blue for results)
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(0.4);
    pdf.line(margins, yPosition, pageWidth - margins, yPosition);
    yPosition += 6;

    // Results table with alternating rows and bold values
    results.forEach((line, index) => {
      // Row background - use direct color values instead of spread
      const bgColor = index % 2 === 0 ? lightGray : white;
      pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      pdf.rect(margins, yPosition - 3, contentWidth, 6, 'F');
      
      // Bold text for result values
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(8);
      pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      pdf.text(escapeText(line), margins + 2, yPosition, { maxWidth: contentWidth - 4 });
      yPosition += 6;
    });

    yPosition += 6;

    // --- FOOTER ---
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    
    // Thank you message
    const footerY = pageHeight - 30;
    pdf.text('Thank you for using Metric Finance', pageWidth / 2, footerY, { align: 'center' });
    
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.text('"Plan smarter, decide better."', pageWidth / 2, footerY + 5, { align: 'center' });

    // Copyright
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7);
    pdf.setTextColor(150, 150, 150);
    pdf.text('© 2024 Metric Finance. All rights reserved. | metricfinance.com', pageWidth / 2, footerY + 12, { align: 'center' });

    // Generate filename
    const filename = `Metric-Finance-Report.pdf`;

    console.log('[v0] Saving PDF...');
    // Download the PDF
    pdf.save(filename);
    console.log('[v0] PDF saved successfully');
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
