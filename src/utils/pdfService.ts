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
 * Draw the Grid-M SVG logo directly into the PDF using jsPDF vector drawing
 * Pixel-perfect vector rendering with Slate-950 (#0f172a) for M paths/nodes
 * and Slate-300 (#cbd5e1) for background grid lines
 */
function drawLogoSVG(pdf: import('jspdf').jsPDF, x: number, y: number, size: number) {
  const scale = size / 40; // Logo viewBox is 0 0 40 40

  // Grid lines - Slate-300 (#cbd5e1)
  const gridColor = [203, 213, 225];
  pdf.setDrawColor(gridColor[0], gridColor[1], gridColor[2]);
  pdf.setLineWidth(0.3 * scale);

  // Vertical grid lines
  [10, 20, 30].forEach((gx) => {
    pdf.line(x + gx * scale, y + 4 * scale, x + gx * scale, y + 36 * scale);
  });
  // Horizontal grid lines
  [10, 20, 30].forEach((gy) => {
    pdf.line(x + 4 * scale, y + gy * scale, x + 36 * scale, y + gy * scale);
  });

  // Geometric M - Slate-950 (#0f172a)
  const mColor = [15, 23, 42];
  pdf.setDrawColor(mColor[0], mColor[1], mColor[2]);
  pdf.setLineWidth(0.75 * scale);

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

  // Precision dots at intersections - Slate-950
  pdf.setFillColor(mColor[0], mColor[1], mColor[2]);
  const dotR = 0.6 * scale;
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

    // Colors - Pixel-Perfect Brand Specification
    const slateNine50 = [15, 23, 42] as const;          // #0f172a - Logo, "Metric", primary text
    const slate600 = [71, 85, 105] as const;            // #475569 - "FINANCE" text
    const slateGray = [148, 163, 184] as const;         // #94a3b8 - "OFFICIAL CALCULATION REPORT"
    const electricBlue = [37, 99, 235] as const;        // #2563eb - Divider line
    const lightGray = [248, 250, 252] as const;         // Light background for tables
    const white = [255, 255, 255] as const;

    // --- HEADER: 40px Grid-M Logo + Branding ---
    const logoSize = 14.15; // 40px at 72 DPI = ~14.15mm
    const headerX = margins;
    const headerY = yPosition;
    
    // Draw the Grid-M logo
    drawLogoSVG(pdf, headerX, headerY, logoSize);

    // "Metric" text - Bold, positioned to the right of logo
    const brandingX = headerX + logoSize + 3;
    const brandingCenterY = headerY + logoSize / 2; // Vertical center alignment with logo
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(18);
    pdf.setTextColor(slateNine50[0], slateNine50[1], slateNine50[2]);
    pdf.text('Metric', brandingX, brandingCenterY + 0.5);

    // "FINANCE" - All-caps, light weight, increased letter-spacing
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(6.5);
    pdf.setTextColor(slate600[0], slate600[1], slate600[2]);
    // Manually spacing letters for increased tracking effect
    const financeLetters = 'F I N A N C E'.split(' ');
    let financeX = brandingX;
    financeLetters.forEach((letter) => {
      pdf.text(letter, financeX, brandingCenterY + 4);
      financeX += 2;
    });

    // Right-aligned contextual label: "OFFICIAL CALCULATION REPORT"
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(slateGray[0], slateGray[1], slateGray[2]);
    pdf.text('OFFICIAL CALCULATION REPORT', pageWidth - margins, brandingCenterY, { align: 'right' });

    // 10px clearance below branding (2.83mm)
    yPosition = headerY + logoSize + 2.83;

    // --- 1.5pt Electric Blue horizontal divider ---
    pdf.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
    pdf.setLineWidth(1.5 * 0.3528); // 1.5pt in mm
    pdf.line(margins, yPosition, pageWidth - margins, yPosition);
    
    // Content starts below divider
    yPosition += 4;

    // --- Calculator name ---
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(slateNine50[0], slateNine50[1], slateNine50[2]);
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
      pdf.setTextColor(electricBlue[0], electricBlue[1], electricBlue[2]);
      pdf.text(title, margins, y);
      y += 2;

      // Title underline
      pdf.setDrawColor(electricBlue[0], electricBlue[1], electricBlue[2]);
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
          pdf.setTextColor(slate600[0], slate600[1], slate600[2]);
          pdf.text(escapeText(label), margins + 3, y);

          // Value (right column)
          pdf.setFont('helvetica', isBoldValues ? 'bold' : 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(slateNine50[0], slateNine50[1], slateNine50[2]);
          pdf.text(escapeText(value), colSplit + 3, y);
        } else {
          // Single-column fallback
          pdf.setFont('helvetica', isBoldValues ? 'bold' : 'normal');
          pdf.setFontSize(8.5);
          pdf.setTextColor(slateNine50[0], slateNine50[1], slateNine50[2]);
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
    pdf.setTextColor(slateNine50[0], slateNine50[1], slateNine50[2]);
    pdf.text('Thank you for using Metric Finance', footerCenterX, footerY, { align: 'center', maxWidth: maxFooterWidth });

    // Tagline
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(slate600[0], slate600[1], slate600[2]);
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
