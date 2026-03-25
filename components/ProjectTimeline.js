"use client";

import { cn } from "@/lib/utils";

export default function ProjectTimeline({ stages = [] }) {
  if (stages.length === 0) return null;

  // Simple date sorting and range finding
  const sortedStages = [...stages].sort((a, b) => new Date(a.ngay_bat_dau_ke_hoach) - new Date(b.ngay_bat_dau_ke_hoach));
  
  const startDates = sortedStages.map(s => new Date(s.ngay_bat_dau_ke_hoach)).filter(d => !isNaN(d));
  const endDates = sortedStages.map(s => new Date(s.ngay_ket_thuc_ke_hoach)).filter(d => !isNaN(d));
  
  if (startDates.length === 0) return <div className="p-8 text-center text-slate-400 text-xs italic">Không đủ dữ liệu ngày tháng để lập tiến độ</div>;

  const minDate = new Date(Math.min(...startDates));
  const maxDate = new Date(Math.max(...endDates));
  const totalDays = Math.max(1, (maxDate - minDate) / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
        <h3 className="font-black text-slate-700 uppercase text-[10px] tracking-widest">Biểu đồ tiến độ Timeline</h3>
        <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-600 rounded-sm" /> Kế hoạch</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500 rounded-sm" /> Hoàn thành</div>
        </div>
      </div>
      
      <div className="p-6 overflow-x-auto">
        <div className="min-w-[800px] space-y-6 relative pb-4">
          {/* Month/Date Markers could go here if more complex */}
          
          <div className="space-y-4">
            {sortedStages.map((stage, idx) => {
              const start = new Date(stage.ngay_bat_dau_ke_hoach);
              const end = new Date(stage.ngay_ket_thuc_ke_hoach);
              
              const left = ((start - minDate) / (1000 * 60 * 60 * 24) / totalDays) * 100;
              const width = ((end - start) / (1000 * 60 * 60 * 24) / totalDays) * 100;
              const progress = stage.tien_do_phan_tram || 0;

              return (
                <div key={stage.stage_id} className="relative h-10 group">
                  <div className="absolute left-0 -top-1 text-[9px] font-black text-slate-400 uppercase tracking-tighter truncate max-w-[150px]">
                    {stage.ten_giai_doan}
                  </div>
                  <div 
                    className="absolute h-5 bg-slate-100 rounded-lg top-3 overflow-hidden border border-slate-200/50 shadow-sm transition-all group-hover:shadow-md"
                    style={{ left: `${Math.max(0, left)}%`, width: `${Math.max(2, width)}%` }}
                  >
                    {/* Progress Fill */}
                    <div 
                      className={cn(
                        "h-full transition-all duration-1000",
                        progress === 100 ? "bg-emerald-500" : "bg-blue-600"
                      )}
                      style={{ width: `${progress}%` }}
                    />
                    
                    {/* Tooltip on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-black text-white drop-shadow-sm">{progress}%</span>
                    </div>
                  </div>
                  
                  {/* Date labels on hover */}
                  <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex justify-between w-full pointer-events-none" style={{ left: `${left}%`, width: `${width}%`, top: '32px' }}>
                    <span className="text-[8px] font-bold text-slate-400 bg-white px-1 border rounded shadow-sm">{stage.ngay_bat_dau_ke_hoach}</span>
                    <span className="text-[8px] font-bold text-slate-400 bg-white px-1 border rounded shadow-sm">{stage.ngay_ket_thuc_ke_hoach}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Today marker */}
          {new Date() >= minDate && new Date() <= maxDate && (
            <div 
              className="absolute top-0 bottom-0 w-px bg-red-400 z-10 border-l border-dashed border-red-200"
              style={{ left: `${((new Date() - minDate) / (1000 * 60 * 60 * 24) / totalDays) * 100}%` }}
            >
              <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
