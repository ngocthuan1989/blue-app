"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
import { TaskModal } from "@/components/TaskModal";
import { addTask, editTask, removeTask } from "@/app/actions";
import { cn, , formatDate } from "@/lib/utils";

export default function TaskClientPage({ initialTasks, projects, personnel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialTasks.filter(t => {
    const projectName = projects.find(p => p.project_id === t.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           t.ten_cong_viec.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleEdit = (t) => { setEditingItem(t); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa công việc này?")) await removeTask(id); };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Quản lý Công việc</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Phân công & Theo dõi tiến độ</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"><Plus size={18} /> Thêm công việc mới</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm dự án hoặc công việc..." 
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
                <th onClick={() => handleSort('ten_cong_viec')}>Tên công việc {sortConfig.key === 'ten_cong_viec' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('nguoi_phu_trach_id')}>Người thực hiện {sortConfig.key === 'nguoi_phu_trach_id' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('muc_uu_tien')}>Ưu tiên {sortConfig.key === 'muc_uu_tien' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th onClick={() => handleSort('han_xu_ly')}>Hạn xử lý {sortConfig.key === 'han_xu_ly' && (sortConfig.direction === 'asc' ? <ChevronUp size={12} className="inline ml-1" /> : <ChevronDown size={12} className="inline ml-1" />)}</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((t) => (
                <tr key={t.task_id}>
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[150px] truncate">{getProjectName(t.project_id)}</td>
                  <td data-label="Công việc" className="font-bold text-slate-700 text-sm md:text-xs">{t.ten_cong_viec}</td>
                  <td data-label="Phụ trách">{getUserName(t.nguoi_phu_trach_id)}</td>
                  <td data-label="Ưu tiên"><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", t.muc_uu_tien === 'Cao' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500")}>{t.muc_uu_tien}</span></td>
                  <td data-label="Hạn xử lý" className="text-slate-400 text-[11px] font-mono">{formatDate(t.han_xu_ly)}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(t)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa công việc</span>
                      </button>
                      <button onClick={() => handleDelete(t.task_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
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
      {isModalOpen && <TaskModal task={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editTask.bind(null, editingItem.task_id) : addTask} projects={projects} personnel={personnel} />}
    </div>
  );
}
