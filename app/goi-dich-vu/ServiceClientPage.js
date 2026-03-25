"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Briefcase, ChevronUp, ChevronDown } from "lucide-react";
import { ServiceModal } from "@/components/ServiceModal";
import { addService, editService, removeService } from "./actions";
import { cn, formatCurrency } from "@/lib/utils";

export default function ServiceClientPage({ initialServices }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialServices.filter(s => 
    s.ten_goi_dich_vu.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.service_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (s) => { setEditingItem(s); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa gói dịch vụ này?")) await removeService(id); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Gói dịch vụ</h1>
          <p className="text-slate-500 text-xs">Quản lý các gói thiết kế, thi công và đơn giá mặc định</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm gói mới</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm kiếm tên gói dịch vụ..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('service_id')}>Mã gói {sortConfig.key === 'service_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('ten_goi_dich_vu')}>Tên gói dịch vụ {sortConfig.key === 'ten_goi_dich_vu' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('don_vi_tinh')}>ĐVT {sortConfig.key === 'don_vi_tinh' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('don_gia_mac_dinh')}>Đơn giá mặc định {sortConfig.key === 'don_gia_mac_dinh' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('trang_thai')}>Trạng thái {sortConfig.key === 'trang_thai' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((s) => (
                <tr key={s.service_id}>
                  <td className="font-mono text-[11px] font-semibold text-blue-600">{s.service_id}</td>
                  <td className="font-semibold text-slate-700">{s.ten_goi_dich_vu}</td>
                  <td className="text-slate-500">{s.don_vi_tinh}</td>
                  <td className="font-bold">{formatCurrency(s.don_gia_mac_dinh)} đ</td>
                  <td>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.trang_thai === 'Áp dụng' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-400")}>
                      {s.trang_thai}
                    </span>
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(s.service_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <ServiceModal service={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editService.bind(null, editingItem.service_id) : addService} />}
    </div>
  );
}
