"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, CheckCircle, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { AcceptanceModal } from "@/components/AcceptanceModal";
import { addAcceptance, editAcceptance, removeAcceptance } from "@/app/actions";
import { , formatDate } from "@/lib/utils";

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
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Nghiệm thu & Bàn giao</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Quản lý chất lượng & Hồ sơ dự án</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"><Plus size={18} /> Lập biên bản mới</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo dự án hoặc số biên bản..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
          />
        </div>
      </div>

      <div className="bg-white md:rounded-xl border-y md:border border-slate-200 shadow-sm overflow-hidden -mx-4 md:mx-0">
        <div className="table-container">
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
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[180px] md:truncate">{getProjectName(a.project_id)}</td>
                  <td data-label="Số BB" className="font-bold text-blue-600 text-sm md:text-xs">{a.bien_ban_so}</td>
                  <td data-label="Phân loại">{a.loai_nghiem_thu}</td>
                  <td data-label="Thời gian" className="text-slate-500 text-[11px] font-mono">{formatDate(a.ngay_nghiem_thu)}</td>
                  <td data-label="Kết quả">
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", a.ket_qua === 'Đạt' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700")}>
                      {a.ket_qua}
                    </span>
                  </td>
                  <td data-label="Tồn đọng" className="md:max-w-[200px] md:truncate text-slate-500 italic" title={a.ton_sau_nghiem_thu}>{a.ton_sau_nghiem_thu || "Không có"}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(a)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa biên bản</span>
                      </button>
                      <button onClick={() => handleDelete(a.acceptance_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Trash2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase text-red-400">Xóa</span>
                      </button>
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
