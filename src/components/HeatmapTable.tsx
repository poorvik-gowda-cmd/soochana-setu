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
      default: return <Minus className="h-4 w-4 text-slate-400" />;
    }
  };

  const sortedDistricts = [...districts].sort((a, b) => b.conflict_rate - a.conflict_rate);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden w-full">
      <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">District Intelligence Report</h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">Sorted by Severity</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">District Cluster</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Conflict Score</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Assessment</th>
              <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Variance Trend</th>
            </tr>
          </thead>
          <tbody>
            {sortedDistricts.map((d, index) => {
              const isSelected = selected === d.district;
              return (
                <motion.tr 
                  key={d.district}
                  onClick={() => onSelect(d.district)}
                  className={`border-b border-slate-50 last:border-0 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'}`}
                >
                  <td className="px-8 py-5">
                    <span className={`text-sm font-black tracking-tight ${isSelected ? 'text-indigo-700' : 'text-slate-900'}`}>
                        {d.district}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-slate-700">{d.conflict_rate}%</span>
                        <div className="flex-1 min-w-[60px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className={`h-full ${d.conflict_rate > 30 ? 'bg-rose-500' : d.conflict_rate > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                style={{ width: `${d.conflict_rate}%` }}
                            />
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        d.risk === 'High' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                        d.risk === 'Medium' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-emerald-50 text-emerald-600 border-emerald-100 uppercase tracking-widest'
                    }`}>
                      {d.risk}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                        {getTrendIcon(d.trend)}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d.trend}</span>
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
