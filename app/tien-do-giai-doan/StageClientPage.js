"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Flag, ChevronUp, ChevronDown } from "lucide-react";
import { StageModal } from "@/components/StageModal";
import { addStage, editStage, removeStage } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function StageClientPage({ initialStages, projects, personnel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialStages.filter(s => {
    const projectName = projects.find(p => p.project_id === s.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           s.ten_giai_doan.toLowerCase().includes(searchTerm.toLowerCase());
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
  const getUserName = (id) => personnel.find(u => u.user_id === id)?.ho_ten || id;

  const handleEdit = (s) => { setEditingItem(s); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa giai đoạn này?")) await removeStage(id); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tiến độ Giai đoạn</h1>
          <p className="text-slate-500 text-xs">Quản lý các mốc thời gian (Phase) và người phụ trách chính</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm giai đoạn</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm theo dự án hoặc tên giai đoạn..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('project_id')}>
                  Dự án {sortConfig.key === 'project_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}
                </th>
                <th onClick={() => handleSort('ten_giai_doan')}>
                  Tên giai đoạn {sortConfig.key === 'ten_giai_doan' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}
                </th>
                <th onClick={() => handleSort('nguoi_phu_trach_id')}>
                  Người phụ trách {sortConfig.key === 'nguoi_phu_trach_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}
                </th>
                <th onClick={() => handleSort('tien_do_phan_tram')}>
                  Tiến độ (%) {sortConfig.key === 'tien_do_phan_tram' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}
                </th>
                <th onClick={() => handleSort('cham_tien_do')}>
                  Chậm {sortConfig.key === 'cham_tien_do' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}
                </th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((s) => (
                <tr key={s.stage_id}>
                  <td className="text-slate-500 max-w-[150px] truncate">{getProjectName(s.project_id)}</td>
                  <td className="font-semibold text-slate-700">{s.ten_giai_doan}</td>
                  <td className="text-slate-500 text-[11px]">{getUserName(s.nguoi_phu_trach_id)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div className="h-full bg-blue-600" style={{ width: `${s.tien_do_phan_tram || 0}%` }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">{s.tien_do_phan_tram || 0}%</span>
                    </div>
                  </td>
                  <td>{s.cham_tien_do === "Có" ? <span className="text-red-600 font-bold text-[10px] uppercase">Có</span> : "-"}</td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(s.stage_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <StageModal stage={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editStage.bind(null, editingItem.stage_id) : addStage} projects={projects} personnel={personnel} />}
    </div>
  );
}
