"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react";
import { MaterialModal } from "@/components/MaterialModal";
import { addMaterial, editMaterial, removeMaterial } from "@/app/actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function MaterialClientPage({ initialItems, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLate, setFilterLate] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredItems = initialItems.filter(i => {
    const matchesSearch = i.ten_vat_tu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         i.nha_cung_cap.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLate = !filterLate || i.hang_ve_cham === "Có";
    return matchesSearch && matchesLate;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredItems].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getProjectName = (id) => projects.find(p => p.project_id === id)?.ten_du_an || id;

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId) => {
    toast("Xóa vật tư này khỏi danh sách?", {
      description: "Hành động này không thể hoàn tác.",
      action: {
        label: "Xóa",
        onClick: async () => {
          await removeMaterial(itemId);
          toast.success("Đã xóa vật tư");
        },
      },
    });
  };

  return (
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Cung ứng Vật tư</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Theo dõi đặt hàng & Giao nhận</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={18} /> Thêm vật tư mới
        </button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm vật tư, nhà cung cấp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm sm:text-xs outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-slate-50 rounded-lg border border-slate-100">
          <button 
            onClick={() => setFilterLate(false)}
            className={cn("flex-1 md:flex-none px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all", !filterLate ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600")}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setFilterLate(true)}
            className={cn("flex-1 md:flex-none px-3 py-1.5 rounded-md text-[10px] font-black uppercase transition-all", filterLate ? "bg-red-500 text-white shadow-lg shadow-red-100" : "text-slate-400 hover:text-red-400")}
          >
            Chậm hàng
          </button>
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
                <th onClick={() => handleSort('ten_vat_tu')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Tên vật tư
                    {sortConfig.key === 'ten_vat_tu' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('nhom_vat_tu')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Nhóm
                    {sortConfig.key === 'nhom_vat_tu' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('so_luong')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Số lượng
                    {sortConfig.key === 'so_luong' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('nha_cung_cap')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Nhà cung cấp
                    {sortConfig.key === 'nha_cung_cap' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('trang_thai_mua_hang')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Trạng thái
                    {sortConfig.key === 'trang_thai_mua_hang' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('hang_ve_cham')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Về chậm
                    {sortConfig.key === 'hang_ve_cham' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((i) => (
                <tr key={i.item_id}>
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[150px] truncate" title={getProjectName(i.project_id)}>
                    {getProjectName(i.project_id)}
                  </td>
                  <td data-label="Vật tư" className="font-bold text-slate-700 text-sm md:text-xs">{i.ten_vat_tu}</td>
                  <td data-label="Nhóm">{i.nhom_vat_tu}</td>
                  <td data-label="Số lượng" className="font-mono text-[11px] font-bold">{i.so_luong} {i.don_vi}</td>
                  <td data-label="Nhà CC">{i.nha_cung_cap}</td>
                  <td data-label="Trạng thái">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      i.trang_thai_mua_hang === 'Đã quyết toán' ? "bg-green-100 text-green-700" :
                      i.trang_thai_mua_hang === 'Chờ đặt' ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {i.trang_thai_mua_hang}
                    </span>
                  </td>
                  <td data-label="Cảnh báo">
                    {i.hang_ve_cham === "Có" ? (
                      <span className="flex items-center gap-1 text-red-600 font-black text-[10px] uppercase">
                        <AlertTriangle size={12} /> Chậm hàng
                      </span>
                    ) : <span className="text-slate-300">-</span>}
                  </td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button 
                        onClick={() => handleEdit(i)}
                        className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block"
                      >
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa vật tư</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(i.item_id)}
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
      </div>          </table>
        </div>
      </div>

      {isModalOpen && (
        <MaterialModal 
          item={editingItem} 
          onClose={() => setIsModalOpen(false)}
          action={async (formData) => {
            const actionFn = editingItem ? editMaterial.bind(null, editingItem.item_id) : addMaterial;
            await actionFn(formData);
            toast.success(editingItem ? "Đã cập nhật vật tư" : "Đã thêm vật tư mới");
          }}
          projects={projects}
        />
      )}
    </div>
  );
}
