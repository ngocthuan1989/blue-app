"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Calendar, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { addPayment, editPayment, removePayment } from "@/app/actions";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export default function PaymentClientPage({ initialPayments, projects }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const filteredPayments = initialPayments.filter(p => {
    const projectName = projects.find(proj => proj.project_id === p.project_id)?.ten_du_an || "";
    return projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.dot_thanh_toan.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...filteredPayments].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const getProjectName = (id) => projects.find(p => p.project_id === id)?.ten_du_an || id;

  const handleEdit = (p) => {
    setEditingPayment(p);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingPayment(null);
    setIsModalOpen(true);
  };

  const handleDelete = (paymentId) => {
    toast("Xóa đợt thanh toán này?", {
      description: "Hành động này không thể hoàn tác.",
      action: {
        label: "Xóa",
        onClick: async () => {
          await removePayment(paymentId);
          toast.success("Đã xóa đợt thanh toán");
        },
      },
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tài chính & Thanh toán</h1>
          <p className="text-slate-500 text-xs">Theo dõi dòng tiền thu khách hàng và chi nhà cung cấp</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-bold transition-all shadow-md shadow-blue-500/10"
        >
          <Plus size={16} /> Thêm đợt thu/chi
        </button>
      </div>

      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Tìm theo tên dự án hoặc đợt thanh toán..."
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
                <th onClick={() => handleSort('project_id')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Dự án
                    {sortConfig.key === 'project_id' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('dot_thanh_toan')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Đợt thanh toán
                    {sortConfig.key === 'dot_thanh_toan' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('loai')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Loại
                    {sortConfig.key === 'loai' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('so_tien')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Số tiền
                    {sortConfig.key === 'so_tien' && (
                      sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('ngay_den_han')} className="cursor-pointer">
                  <div className="flex items-center gap-1">
                    Đến hạn
                    {sortConfig.key === 'ngay_den_han' && (
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
                <tr key={p.payment_id}>
                  <td className="text-slate-500 max-w-[200px] truncate" title={getProjectName(p.project_id)}>
                    {getProjectName(p.project_id)}
                  </td>
                  <td className="font-semibold text-slate-700">{p.dot_thanh_toan}</td>
                  <td>
                    <span className={cn(
                      "text-[10px] font-bold px-1.5 py-0.5 rounded",
                      p.loai === "Thu khách hàng" ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"
                    )}>
                      {p.loai}
                    </span>
                  </td>
                  <td className="font-bold">{formatCurrency(p.so_tien)} đ</td>
                  <td className="text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="opacity-40" />
                      {p.ngay_den_han ? String(p.ngay_den_han).split('T')[0] : "-"}
                    </div>
                  </td>
                  <td>
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      p.trang_thai === 'Đã thanh toán' ? "bg-green-100 text-green-700" :
                      p.trang_thai === 'Quá hạn' ? "bg-red-100 text-red-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {p.trang_thai}
                    </span>
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
                        onClick={() => handleDelete(p.payment_id)}
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
        <PaymentModal 
          payment={editingPayment} 
          onClose={() => setIsModalOpen(false)}
          action={async (formData) => {
            const actionFn = editingPayment ? editPayment.bind(null, editingPayment.payment_id) : addPayment;
            await actionFn(formData);
            toast.success(editingPayment ? "Đã cập nhật đợt thanh toán" : "Đã thêm đợt thanh toán mới");
          }}
          projects={projects}
        />
      )}
    </div>
  );
}
