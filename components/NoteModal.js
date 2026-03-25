"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function NoteModal({ note, onClose, action, projects, personnel }) {
  const [formData, setFormData] = useState(note || {
    note_id: `NT-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    ngay_cap_nhat: new Date().toISOString().split('T')[0],
    den_tin_hieu: "Xanh",
    noi_dung_tom_tat: "",
    vuong_mac_chinh: "",
    hanh_dong_tiep_theo: "",
    nguoi_cap_nhat_id: personnel[0]?.user_id || ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{note ? "Sửa ghi chú" : "Thêm ghi chú điều hành"}</h3>
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
              <label className="text-[11px] font-bold text-slate-500 uppercase">Tín hiệu</label>
              <select name="den_tin_hieu" defaultValue={formData.den_tin_hieu} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Xanh">Xanh (Ổn định)</option>
                <option value="Vàng">Vàng (Cảnh báo)</option>
                <option value="Đỏ">Đỏ (Nguy cấp)</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Nội dung tóm tắt</label>
            <input name="noi_dung_tom_tat" defaultValue={formData.noi_dung_tom_tat} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Vướng mắc chính</label>
            <textarea name="vuong_mac_chinh" defaultValue={formData.vuong_mac_chinh} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Người cập nhật</label>
            <select name="nguoi_cap_nhat_id" defaultValue={formData.nguoi_cap_nhat_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
              {personnel.map(u => (<option key={u.user_id} value={u.user_id}>{u.ho_ten}</option>))}
            </select>
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
