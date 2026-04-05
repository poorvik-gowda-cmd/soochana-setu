"use client";

import { motion } from "framer-motion";
import { HeatmapData } from "@/lib/types";
import { ShieldAlert, TrendingUp, Users, Target } from "lucide-react";

export function LeakageStats({ data }: { data: HeatmapData }) {
  const stats = [
    { label: "Total Districts", value: data.stats.total_districts, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "High Risk Zones", value: data.stats.high_risk, icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Avg Conflict Rate", value: `${data.stats.avg_conflict}%`, icon: Target, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Leakage Forecast", value: "High", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" }
  ];

  return (
    <div className="grid grid-cols-1 gap-4">
      {stats.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
            <s.icon className={`h-16 w-16 ${s.color}`} />
          </div>
          <div className="flex items-center gap-4 relative z-10">
            <div className={`p-3 rounded-xl ${s.bg} ${s.color}`}>
              <s.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-900 tracking-tight">{s.value}</p>
            </div>
          </div>
        </motion.div>
      ))}

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-6 bg-slate-900 rounded-2xl text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 h-full w-1/3 bg-white opacity-5 rotate-12 translate-x-12" />
        <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-indigo-400">Tactical Recommendation</h4>
        <p className="text-sm font-medium leading-relaxed italic text-slate-300">
          {data.districts.length > 0 
            ? `"Focus enforcement resources on the ${data.districts[0].district} cluster. Redundancy checks identify high cross-departmental income conflicts."`
            : `"System awaiting departmental data feed. Load CSV records to generate predictive enforcement recommendations."`}
        </p>
      </motion.div>
    </div>
  );
}
