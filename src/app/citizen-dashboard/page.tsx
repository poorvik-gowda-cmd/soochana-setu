"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  ArrowLeft, 
  User, 
  LayoutDashboard, 
  FileText, 
  Brain, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  Lock,
  Globe,
  ArrowRight,
  Check,
  Info,
  Crosshair,
  Zap,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { DepartmentRecord, Policy } from "@/lib/types";
import AuditTrailViewer from "@/components/AuditTrailViewer";

export default function CitizenDashboard() {
  const [citizen, setCitizen] = useState<any>(null);
  const [records, setRecords] = useState<DepartmentRecord[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [evaluating, setEvaluating] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("citizen");
    if (!data) {
      router.push("/citizen-login");
      return;
    }
    const citizenData = JSON.parse(data);
    setCitizen(citizenData);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/citizen-data?citizen_id=${citizenData.id}`);
        const result = await res.json();
        if (res.ok) {
          setRecords(result.records);
          setPolicies(result.policies);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleEvaluate = async () => {
    setEvaluating(true);
    setAiResult(null);
    try {
      const res = await fetch("/api/citizen-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ citizen_id: citizen.id }),
      });
      const data = await res.json();
      if (res.ok) setAiResult(data);
    } catch (err) {
      console.error("AI Evaluation error:", err);
    } finally {
      setEvaluating(false);
    }
  };

  if (loading || !citizen) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black flex-col gap-6 italic text-amber-500/40 tracking-[0.5em] uppercase font-black text-[10px]">
         <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-2xl animate-pulse rounded-full" />
            <Loader2 className="h-14 w-14 text-amber-500 animate-spin relative z-10" />
         </div>
         <span className="mt-4">Accessing Personal Reality Core...</span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-amber-500/20 pb-20 overflow-x-hidden relative">
      {/* High-Transparency Global Header: Obsidian & Gold */}
      <nav className="bg-black/90 backdrop-blur-3xl border-b border-amber-500/10 h-24 px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
            <button onClick={() => router.push("/citizen-login")} className="p-3 bg-slate-900/50 hover:bg-amber-500/10 rounded-2xl transition-all border border-amber-500/10 text-amber-500 group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="h-10 w-px bg-amber-500/10" />
            <div className="flex items-center gap-4">
                <div className="h-14 w-14 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center text-black shadow-2xl relative group/avatar overflow-hidden">
                    <User className="h-7 w-7 stroke-[2.5]" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity" />
                </div>
                <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                   <h1 className="text-xl font-black italic gold-text-gradient uppercase leading-none tracking-tighter">Citizen Reality Dashboard</h1>
                   <div className="flex items-center gap-4 mt-2">
                       <span className="text-[10px] font-black text-amber-100/40 uppercase tracking-[0.2em]">{citizen.name}</span>
                       <div className="h-1.5 w-1.5 bg-amber-500/20 rounded-full" />
                       <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] leading-none italic opacity-80">
                         Node: {citizen.aadhaar.substring(0, 4) + "****" + citizen.aadhaar.substring(citizen.aadhaar.length - 4)}
                       </span>
                   </div>
                </motion.div>
            </div>
        </div>

        <div className="flex items-center gap-3 bg-amber-500/10 px-5 py-2.5 rounded-2xl border border-amber-500/20 shadow-4xl">
             <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_#d4af37]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500 italic">Integrity Session Active</span>
        </div>
      </nav>

      <div className="container mx-auto px-10 py-20 max-w-7xl relative z-10">
        {/* Particle Accent Background */}
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] pointer-events-none group">
             <Crosshair className="h-[600px] w-[600px] text-amber-500 animate-spin-slow" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
            
            {/* Left: Data Reality Section - Scroll Reveal Elite */}
            <div className="xl:col-span-8 space-y-16">
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-10 px-6">
                       <div className="h-1 w-12 bg-amber-500 shadow-[0_0_10px_#d4af37]" />
                       <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-500 italic">Personal Ministerial Telemetry Nodes</h2>
                    </div>

                    <div className="glass-card-elite rounded-[4rem] border-amber-500/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden group">
                        <div className="p-10 border-b border-amber-500/5 bg-slate-900/40 flex items-center justify-between">
                            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 italic">Reality Sequence Matrix</p>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-100 bg-amber-500/10 px-5 py-2 rounded-full border border-amber-500/20 shadow-inner">
                                {records.length} Ministerial Realities detected
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-black/40 border-b border-amber-500/10">
                                        <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Department Core</th>
                                        <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Stored Asset reality</th>
                                        <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Identity group</th>
                                        <th className="px-10 py-8 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Active Benefit stream</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-amber-500/5">
                                    {records.map((r, idx) => (
                                        <motion.tr 
                                          key={r.id} 
                                          initial={{ opacity: 0, x: -20 }} 
                                          whileInView={{ opacity: 1, x: 0 }}
                                          transition={{ delay: idx * 0.1 }}
                                          className="hover:bg-amber-500/[0.03] transition-all group/row"
                                        >
                                            <td className="px-10 py-8">
                                                <span className="text-sm font-black text-white uppercase tracking-tighter italic group-hover:text-amber-400 transition-colors">{r.department}</span>
                                            </td>
                                            <td className="px-10 py-8 text-lg font-black text-amber-100 tracking-tight">₹{r.income.toLocaleString()}</td>
                                            <td className="px-10 py-8">
                                                <span className="px-4 py-1.5 bg-slate-900/80 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-500/60 border border-amber-500/10 group-hover:border-amber-500/30 transition-all">
                                                    {r.category} node
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 text-xs font-black text-amber-500/80 italic tracking-tight opacity-70 group-hover:opacity-100">
                                                "{r.scheme}"
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>

                {/* Audit & Trust Verification: Scroll Reveal */}
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-10 px-6">
                       <Lock className="h-6 w-6 text-amber-500" />
                       <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-white italic">Self-Sovereign Identity Audit Cluster</h2>
                    </div>
                    <div className="glass-card-elite rounded-[4rem] p-4 border-amber-500/5">
                         <AuditTrailViewer citizenId={citizen.id} />
                    </div>
                </motion.section>
            </div>

            {/* Right: AI Synthesis & Eligibility Section - Elite Floating slab */}
            <div className="xl:col-span-4 space-y-16">
                <motion.section
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 mb-10 px-4">
                       <Brain className="h-6 w-6 text-amber-500 animate-pulse" />
                       <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-white italic">Neural Reality Synthesizer</h2>
                    </div>

                    <div className="glass-card-elite rounded-[3.5rem] p-12 border-amber-500/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:scale-125 group-hover:rotate-12 transition-all duration-1000">
                             <Globe className="h-48 w-48 text-amber-500" />
                        </div>
                        
                        <div className="relative z-10">
                            <h3 className="text-3xl font-black tracking-tighter leading-tight mb-8 italic text-white flex items-center justify-between">
                                National Benefit <span className="gold-text-gradient underline decoration-amber-500/20 underline-offset-8">Synthesis.</span>
                            </h3>
                            <p className="text-[13px] font-medium text-amber-100/40 leading-relaxed mb-12 italic tracking-tight">
                                "Our AI Synthesizer cross-references your ministerial data nodes to evaluate match percentages against centralized policy mandates."
                            </p>

                            <button 
                                onClick={handleEvaluate}
                                disabled={evaluating}
                                className="w-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2rem] py-6 font-black uppercase tracking-[0.3em] text-[11px] hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 disabled:bg-slate-800 disabled:text-slate-600 group/btn"
                            >
                                {evaluating ? <><Loader2 className="h-6 w-6 animate-spin" /> Synthesizing reality...</> : <>Run Personal Analysis <ArrowRight className="h-5 w-5 stroke-[3] group-hover/btn:translate-x-2 transition-transform" /></>}
                            </button>
                        </div>
                    </div>
                </motion.section>

                <AnimatePresence>
                    {aiResult && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="space-y-12"
                        >
                            <div className="p-12 glass-card-elite rounded-[3.5rem] border-amber-500/10 shadow-4xl relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 mb-10 pb-6 border-b border-amber-500/5 italic flex items-center gap-3">
                                   <Sparkles className="h-4 w-4" /> Global Alignment Insights
                                </h4>
                                <div className="space-y-10">
                                    {aiResult.eligible_policies.map((p: any, idx: number) => (
                                        <motion.div 
                                            key={idx} 
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`p-2.5 rounded-xl border-2 ${p.status === 'Eligible' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : p.status === 'Partial' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                                        {p.status === 'Eligible' ? <CheckCircle2 className="h-4 w-4" /> : p.status === 'Partial' ? <Activity className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                                                    </div>
                                                    <span className="text-sm font-black text-white uppercase tracking-tight italic group-hover:text-amber-400 transition-colors">{p.policy_name}</span>
                                                </div>
                                                <span className="text-xs font-black text-amber-500/40 tracking-[0.2em]">{p.eligibility_percentage}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden mb-4 border border-amber-500/5">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${p.eligibility_percentage}%` }}
                                                    className={`h-full shadow-[0_0_15px_#d4af37] ${p.eligibility_percentage > 70 ? 'bg-amber-500' : p.eligibility_percentage > 40 ? 'bg-yellow-600' : 'bg-rose-500'}`}
                                                />
                                            </div>
                                            <p className="text-[12px] text-amber-100/30 font-bold leading-relaxed italic mt-4 px-2 group-hover:text-amber-100/60 transition-colors">
                                                "{p.reason}"
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.5 }}
                               className="bg-gradient-to-br from-amber-500/10 to-transparent p-12 rounded-[3.5rem] border border-amber-500/20 shadow-4xl relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-all">
                                    <Brain className="h-24 w-24 text-amber-500" />
                                </div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500 mb-8 underline decoration-amber-500/40 underline-offset-8 italic">Neural Reality Conclusion</h4>
                                <p className="text-xl font-black leading-relaxed tracking-tight italic text-white/90">
                                    "{aiResult.summary}"
                                </p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>

      <footer className="py-40 border-t border-amber-500/10 bg-black mt-20">
        <div className="container mx-auto px-10 text-center">
            <p className="text-amber-500/20 text-[11px] font-black uppercase tracking-[0.8em] leading-relaxed italic">
                Soochana Setu &bull; Personal Transparency Core &bull; Secured by SID Protocol 0x9A
            </p>
        </div>
      </footer>
    </main>
  );
}
