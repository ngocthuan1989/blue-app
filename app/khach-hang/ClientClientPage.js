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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Danh mục Khách hàng</h1>
          <p className="text-slate-500 text-xs">Quản lý danh sách khách hàng và thông tin liên hệ</p>
        </div>
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold shadow-md shadow-blue-500/10"><Plus size={16} /> Thêm khách hàng</button>
      </div>
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} /><input type="text" placeholder="Tìm theo tên hoặc mã KH..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none" /></div></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                  <td className="font-mono text-[11px] font-semibold text-blue-600">{c.client_id}</td>
                  <td className="font-semibold text-slate-700">{c.ten_khach_hang}</td>
                  <td className="text-slate-500">{c.loai_cong_trinh}</td>
                  <td>{c.nguoi_lien_he}</td>
                  <td className="text-slate-500">{c.so_dien_thoai}</td>
                  <td className="text-slate-400 text-[11px]">{c.nguon_khach}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleEdit(c)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(c.client_id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={14} /></button>
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
