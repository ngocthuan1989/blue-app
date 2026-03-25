"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, DollarSign, ChevronUp, ChevronDown } from "lucide-react";
import { CostModal } from "@/components/CostModal";
import { addCost, editCost, removeCost } from "@/app/actions";
import { cn, formatCurrency } from "@/lib/utils";

export default function CostClientPage({ initialCosts, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialCosts.filter(c => {
    const projectName = projects.find(p => p.project_id === c.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           c.noi_dung_chi.toLowerCase().includes(searchTerm.toLowerCase());
  });

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

  const getProjectName = (id) => projects.find(p => p.project_id === id)?.ten_du_an || id;

  const handleEdit = (c) => { setEditingItem(c); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa khoản chi này?")) await removeCost(id); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Quản lý Chi phí</h1>
          <p className="text-slate-500 text-xs">Theo dõi các khoản chi thực tế và phát sinh của dự án</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm khoản chi</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm theo dự án hoặc nội dung chi..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('project_id')}>Dự án {sortConfig.key === 'project_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('noi_dung_chi')}>Nội dung chi {sortConfig.key === 'noi_dung_chi' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('nhom_chi_phi')}>Nhóm {sortConfig.key === 'nhom_chi_phi' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('so_tien')}>Số tiền {sortConfig.key === 'so_tien' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('ngay_chi')}>Ngày chi {sortConfig.key === 'ngay_chi' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('nha_cung_cap')}>Nhà cung cấp {sortConfig.key === 'nha_cung_cap' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((c) => (
                <tr key={c.cost_id}>
                  <td className="text-slate-500 max-w-[150px] truncate">{getProjectName(c.project_id)}</td>
                  <td className="font-medium text-slate-700">{c.noi_dung_chi}</td>
                  <td><span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">{c.nhom_chi_phi}</span></td>
                  <td className="font-bold text-orange-600">{formatCurrency(c.so_tien)} đ</td>
                  <td className="text-slate-400 text-[11px] font-mono">{c.ngay_chi ? String(c.ngay_chi).split('T')[0] : "-"}</td>
                  <td className="text-slate-500">{c.nha_cung_cap}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(c.cost_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <CostModal cost={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editCost.bind(null, editingItem.cost_id) : addCost} projects={projects} />}
    </div>
  );
}
