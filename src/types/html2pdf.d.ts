declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: {
      type?: string;
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      logging?: boolean;
    };
    jsPDF?: {
      orientation?: 'portrait' | 'landscape';
      unit?: 'pt' | 'px' | 'in' | 'mm' | 'cm' | 'ex' | 'em' | 'pc';
      format?: string | number[];
      compress?: boolean;
    };
    pagebreak?: {
      mode?: string[];
      before?: string;
      after?: string;
      avoid?: string;
    };
  }

  interface Html2PdfInstance {
    set(options: Html2PdfOptions): Html2PdfInstance;
    from(element: HTMLElement | string): Html2PdfInstance;
    toPdf(): Html2PdfInstance;
    output(type: 'datauristring' | 'datauri' | 'blob' | 'arraybuffer' | 'save'): void | string | Blob | ArrayBuffer;
    save(filename?: string): void;
    then(callback: (pdf: any) => void): Html2PdfInstance;
    catch(callback: (error: Error) => void): Html2PdfInstance;
  }

  function html2pdf(): Html2PdfInstance;
  function html2pdf(element: HTMLElement | string, options?: Html2PdfOptions): Html2PdfInstance;

  export = html2pdf;
}
