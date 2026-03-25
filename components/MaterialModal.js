"use client";

import { useState } from "react";
import { X, Save } from "lucide-react";

export function MaterialModal({ item, onClose, action, projects }) {
  const [formData, setFormData] = useState(item || {
    item_id: `ITM-${Math.floor(Math.random() * 9000) + 1000}`,
    project_id: projects[0]?.project_id || "",
    ten_vat_tu: "",
    nhom_vat_tu: "",
    nha_cung_cap: "",
    so_luong: 0,
    don_gia_du_kien: 0,
    thanh_tien_du_kien: 0,
    trang_thai_mua_hang: "Chờ đặt",
    hang_ve_cham: "Không"
  });

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-700">{item ? "Sửa vật tư" : "Thêm vật tư mới"}</h3>
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
              <label className="text-[11px] font-bold text-slate-500 uppercase">Mã vật tư</label>
              <input name="item_id" defaultValue={formData.item_id} readOnly className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Dự án</label>
              <select name="project_id" defaultValue={formData.project_id} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                {projects.map(p => (
                  <option key={p.project_id} value={p.project_id}>{p.ten_du_an}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase">Tên vật tư</label>
            <input name="ten_vat_tu" defaultValue={formData.ten_vat_tu} required className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nhóm</label>
              <input name="nhom_vat_tu" defaultValue={formData.nhom_vat_tu} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nhà cung cấp</label>
              <input name="nha_cung_cap" defaultValue={formData.nha_cung_cap} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Số lượng</label>
              <input name="so_luong" type="number" defaultValue={formData.so_luong} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Đơn giá</label>
              <input name="don_gia_du_kien" type="number" defaultValue={formData.don_gia_du_kien} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Trạng thái</label>
              <select name="trang_thai_mua_hang" defaultValue={formData.trang_thai_mua_hang} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs outline-none bg-white">
                <option value="Chờ đặt">Chờ đặt</option>
                <option value="Đã đặt">Đã đặt</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã quyết toán">Đã quyết toán</option>
              </select>
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
