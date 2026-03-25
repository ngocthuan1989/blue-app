"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { AcceptanceModal } from "@/components/AcceptanceModal";
import { addAcceptance, editAcceptance, removeAcceptance } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function AcceptanceClientPage({ initialAcceptances, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialAcceptances.filter(a => {
    const projectName = projects.find(p => p.project_id === a.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           a.bien_ban_so.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleEdit = (a) => { setEditingItem(a); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa biên bản này?")) await removeAcceptance(id); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Nghiệm thu & Bàn giao</h1>
          <p className="text-slate-500 text-xs">Quản lý chất lượng và biên bản bàn giao dự án</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Lập biên bản</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm kiếm theo dự án hoặc số biên bản..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('project_id')}>Dự án {sortConfig.key === 'project_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('bien_ban_so')}>Biên bản số {sortConfig.key === 'bien_ban_so' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('loai_nghiem_thu')}>Loại {sortConfig.key === 'loai_nghiem_thu' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('ngay_nghiem_thu')}>Ngày NT {sortConfig.key === 'ngay_nghiem_thu' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('ket_qua')}>Kết quả {sortConfig.key === 'ket_qua' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('ton_sau_nghiem_thu')}>Tồn sau NT {sortConfig.key === 'ton_sau_nghiem_thu' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((a) => (
                <tr key={a.acceptance_id}>
                  <td className="text-slate-500 max-w-[180px] truncate">{getProjectName(a.project_id)}</td>
                  <td className="font-semibold text-blue-600">{a.bien_ban_so}</td>
                  <td>{a.loai_nghiem_thu}</td>
                  <td className="text-slate-500 text-[11px]">{a.ngay_nghiem_thu ? String(a.ngay_nghiem_thu).split('T')[0] : "-"}</td>
                  <td>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", a.ket_qua === 'Đạt' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                      {a.ket_qua}
                    </span>
                  </td>
                  <td className="max-w-[200px] truncate text-slate-500" title={a.ton_sau_nghiem_thu}>{a.ton_sau_nghiem_thu || "-"}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(a)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(a.acceptance_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <AcceptanceModal acceptance={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editAcceptance.bind(null, editingItem.acceptance_id) : addAcceptance} projects={projects} />}
    </div>
  );
}
