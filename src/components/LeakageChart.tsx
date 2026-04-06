"use client";

import { motion } from "framer-motion";
import { DistrictEntry } from "@/lib/types";

export function LeakageChart({ districts }: { districts: DistrictEntry[] }) {
  const sorted = [...districts].sort((a, b) => b.conflict_rate - a.conflict_rate);
  const maxRate = Math.max(...districts.map(d => d.conflict_rate), 1);

  return (
    <div className="rounded-3xl p-8 w-full"
         style={{
           background: "rgba(20,20,30,0.6)",
           backdropFilter: "blur(12px)",
           border: "1px solid rgba(198,160,82,0.1)",
         }}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: "#EAEAEA" }}>Conflict Distribution</h4>
          <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>Across District Clusters</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: "#c6a052" }} />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(234,234,234,0.35)" }}>Rate %</span>
          </div>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between gap-4 px-2">
        {sorted.map((d, index) => {
          const height = (d.conflict_rate / maxRate) * 100;
          const barColor = d.risk === 'High' ? '#ef4444' : d.risk === 'Medium' ? '#f59e0b' : '#22c55e';
          const barGlow = d.risk === 'High' ? 'rgba(239,68,68,0.3)' : d.risk === 'Medium' ? 'rgba(245,158,11,0.3)' : 'rgba(34,197,94,0.3)';

          return (
            <div key={d.district} className="flex-1 flex flex-col items-center gap-4 group">
              <div className="w-full relative flex flex-col items-center justify-end h-full">
                {/* Tooltip on hover */}
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="text-[10px] font-black py-1 px-2 rounded whitespace-nowrap shadow-xl"
                       style={{ background: "rgba(10,10,20,0.95)", color: "#FFFFFF", border: "1px solid rgba(198,160,82,0.2)" }}>
                    {d.conflict_rate}%
                  </div>
                </div>

                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ type: "spring", bounce: 0.2, duration: 1, delay: index * 0.1 }}
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    background: barColor,
                    boxShadow: `0 0 15px ${barGlow}`,
                  }}
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest rotate-45 origin-left whitespace-nowrap mt-2"
                    style={{ color: "rgba(234,234,234,0.35)" }}>
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
