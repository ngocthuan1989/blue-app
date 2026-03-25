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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Nhân sự</h1>
          <p className="text-slate-500 text-xs">Quản lý đội ngũ PM, Thiết kế, Kỹ thuật và Công nhân</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10"
        >
          <Plus size={16} /> Thêm nhân sự
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc mã nhân sự..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td className="font-mono text-[11px] font-semibold text-blue-600">{p.user_id}</td>
                  <td className="font-semibold text-slate-700">{p.ho_ten}</td>
                  <td className="text-slate-500">{p.bo_phan}</td>
                  <td className="capitalize text-slate-600">{p.vai_tro}</td>
                  <td className="text-slate-500">{p.so_dien_thoai}</td>
                  <td className="font-medium">{formatCurrency(p.chi_phi_ngay)} đ</td>
                  <td>
                    {p.trang_thai === "Đang làm việc" ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase">
                        <UserCheck size={10} /> Làm việc
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase">
                        <UserX size={10} /> Đã nghỉ
                      </span>
                    )}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.user_id)}
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
