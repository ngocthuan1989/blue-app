"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { addProject, editProject, removeProject } from "@/app/actions";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { toast } from "sonner";

export default function ProjectClientPage({ initialProjects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredProjects = initialProjects.filter(p => 
    p.ten_du_an.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.ma_du_an.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredProjects].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (projectId) => {
    toast.warning("Bạn có chắc chắn muốn xóa dự án này?", {
      action: {
        label: "Xóa ngay",
        onClick: async () => {
          const promise = removeProject(projectId);
          toast.promise(promise, {
            loading: 'Đang xóa dự án...',
            success: 'Đã xóa dự án thành công!',
            error: 'Lỗi khi xóa dự án',
          });
        },
      },
    });
  };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Dự án</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Quản lý tiến độ & hồ sơ công trình</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={18} /> Thêm dự án mới
        </button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm kiếm dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <button className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 active:bg-slate-100">
          <Filter size={16} />
        </button>
      </div>

      <div className="bg-white md:rounded-xl border-y md:border border-slate-200 shadow-sm overflow-hidden -mx-4 md:mx-0">
        <div className="table-container">
          <table className="compact-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('ma_du_an')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Mã dự án
                    {sortConfig.key === 'ma_du_an' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ten_du_an')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Tên dự án
                    {sortConfig.key === 'ten_du_an' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('trang_thai')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Trạng thái
                    {sortConfig.key === 'trang_thai' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('tien_do_tong_phan_tram')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Tiến độ (%)
                    {sortConfig.key === 'tien_do_tong_phan_tram' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('gia_tri_hop_dong')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Giá trị HĐ
                    {sortConfig.key === 'gia_tri_hop_dong' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ngay_ban_giao_du_kien')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Bàn giao
                    {sortConfig.key === 'ngay_ban_giao_du_kien' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((p) => (
                <tr key={p.project_id}>
                  <td data-label="Mã dự án" className="font-mono text-[11px] font-semibold text-blue-600">{p.ma_du_an}</td>
                  <td data-label="Dự án" className="py-3">
                    <Link href={`/du-an/${p.project_id}`} className="group/item">
                      <p className="font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors text-sm md:text-xs">{p.ten_du_an}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] font-mono text-slate-400">{p.ma_du_an}</p>
                        {p.canh_bao_chinh && (
                          <span className="text-[8px] font-black bg-red-50 text-red-500 px-1 rounded border border-red-100 uppercase tracking-tighter">! Cảnh báo</span>
                        )}
                      </div>
                    </Link>
                  </td>
                  <td data-label="Trạng thái">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      p.trang_thai === 'completed' ? "bg-green-100 text-green-700" :
                      p.trang_thai === 'construction' ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {p.trang_thai}
                    </span>
                  </td>
                  <td data-label="Tiến độ">
                    <div className="flex items-center gap-2 justify-end md:justify-start">
                      <div className="hidden md:block flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div className="h-full bg-blue-600" style={{ width: `${p.tien_do_tong_phan_tram || 0}%` }}></div>
                      </div>
                      <span className="text-[11px] font-black text-blue-600">{p.tien_do_tong_phan_tram || 0}%</span>
                    </div>
                  </td>
                  <td data-label="Giá trị HĐ" className="font-bold text-slate-700">{formatCurrency(p.gia_tri_hop_dong)} đ</td>
                  <td data-label="Bàn giao" className="text-slate-500 text-[11px]">{formatDate(p.ngay_ban_giao_du_kien)}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block"
                      >
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa hồ sơ</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.project_id)}
                        className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block"
                      >
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

      {isModalOpen && (
        <ProjectModal 
          project={editingProject} 
          onClose={() => setIsModalOpen(false)}
          action={editingProject ? editProject.bind(null, editingProject.project_id) : addProject}
        />
      )}
    </div>
  );
}
