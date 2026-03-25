"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, User, ChevronUp, ChevronDown } from "lucide-react";
import { ClientModal } from "@/components/ClientModal";
import { addClient, editClient, removeClient } from "@/app/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ClientClientPage({ initialClients }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filtered = initialClients.filter(c => 
    c.ten_khach_hang.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.client_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleEdit = (c) => { setEditingItem(c); setIsModalOpen(true); };
  const handleAdd = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleDelete = (id) => {
    toast("Xóa khách hàng này?", {
      description: "Hành động này không thể hoàn tác.",
      action: {
        label: "Xóa",
        onClick: async () => {
          await removeClient(id);
          toast.success("Đã xóa khách hàng");
        },
      },
    });
  };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Khách hàng</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Quản lý đối tác & Dự án</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 w-full sm:w-auto"><Plus size={18} /> Thêm khách hàng</button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc mã KH..." 
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
                <th onClick={() => handleSort('client_id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Mã KH
                    {sortConfig.key === 'client_id' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ten_khach_hang')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Tên khách hàng
                    {sortConfig.key === 'ten_khach_hang' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('loai_cong_trinh')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Loại
                    {sortConfig.key === 'loai_cong_trinh' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('nguoi_lien_he')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Người liên hệ
                    {sortConfig.key === 'nguoi_lien_he' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('so_dien_thoai')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Số điện thoại
                    {sortConfig.key === 'so_dien_thoai' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('nguon_khach')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Nguồn
                    {sortConfig.key === 'nguon_khach' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((c) => (
                <tr key={c.client_id}>
                  <td data-label="Mã KH" className="font-mono text-[11px] font-semibold text-blue-600">{c.client_id}</td>
                  <td data-label="Khách hàng" className="font-semibold text-slate-700">{c.ten_khach_hang}</td>
                  <td data-label="Loại">{c.loai_cong_trinh}</td>
                  <td data-label="Liên hệ">{c.nguoi_lien_he}</td>
                  <td data-label="SĐT" className="text-slate-500">{c.so_dien_thoai}</td>
                  <td data-label="Nguồn" className="text-slate-400 text-[11px]">{c.nguon_khach}</td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button onClick={() => handleEdit(c)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa</span>
                      </button>
                      <button onClick={() => handleDelete(c.client_id)} className="p-2.5 md:p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block">
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
      {isModalOpen && <ClientModal client={editingItem} onClose={() => setIsModalOpen(false)} action={async (formData) => {
        const actionFn = editingItem ? editClient.bind(null, editingItem.client_id) : addClient;
        await actionFn(formData);
        toast.success(editingItem ? "Đã cập nhật khách hàng" : "Đã thêm khách hàng mới");
      }} />}
    </div>
  );
}
