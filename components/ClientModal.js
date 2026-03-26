"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function ClientModal({ client, onClose, action }) {
  const [formData, setFormData] = useState(client || {
    client_id: `CLI-${Math.floor(Math.random() * 9000) + 1000}`,
    ten_khach_hang: "",
    loai_cong_trinh: "Căn hộ",
    nguoi_lien_he: "",
    so_dien_thoai: "",
    email: "",
    dia_chi: "",
    nguon_khach: "",
    trang_thai: "Đang hợp tác"
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in pb-10 md:pb-0">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white md:bg-slate-50/50">
          <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">{client ? "Sửa khách hàng" : "Thêm khách hàng mới"}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 md:bg-transparent rounded-full"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã KH</label>
              <input name="client_id" defaultValue={formData.client_id} readOnly className="w-full px-4 py-3 md:py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm outline-none font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Loại công trình</label>
              <input name="loai_cong_trinh" defaultValue={formData.loai_cong_trinh} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên khách hàng / Dự án KH</label>
            <input name="ten_khach_hang" defaultValue={formData.ten_khach_hang} required className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Người liên hệ</label>
              <input name="nguoi_lien_he" defaultValue={formData.nguoi_lien_he} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Số điện thoại</label>
              <input name="so_dien_thoai" type="tel" defaultValue={formData.so_dien_thoai} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="pt-6 flex flex-col md:flex-row items-center justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="w-full md:w-auto px-6 py-3 md:py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors order-2 md:order-1">Hủy bỏ</button>
            <button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-black shadow-xl shadow-blue-200 transition-all active:scale-95 order-1 md:order-2"><Save size={18} /> Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
