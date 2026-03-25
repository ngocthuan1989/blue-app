"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Package, 
  Receipt, 
  ClipboardCheck, 
  StickyNote,
  ChevronLeft,
  ChevronRight,
  FolderOpen
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/", label: "Tổng quan", icon: LayoutDashboard },
  { href: "/du-an", label: "Dự án", icon: Briefcase },
  { href: "/khach-hang", label: "Khách hàng", icon: Users },
  { href: "/nhan-su", label: "Nhân sự", icon: Users },
  { href: "/hang-muc-khong-gian", label: "Không gian", icon: LayoutDashboard },
  { href: "/tien-do-giai-doan", label: "Giai đoạn", icon: ClipboardCheck },
  { href: "/cong-viec", label: "Công việc", icon: StickyNote },
  { href: "/vat-tu-mua-hang", label: "Vật tư", icon: Package },
  { href: "/chi-phi", label: "Chi phí", icon: Receipt },
  { href: "/thanh-toan-hoa-don", label: "Thanh toán", icon: Receipt },
  { href: "/nghiem-thu-ban-giao", label: "Nghiệm thu", icon: ClipboardCheck },
  { href: "/goi-dich-vu", label: "Gói dịch vụ", icon: Briefcase },
  { href: "/ghi-chu-dieu-hanh", label: "Ghi chú", icon: StickyNote },
];

export default function Sidebar({ projects = [] }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const activeProjects = projects.filter(p => p.trang_thai === 'construction').slice(0, 5);

  return (
    <aside className={cn(
      "h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
      collapsed ? "w-[64px]" : "w-[240px]"
    )}>
      <div className="p-4 flex items-center justify-between border-bottom border-slate-100">
        {!collapsed && <span className="font-bold text-blue-600 text-lg tracking-tight uppercase">Progress</span>}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-slate-50 rounded-md text-slate-400"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {/* Main Navigation */}
        <div className="space-y-1 mb-6">
          {!collapsed && <p className="px-3 mb-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Hệ thống</p>}
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "sidebar-item text-[12px]",
                  isActive && "active",
                  collapsed && "justify-center"
                )}
              >
                <Icon size={14} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>

        {/* Quick Project Access */}
        {!collapsed && activeProjects.length > 0 && (
          <div className="space-y-1 pt-4 border-t border-slate-50">
            <p className="px-3 mb-2 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Đang thi công</p>
            {activeProjects.map((p) => (
              <Link 
                key={p.project_id} 
                href={`/du-an/${p.project_id}`}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 transition-all group",
                  pathname.includes(p.project_id) && "bg-blue-50 text-blue-600 font-bold"
                )}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                <span className="text-[11px] truncate text-slate-600 group-hover:text-blue-600">{p.ten_du_an}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold shadow-lg shadow-blue-200">NT</div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-slate-700 truncate text-xs">Điều hành</p>
              <p className="text-[10px] text-slate-400 truncate uppercase font-bold tracking-tighter">Premium Edition</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
