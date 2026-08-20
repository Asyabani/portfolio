'use client';

import { Download, Printer } from 'lucide-react';

/** Download / print controls for the resume page — hidden when printing. */
export function ResumeActions({ pdfHref }: { pdfHref: string }) {
  return (
    <div className="print:hidden flex flex-wrap items-center gap-3">
      <a
        href={pdfHref}
        download
        className="inline-flex items-center gap-2 rounded-full bg-primary text-white hover:bg-teal-700 dark:bg-teal-400 dark:text-[#050b23] dark:hover:bg-teal-300 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
      >
        Download PDF
        <Download className="w-4 h-4" aria-hidden="true" />
      </a>
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-full border border-dark/30 dark:border-white/30 hover:border-primary hover:text-primary dark:hover:border-teal-300 dark:hover:text-teal-300 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase transition-colors"
      >
        Print
        <Printer className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
