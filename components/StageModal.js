"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function StageModal({ stage, onClose, action, projects, personnel }) {
  const [formData, setFormData] = useState(stage || {
    stage_id: `STG-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    ten_giai_doan: "",
    ma_giai_doan: "",
    ty_trong_phan_tram: 0,
    nguoi_phu_trach_id: personnel[0]?.user_id || "",
    trang_thai: "Chờ thực hiện",
    tien_do_phan_tram: 0,
    cham_tien_do: "Không"
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in pb-10 md:pb-0">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white md:bg-slate-50/50">
          <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">{stage ? "Sửa giai đoạn" : "Thêm giai đoạn mới"}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 md:bg-transparent rounded-full"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dự án áp dụng</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                {projects.map(p => (<option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên giai đoạn (Phase)</label>
              <input name="ten_giai_doan" defaultValue={formData.ten_giai_doan} required className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Cán bộ phụ trách chính</label>
              <select name="nguoi_phu_trach_id" defaultValue={formData.nguoi_phu_trach_id} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                {personnel.map(u => (<option key={u.user_id} value={u.user_id}>{u.ho_ten}</option>))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tiến độ hiện tại (%)</label>
              <input name="tien_do_phan_tram" type="number" defaultValue={formData.tien_do_phan_tram} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
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
