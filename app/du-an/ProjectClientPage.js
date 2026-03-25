"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2, Search, Filter, ChevronUp, ChevronDown } from "lucide-react";
import { ProjectModal } from "@/components/ProjectModal";
import { addProject, editProject, removeProject } from "@/app/actions";
import { cn, formatCurrency } from "@/lib/utils";
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Dự án</h1>
          <p className="text-slate-500 text-xs">Quản lý danh sách, tiến độ và trạng thái dự án</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10"
        >
          <Plus size={16} /> Thêm dự án mới
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo tên hoặc mã dự án..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
          />
        </div>
        <button className="p-2 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50">
          <Filter size={14} />
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td className="font-mono text-[11px] font-semibold text-blue-600">{p.ma_du_an}</td>
                  <td className="py-3">
                    <Link href={`/du-an/${p.project_id}`} className="group/item">
                      <p className="font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors">{p.ten_du_an}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] font-mono text-slate-400">{p.ma_du_an}</p>
                        {p.canh_bao_chinh && (
                          <span className="text-[8px] font-black bg-red-50 text-red-500 px-1 rounded border border-red-100 uppercase tracking-tighter">! Cảnh báo</span>
                        )}
                      </div>
                    </Link>
                  </td>
                  <td>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      p.trang_thai === 'completed' ? "bg-green-100 text-green-700" :
                      p.trang_thai === 'construction' ? "bg-blue-100 text-blue-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {p.trang_thai}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden min-w-[60px]">
                        <div className="h-full bg-blue-600" style={{ width: `${p.tien_do_tong_phan_tram || 0}%` }}></div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">{p.tien_do_tong_phan_tram || 0}%</span>
                    </div>
                  </td>
                  <td className="font-medium">{formatCurrency(p.gia_tri_hop_dong)} đ</td>
                  <td className="text-slate-500 text-[11px]">{p.ngay_ban_giao_du_kien ? String(p.ngay_ban_giao_du_kien).split('T')[0] : "-"}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.project_id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <Trash2 size={14} />
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
