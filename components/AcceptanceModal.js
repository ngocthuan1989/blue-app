"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function AcceptanceModal({ acceptance, onClose, action, projects }) {
  const [formData, setFormData] = useState(acceptance || {
    acceptance_id: `ACC-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    lan_nghiem_thu: 1,
    loai_nghiem_thu: "Nghiệm thu vật tư",
    ngay_nghiem_thu: "",
    ket_qua: "Đạt",
    ton_sau_nghiem_thu: "",
    ngay_hen_xu_ly_ton: "",
    da_xu_ly_xong: "Rồi",
    bien_ban_so: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{acceptance ? "Sửa bản ghi nghiệm thu" : "Thêm biên bản nghiệm thu"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã NT</label>
              <input name="acceptance_id" defaultValue={formData.acceptance_id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                {projects.map(p => (<option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Loại nghiệm thu</label>
              <input name="loai_nghiem_thu" defaultValue={formData.loai_nghiem_thu} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Ngày nghiệm thu</label>
              <input name="ngay_nghiem_thu" type="date" defaultValue={formData.ngay_nghiem_thu ? String(formData.ngay_nghiem_thu).split('T')[0] : ""} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Kết quả</label>
              <select name="ket_qua" defaultValue={formData.ket_qua} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Đạt">Đạt</option>
                <option value="Đạt có tồn">Đạt có tồn</option>
                <option value="Không đạt">Không đạt</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Biên bản số</label>
              <input name="bien_ban_so" defaultValue={formData.bien_ban_so} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Nội dung tồn</label>
            <textarea name="ton_sau_nghiem_thu" defaultValue={formData.ton_sau_nghiem_thu} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
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
