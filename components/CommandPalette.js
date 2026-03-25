"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Command, 
  Briefcase, 
  Plus, 
  ArrowRight,
  Zap,
  Users,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette({ projects = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const menuItems = [
    { label: "Tổng quan", href: "/", icon: LayoutDashboard, category: "Điều hướng" },
    { label: "Dự án", href: "/du-an", icon: Briefcase, category: "Điều hướng" },
    { label: "Nhân sự", href: "/nhan-su", icon: Users, category: "Điều hướng" },
    ...projects.map(p => ({
      label: p.ten_du_an,
      href: `/du-an/${p.project_id}`,
      icon: Briefcase,
      category: "Dự án gần đây",
      sub: p.ma_du_an
    })).slice(0, 5)
  ];

  const filteredItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    (item.sub && item.sub.toLowerCase().includes(query.toLowerCase()))
  );

  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePalette]);

  const handleSelect = (href) => {
    router.push(href);
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-slate-900/40 backdrop-blur-sm animate-in">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col shadow-blue-500/10">
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search className="text-slate-400 mr-3" size={18} />
          <input 
            autoFocus
            placeholder="Tìm dự án, hành động hoặc điều hướng... (CMD+K)"
            className="flex-1 text-sm outline-none text-slate-700 font-medium"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filteredItems[selectedIndex]) {
                handleSelect(filteredItems[selectedIndex].href);
              }
              if (e.key === "ArrowDown") {
                setSelectedIndex(prev => (prev + 1) % filteredItems.length);
              }
              if (e.key === "ArrowUp") {
                setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
              }
            }}
          />
          <div className="flex items-center gap-1 ml-2">
            <span className="text-[10px] font-black bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">ESC</span>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center">
              <Zap size={24} className="mx-auto text-slate-200 mb-2" />
              <p className="text-xs font-bold text-slate-400">Không tìm thấy kết quả phù hợp</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(item.href)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "w-full flex items-center justify-between p-3 rounded-xl transition-all text-left",
                      isSelected ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "hover:bg-slate-50 text-slate-600"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn("p-1.5 rounded-lg", isSelected ? "bg-white/20" : "bg-slate-100")}>
                        <Icon size={16} />
                      </div>
                      <div>
                        <p className={cn("text-xs font-black uppercase tracking-wide", isSelected ? "text-white" : "text-slate-700")}>{item.label}</p>
                        {item.sub && <p className={cn("text-[10px]", isSelected ? "text-blue-100" : "text-slate-400")}>{item.sub}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-[9px] font-bold uppercase opacity-60", isSelected ? "text-white" : "text-slate-400")}>{item.category}</span>
                      {isSelected && <ArrowRight size={14} className="animate-pulse" />}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              <span className="px-1 py-0.5 border rounded bg-white shadow-sm">↵</span>
              Chọn
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
              <span className="px-1 py-0.5 border rounded bg-white shadow-sm">↑↓</span>
              Di chuyển
            </div>
          </div>
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Progress Blue SaaS v1.0</p>
        </div>
      </div>
    </div>
  );
}
