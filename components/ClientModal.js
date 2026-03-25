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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{client ? "Sửa khách hàng" : "Thêm khách hàng mới"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã KH</label>
              <input name="client_id" defaultValue={formData.client_id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Loại công trình</label>
              <input name="loai_cong_trinh" defaultValue={formData.loai_cong_trinh} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Tên khách hàng / Dự án KH</label>
            <input name="ten_khach_hang" defaultValue={formData.ten_khach_hang} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Người liên hệ</label>
              <input name="nguoi_lien_he" defaultValue={formData.nguoi_lien_he} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Số điện thoại</label>
              <input name="so_dien_thoai" defaultValue={formData.so_dien_thoai} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">Hủy bỏ</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"><Save size={14} /> Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
}
