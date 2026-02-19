/**
 * Institutional PDF Generation Service for Metric Finance
 * Vector-based text and paths for crisp output under 500KB
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
 * Draw the Metric Finance SVG logo directly into the PDF using jsPDF vector drawing
 * Reproduces the grid-based "M" symbol from Logo.tsx
 */
function drawLogoSVG(pdf: import('jspdf').jsPDF, x: number, y: number, size: number) {
  const scale = size / 40; // Logo viewBox is 0 0 40 40

  // Grid lines (light)
  pdf.setDrawColor(31, 41, 55);
  pdf.setLineWidth(0.15 * scale);

  // Vertical grid lines
  [10, 20, 30].forEach((gx) => {
    pdf.line(x + gx * scale, y + 4 * scale, x + gx * scale, y + 36 * scale);
  });
  // Horizontal grid lines
  [10, 20, 30].forEach((gy) => {
    pdf.line(x + 4 * scale, y + gy * scale, x + 36 * scale, y + gy * scale);
  });

  // Geometric M - main structure
  pdf.setDrawColor(31, 41, 55);
  pdf.setLineWidth(0.6 * scale);

  // Left vertical
  pdf.line(x + 8 * scale, y + 32 * scale, x + 8 * scale, y + 12 * scale);
  // Right vertical
  pdf.line(x + 32 * scale, y + 32 * scale, x + 32 * scale, y + 12 * scale);
  // Left diagonal to center
  pdf.line(x + 8 * scale, y + 12 * scale, x + 20 * scale, y + 22 * scale);
  // Right diagonal to center
  pdf.line(x + 32 * scale, y + 12 * scale, x + 20 * scale, y + 22 * scale);
  // Center vertical extension
  pdf.line(x + 20 * scale, y + 22 * scale, x + 20 * scale, y + 32 * scale);

  // Precision dots at intersections
  pdf.setFillColor(31, 41, 55);
  const dotR = 0.5 * scale;
  const dots = [
    [8, 12], [32, 12], [20, 22],
    [8, 32], [32, 32], [20, 32],
  ];
  dots.forEach(([dx, dy]) => {
    pdf.circle(x + dx * scale, y + dy * scale, dotR, 'F');
  });
}

/**
 * Generate institutional-grade vector PDF
 */
export async function generatePDF(data: PDFData): Promise<void> {
  try {
    const { jsPDF } = await import('jspdf');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pageWidth = 210;
    const pageHeight = 297;
    const margins = 20;
    const contentWidth = pageWidth - margins * 2;
    let yPosition = margins;

    // Colors
    const primaryBlue = [37, 99, 235] as const;
    const darkGray = [31, 41, 55] as const;
    const mediumGray = [107, 114, 128] as const;
    const lightGray = [248, 250, 252] as const;
    const white = [255, 255, 255] as const;

    // --- HEADER: SVG Logo (left) + Brand Text (left) + Title (right) ---
    const logoSize = 12;
    const logoX = margins;
    const logoY = yPosition - 1;
    
    // Draw the SVG logo
    drawLogoSVG(pdf, logoX, logoY, logoSize);

    // "Metric Finance" branding text - vertically centered with logo
    const brandTextX = logoX + logoSize + 4;
    const brandTextBaseY = logoY + logoSize / 2 + 2.5; // Center vertically with logo
    
    // "Metric" - Bold, premium sans-serif
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(16);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.text('Metric', brandTextX, brandTextBaseY);

    // "FINANCE" - Smaller, uppercase, track-wider equivalent
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6);
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.text('FINANCE', brandTextX, brandTextBaseY + 3.5);

    // Right-aligned title: "OFFICIAL CALCULATION REPORT" in Slate Gray (#64748b)
    const slateGray = [100, 116, 139] as const;
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(slateGray[0], slateGray[1], slateGray[2]);
    pdf.text('OFFICIAL CALCULATION REPORT', pageWidth - margins, brandTextBaseY - 0.5, { align: 'right' });

    yPosition = logoY + logoSize + 4;

    // --- 1.5pt Electric Blue horizontal divider ---
    pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
    pdf.setLineWidth(1.5 * 0.3528); // 1.5pt in mm
    pdf.line(margins, yPosition, pageWidth - margins, yPosition);
    
    // 20px clearance below divider (5.67mm ≈ 20px)
    yPosition += 5.67;

    // --- Calculator name ---
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.text(data.calculatorName, margins, yPosition);
    yPosition += 10;

    // --- PARSE RESULTS DATA ---
    const resultLines = data.resultsData
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    const dividerIndex = resultLines.indexOf('---');
    const inputs = dividerIndex >= 0 ? resultLines.slice(0, dividerIndex) : [];
    const results = dividerIndex >= 0 ? resultLines.slice(dividerIndex + 1) : resultLines;

    // --- Helper: Draw a two-column data table ---
    const drawTable = (
      title: string,
      rows: string[],
      startY: number,
      isBoldValues: boolean
    ): number => {
      let y = startY;

      // Section title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(9);
      pdf.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.text(title, margins, y);
      y += 2;

      // Title underline
      pdf.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2]);
      pdf.setLineWidth(0.3);
      pdf.line(margins, y, pageWidth - margins, y);
      y += 4;

      const colSplit = margins + contentWidth * 0.5;
      const rowHeight = 7;

      rows.forEach((line, index) => {
        // Check for page overflow
        if (y + rowHeight > pageHeight - 40) {
          pdf.addPage();
          y = margins;
        }

        // Alternating row background
        const bgColor = index % 2 === 0 ? lightGray : white;
        pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
        pdf.rect(margins, y - 3.5, contentWidth, rowHeight, 'F');

        // Parse "Label: Value" or just show full line
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const label = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();

          // Label (left column)
          pdf.setFont('helvetica', 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
          pdf.text(escapeText(label), margins + 3, y);

          // Value (right column)
          pdf.setFont('helvetica', isBoldValues ? 'bold' : 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
          pdf.text(escapeText(value), colSplit + 3, y);
        } else {
          // Single-column fallback
          pdf.setFont('helvetica', isBoldValues ? 'bold' : 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
          pdf.text(escapeText(line), margins + 3, y, { maxWidth: contentWidth - 6 });
        }

        y += rowHeight;
      });

      return y + 4;
    };

    // --- INPUTS TABLE ---
    if (inputs.length > 0) {
      yPosition = drawTable('CALCULATION INPUTS', inputs, yPosition, false);
    }

    // --- RESULTS TABLE ---
    yPosition = drawTable('CALCULATION RESULTS', results, yPosition, true);

    // --- NO-CLIP FOOTER: centered with max-w-[90%] equivalent ---
    const footerY = pageHeight - 28;
    const maxFooterWidth = contentWidth * 0.9;
    const footerCenterX = pageWidth / 2;

    // Thank-you message
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    pdf.text('Thank you for using Metric Finance', footerCenterX, footerY, { align: 'center', maxWidth: maxFooterWidth });

    // Tagline
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    pdf.text('"Plan smarter, decide better."', footerCenterX, footerY + 5, { align: 'center', maxWidth: maxFooterWidth });

    // Legal disclaimer - centered, never clipped
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(150, 150, 150);
    const disclaimer = 'Disclaimer: All calculations are estimates for informational purposes only and do not constitute financial advice. Please consult a qualified financial advisor for personalized guidance.';
    pdf.text(disclaimer, footerCenterX, footerY + 11, {
      align: 'center',
      maxWidth: maxFooterWidth,
    });

    // Copyright
    pdf.setFontSize(6);
    pdf.text(
      `\u00A9 ${new Date().getFullYear()} Metric Finance. All rights reserved. | metricfinance.com`,
      footerCenterX,
      footerY + 19,
      { align: 'center', maxWidth: maxFooterWidth }
    );

    // Save
    pdf.save('Metric-Finance-Report.pdf');
  } catch (error) {
    console.error('[v0] PDF generation error:', error);
    throw new Error('Failed to generate PDF. Please try again.');
  }
}
