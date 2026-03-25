"use client";

import { useState } from "react";
import { X, Save, Trash2 } from "lucide-react";

export function ProjectModal({ project, onClose, action }) {
  const [formData, setFormData] = useState(project || {
    project_id: `PRJ-${Math.floor(Math.random() * 9000) + 1000}`,
    ma_du_an: "",
    ten_du_an: "",
    trang_thai: "planning",
    tien_do_tong_phan_tram: 0,
    ngay_ban_giao_du_kien: "",
    gia_tri_hop_dong: 0,
    pm_id: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{project ? "Sửa dự án" : "Thêm dự án mới"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form action={async (fd) => {
          await action(fd);
          onClose();
        }} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã hệ thống</label>
              <input 
                name="project_id" 
                defaultValue={formData.project_id} 
                readOnly
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã dự án (HĐ)</label>
              <input 
                name="ma_du_an" 
                defaultValue={formData.ma_du_an} 
                required
                placeholder="VD: FNB-2024..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Tên dự án</label>
            <input 
              name="ten_du_an" 
              defaultValue={formData.ten_du_an} 
              required
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Trạng thái</label>
              <select 
                name="trang_thai" 
                defaultValue={formData.trang_thai}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white"
              >
                <option value="planning">Lên kế hoạch</option>
                <option value="design">Thiết kế</option>
                <option value="procurement">Mua hàng</option>
                <option value="construction">Thi công</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Tiến độ (%)</label>
              <input 
                name="tien_do_tong_phan_tram" 
                type="number"
                defaultValue={formData.tien_do_tong_phan_tram} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Ngày bàn giao</label>
              <input 
                name="ngay_ban_giao_du_kien" 
                type="date"
                defaultValue={formData.ngay_ban_giao_du_kien ? String(formData.ngay_ban_giao_du_kien).split('T')[0] : ""} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Giá trị (VNĐ)</label>
              <input 
                name="gia_tri_hop_dong" 
                type="number"
                defaultValue={formData.gia_tri_hop_dong} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
            >
              <Save size={14} /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
