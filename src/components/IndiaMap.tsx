"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { DistrictEntry } from "@/lib/types";
import IndiaMapData from "@svg-maps/india";
import { 
  Maximize2, 
  Activity,
  Globe,
  Database,
  Crosshair,
  Zap
} from "lucide-react";

// Safe extraction of locations for Next.js esModule interoperability
const locations = IndiaMapData.locations || (IndiaMapData as any).default?.locations || [];

// ─── Risk-classified nodes positioned accurately on 612x696 India SVG ───
interface NodeData {
  name: string;
  x: number;
  y: number;
  risk: "High" | "Medium" | "Low";
  population: string;
  conflictRate: number;
}

const RISK_NODES: NodeData[] = [
  // HIGH RISK — RED
  { name: "Delhi",           x: 186, y: 210, risk: "High",   population: "32M",  conflictRate: 42 },
  { name: "Uttar Pradesh",   x: 265, y: 245, risk: "High",   population: "231M", conflictRate: 38 },
  { name: "Bihar",           x: 369, y: 275, risk: "High",   population: "128M", conflictRate: 35 },
  // MEDIUM RISK — AMBER
  { name: "Maharashtra",     x: 180, y: 435, risk: "Medium", population: "126M", conflictRate: 22 },
  { name: "West Bengal",     x: 412, y: 310, risk: "Medium", population: "99M",  conflictRate: 19 },
  { name: "Rajasthan",       x: 119, y: 257, risk: "Medium", population: "81M",  conflictRate: 17 },
  // LOW RISK — GREEN
  { name: "Karnataka",       x: 171, y: 519, risk: "Low",    population: "67M",  conflictRate: 8  },
  { name: "Tamil Nadu",      x: 211, y: 609, risk: "Low",    population: "77M",  conflictRate: 6  },
  { name: "Kerala",          x: 166, y: 615, risk: "Low",    population: "35M",  conflictRate: 4  },
];

// Connection lines between nodes
const NODE_CONNECTIONS = [
  { from: "Delhi",         to: "Uttar Pradesh" },
  { from: "Delhi",         to: "Rajasthan" },
  { from: "Uttar Pradesh", to: "Bihar" },
  { from: "Bihar",         to: "West Bengal" },
  { from: "Maharashtra",   to: "Karnataka" },
  { from: "Karnataka",     to: "Tamil Nadu" },
  { from: "Tamil Nadu",    to: "Kerala" },
  { from: "Delhi",         to: "Maharashtra" },
  { from: "West Bengal",   to: "Uttar Pradesh" },
  { from: "Rajasthan",     to: "Maharashtra" },
];

// Background particles for the new viewBox (0 to 612, 0 to 696)
const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 612,
  y: Math.random() * 696,
  size: Math.random() * 2 + 1,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 4,
}));

const getRiskColor = (risk: string) => {
  if (risk === "High") return "#ef4444";
  if (risk === "Medium") return "#f59e0b";
  return "#22c55e";
};

const getRiskGlow = (risk: string) => {
  if (risk === "High") return "rgba(239,68,68,0.6)";
  if (risk === "Medium") return "rgba(245,158,11,0.5)";
  return "rgba(34,197,94,0.4)";
};

export function IndiaMap({ districts, selectedDistrict, onSelect }: { 
    districts: DistrictEntry[], 
    selectedDistrict: string | null,
    onSelect: (name: string) => void 
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [isLive, setIsLive] = useState(true);

  const getNodeByName = (name: string) => RISK_NODES.find(n => n.name === name);

  return (
    <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl p-0 group"
         style={{ background: "linear-gradient(145deg, #0a0a1a 0%, #050510 50%, #0d0d20 100%)" }}>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
           style={{
             backgroundImage: `
               linear-gradient(rgba(198,160,82,0.3) 1px, transparent 1px),
               linear-gradient(90deg, rgba(198,160,82,0.3) 1px, transparent 1px)`,
             backgroundSize: "50px 50px"
           }}
      />

      {/* Radial vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)" }} />

      {/* ─── Intelligence Status HUD ─── */}
      <div className="absolute top-8 left-8 z-30 flex flex-col gap-4">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl border shadow-xl"
             style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(198,160,82,0.15)" }}>
          <div className="relative">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" style={{ animation: "nodePulseGlow 2s ease-in-out infinite" }} />
            <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-widest leading-none" style={{ color: "#EAEAEA" }}>Live Intelligence Feed</h4>
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] mt-1 italic" style={{ color: "rgba(198,160,82,0.5)" }}>Multi-Node Sync Active</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2">
          {[
            { label: "High Risk", color: "#ef4444", glow: "0 0 12px rgba(239,68,68,0.5)" },
            { label: "Medium Risk", color: "#f59e0b", glow: "0 0 12px rgba(245,158,11,0.4)" },
            { label: "Low Risk", color: "#22c55e", glow: "0 0 12px rgba(34,197,94,0.4)" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2.5 px-3 py-1.5 rounded-full"
                 style={{ background: "rgba(10,10,20,0.5)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: item.glow }} />
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(234,234,234,0.5)" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Map Controls ─── */}
      <div className="absolute top-8 right-8 z-30 flex flex-col gap-3">
        <button className="p-3.5 rounded-2xl border transition-all shadow-xl"
                style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)", borderColor: "rgba(198,160,82,0.15)", color: "#EAEAEA" }}>
          <Maximize2 className="h-4 w-4" />
        </button>
        <button 
          onClick={() => setIsLive(!isLive)}
          className="p-3.5 rounded-2xl border transition-all shadow-xl flex items-center justify-center"
          style={{
            background: isLive ? "rgba(99,102,241,0.15)" : "rgba(10,10,20,0.85)",
            backdropFilter: "blur(12px)",
            borderColor: isLive ? "rgba(99,102,241,0.4)" : "rgba(198,160,82,0.15)",
            color: isLive ? "#818cf8" : "#EAEAEA"
          }}
        >
          <Activity className={`h-4 w-4 ${isLive ? 'animate-pulse' : ''}`} />
        </button>
      </div>

      {/* ─── SVG Map Canvas ─── */}
      <div className="w-full h-full px-6 py-6 pb-20 relative flex items-center justify-center">
        <svg viewBox="0 0 612 696" className="w-[85%] h-[85%] drop-shadow-2xl">
          <defs>
            {/* Map fill gradient */}
            <linearGradient id="indiaFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="50%" stopColor="#0c1220" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            {/* Glow filters */}
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="mapShadow">
                <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.6"/>
            </filter>
          </defs>

          {/* ── Background Particles ── */}
          {isLive && PARTICLES.map((p) => (
            <motion.circle
              key={`particle-${p.id}`}
              cx={p.x}
              cy={p.y}
              r={p.size}
              fill="rgba(198,160,82,0.15)"
              initial={{ opacity: 0.05, scale: 1 }}
              animate={{
                opacity: [0.05, 0.2, 0.05],
                scale: [1, 1.3, 1],
                cy: [p.y, p.y - 15, p.y]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* ── India Outline (Detailed from @svg-maps/india) ── */}
          <g filter="url(#mapShadow)">
            {locations.map((loc: any) => (
                <motion.path
                  key={loc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  d={loc.path}
                  fill="url(#indiaFill)"
                  stroke="rgba(198,160,82,0.2)"
                  strokeWidth="1.2"
                  className="transition-colors duration-500 hover:fill-[#1a233a]"
                  data-name={loc.name}
                />
            ))}
          </g>

          {/* ── Faint Connecting Lines ── */}
          {NODE_CONNECTIONS.map((conn, i) => {
            const from = getNodeByName(conn.from);
            const to = getNodeByName(conn.to);
            if (!from || !to) return null;

            const midX = (from.x + to.x) / 2 + (i % 2 === 0 ? -15 : 15);
            const midY = (from.y + to.y) / 2 + (i % 2 === 0 ? -10 : 10);

            return (
              <g key={`conn-${i}`}>
                {/* Faint path */}
                <motion.path
                  d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                  fill="none"
                  stroke="rgba(198,160,82,0.12)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: i * 0.15, ease: "easeOut" }}
                />
                {/* Traveling pulse */}
                {isLive && (
                  <motion.circle
                    r="1.5"
                    fill="rgba(198,160,82,0.6)"
                    filter="url(#lineGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.9, 0.9, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "linear", delay: i * 0.3 }}
                    style={{ offsetPath: `path("M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}")` }}
                  >
                    <animateMotion
                      dur={`${3 + i * 0.5}s`}
                      repeatCount="indefinite"
                      path={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                    />
                  </motion.circle>
                )}
              </g>
            );
          })}

          {/* ── Risk Nodes ── */}
          {RISK_NODES.map((node, idx) => {
            const isSelected = selectedDistrict === node.name;
            const isHovered = hovered === node.name;
            const color = getRiskColor(node.risk);
            const glow = getRiskGlow(node.risk);

            return (
              <g
                key={node.name}
                onMouseEnter={() => setHovered(node.name)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onSelect(node.name)}
                className="cursor-pointer"
              >
                {/* Outer pulse ring */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="15"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{
                    opacity: [0.5, 0, 0.5],
                    scale: [0.8, 1.4, 0.8],
                  }}
                  transition={{
                    duration: 3 + idx * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3,
                  }}
                  style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                />

                {/* Second pulse ring (only high risk) */}
                {node.risk === "High" && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth="0.5"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: [0.4, 0, 0.4],
                      scale: [0.7, 1.6, 0.7],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.2 + 0.5,
                    }}
                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                  />
                )}

                {/* Glow aura */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected || isHovered ? 14 : 9}
                  fill={color}
                  opacity={0.15}
                  style={{ filter: "blur(6px)", transition: "r 0.3s ease" }}
                />

                {/* Core dot with pulse animation */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected || isHovered ? 6 : 4}
                  fill={color}
                  filter="url(#nodeGlow)"
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.15,
                  }}
                  style={{
                    transformOrigin: `${node.x}px ${node.y}px`,
                    filter: `drop-shadow(0 0 10px ${glow})`,
                  }}
                />

                {/* Dashed perimeter */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isSelected || isHovered ? 16 : 10}
                  fill="none"
                  stroke={color}
                  strokeWidth="0.8"
                  strokeDasharray="2 2"
                  opacity={0.4}
                  style={{ transition: "r 0.3s ease" }}
                />

                {/* Always-visible label */}
                <text
                  x={node.x}
                  y={node.y - (isSelected || isHovered ? 20 : 14)}
                  textAnchor="middle"
                  fill="#EAEAEA"
                  fontSize={isSelected || isHovered ? "10" : "8"}
                  fontWeight="900"
                  letterSpacing="0.1em"
                  opacity={isSelected || isHovered ? 1 : 0.7}
                  style={{
                    textTransform: "uppercase",
                    filter: "drop-shadow(0 0 4px rgba(0,0,0,1))",
                    transition: "all 0.3s ease",
                  }}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ─── Neural Anomaly Log (Bottom Left) ─── */}
      <div className="absolute bottom-8 left-8 z-30 max-w-[260px]">
        <div className="p-5 rounded-2xl border shadow-2xl"
             style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(198,160,82,0.12)" }}>
          <div className="flex items-center gap-2.5 mb-3">
            <Database className="h-3.5 w-3.5" style={{ color: "#c6a052" }} />
            <h5 className="text-[9px] font-black uppercase tracking-widest" style={{ color: "#EAEAEA" }}>Anomaly Feed</h5>
          </div>
          <div className="space-y-2 overflow-hidden h-20 font-mono text-[8px]">
            <p style={{ color: "rgba(198,160,82,0.5)", borderLeft: "2px solid rgba(198,160,82,0.3)", paddingLeft: "8px" }}>
              [INFO] Scanning 467 districts for variance...
            </p>
            <motion.p 
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ color: "#ef4444", borderLeft: "2px solid #ef4444", paddingLeft: "8px" }}
            >
              [ALERT] Income mismatch — Delhi cluster flagged.
            </motion.p>
            <p style={{ color: "rgba(234,234,234,0.25)", borderLeft: "2px solid rgba(255,255,255,0.06)", paddingLeft: "8px" }}>
              [SYNC] Ledger hash: 0x7E2A...9F1C verified.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Crosshair Overlay ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
           style={{ border: "1px solid rgba(99,102,241,0.15)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.04]">
        <Crosshair className="h-40 w-40" style={{ color: "rgba(198,160,82,0.5)" }} strokeWidth={0.5} />
      </div>

      {/* ─── Interactive Tooltip ─── */}
      <AnimatePresence>
        {hovered && (() => {
          const node = getNodeByName(hovered);
          if (!node) return null;
          const color = getRiskColor(node.risk);
          return (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-1/2 right-8 -translate-y-1/2 z-40 w-64 p-6 rounded-2xl border space-y-4"
              style={{
                background: "rgba(8,8,18,0.95)",
                backdropFilter: "blur(20px)",
                borderColor: "rgba(198,160,82,0.15)",
                boxShadow: `0 25px 50px rgba(0,0,0,0.8), 0 0 30px ${getRiskGlow(node.risk)}`,
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-black uppercase tracking-tight italic" style={{ color: "#FFFFFF" }}>{node.name}</h4>
                  <Globe className="h-3.5 w-3.5" style={{ color: "rgba(198,160,82,0.6)" }} />
                </div>
                <div className="inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest"
                     style={{
                       background: `${color}15`,
                       color: color,
                       border: `1px solid ${color}30`,
                     }}>
                  {node.risk} Risk Zone
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                  <span style={{ color: "rgba(234,234,234,0.4)" }}>Conflict Rate</span>
                  <span style={{ color }}>{node.conflictRate}%</span>
                </div>
                <div className="h-1 w-full rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${node.conflictRate}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-black uppercase tracking-widest pt-1">
                  <span style={{ color: "rgba(234,234,234,0.4)" }}>Population</span>
                  <span style={{ color: "#EAEAEA" }}>{node.population}</span>
                </div>
              </div>

              <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(198,160,82,0.4)" }}>
                  <Zap className="h-3 w-3" /> Node Pulse: Active
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
