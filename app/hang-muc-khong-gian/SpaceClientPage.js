"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Layout, ChevronUp, ChevronDown } from "lucide-react";
import { SpaceModal } from "@/components/SpaceModal";
import { addSpace, editSpace, removeSpace } from "@/app/actions";
import { cn, , formatDate } from "@/lib/utils";

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
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Hạng mục & Không gian</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Theo dõi chi tiết từng phòng & khu vực</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"><Plus size={18} /> Thêm hạng mục</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm dự án hoặc hạng mục..." 
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
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[150px] md:truncate">{getProjectName(s.project_id)}</td>
                  <td data-label="Không gian" className="font-bold text-slate-700 text-sm md:text-xs">{s.ten_khong_gian}</td>
                  <td data-label="Diện tích" className="text-slate-500 font-mono">{s.dien_tich_m2} m²</td>
                  <td data-label="Mức ưu tiên"><span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", s.muc_uu_tien === 'Cao' ? "bg-red-50 text-red-600 border border-red-100" : "bg-slate-100 text-slate-500")}>{s.muc_uu_tien}</span></td>
                  <td data-label="Trạng thái">
                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase", s.trang_thai_thi_cong === 'Đã xong' ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700")}>
                      {s.trang_thai_thi_cong}
                    </span>
                  </td>
                  <td data-label="Dự kiến" className="text-slate-400 text-[11px] font-mono">{formatDate(s.ngay_thi_cong_du_kien)}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(s)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa hạng mục</span>
                      </button>
                      <button onClick={() => handleDelete(s.room_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
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
      {isModalOpen && <SpaceModal space={editingItem} onClose={() => setIsModalOpen(false)} action={editingItem ? editSpace.bind(null, editingItem.room_id) : addSpace} projects={projects} />}
    </div>
  );
}
