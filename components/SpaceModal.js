"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function SpaceModal({ space, onClose, action, projects }) {
  const [formData, setFormData] = useState(space || {
    room_id: `ROM-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    ten_khong_gian: "",
    dien_tich_m2: 0,
    muc_uu_tien: "Trung bình",
    trang_thai_thiet_ke: "Đang thiết kế",
    trang_thai_thi_cong: "Chờ thi công",
    ngay_thi_cong_du_kien: "",
    ton_sau_nghiem_thu: "",
    ghi_chu: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{space ? "Sửa hạng mục không gian" : "Thêm hạng mục mới"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
        </div>
        <form action={async (fd) => { await action(fd); onClose(); }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã HM</label>
              <input name="room_id" defaultValue={formData.room_id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                {projects.map(p => (<option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>))}
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Tên hạng mục / Không gian</label>
            <input name="ten_khong_gian" defaultValue={formData.ten_khong_gian} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Ưu tiên</label>
              <select name="muc_uu_tien" defaultValue={formData.muc_uu_tien} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Cao">Cao</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Thấp">Thấp</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Thi công</label>
              <select name="trang_thai_thi_cong" defaultValue={formData.trang_thai_thi_cong} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Chờ thi công">Chờ thi công</option>
                <option value="Đang thi công">Đang thi công</option>
                <option value="Đã xong">Đã xong</option>
                <option value="Đang xử lý tồn">Đang xử lý tồn</option>
              </select>
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
