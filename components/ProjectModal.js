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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in pb-10 md:pb-0">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white md:bg-slate-50/50">
          <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">{project ? "Sửa hồ sơ dự án" : "Khởi tạo dự án mới"}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 bg-slate-100 md:bg-transparent rounded-full">
            <X size={18} />
          </button>
        </div>

        <form action={async (fd) => {
          await action(fd);
          onClose();
        }} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã hệ thống</label>
              <input 
                name="project_id" 
                defaultValue={formData.project_id} 
                readOnly
                className="w-full px-4 py-3 md:py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm outline-none font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã dự án (HĐ)</label>
              <input 
                name="ma_du_an" 
                defaultValue={formData.ma_du_an} 
                required
                placeholder="VD: FNB-2024..."
                className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên dự án công trình</label>
            <input 
              name="ten_du_an" 
              defaultValue={formData.ten_du_an} 
              required
              className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Trạng thái vận hành</label>
              <select 
                name="trang_thai" 
                defaultValue={formData.trang_thai}
                className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100"
              >
                <option value="planning">Lên kế hoạch</option>
                <option value="design">Thiết kế</option>
                <option value="procurement">Mua hàng</option>
                <option value="construction">Thi công</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tiến độ tổng (%)</label>
              <input 
                name="tien_do_tong_phan_tram" 
                type="number"
                defaultValue={formData.tien_do_tong_phan_tram} 
                className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ngày bàn giao dự kiến</label>
              <input 
                name="ngay_ban_giao_du_kien" 
                type="date"
                defaultValue={formData.ngay_ban_giao_du_kien ? String(formData.ngay_ban_giao_du_kien).split('T')[0] : ""} 
                className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Giá trị hợp đồng (VNĐ)</label>
              <input 
                name="gia_tri_hop_dong" 
                type="number"
                defaultValue={formData.gia_tri_hop_dong} 
                className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose}
              className="w-full md:w-auto px-6 py-3 md:py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors order-2 md:order-1"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 md:py-2.5 rounded-xl flex items-center justify-center gap-2 text-sm font-black shadow-xl shadow-blue-200 transition-all active:scale-95 order-1 md:order-2"
            >
              <Save size={18} /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );  );
}
