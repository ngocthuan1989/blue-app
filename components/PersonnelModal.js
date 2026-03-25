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
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{personnel ? "Sửa nhân sự" : "Thêm nhân sự mới"}</h3>
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
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã nhân sự</label>
              <input name="user_id" defaultValue={formData.user_id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Họ và tên</label>
              <input name="ho_ten" defaultValue={formData.ho_ten} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Chức danh</label>
              <input name="chuc_danh" defaultValue={formData.chuc_danh} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Bộ phận</label>
              <input name="bo_phan" defaultValue={formData.bo_phan} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Vai trò</label>
              <select name="vai_tro" defaultValue={formData.vai_tro} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="director">Giám đốc</option>
                <option value="pm">Quản lý dự án</option>
                <option value="designer">Thiết kế</option>
                <option value="engineer">Kỹ thuật</option>
                <option value="site_lead">Chỉ huy công trình</option>
                <option value="finance">Tài chính</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Trạng thái</label>
              <select name="trang_thai" defaultValue={formData.trang_thai} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Đang làm việc">Đang làm việc</option>
                <option value="Đã nghỉ">Đã nghỉ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Điện thoại</label>
              <input name="so_dien_thoai" defaultValue={formData.so_dien_thoai} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Chi phí/ngày (đ)</label>
              <input name="chi_phi_ngay" type="number" defaultValue={formData.chi_phi_ngay} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors">Hủy bỏ</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-lg shadow-blue-500/20 transition-all">
              <Save size={14} /> Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
