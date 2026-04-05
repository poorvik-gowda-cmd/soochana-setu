"use client";

import { motion } from "framer-motion";
import { DistrictEntry } from "@/lib/types";

export function LeakageChart({ districts }: { districts: DistrictEntry[] }) {
  // Sort by conflict rate for the chart
  const sorted = [...districts].sort((a, b) => b.conflict_rate - a.conflict_rate);
  const maxRate = Math.max(...districts.map(d => d.conflict_rate), 1);

  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm w-full">
      <div className="flex items-center justify-between mb-8">
          <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-900 mb-1">Conflict Distribution</h4>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Across District Clusters</p>
          </div>
          <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rate %</span>
              </div>
          </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-4 px-2">
        {sorted.map((d, index) => {
          const height = (d.conflict_rate / maxRate) * 100;
          return (
            <div key={d.district} className="flex-1 flex flex-col items-center gap-4 group">
              <div className="w-full relative flex flex-col items-center justify-end h-full">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-slate-900 text-white text-[10px] font-black py-1 px-2 rounded whitespace-nowrap shadow-xl">
                          {d.conflict_rate}%
                      </div>
                  </div>

                  {/* Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 1, delay: index * 0.1 }}
                    className={`w-full rounded-t-lg transition-colors shadow-lg shadow-indigo-100 ${
                        d.risk === 'High' ? 'bg-rose-500 group-hover:bg-rose-600' : 
                        d.risk === 'Medium' ? 'bg-amber-500 group-hover:bg-amber-600' : 
                        'bg-emerald-500 group-hover:bg-emerald-600'
                    }`}
                  />
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest rotate-45 origin-left whitespace-nowrap mt-2">
                {d.district}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Spacer for rotated labels */}
      <div className="h-10" />
    </div>
  );
}
