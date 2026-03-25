"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
import { TaskModal } from "@/components/TaskModal";
import { addTask, editTask, removeTask } from "@/app/actions";
import { cn } from "@/lib/utils";

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Quản lý Công việc</h1>
          <p className="text-slate-500 text-xs">Phân công và theo dõi tiến độ chi tiết các đầu việc</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm công việc</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm theo dự án hoặc tên công việc..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td className="text-slate-500 max-w-[150px] truncate">{getProjectName(t.project_id)}</td>
                  <td className="font-medium text-slate-700">{t.ten_cong_viec}</td>
                  <td>{getUserName(t.nguoi_phu_trach_id)}</td>
                  <td><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", t.muc_uu_tien === 'Cao' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500")}>{t.muc_uu_tien}</span></td>
                  <td className="text-slate-400 text-[11px] font-mono">{t.han_xu_ly || "-"}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(t)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(t.task_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
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
