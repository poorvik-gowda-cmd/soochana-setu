"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  Map, 
  Search, 
  Lock, 
  ArrowRight, 
  BarChart3, 
  Database,
  Brain,
  ExternalLink,
  ChevronRight,
  Fingerprint,
  Activity,
  Globe,
  Sparkles,
  Zap,
  Crosshair
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminStats } from "@/components/AdminStats";
import { RegionalRiskPreview } from "@/components/RegionalRiskPreview";
import { supabase } from "@/lib/supabase";

export default function AdminIntelligenceHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const router = useRouter();
  
  // Progress bar logic
  const { scrollYProgress } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<{left: string, top: string, delay: string, scale: string}[]>([]);
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setIsMounted(true);
    // Pre-generate stable random values for particles on the client
    const newParticles = [...Array(15)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      scale: `${0.5 + Math.random() * 1.5}`
    }));
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    async function fetchSamples() {
      const { data } = await supabase.from("citizens").select("name").limit(4);
      if (data) setSuggestions(data.map(c => c.name));
    }
    fetchSamples();
  }, []);

  const handleSearch = (e?: React.FormEvent, name?: string) => {
    if (e) e.preventDefault();
    const query = name || searchQuery;
    if (query.trim()) {
      router.push(`/admin/research?identifier=${encodeURIComponent(query)}`);
    }
  };

  const adminModules = [
    { 
        title: "Data Command Center", 
        subtitle: "AI Ingestion & Policy Hub", 
        icon: Database, 
        href: "/admin/data", 
        color: "from-amber-600 to-yellow-700",
        description: "Intelligently synchronize departmental records and manage official government policy rules."
    },
    { 
        title: "Policy Simulator", 
        subtitle: "Leakage Heatmap & AI Simulation", 
        icon: Globe, 
        href: "/admin/policy-simulator", 
        color: "from-amber-700 to-yellow-800",
        description: "Visualize geographical leakage hotspots and test new policy impact via national AI simulation."
    },
    { 
        title: "Profile Verification", 
        subtitle: "Identity & Profile Verification", 
        icon: Lock, 
        href: "/audit-ledger", 
        color: "from-yellow-700 to-amber-900",
        description: "Verify the integrity of system decisions using SHA256 immutable sequences in a vault-style ledger."
    }
  ];

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-amber-500/20 pb-20 overflow-x-hidden relative">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-amber-500 z-[100] origin-left shadow-[0_0_15px_#d4af37]" style={{ scaleX }} />

      {/* Neural Background Particles (Self-executing effect) */}
      <div className="fixed inset-0 pointer-events-none z-0">
          {isMounted && particles.map((p, i) => (
              <div 
                  key={i} 
                  className="particle" 
                  style={{ 
                      left: p.left, 
                      top: p.top, 
                      animationDelay: p.delay,
                      transform: `scale(${p.scale})`
                  }} 
              />
          ))}
      </div>

      {/* High-Authority Admin Navigation */}
      <nav className="bg-black/80 backdrop-blur-3xl border-b border-amber-500/10 h-24 px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
            <div className="relative group">
                <div className="absolute inset-0 bg-amber-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all" />
                <div className="relative bg-gradient-to-br from-amber-400 to-yellow-600 p-3 rounded-xl text-black shadow-2xl">
                    <ShieldCheck className="h-6 w-6 stroke-[2.5]" />
                </div>
            </div>
            <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <h1 className="text-xl font-black tracking-tighter italic gold-text-gradient uppercase leading-none">Soochana Setu</h1>
                <p className="text-[9px] font-black text-amber-500/60 uppercase tracking-[0.4em] mt-2">National Operational Intelligence Command</p>
            </motion.div>
        </div>

        <div className="flex items-center gap-10">
            <div className="hidden lg:flex items-center gap-6 border-r border-amber-500/10 pr-10">
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">System Integrity: Nominal</span>
                    <span className="text-[10px] font-bold text-amber-100/40 uppercase tracking-widest italic">Node 0x1A2B</span>
                </div>
                <Activity className="h-4 w-4 text-amber-500 animate-pulse" />
            </div>

            <Link 
                href="/citizen-login" 
                className="flex items-center gap-3 text-amber-500 hover:text-amber-300 transition-all font-black text-[10px] uppercase tracking-[0.3em] group relative"
            >
                Public Portal 
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full shadow-[0_0_10px_#d4af37]" />
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        </div>
      </nav>

      <div className="container mx-auto px-10 py-20 max-w-7xl relative z-10">
        {/* Background Fingerprint Texture */}
        <div className="absolute top-0 right-0 p-40 opacity-10 pointer-events-none group">
             <Fingerprint className="h-96 w-96 text-amber-500 transition-transform duration-[30s] group-hover:rotate-180" />
        </div>

        {/* Hero Section: The Elite Reveal Terminal */}
        <section className="mb-32 relative">
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="max-w-4xl"
            >
                {/* Modern Brand Logo */}
                <div className="mb-12 flex flex-col items-start gap-4">
                    <div className="relative h-20 w-40 mb-2">
                        <svg viewBox="0 0 200 100" className="h-full w-full drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                            <path 
                                d="M20,80 Q100,0 180,80" 
                                fill="none" 
                                stroke="url(#logoGradient)" 
                                strokeWidth="6" 
                                strokeLinecap="round" 
                            />
                            <path 
                                d="M20,80 L180,80" 
                                fill="none" 
                                stroke="url(#logoGradient)" 
                                strokeWidth="2" 
                                strokeLinecap="round" 
                                strokeDasharray="4 4"
                            />
                            {isMounted && [40, 70, 100, 130, 160].map(x => (
                                <line 
                                    key={x} 
                                    x1={x} y1="80" x2={x} y2={80 - (Math.sin((x-20)/160 * Math.PI) * 40)} 
                                    stroke="#d4af37" 
                                    strokeWidth="1" 
                                    className="opacity-40" 
                                />
                            ))}
                            <defs>
                                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#fef3c7" />
                                    <stop offset="50%" stopColor="#d4af37" />
                                    <stop offset="100%" stopColor="#92400e" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <motion.h2 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={{ y: [0, -10, 0] }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.2, 
                      duration: 0.8,
                      y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="text-[100px] font-black text-white tracking-tighter leading-[0.9] mb-12"
                >
                    One Person,<br />
                    <span className="gold-text-gradient italic">Many Realities.</span>
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    animate={{ y: [0, -5, 0] }}
                    viewport={{ once: true }}
                    transition={{ 
                        opacity: { delay: 0.5, duration: 1 },
                        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                    }}
                    className="text-amber-100 text-2xl font-medium max-w-2xl leading-relaxed mb-20 italic"
                >
                    "Analyze how fragmented departmental records create conflicting economic identities. 
                    Search for a citizen to begin a forensic deep-dive into cross-ministerial integrity."
                </motion.p>

                {/* Elite Search Terminal */}
                <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                    <form onSubmit={handleSearch} className="relative group max-w-3xl">
                        <div className="absolute inset-0 bg-amber-500/40 rounded-[3rem] blur-[80px] opacity-10 group-hover:opacity-25 transition-all pointer-events-none" />
                        <div className="relative bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] p-5 border border-amber-500/20 hover:border-amber-500/50 transition-all shadow-4xl flex items-center gap-6 overflow-hidden">
                            <div className="pl-8 text-amber-500 animate-pulse">
                                <Search className="h-8 w-8" />
                            </div>
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Aadhaar, Phone, or Registered Name..."
                                className="flex-1 bg-transparent border-none focus:ring-0 text-2xl font-black text-amber-100 placeholder:text-amber-500/10 py-6 tracking-wide"
                            />
                            <button 
                                type="submit"
                                className="bg-gradient-to-br from-amber-400 to-yellow-600 text-black px-14 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-sm hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl shadow-amber-500/30 flex items-center gap-3"
                            >
                                Analyze <ArrowRight className="h-5 w-5 stroke-[4]" />
                            </button>
                        </div>

                        {/* Luminous Champagne Chips */}
                        {suggestions.length > 0 && (
                            <div className="mt-10 flex flex-wrap items-center gap-5 px-8">
                                <span className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 flex items-center gap-3">
                                    <Sparkles className="h-4 w-4" /> Neural Samples:
                                </span>
                                {suggestions.map((name, i) => (
                                    <motion.button
                                        key={name}
                                        type="button"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + (i * 0.1) }}
                                        onClick={() => handleSearch(undefined, name)}
                                        className="bg-slate-900/80 border border-amber-500/10 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-200 hover:bg-amber-500/20 hover:border-amber-500/40 transition-all shadow-[0_0_15px_rgba(0,0,0,1)] hover:shadow-amber-500/10 hover:-translate-y-1"
                                    >
                                        {name}
                                </motion.button>
                            ))}
                        </div>
                    )}
                    </form>
                </motion.div>
            </motion.div>
        </section>

        {/* Intelligence Grid: Staggered Scroll Reveal */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-24 mb-40 relative z-10">
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="lg:col-span-12"
             >
                <AdminStats />
             </motion.div>
             
             <div className="lg:col-span-8 space-y-32">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <RegionalRiskPreview />
                </motion.div>
             </div>

             <div className="lg:col-span-4 space-y-16">
                <motion.h4 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.4 }}
                    viewport={{ once: true }}
                    className="text-[11px] font-black uppercase tracking-[0.6em] text-amber-500 mb-8 px-8 italic"
                >
                    Command Protocols
                </motion.h4>
                
                {adminModules.map((m, idx) => (
                    <motion.div
                        key={m.title}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.2 }}
                    >
                        <Link href={m.href} className="group block">
                            <div className="glass-card-elite rounded-[3.5rem] p-12 border border-amber-500/5 hover:border-amber-500/30 hover:-translate-y-3 transition-all duration-700 relative overflow-hidden group/card shadow-[0_45px_90px_-12px_rgba(0,0,0,0.9)]">
                                <div className={`h-16 w-16 rounded-[1.5rem] bg-gradient-to-br ${m.color} text-black flex items-center justify-center mb-10 shadow-2xl shadow-amber-500/20 group-hover/card:scale-110 transition-transform`}>
                                    <m.icon className="h-8 w-8 stroke-[3]" />
                                </div>
                                <h5 className="text-3xl font-black text-amber-100 tracking-tighter flex items-center justify-between mb-3">
                                    {m.title} <ChevronRight className="h-6 w-6 opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-3 transition-all text-amber-500" />
                                </h5>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/50 mb-8 italic">{m.subtitle}</p>
                                <p className="text-[13px] text-amber-100/40 leading-relaxed font-bold italic tracking-wide group-hover/card:text-amber-100 transition-colors">
                                    {m.description}
                                </p>
                                
                                {/* Geometric Underlay */}
                                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    <m.icon className="h-40 w-40 text-amber-500" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}

                {/* Tactical HUD Footer */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-black/50 backdrop-blur-xl p-14 rounded-[3.5rem] text-amber-100/40 border border-amber-500/10 shadow-4xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-10 transition-all duration-[3s]">
                         <Crosshair className="h-56 w-56 text-amber-500 animate-spin-slow" />
                    </div>
                    <div className="flex items-center gap-4 mb-10">
                       <div className="h-3 w-3 bg-amber-500 rounded-full animate-pulse shadow-[0_0_20px_#d4af37]" />
                       <h6 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 italic">Neural Integrity Feed</h6>
                    </div>
                    <div className="space-y-4 font-mono text-[9px] uppercase tracking-widest opacity-60">
                        <p className="border-l-2 border-amber-500/30 pl-4 py-1 italic hover:text-amber-400 transition-colors">SYNCING REGIONAL CORE...</p>
                        <p className="border-l-2 border-amber-500/10 pl-4 py-1 italic opacity-40">ENCRYPTING TRUTH VECTORS [PASSED]</p>
                        <p className="border-l-2 border-amber-500 pl-4 py-1 italic text-amber-500/80">RECONCILING 0x4F92 REALITY CONTRACTION</p>
                    </div>
                </motion.div>
             </div>
        </section>
      </div>

      <footer className="py-40 border-t border-amber-500/10 bg-black relative z-10">
        <div className="container mx-auto px-10 text-center">
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-8"
            >
                <div className="h-0.5 w-24 bg-amber-500 shadow-[0_0_20px_#d4af37]" />
                <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.8em] leading-relaxed italic max-w-3xl">
                    Soochana Setu &bull; National Intelligence Command &bull; Deploying Ground Truth at Scale
                </p>
                <div className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mt-4">
                    Obsidian-Elite Protocol v2.5.0
                </div>
            </motion.div>
        </div>
      </footer>
    </main>
  );
}
