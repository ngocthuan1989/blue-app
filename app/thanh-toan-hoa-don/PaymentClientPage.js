"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Search, Calendar, AlertCircle, ChevronUp, ChevronDown } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import { addPayment, editPayment, removePayment } from "@/app/actions";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
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
    <div className="space-y-4 px-0 md:px-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Tài chính & Thanh toán</h1>
          <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mt-0.5">Theo dõi dòng tiền thu & chi</p>
        </div>
        <button 
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 sm:py-2 rounded-xl flex items-center justify-center gap-2 text-sm sm:text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95 w-full sm:w-auto"
        >
          <Plus size={18} /> Thêm đợt thu/chi
        </button>
      </div>

      <div className="bg-white p-2 sm:p-3 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Tìm theo dự án hoặc đợt thanh toán..."
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
                  <td data-label="Dự án" className="text-slate-500 font-bold md:font-normal text-xs md:max-w-[200px] truncate" title={getProjectName(p.project_id)}>
                    {getProjectName(p.project_id)}
                  </td>
                  <td data-label="Đợt TT" className="font-bold text-slate-700 text-sm md:text-xs">{p.dot_thanh_toan}</td>
                  <td data-label="Loại">
                    <span className={cn(
                      "text-[10px] font-black px-2 py-0.5 rounded uppercase",
                      p.loai === "Thu khách hàng" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-orange-50 text-orange-600 border border-orange-100"
                    )}>
                      {p.loai}
                    </span>
                  </td>
                  <td data-label="Số tiền" className="font-black text-slate-800">{formatCurrency(p.so_tien)} đ</td>
                  <td data-label="Đến hạn" className="text-slate-500 text-[11px] font-bold">
                    <div className="flex items-center gap-1 justify-end md:justify-start">
                      <Calendar size={12} className="opacity-40 hidden md:block" />
                      {formatDate(p.ngay_den_han)}
                    </div>
                  </td>
                  <td data-label="Trạng thái">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-black uppercase",
                      p.trang_thai === 'Đã thanh toán' ? "bg-green-100 text-green-700" :
                      p.trang_thai === 'Quá hạn' ? "bg-red-100 text-red-700" :
                      "bg-slate-100 text-slate-600"
                    )}>
                      {p.trang_thai}
                    </span>
                  </td>
                  <td className="text-right pt-4 md:pt-1.5 border-t border-slate-50 md:border-none">
                    <div className="flex items-center justify-end gap-2 md:gap-1">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="p-2.5 md:p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border md:border-none border-slate-100 flex items-center gap-2 md:block"
                      >
                        <Edit2 size={16} className="md:w-3.5 md:h-3.5" />
                        <span className="md:hidden text-[10px] font-bold uppercase">Sửa đợt TT</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(p.payment_id)}
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
