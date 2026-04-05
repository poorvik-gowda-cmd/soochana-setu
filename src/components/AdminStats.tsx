"use client";

import { motion } from "framer-motion";
import { Users, ShieldAlert, BadgeCheck, Zap, Globe } from "lucide-react";

export function AdminStats() {
  const stats = [
    { label: "Total Citizens Captured", value: "1.2M+", icon: Globe, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Detected Reality Gaps", value: "14%", icon: ShieldAlert, color: "text-amber-600", bg: "bg-amber-600/10" },
    { label: "Verified Data Points", value: "48M", icon: BadgeCheck, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Live AI Synthesizing", value: "2.4K/hr", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="bg-slate-900/40 backdrop-blur-xl border border-amber-500/10 p-10 rounded-[2.5rem] shadow-3xl hover:shadow-amber-500/5 hover:border-amber-500/30 transition-all duration-700 group hover:-translate-y-2"
        >
          <div className="flex flex-col items-center text-center gap-6">
            <div className={`p-5 rounded-2xl ${s.bg} ${s.color} transition-transform group-hover:scale-110 duration-700 shadow-2xl`}>
                <s.icon className="h-7 w-7 stroke-[2.5]" />
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/40 mb-3 whitespace-nowrap italic">{s.label}</p>
                <p className="text-4xl font-black text-white tracking-tighter gold-text-gradient italic">{s.value}</p>
            </div>
          </div>
          
          {/* Subtle Glow Underlay */}
          <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity pointer-events-none" />
        </motion.div>
      ))}
    </div>
  );
}
