"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function PersonnelModal({ personnel, onClose, action }) {
  const [formData, setFormData] = useState(personnel || {
    user_id: `USR-${Math.floor(Math.random() * 9000) + 1000}`,
    ho_ten: "",
    chuc_danh: "",
    bo_phan: "",
    vai_tro: "pm",
    so_dien_thoai: "",
    email: "",
    trang_thai: "Đang làm việc",
    chi_phi_ngay: 0,
    ngay_vao_lam: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in pb-10 md:pb-0">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white md:bg-slate-50/50">
          <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">{personnel ? "Sửa hồ sơ nhân sự" : "Thêm nhân sự mới"}</h3>
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Mã nhân sự</label>
              <input name="user_id" defaultValue={formData.user_id} readOnly className="w-full px-4 py-3 md:py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 text-sm outline-none font-mono" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Họ và tên</label>
              <input name="ho_ten" defaultValue={formData.ho_ten} required className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chức danh</label>
              <input name="chuc_danh" defaultValue={formData.chuc_danh} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Bộ phận</label>
              <input name="bo_phan" defaultValue={formData.bo_phan} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Vai trò hệ thống</label>
              <select name="vai_tro" defaultValue={formData.vai_tro} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                <option value="director">Giám đốc</option>
                <option value="pm">Quản lý dự án</option>
                <option value="designer">Thiết kế</option>
                <option value="engineer">Kỹ thuật</option>
                <option value="site_lead">Chỉ huy công trình</option>
                <option value="finance">Tài chính</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tình trạng</label>
              <select name="trang_thai" defaultValue={formData.trang_thai} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                <option value="Đang làm việc">Đang làm việc</option>
                <option value="Đã nghỉ">Đã nghỉ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Số điện thoại</label>
              <input name="so_dien_thoai" type="tel" defaultValue={formData.so_dien_thoai} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Chi phí nhân công/ngày</label>
              <input name="chi_phi_ngay" type="number" defaultValue={formData.chi_phi_ngay} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
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
