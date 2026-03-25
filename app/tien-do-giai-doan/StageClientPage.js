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
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tiến độ Giai đoạn</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Quản lý các mốc thời gian & Phase</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"><Plus size={18} /> Thêm giai đoạn</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm dự án hoặc tên giai đoạn..." 
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
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[150px] md:truncate">{getProjectName(s.project_id)}</td>
                  <td data-label="Giai đoạn" className="font-bold text-slate-700 text-sm md:text-xs">{s.ten_giai_doan}</td>
                  <td data-label="Phụ trách" className="text-slate-500 text-[11px] font-medium">{getUserName(s.nguoi_phu_trach_id)}</td>
                  <td data-label="Tiến độ">
                    <div className="flex items-center gap-2 justify-end md:justify-start">
                      <div className="hidden md:block flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div className="h-full bg-blue-600" style={{ width: `${s.tien_do_phan_tram || 0}%` }}></div>
                      </div>
                      <span className="text-[11px] font-black text-blue-600">{s.tien_do_phan_tram || 0}%</span>
                    </div>
                  </td>
                  <td data-label="Trạng thái">{s.cham_tien_do === "Có" ? <span className="text-red-600 font-black text-[10px] uppercase border border-red-100 bg-red-50 px-1.5 py-0.5 rounded">⚠️ Chậm</span> : <span className="text-slate-300">-</span>}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(s)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa giai đoạn</span>
                      </button>
                      <button onClick={() => handleDelete(s.stage_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
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
      </div>          </table>
        </div>
      </div>
      {isModalOpen && <StageModal stage={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editStage.bind(null, editingItem.stage_id) : addStage} projects={projects} personnel={personnel} />}
    </div>
  );
}
