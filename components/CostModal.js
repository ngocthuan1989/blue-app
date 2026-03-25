"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function CostModal({ cost, onClose, action, projects }) {
  const [formData, setFormData] = useState(cost || {
    cost_id: `CST-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    ngay_chi: new Date().toISOString().split('T')[0],
    nhom_chi_phi: "Vật tư",
    noi_dung_chi: "",
    so_tien: 0,
    trang_thai: "Đã thanh toán",
    nha_cung_cap: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{cost ? "Sửa khoản chi" : "Thêm khoản chi mới"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                {projects.map(p => (<option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Ngày chi</label>
              <input name="ngay_chi" type="date" defaultValue={formData.ngay_chi ? String(formData.ngay_chi).split('T')[0] : ""} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Nội dung chi</label>
            <input name="noi_dung_chi" defaultValue={formData.noi_dung_chi} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Số tiền (đ)</label>
              <input name="so_tien" type="number" defaultValue={formData.so_tien} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nhà cung cấp</label>
              <input name="nha_cung_cap" defaultValue={formData.nha_cung_cap} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
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
