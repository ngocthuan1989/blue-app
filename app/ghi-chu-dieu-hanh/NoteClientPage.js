"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, StickyNote, Flag } from "lucide-react";
import { NoteModal } from "@/components/NoteModal";
import { addNote, editNote, removeNote } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function NoteClientPage({ initialNotes, projects, personnel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = initialNotes.filter(n => {
    const projectName = projects.find(p => p.project_id === n.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           n.noi_dung_tom_tat.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getProjectName = (id) => projects.find(p => p.project_id === id)?.ten_du_an || id;
  const getUserName = (id) => personnel.find(u => u.user_id === id)?.ho_ten || id;

  const handleEdit = (n) => { setEditingItem(n); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa ghi chú này?")) await removeNote(id); };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Ghi chú Điều hành</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Cập nhật nhanh tình hình dự án</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"><Plus size={18} /> Thêm ghi chú</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo nội dung hoặc dự án..." 
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
                <th>Dự án</th>
                <th>Tín hiệu</th>
                <th>Nội dung tóm tắt</th>
                <th>Người cập nhật</th>
                <th>Ngày</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice().reverse().map((n) => (
                <tr key={n.note_id}>
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[150px] truncate">{getProjectName(n.project_id)}</td>
                  <td data-label="Tín hiệu">
                    <div className="flex items-center justify-end md:justify-start gap-1.5 font-black text-[10px] uppercase">
                      <div className={cn("w-2.5 h-2.5 rounded-full", n.den_tin_hieu === 'Xanh' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : n.den_tin_hieu === 'Vàng' ? "bg-orange-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]")} />
                      <span className={cn(n.den_tin_hieu === 'Xanh' ? "text-green-600" : n.den_tin_hieu === 'Vàng' ? "text-orange-600" : "text-red-600")}>{n.den_tin_hieu}</span>
                    </div>
                  </td>
                  <td data-label="Nội dung" className="font-bold text-slate-700 text-sm md:text-xs md:max-w-[300px] md:truncate" title={n.noi_dung_tom_tat}>{n.noi_dung_tom_tat}</td>
                  <td data-label="Cập nhật">{getUserName(n.nguoi_cap_nhat_id)}</td>
                  <td data-label="Thời gian" className="text-slate-400 text-[11px] font-mono">{n.ngay_cap_nhat ? String(n.ngay_cap_nhat).split('T')[0] : "-"}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(n)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa ghi chú</span>
                      </button>
                      <button onClick={() => handleDelete(n.note_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
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
      {isModalOpen && <NoteModal note={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editNote.bind(null, editingItem.note_id) : addNote} projects={projects} personnel={personnel} />}
    </div>
  );
}
