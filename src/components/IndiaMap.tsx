"use client";

import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { DistrictEntry } from "@/lib/types";
import { 
  MapPin, 
  AlertTriangle, 
  Info, 
  Maximize2, 
  Minimize2, 
  Zap, 
  Activity,
  Globe,
  Database,
  Crosshair
} from "lucide-react";

// Expanded City Coordinates for a "Busy" Intelligence Map
const CITY_COORDS: Record<string, { x: number, y: number }> = {
  "Delhi": { x: 350, y: 220 },
  "Mumbai": { x: 180, y: 550 },
  "Bangalore": { x: 300, y: 750 },
  "Lucknow": { x: 450, y: 260 },
  "Patna": { x: 580, y: 280 },
  "Hyderabad": { x: 350, y: 580 },
  "Chennai": { x: 400, y: 780 },
  "Kolkata": { x: 750, y: 380 },
  "Ahmedabad": { x: 150, y: 400 },
  "Guwahati": { x: 880, y: 320 },
  "Bhopal": { x: 380, y: 450 },
  "Kochi": { x: 280, y: 880 },
  "Jaipur": { x: 280, y: 300 }
};

// Connections for "Data Flow" simulation (Source -> Target)
const CONNECTIONS = [
  { from: "Delhi", to: "Mumbai" },
  { from: "Delhi", to: "Kolkata" },
  { from: "Mumbai", to: "Bangalore" },
  { from: "Hyderabad", to: "Chennai" },
  { from: "Bangalore", to: "Hyderabad" },
  { from: "Lucknow", to: "Delhi" },
  { from: "Ahmedabad", to: "Mumbai" },
  { from: "Kolkata", to: "Guwahati" }
];

export function IndiaMap({ districts, selectedDistrict, onSelect }: { 
    districts: DistrictEntry[], 
    selectedDistrict: string | null,
    onSelect: (name: string) => void 
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const getRiskColor = (risk: string) => {
    if (risk === "High") return "#fb7185"; // rose-400 (neon)
    if (risk === "Medium") return "#fbbf24"; // amber-400
    return "#34d399"; // emerald-400
  };

  return (
    <div className="relative w-full aspect-[4/5] bg-slate-950 rounded-[3rem] border border-slate-800 overflow-hidden shadow-2xl p-0 group">
      {/* High-Tech Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none opacity-20" />
      
      {/* Intelligence Status HUD */}
      <div className="absolute top-10 left-10 z-30 flex flex-col gap-6">
        <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-700 shadow-xl">
             <div className="relative">
                 <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                 <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-500 animate-ping opacity-75" />
             </div>
             <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white leading-none">Live Reality Sync</h4>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 italic">Inter-Ministerial Link Established</p>
             </div>
        </div>

        <div className="flex flex-col gap-3">
            {[
                { label: "High Conflict", color: "bg-rose-500", glow: "shadow-[0_0_15px_rgba(244,63,94,0.6)]" },
                { label: "Systemic Risk", color: "bg-amber-500", glow: "shadow-[0_0_15px_rgba(245,158,11,0.4)]" },
                { label: "Normal Node", color: "bg-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.4)]" }
            ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-slate-900/40 px-3 py-1.5 rounded-full border border-slate-800/50">
                    <div className={`w-2 h-2 rounded-full ${item.color} ${item.glow}`} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.label}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Map Control HUD */}
      <div className="absolute top-10 right-10 z-30 flex flex-col gap-4">
          <button className="p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition-all shadow-xl">
              <Maximize2 className="h-5 w-5" />
          </button>
          <button 
             onClick={() => setIsLive(!isLive)}
             className={`p-4 rounded-2xl border transition-all shadow-xl flex items-center justify-center ${isLive ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-slate-900/80 border-slate-700 text-slate-400'}`}
          >
              <Activity className={`h-5 w-5 ${isLive ? 'animate-pulse' : ''}`} />
          </button>
      </div>

      {/* Movable Intelligence Canvas */}
      <motion.div 
        ref={containerRef}
        drag
        dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
        className="w-full h-full p-20 cursor-grab active:cursor-grabbing relative"
      >
        <svg 
            viewBox="0 0 1000 1200" 
            className="w-full h-full drop-shadow-[0_0_80px_rgba(79,70,229,0.1)] transition-transform duration-700 ease-out py-10"
        >
            {/* The "Crazy" Detailed India Path */}
            <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <filter id="neonGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Mainland Vector */}
            <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                d="M336.5,56l-8.5,13.5l1.5,12.5l-9.5,8.5l-2.5,23l6,11.5l10.5,1l15.5-8.5l13.5-1.5l12.5,5.5l11.5,12.5l1,19l11.5,1.5l23-2.5l11.5,7l6,15.5l17.5,7l26-4.5l11.5,11.5l19,10.5l1,19l7,22.5l17.5,1l24,11.5l15.5,17.5l5.5,26l1,23l12.5,26l12.5,11.5l30,1l15.5,11.5l26,17.5l22.5,11.5l26,26l22.5,11.5l42,1l10.5,15.5l4.5,26l22.5,30l19,15.5l1.5,26l-13.5,22.5l-33,12.5l-19,30l-12.5,42l-4.5,26l-19,19l-42,1.5l-57,11.5l-42,30l-12.5,42l-1.5,57l-13.5,42l-33,57l-11.5,42l-1,57l-15.5,33l-42,11.5l-26,42l1,57l-19,37.5l-57,13.5l-42,33l-19,57l-1,42l-5.5,33l-26,19l-42,1l-33-13.5l-19-33l-19-12.5l-57-5.5l-42-19l-22.5-33l-1-42l-15.5-33l-57-11.5l-42-26l-19-42l-1-57l-11.5-42l-33-19l-57-1l-33-12.5l-19-33l-10.5-57l-26-33l-19-19l-11.5-42l1-42l-19-33l-33-10.5l-26-19l-12.5-33l1-42l11.5-26l19-19l45-1l26-11.5l15.5-22.5l5.5-33l12.5-19l33-5.5l22.5-17.5l15.5-22.5l1-42l11.5-33l26-15.5l19-33l22.5-1l42-12.5l26-1l33,10.5l42,1.5l22.5-11.5l33-12.5L336.5,56z" 
                fill="url(#mapGradient)" 
                stroke="#334155"
                strokeWidth="2"
                className="shadow-2xl"
            />

            {/* Simulation: Inter-City Data Flow Particles */}
            {isLive && CONNECTIONS.map((conn, i) => {
                const start = CITY_COORDS[conn.from];
                const end = CITY_COORDS[conn.to];
                if (!start || !end) return null;

                return (
                    <g key={`pulse-${i}`}>
                        <path 
                            d={`M${start.x},${start.y} Q${(start.x+end.x)/2 - 50},${(start.y+end.y)/2 - 50} ${end.x},${end.y}`} 
                            fill="none" 
                            stroke="rgba(99, 102, 241, 0.05)" 
                            strokeWidth="1"
                        />
                        <motion.circle
                            r="2"
                            fill="#818cf8"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                            style={{ offsetPath: `path("M${start.x},${start.y} Q${(start.x+end.x)/2 - 50},${(start.y+end.y)/2 - 50} ${end.x},${end.y}")` }}
                        >
                            <animate attributeName="opacity" values="0;1;1;0" dur={`${3+i}s`} repeatCount="indefinite" />
                        </motion.circle>
                    </g>
                );
            })}

            {/* Strategic Intelligence Nodes */}
            {Object.entries(CITY_COORDS).map(([name, coords]) => {
              const districtData = districts.find(d => d.district === name);
              const risk = districtData?.risk || "Low";
              const isSelected = selectedDistrict === name;
              const isHovered = hovered === name;

              return (
                <motion.g 
                    key={name}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => onSelect(name)}
                    className="cursor-pointer group/node"
                >
                    {/* Concentric Pulse for High Risk */}
                    {risk === "High" && isLive && (
                        <>
                            <motion.circle
                                cx={coords.x}
                                cy={coords.y}
                                r="45"
                                fill="transparent"
                                stroke="#fb7185"
                                strokeWidth="1"
                                initial={{ opacity: 0.8, scale: 0.1 }}
                                animate={{ opacity: 0, scale: 1.5 }}
                                transition={{ repeat: Infinity, duration: 2.5 }}
                            />
                            <motion.circle
                                cx={coords.x}
                                cy={coords.y}
                                r="35"
                                fill="transparent"
                                stroke="#fb7185"
                                strokeWidth="0.5"
                                initial={{ opacity: 0.5, scale: 0.1 }}
                                animate={{ opacity: 0, scale: 1.2 }}
                                transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
                            />
                        </>
                    )}

                    {/* Node Core Indicator */}
                    <motion.circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected || isHovered ? 14 : 7}
                        fill={getRiskColor(risk)}
                        filter="url(#neonGlow)"
                        animate={{
                            r: isSelected || isHovered ? 16 : 8,
                            opacity: isSelected || isHovered ? 1 : 0.8
                        }}
                        className="transition-all duration-300"
                    />

                    {/* Node Perimeter */}
                    <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected || isHovered ? 24 : 14}
                        fill="transparent"
                        stroke={getRiskColor(risk)}
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="opacity-40"
                    />

                    {/* Intelligence Label */}
                    {(isSelected || isHovered) && (
                        <motion.text
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            x={coords.x}
                            y={coords.y - 45}
                            textAnchor="middle"
                            className="text-[20px] font-black fill-white tracking-[0.2em] uppercase transition-all"
                            style={{ filter: 'drop-shadow(0 0 10px rgba(0,0,0,1))' }}
                        >
                            {name}
                        </motion.text>
                    )}
                </motion.g>
              );
            })}
        </svg>
      </motion.div>

      {/* Floating Tactical Intelligence Feed */}
      <div className="absolute bottom-10 left-10 z-30 max-w-[280px]">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-700 shadow-3xl">
              <div className="flex items-center gap-3 mb-4">
                  <Database className="h-4 w-4 text-indigo-400" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-white">Neural Anomaly Log</h5>
              </div>
              <div className="space-y-3 overflow-hidden h-24 font-mono text-[8.5px]">
                  <p className="text-slate-400 border-l-2 border-indigo-500 pl-3">
                      [INFO] Reconciliation active for 56,120 nodes.
                  </p>
                  <motion.p 
                     animate={{ opacity: [1, 0.5, 1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="text-rose-400 border-l-2 border-rose-500 pl-3"
                  >
                      [WARN] Conflict found: Income mismatch in Mumbai Cluster.
                  </motion.p>
                  <p className="text-slate-500 opacity-60 border-l-2 border-slate-700 pl-3">
                      [LOG] Audit Trail synchronizing with Ledger...
                  </p>
              </div>
          </div>
      </div>

      {/* Crosshair Overlay */}
      <div className="absolute inset-0 pointer-events-none border border-indigo-500/10 [mask-image:linear-gradient(to_bottom,black,transparent,black)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-10">
          <Crosshair className="h-48 w-48 text-indigo-500" strokeWidth={0.5} />
      </div>

      {/* Interactive Tooltip Overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-1/2 right-10 -translate-y-1/2 z-40 w-72 bg-slate-950/95 backdrop-blur-2xl text-white p-8 rounded-[2.5rem] shadow-4xl border border-slate-700 space-y-6"
          >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-black uppercase tracking-tighter italic">{hovered}</h4>
                    <Link href={`/admin/research?identifier=${hovered}`}>
                        <Globe className="h-4 w-4 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer" />
                    </Link>
                </div>
                <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    districts.find(d => d.district === hovered)?.risk === 'High' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 
                    districts.find(d => d.district === hovered)?.risk === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                    {districts.find(d => d.district === hovered)?.risk || "Low"} Integrity Risk
                </div>
            </div>
            
            <div className="space-y-5">
                <div>
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                        <span>Reconciliation Index</span>
                        <span className="text-indigo-400">{districts.find(d => d.district === hovered)?.conflict_rate || 5}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${districts.find(d => d.district === hovered)?.conflict_rate || 5}%` }}
                            className={`h-full shadow-[0_0_10px_currentColor] ${
                                (districts.find(d => d.district === hovered)?.conflict_rate || 0) > 30 ? 'text-rose-500' : 'text-emerald-500'
                            } bg-current`}
                        />
                    </div>
                </div>
                <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                        <Zap className="h-3 w-3" /> Node Pulse: Active
                    </div>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
