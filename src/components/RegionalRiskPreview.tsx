"use client";

import { motion } from "framer-motion";
import { Map, TrendingUp, AlertTriangle, ShieldCheck, Crosshair } from "lucide-react";
import Link from "next/link";

export function RegionalRiskPreview() {
  return (
    <div className="bg-slate-900/30 backdrop-blur-3xl rounded-[3.5rem] p-16 border border-amber-500/10 shadow-4xl relative overflow-hidden group/card shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
      <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover/card:opacity-10 group-hover/card:scale-110 group-hover/card:rotate-12 transition-all duration-1000">
        <Map className="h-64 w-64 text-amber-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <div className="space-y-10">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Regional Integrity Alert</span>
            </div>
            
            <div>
                <h3 className="text-5xl font-black text-white tracking-tighter leading-[1.1]">
                    National <span className="gold-text-gradient italic">Leakage Map</span>
                </h3>
                <p className="text-slate-400 mt-8 text-lg font-medium leading-relaxed max-w-md italic opacity-80">
                    "High-density urban hubs are reporting a 12.8% increase in departmental data divergence. Immediate policy simulation recommended for Bangalore and Mumbai clusters."
                </p>
            </div>

            <div className="flex gap-12">
                <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/40 mb-3 italic">Highest Conflict</p>
                     <p className="text-xl font-black text-white tracking-widest uppercase">Bangalore IT Node</p>
                </div>
                <div className="h-12 w-px bg-amber-500/10" />
                <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-500/40 mb-3 italic">Avg Divergence</p>
                     <p className="text-xl font-black text-amber-400">22.4%</p>
                </div>
            </div>

            <Link href="/admin/policy-simulator" className="inline-flex items-center gap-4 px-12 py-5 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2rem] font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-amber-500/20 group/btn">
                Launch Full Heatmap <TrendingUp className="h-4 w-4 transition-transform group-hover/btn:translate-x-2 stroke-[3]" />
            </Link>
        </div>

        <div className="hidden lg:flex justify-center">
            <div className="relative w-full aspect-square max-w-[350px] flex items-center justify-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-amber-500/5 rounded-full border-2 border-dashed border-amber-500/20 animate-[spin_30s_linear_infinite]"
                />
                <div className="relative p-16 bg-slate-900 rounded-full shadow-4xl border border-amber-500/20 flex flex-col items-center justify-center group/globe">
                    <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full opacity-0 group-hover/globe:opacity-100 transition-opacity" />
                    <ShieldCheck className="h-16 w-16 text-amber-500 mb-2 relative z-10" />
                    <span className="text-[10px] font-black text-amber-100/60 uppercase tracking-[0.4em] relative z-10 italic">Analysis Active</span>
                </div>
                
                {/* Tactical Markers */}
                <div className="absolute top-10 right-10 flex flex-col items-center gap-2">
                    <div className="h-4 w-4 bg-amber-500 rounded-full animate-ping shadow-[0_0_15px_#f59e0b]" />
                    <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Mumbai Cluster</span>
                </div>
                <div className="absolute bottom-20 left-4 flex flex-col items-center gap-2">
                    <div className="h-4 w-4 bg-yellow-500 rounded-full animate-pulse shadow-[0_0_15px_#eab308]" />
                    <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Bangalore Hub</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
