"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Layout, ChevronUp, ChevronDown } from "lucide-react";
import { SpaceModal } from "@/components/SpaceModal";
import { addSpace, editSpace, removeSpace } from "@/app/actions";
import { cn } from "@/lib/utils";

export default function SpaceClientPage({ initialSpaces, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialSpaces.filter(s => {
    const projectName = projects.find(p => p.project_id === s.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) || 
           s.ten_khong_gian.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleEdit = (s) => { setEditingItem(s); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = async (id) => { if (confirm("Xóa hạng mục này?")) await removeSpace(id); };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Hạng mục & Không gian</h1>
          <p className="text-slate-500 text-xs">Theo dõi tiến độ thi công và thiết kế cho từng phòng/khu vực</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm hạng mục</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm theo dự án hoặc hạng mục..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('project_id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Dự án
                    {sortConfig.key === 'project_id' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ten_khong_gian')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Hạng mục
                    {sortConfig.key === 'ten_khong_gian' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('dien_tich_m2')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Diện tích
                    {sortConfig.key === 'dien_tich_m2' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('muc_uu_tien')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Ưu tiên
                    {sortConfig.key === 'muc_uu_tien' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('trang_thai_thi_cong')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Thi công
                    {sortConfig.key === 'trang_thai_thi_cong' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ngay_thi_cong_du_kien')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Ngày thi công
                    {sortConfig.key === 'ngay_thi_cong_du_kien' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((s) => (
                <tr key={s.room_id}>
                  <td className="text-slate-500 max-w-[150px] truncate">{getProjectName(s.project_id)}</td>
                  <td className="font-semibold text-slate-700">{s.ten_khong_gian}</td>
                  <td className="text-slate-500">{s.dien_tich_m2} m²</td>
                  <td><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.muc_uu_tien === 'Cao' ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500")}>{s.muc_uu_tien}</span></td>
                  <td>
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", s.trang_thai_thi_cong === 'Đã xong' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                      {s.trang_thai_thi_cong}
                    </span>
                  </td>
                  <td className="text-slate-400 text-[11px] font-mono">{s.ngay_thi_cong_du_kien || "-"}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(s.room_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <SpaceModal space={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editSpace.bind(null, editingItem.room_id) : addSpace} projects={projects} />}
    </div>
  );
}
