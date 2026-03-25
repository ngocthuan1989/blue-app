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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center p-0 md:p-4 transition-all">
      <div className="bg-white rounded-t-3xl md:rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 animate-in pb-10 md:pb-0">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1 md:hidden" />
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white md:bg-slate-50/50">
          <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">{payment ? "Sửa hồ sơ thanh toán" : "Lập đợt thanh toán mới"}</h3>
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
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                {projects.map(p => (
                  <option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Tên đợt thanh toán</label>
              <input name="dot_thanh_toan" defaultValue={formData.dot_thanh_toan} required className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Loại nghiệp vụ</label>
              <select name="loai" defaultValue={formData.loai} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                <option value="Thu khách hàng">Thu khách hàng</option>
                <option value="Chi nhà cung cấp">Chi nhà cung cấp</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Số tiền (VNĐ)</label>
              <input name="so_tien" type="number" defaultValue={formData.so_tien} required className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm font-black text-slate-700 outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Hạn thanh toán</label>
              <input name="ngay_den_han" type="date" defaultValue={formData.ngay_den_han ? String(formData.ngay_den_han).split('T')[0] : ""} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Trạng thái hiện tại</label>
              <select name="trang_thai" defaultValue={formData.trang_thai} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none bg-white focus:ring-2 focus:ring-blue-100">
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Quá hạn">Quá hạn</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Ghi chú giao dịch</label>
            <textarea name="ghi_chu" defaultValue={formData.ghi_chu} rows={2} className="w-full px-4 py-3 md:py-2 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-100" />
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
