"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()} 
      className="print:hidden bg-white border border-slate-200 hover:border-blue-200 hover:text-blue-600 px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
    >
      <Printer size={14} /> Xuất báo cáo PDF
    </button>
  );
}
