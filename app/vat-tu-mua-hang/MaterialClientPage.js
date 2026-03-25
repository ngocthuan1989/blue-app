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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Cung ứng Vật tư</h1>
          <p className="text-slate-500 text-xs">Theo dõi đặt hàng, giao hàng và thanh toán vật tư</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10"
        >
          <Plus size={16} /> Thêm vật tư
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Tìm kiếm tên vật tư, nhà cung cấp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 border-l pl-4">
          <span className="uppercase">Bộ lọc:</span>
          <button 
            onClick={() => setFilterLate(false)}
            className={cn("px-2 py-1 rounded transition-colors", !filterLate ? "bg-slate-100 text-slate-600" : "hover:bg-slate-50")}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setFilterLate(true)}
            className={cn("px-2 py-1 rounded transition-colors", filterLate ? "bg-red-50 text-red-600" : "hover:bg-slate-50")}
          >
            Chậm hàng
          </button>
        </div>
      </div>

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
                  <td className="text-slate-500 max-w-[150px] truncate" title={getProjectName(i.project_id)}>
                    {getProjectName(i.project_id)}
                  </td>
                  <td className="font-semibold text-slate-700">{i.ten_vat_tu}</td>
                  <td className="text-slate-500">{i.nhom_vat_tu}</td>
                  <td className="font-mono text-[11px]">{i.so_luong} {i.don_vi}</td>
                  <td>{i.nha_cung_cap}</td>
                  <td>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      i.trang_thai_mua_hang === 'Đã quyết toán' ? "bg-green-100 text-green-700" :
                      i.trang_thai_mua_hang === 'Chờ đặt' ? "bg-orange-100 text-orange-700" :
                      "bg-blue-100 text-blue-700"
                    )}>
                      {i.trang_thai_mua_hang}
                    </span>
                  </td>
                  <td>
                    {i.hang_ve_cham === "Có" ? (
                      <span className="flex items-center gap-1 text-red-600 font-bold text-[10px] uppercase">
                        <AlertTriangle size={10} /> Chậm
                      </span>
                    ) : "-"}
                  </td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleEdit(i)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(i.item_id)}
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
