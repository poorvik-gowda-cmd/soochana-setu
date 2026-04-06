"use client";

import { motion } from "framer-motion";
import { HeatmapData } from "@/lib/types";
import { ShieldAlert, TrendingUp, Users, Target, Zap } from "lucide-react";

// ─── Static mock data for cinematic display ─────────────────────────────────
const MOCK_STATS = [
  {
    label: "Total Districts",
    value: "467",
    icon: Users,
    accentColor: "#c6a052",
    glowColor: "rgba(198,160,82,0.35)",
    borderGlow: "rgba(198,160,82,0.25)",
  },
  {
    label: "High Risk Zones",
    value: "12",
    icon: ShieldAlert,
    accentColor: "#ef4444",
    glowColor: "rgba(239,68,68,0.3)",
    borderGlow: "rgba(239,68,68,0.2)",
  },
  {
    label: "Avg Conflict Rate",
    value: "17%",
    icon: Target,
    accentColor: "#f59e0b",
    glowColor: "rgba(245,158,11,0.3)",
    borderGlow: "rgba(245,158,11,0.2)",
  },
  {
    label: "Leakage Forecast",
    value: "High",
    icon: TrendingUp,
    accentColor: "#6366f1",
    glowColor: "rgba(99,102,241,0.3)",
    borderGlow: "rgba(99,102,241,0.2)",
  },
];

export function LeakageStats({ data }: { data: HeatmapData }) {
  return (
    <div className="grid grid-cols-1 gap-5">
      {MOCK_STATS.map((s, idx) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.12, duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-2xl p-6 group cursor-default"
          style={{
            background: "rgba(20,20,30,0.6)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: `1px solid ${s.borderGlow}`,
            boxShadow: `0 0 25px ${s.glowColor}, inset 0 1px 0 rgba(255,255,255,0.03)`,
          }}
        >
          {/* Subtle animated gradient sweep */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
               style={{
                 background: `linear-gradient(135deg, transparent 30%, ${s.accentColor}08 50%, transparent 70%)`,
               }}
          />

          {/* Watermark icon */}
          <div className="absolute -top-2 -right-2 opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 transition-all duration-500 pointer-events-none">
            <s.icon className="h-20 w-20" style={{ color: s.accentColor }} />
          </div>

          <div className="flex items-center gap-4 relative z-10">
            {/* Icon container */}
            <div className="p-3 rounded-xl transition-transform duration-300 group-hover:scale-110"
                 style={{
                   background: `${s.accentColor}12`,
                   border: `1px solid ${s.accentColor}20`,
                   boxShadow: `0 0 15px ${s.glowColor}`,
                 }}>
              <s.icon className="h-5 w-5" style={{ color: s.accentColor }} />
            </div>

            <div>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1"
                 style={{ color: "#EAEAEA" }}>
                {s.label}
              </p>
              <p className="text-2xl font-black tracking-tight"
                 style={{ color: "#FFFFFF" }}>
                {s.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ─── Tactical Recommendation Card ─── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4 p-6 rounded-2xl relative overflow-hidden group"
        style={{
          background: "rgba(20,20,30,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(198,160,82,0.15)",
          boxShadow: "0 0 30px rgba(198,160,82,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 pointer-events-none"
             style={{
               background: "linear-gradient(135deg, rgba(198,160,82,0.03) 0%, transparent 40%, rgba(99,102,241,0.03) 70%, transparent 100%)",
               animation: "gradientShift 8s ease-in-out infinite alternate",
             }}
        />

        {/* Decorative light streak */}
        <div className="absolute top-0 right-0 h-full w-1/3 rotate-12 translate-x-12 pointer-events-none"
             style={{ background: "rgba(198,160,82,0.02)" }} />

        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-4">
            <Zap className="h-4 w-4" style={{ color: "#c6a052" }} />
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: "#c6a052" }}>
              Tactical Recommendation
            </h4>
          </div>
          <p className="text-sm font-medium leading-relaxed italic"
             style={{ color: "rgba(234,234,234,0.6)" }}>
            &ldquo;Real-time anomaly detection active. System analyzing inter-departmental discrepancies and predicting enforcement actions.&rdquo;
          </p>
        </div>
      </motion.div>
    </div>
  );
}
