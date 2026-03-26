import { readExcel, getAllData } from "@/lib/excel-db";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { 
  Users, 
  Briefcase, 
  AlertCircle, 
  CheckCircle2, 
  ArrowUpRight,
  TrendingUp,
  Clock,
  ArrowRight,
  DollarSign,
  Command
} from "lucide-react";

export default async function Home() {
  const allData = await getAllData();
  const projects = allData["du-an"] || [];
  const notes = allData["ghi-chu-dieu-hanh"] || [];
  const payments = allData["thanh-toan-hoa-don"] || [];
  const items = allData["vat-tu-mua-hang"] || [];

  // Phân tích dữ liệu
  const redProjects = notes.filter(n => n.den_tin_hieu === "Đỏ").map(n => n.project_id);
  const lateItems = items.filter(i => i.hang_ve_cham === "Có");
  const overduePayments = payments.filter(p => p.trang_thai === "Quá hạn");
  
  const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.so_tien) || 0), 0);
  const totalDebt = projects.reduce((sum, p) => sum + (Number(p.cong_no_khach_hang) || 0), 0);

  const metrics = [
    { label: "Dự án vận hành", value: projects.length, icon: Briefcase, color: "blue", detail: `${projects.filter(p => p.trang_thai === 'construction').length} đang thi công` },
    { label: "Tín hiệu Đỏ", value: [...new Set(redProjects)].length, icon: AlertCircle, color: "red", detail: "Cần can thiệp gấp" },
    { label: "Vật tư về chậm", value: lateItems.length, icon: Clock, color: "orange", detail: "Ảnh hưởng tiến độ" },
    { label: "Công nợ khách", value: formatCurrency(totalDebt), icon: DollarSign, color: "green", detail: "Dòng tiền cần thu (đ)" },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Hệ Thống Quản Lý Tiến Độ Blue</h1>
          <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Hệ thống quản trị tiến độ & dòng tiền nội thất</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-black text-slate-400">
            <Command size={12} /> + K ĐỂ TÌM NHANH
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-600 uppercase">Hệ thống trực tuyến</span>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Link href="/du-an" className="flex-shrink-0 bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          + Dự án mới
        </Link>
        <Link href="/nghiem-thu-ban-giao" className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
          Lập biên bản NT
        </Link>
        <Link href="/vat-tu-mua-hang" className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
          Nhập vật tư
        </Link>
        <Link href="/ghi-chu-dieu-hanh" className="flex-shrink-0 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
          Ghi chú nhanh
        </Link>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const colors = {
            blue: "bg-blue-600 text-white shadow-blue-200",
            red: "bg-red-600 text-white shadow-red-200",
            orange: "bg-orange-500 text-white shadow-orange-200",
            green: "bg-emerald-600 text-white shadow-emerald-200",
          }[m.color];

          return (
            <div key={m.label} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div className={cn("p-2.5 rounded-xl shadow-lg transition-transform group-hover:scale-110", colors)}>
                  <Icon size={20} />
                </div>
                <div className="text-right overflow-hidden">
                  <span className="text-xl md:text-2xl lg:text-3xl font-black text-slate-800 tracking-tighter block truncate">{m.value}</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="font-bold text-slate-500 text-xs uppercase tracking-wide">{m.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{m.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Status Board */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-blue-600" />
                <h3 className="font-black text-slate-700 uppercase text-xs tracking-widest">Tiến độ dự án trọng điểm</h3>
              </div>
              <Link href="/du-an" className="text-blue-600 text-[11px] font-black hover:underline flex items-center gap-1">
                TẤT CẢ DỰ ÁN <ArrowRight size={12} />
              </Link>
            </div>
            <div className="p-2 overflow-x-auto">
              <table className="compact-table">
                <thead>
                  <tr>
                    <th>Dự án</th>
                    <th>PM</th>
                    <th>Tình trạng</th>
                    <th>Tiến độ (%)</th>
                    <th>Điểm tắc</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.filter(p => p.trang_thai !== 'completed').slice(0, 6).map((p) => {
                    const hasRedNote = notes.some(n => n.project_id === p.project_id && n.den_tin_hieu === "Đỏ");
                    return (
                      <tr key={p.project_id} className="group">
                        <td className="py-3">
                          <Link href={`/du-an/${p.project_id}`} className="block">
                            <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{p.ten_du_an}</p>
                            <p className="text-[10px] font-mono text-slate-400">{p.ma_du_an}</p>
                          </Link>
                        </td>
                        <td className="text-[11px] font-semibold text-slate-500 uppercase">{p.pm_id}</td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <div className={cn("w-1.5 h-1.5 rounded-full", hasRedNote ? "bg-red-500" : "bg-green-500")} />
                            <span className="text-[10px] font-black uppercase text-slate-600">{p.trang_thai}</span>
                          </div>
                        </td>
                        <td className="min-w-[120px]">
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                              <span>{p.tien_do_tong_phan_tram || 0}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={cn("h-full transition-all duration-1000", hasRedNote ? "bg-orange-400" : "bg-blue-600")} 
                                style={{ width: `${p.tien_do_tong_phan_tram || 0}%` }} 
                              />
                            </div>
                          </div>
                        </td>
                        <td className="max-w-[150px] truncate text-[11px] text-slate-400 italic">
                          {p.hang_muc_dang_tac || "Ổn định"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hot Tasks */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <Clock size={14} className="text-orange-500" /> Điểm nóng vật tư
                </h3>
                <span className="bg-orange-100 text-orange-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Chậm hàng</span>
              </div>
              <div className="space-y-3">
                {lateItems.slice(0, 4).map(item => (
                  <div key={item.item_id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{item.ten_vat_tu}</p>
                      <p className="text-[10px] text-slate-400">{item.nha_cung_cap}</p>
                    </div>
                    <Link href="/vat-tu-mua-hang" className="text-slate-300 hover:text-blue-600">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Cash Flow */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest flex items-center gap-2">
                  <DollarSign size={14} className="text-emerald-600" /> Dòng tiền đến hạn
                </h3>
                <span className="bg-red-50 text-red-600 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">Quá hạn</span>
              </div>
              <div className="space-y-3">
                {overduePayments.slice(0, 4).map(pay => (
                  <div key={pay.payment_id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-700 truncate">{pay.dot_thanh_toan}</p>
                      <p className="text-[10px] text-red-500 font-bold">{formatCurrency(pay.so_tien)} đ</p>
                    </div>
                    <Link href="/thanh-toan-hoa-don" className="text-slate-300 hover:text-blue-600">
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status / Notes */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
            <h3 className="font-black text-[10px] tracking-[0.2em] uppercase opacity-60 mb-4">Sức khỏe tài chính</h3>
            <div className="space-y-6">
              <div>
                <p className="text-2xl font-black tracking-tighter truncate">{formatCurrency(totalRevenue)} đ</p>
                <p className="text-[10px] font-bold uppercase text-emerald-400 mt-1">Tổng doanh thu chốt</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase opacity-60">Hiệu suất thu hồi</span>
                  <span className="text-xs font-black">72%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[72%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest mb-4">Nhật ký vận hành mới</h3>
            <div className="space-y-4">
              {notes.slice(-5).reverse().map(note => (
                <div key={note.note_id} className="relative pl-4 border-l-2 border-slate-100">
                  <div className={cn(
                    "absolute -left-[5px] top-0 w-2 h-2 rounded-full",
                    note.den_tin_hieu === 'Xanh' ? "bg-green-500" : note.den_tin_hieu === 'Vàng' ? "bg-orange-400" : "bg-red-500"
                  )} />
                  <p className="text-xs font-bold text-slate-700 leading-tight">{note.noi_dung_tom_tat}</p>
                  <p className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-wider">{formatDate(note.ngay_cap_nhat)}</p>
                </div>
              ))}
            </div>
            <Link href="/ghi-chu-dieu-hanh" className="block w-full text-center mt-6 py-2 bg-slate-50 rounded-xl text-[10px] font-black text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all uppercase tracking-widest">
              Xem tất cả nhật ký
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
