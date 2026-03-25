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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Ghi chú Điều hành</h1>
          <p className="text-slate-500 text-xs">Cập nhật nhanh tình hình dự án và hành động tiếp theo</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm ghi chú</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm kiếm nội dung hoặc tên dự án..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
              {filtered.reverse().map((n) => (
                <tr key={n.note_id}>
                  <td className="text-slate-500 max-w-[150px] truncate">{getProjectName(n.project_id)}</td>
                  <td>
                    <div className="flex items-center gap-1.5 font-bold text-[10px] uppercase">
                      <div className={cn("w-2 h-2 rounded-full", n.den_tin_hieu === 'Xanh' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : n.den_tin_hieu === 'Vàng' ? "bg-orange-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]")} />
                      {n.den_tin_hieu}
                    </div>
                  </td>
                  <td className="font-medium text-slate-700 max-w-[300px] truncate" title={n.noi_dung_tom_tat}>{n.noi_dung_tom_tat}</td>
                  <td className="text-slate-500">{getUserName(n.nguoi_cap_nhat_id)}</td>
                  <td className="text-slate-400 text-[11px] font-mono">{n.ngay_cap_nhat ? String(n.ngay_cap_nhat).split('T')[0] : "-"}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(n)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(n.note_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
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
