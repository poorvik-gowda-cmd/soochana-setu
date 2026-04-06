"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function TruthScore({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s > 80) return "text-[#C6A052]";
    if (s > 50) return "text-amber-500";
    return "text-rose-500";
  };

  const getStrokeColor = (s: number) => {
    if (s > 80) return "#C6A052";
    if (s > 50) return "#f59e0b";
    return "#f43f5e";
  };

  return (
    <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] rounded-[2.5rem] shadow-[0_0_40px_rgba(198,160,82,0.08)] border border-[rgba(198,160,82,0.15)] p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
          <ShieldCheck className="h-20 w-20 text-[#C6A052]" />
      </div>
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#A1A1AA] mb-8 border-b pb-4 border-white/5 w-full italic">Authenticity Vector</h3>
      <div className="relative h-56 w-56 flex items-center justify-center">
        <svg className="h-full w-full drop-shadow-[0_0_20px_rgba(198,160,82,0.2)]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="10"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke={getStrokeColor(score)}
            strokeWidth="10"
            strokeDasharray="276.46"
            initial={{ strokeDashoffset: 276.46 }}
            animate={{ strokeDashoffset: 276.46 - (276.46 * score) / 100 }}
            transition={{ duration: 2, ease: "circOut" }}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl font-black tracking-tighter ${getColor(score)}`}
          >
            {score}%
          </motion.span>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#A1A1AA] mt-1">Consistency</span>
        </div>
      </div>
      <p className="mt-8 text-xs font-bold text-[#A1A1AA] max-w-[240px] uppercase tracking-widest leading-relaxed opacity-60">
        Global Data Integrity Measure across all 20+ Ministerial Nodes.
      </p>
    </div>
  );
}
