import { getProjectDetail } from "@/lib/excel-db";
import { formatCurrency, formatDate } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectTimeline from "@/components/ProjectTimeline";
import PrintButton from "@/components/PrintButton";
import { 
  ArrowLeft, 
  Briefcase, 
  Layout, 
  Flag, 
  StickyNote, 
  Package, 
  Receipt,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const detail = await getProjectDetail(id);

  if (!detail) return notFound();

  const { project, spaces, stages, tasks, materials, payments, notes, costs } = detail;

  const sections = [
    { label: "Hạng mục không gian", count: spaces.length, data: spaces, icon: Layout, color: "blue" },
    { label: "Giai đoạn tiến độ", count: stages.length, data: stages, icon: Flag, color: "green" },
    { label: "Công việc chi tiết", count: tasks.length, data: tasks, icon: StickyNote, color: "purple" },
    { label: "Cung ứng vật tư", count: materials.length, data: materials, icon: Package, color: "orange" },
    { label: "Dòng tiền đợt thu", count: payments.length, data: payments, icon: Receipt, color: "emerald" },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Breadcrumb & Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/du-an" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-blue-600 shadow-sm print:hidden">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-800">{project.ten_du_an}</h1>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded uppercase">{project.ma_du_an}</span>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Hồ sơ dự án 360°</p>
          </div>
        </div>
        
        <PrintButton />
      </div>

      {/* Timeline View */}
      <ProjectTimeline stages={stages} />

      {/* Project Quick Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Quản lý dự án (PM)</p>
                <p className="font-bold text-slate-700">{project.pm_id}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Trạng thái hiện tại</p>
                <p className="font-bold text-blue-600 uppercase text-xs">{project.trang_thai}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Ngày bàn giao dự kiến</p>
                <div className="flex items-center gap-2 text-slate-700 font-bold">
                  <Calendar size={14} className="text-slate-300" />
                  {formatDate(project.ngay_ban_giao_du_kien)}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Giá trị hợp đồng</p>
                <p className="font-bold text-slate-800">{formatCurrency(project.gia_tri_hop_dong)} đ</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[240px] flex flex-col items-center justify-center border-l border-slate-100 pl-0 md:pl-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-50" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * (project.tien_do_tong_phan_tram || 0)) / 100} className="text-blue-600 transition-all duration-1000" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-slate-800">{project.tien_do_tong_phan_tram || 0}%</span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Tiến độ tổng</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black uppercase opacity-50 tracking-widest mb-1">Công nợ khách hàng</p>
            <p className="text-2xl font-black text-orange-400">{formatCurrency(project.cong_no_khach_hang)} đ</p>
          </div>
          <div className="pt-4 border-t border-white/10 mt-4">
            <div className="flex items-center justify-between text-[10px] font-black uppercase opacity-50 mb-2">
              <span>Đã chi phí thực tế</span>
              <span>72%</span>
            </div>
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[72%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Detail Sections */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div key={sec.label} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn("p-1.5 rounded-lg text-white", {
                    blue: "bg-blue-600",
                    green: "bg-emerald-600",
                    purple: "bg-purple-600",
                    orange: "bg-orange-500",
                    emerald: "bg-emerald-600"
                  }[sec.color])}>
                    <Icon size={14} />
                  </div>
                  <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest">{sec.label}</h3>
                </div>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] font-black text-slate-500">{sec.count}</span>
              </div>
              <div className="flex-1 max-h-[300px] overflow-auto p-2">
                <table className="compact-table !border-none">
                  <tbody>
                    {sec.data.length === 0 ? (
                      <tr><td className="text-center py-8 text-slate-400 italic text-xs">Chưa có dữ liệu cho hạng mục này</td></tr>
                    ) : (
                      sec.data.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          <td className="py-2.5 px-4 font-bold text-slate-700 text-xs">
                            {item.ten_khong_gian || item.ten_giai_doan || item.ten_cong_viec || item.ten_vat_tu || item.dot_thanh_toan}
                          </td>
                          <td className="text-right py-2.5 px-4">
                            {item.tien_do_phan_tram !== undefined ? (
                              <span className="text-[10px] font-black text-blue-600">{item.tien_do_phan_tram}%</span>
                            ) : item.so_tien !== undefined ? (
                              <span className="text-[10px] font-black text-slate-800">{formatCurrency(item.so_tien)} đ</span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.trang_thai_thi_cong || item.trang_thai_mua_hang || item.trang_thai}</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        {/* Notes Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col xl:col-span-2">
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/30 flex items-center gap-2">
            <StickyNote size={16} className="text-slate-400" />
            <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Lịch sử cập nhật điều hành</h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {notes.length === 0 ? (
                <div className="text-center py-4 text-slate-400 italic text-xs">Chưa có cập nhật nào</div>
              ) : (
                notes.map((note, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className={cn("w-3 h-3 rounded-full mt-1.5", note.den_tin_hieu === 'Xanh' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : note.den_tin_hieu === 'Vàng' ? "bg-orange-400" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]")} />
                      {idx !== notes.length - 1 && <div className="w-0.5 flex-1 bg-slate-100 my-1" />}
                    </div>
                    <div className="flex-1 pb-6 border-b border-slate-50 group-last:border-0 group-last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-black text-slate-400 uppercase">{formatDate(note.ngay_cap_nhat)}</span>
                        <span className="text-[9px] font-bold text-slate-300 uppercase italic">Cập nhật bởi: {note.nguoi_cap_nhat_id}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-700 mb-2">{note.noi_dung_tom_tat}</p>
                      {note.vuong_mac_chinh && (
                        <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                          <p className="text-[10px] font-black text-red-600 uppercase mb-1">Vướng mắc chính:</p>
                          <p className="text-xs text-red-700">{note.vuong_mac_chinh}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) || []).reverse()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
