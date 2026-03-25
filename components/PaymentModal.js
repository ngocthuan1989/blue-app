"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function PaymentModal({ payment, onClose, action, projects }) {
  const [formData, setFormData] = useState(payment || {
    payment_id: `PAY-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    dot_thanh_toan: "",
    loai: "Thu khách hàng",
    ngay_du_kien: "",
    ngay_den_han: "",
    so_tien: 0,
    trang_thai: "Chưa thanh toán",
    ngay_thanh_toan: "",
    ghi_chu: ""
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{payment ? "Sửa thanh toán" : "Thêm đợt thanh toán"}</h3>
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
              <label className="text-[11px] font-bold text-slate-500 uppercase">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                {projects.map(p => (
                  <option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Đợt thanh toán</label>
              <input name="dot_thanh_toan" defaultValue={formData.dot_thanh_toan} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Loại</label>
              <select name="loai" defaultValue={formData.loai} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Thu khách hàng">Thu khách hàng</option>
                <option value="Chi nhà cung cấp">Chi nhà cung cấp</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Số tiền (đ)</label>
              <input name="so_tien" type="number" defaultValue={formData.so_tien} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Ngày đến hạn</label>
              <input name="ngay_den_han" type="date" defaultValue={formData.ngay_den_han ? String(formData.ngay_den_han).split('T')[0] : ""} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Trạng thái</label>
              <select name="trang_thai" defaultValue={formData.trang_thai} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Quá hạn">Quá hạn</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Ghi chú</label>
            <textarea name="ghi_chu" defaultValue={formData.ghi_chu} rows={2} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
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
