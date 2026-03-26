"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, UserCheck, UserX, ChevronUp, ChevronDown } from "lucide-react";
import { PersonnelModal } from "@/components/PersonnelModal";
import { addPersonnel, editPersonnel, removePersonnel } from "@/app/actions";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function PersonnelClientPage({ initialPersonnel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPersonnel, setEditingPersonnel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredPersonnel = initialPersonnel.filter(p => 
    p.ho_ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredPersonnel].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleEdit = (p) => {
    setEditingPersonnel(p);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPersonnel(null);
    setIsModalOpen(true);
  };

  const handleDelete = (userId) => {
    toast("Xóa nhân sự này?", {
      description: "Hành động này không thể hoàn tác.",
      action: {
        label: "Xóa",
        onClick: async () => {
          await removePersonnel(userId);
          toast.success("Đã xóa nhân sự");
        },
      },
    });
  };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Nhân sự</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Quản lý đội ngũ & Chi phí nhân công</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={18} /> Thêm nhân sự mới
        </button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc mã nhân sự..."
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
                <th onClick={() => handleSort('user_id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Mã NV
                    {sortConfig.key === 'user_id' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ho_ten')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Họ và tên
                    {sortConfig.key === 'ho_ten' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('bo_phan')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Bộ phận
                    {sortConfig.key === 'bo_phan' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('vai_tro')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Vai trò
                    {sortConfig.key === 'vai_tro' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('so_dien_thoai')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Điện thoại
                    {sortConfig.key === 'so_dien_thoai' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('chi_phi_ngay')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Chi phí/ngày
                    {sortConfig.key === 'chi_phi_ngay' && (
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
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((p) => (
                <tr key={p.user_id}>
                  <td data-label="Mã NV" className="font-mono text-[11px] font-semibold text-blue-600">{p.user_id}</td>
                  <td data-label="Nhân sự" className="font-bold text-slate-700 text-sm md:text-xs">{p.ho_ten}</td>
                  <td data-label="Bộ phận" className="text-slate-500 font-medium">{p.bo_phan}</td>
                  <td data-label="Vai trò" className="capitalize text-slate-600">{p.vai_tro}</td>
                  <td data-label="Điện thoại" className="text-blue-600 font-bold md:font-normal md:text-slate-500">{p.so_dien_thoai}</td>
                  <td data-label="Lương/Ngày" className="font-bold text-slate-700">{formatCurrency(p.chi_phi_ngay)} đ</td>
                  <td data-label="Tình trạng">
                    {p.trang_thai === "Đang làm việc" ? (
                      <span className="flex items-center gap-1 text-green-600 font-black text-[10px] uppercase">
                        <UserCheck size={12} /> Làm việc
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 font-black text-[10px] uppercase">
                        <UserX size={12} /> Đã nghỉ
                      </span>
                    )}
                  </td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block"
                      >
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa thông tin</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.user_id)}
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
        <PersonnelModal 
          personnel={editingPersonnel} 
          onClose={() => setIsModalOpen(false)}
          action={async (formData) => {
            const actionFn = editingPersonnel ? editPersonnel.bind(null, editingPersonnel.user_id) : addPersonnel;
            await actionFn(formData);
            toast.success(editingPersonnel ? "Đã cập nhật nhân sự" : "Đã thêm nhân sự mới");
          }}
        />
      )}
    </div>
  );
}
