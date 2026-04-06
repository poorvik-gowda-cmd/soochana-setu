"use client";

import { DistrictEntry } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

export function HeatmapTable({ districts, selected, onSelect }: { 
    districts: DistrictEntry[], 
    selected: string | null,
    onSelect: (name: string) => void 
}) {
  const getTrendIcon = (t: string) => {
    switch (t) {
      case "up": return <TrendingUp className="h-4 w-4 text-rose-500" />;
      case "down": return <TrendingDown className="h-4 w-4 text-emerald-500" />;
      default: return <Minus className="h-4 w-4" style={{ color: "rgba(198,160,82,0.4)" }} />;
    }
  };

  const sortedDistricts = [...districts].sort((a, b) => b.conflict_rate - a.conflict_rate);

  return (
    <div className="rounded-2xl overflow-hidden w-full"
         style={{
           background: "rgba(20,20,30,0.6)",
           backdropFilter: "blur(12px)",
           border: "1px solid rgba(198,160,82,0.1)",
         }}>
      <div className="px-8 py-5 flex items-center justify-between"
           style={{ borderBottom: "1px solid rgba(198,160,82,0.08)", background: "rgba(0,0,0,0.2)" }}>
        <h4 className="text-xs font-black uppercase tracking-widest" style={{ color: "rgba(234,234,234,0.5)" }}>District Intelligence Report</h4>
        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{ color: "#c6a052", background: "rgba(198,160,82,0.08)", border: "1px solid rgba(198,160,82,0.15)" }}>
          Sorted by Severity
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(198,160,82,0.06)", background: "rgba(0,0,0,0.15)" }}>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>District Cluster</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>Conflict Score</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>Risk Assessment</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>Variance Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedDistricts.map((d) => {
              const isSelected = selected === d.district;
              return (
                <motion.tr 
                  key={d.district}
                  onClick={() => onSelect(d.district)}
                  className="cursor-pointer transition-colors"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                    background: isSelected ? "rgba(198,160,82,0.06)" : "transparent",
                  }}
                  whileHover={{ backgroundColor: "rgba(198,160,82,0.04)" }}
                >
                  <td className="px-8 py-5">
                    <span className="text-sm font-black tracking-tight"
                          style={{ color: isSelected ? "#c6a052" : "#EAEAEA" }}>
                      {d.district}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold" style={{ color: "rgba(234,234,234,0.7)" }}>{d.conflict_rate}%</span>
                      <div className="flex-1 min-w-[60px] h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div 
                          className={`h-full ${d.conflict_rate > 30 ? 'bg-rose-500' : d.conflict_rate > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                          style={{ 
                            width: `${d.conflict_rate}%`,
                            boxShadow: `0 0 8px ${d.conflict_rate > 30 ? 'rgba(239,68,68,0.5)' : d.conflict_rate > 20 ? 'rgba(245,158,11,0.5)' : 'rgba(34,197,94,0.5)'}`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                          style={{
                            background: d.risk === 'High' ? 'rgba(239,68,68,0.1)' : d.risk === 'Medium' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                            color: d.risk === 'High' ? '#ef4444' : d.risk === 'Medium' ? '#f59e0b' : '#22c55e',
                            border: `1px solid ${d.risk === 'High' ? 'rgba(239,68,68,0.2)' : d.risk === 'Medium' ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.2)'}`,
                          }}>
                      {d.risk}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      {getTrendIcon(d.trend)}
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(234,234,234,0.3)" }}>{d.trend}</span>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
