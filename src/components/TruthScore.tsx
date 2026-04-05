"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function TruthScore({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s > 80) return "bg-green-500";
    if (s > 50) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getTextColor = (s: number) => {
    if (s > 80) return "text-green-600";
    if (s > 50) return "text-amber-600";
    return "text-rose-600";
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
          <ShieldCheck className="h-20 w-20 text-slate-900" />
      </div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8 border-b pb-4 border-slate-50 w-full italic">Authenticity Vector</h3>
      <div className="relative h-56 w-56 flex items-center justify-center">
        <svg className="h-full w-full drop-shadow-2xl" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#f8fafc"
            strokeWidth="10"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray="276.46"
            initial={{ strokeDashoffset: 276.46 }}
            animate={{ strokeDashoffset: 276.46 - (276.46 * score) / 100 }}
            transition={{ duration: 2, ease: "circOut" }}
            className={getTextColor(score)}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl font-black tracking-tighter ${getTextColor(score)}`}
          >
            {score}%
          </motion.span>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Consistency</span>
        </div>
      </div>
      <p className="mt-8 text-xs font-bold text-slate-500 max-w-[240px] uppercase tracking-widest leading-relaxed opacity-60">
        Global Data Integrity Measure across all 20+ Ministerial Nodes.
      </p>
    </div>
  );
}
