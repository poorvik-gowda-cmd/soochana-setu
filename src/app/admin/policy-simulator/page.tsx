"use client";

import { useState, useMemo } from "react";
import { DepartmentSwitcher } from "@/components/DepartmentSwitcher";
import { IndiaMap } from "@/components/IndiaMap";
import { LeakageStats } from "@/components/LeakageStats";
import { HeatmapTable } from "@/components/HeatmapTable";
import { LeakageChart } from "@/components/LeakageChart";
import { HEATMAP_MOCK_DATA } from "@/lib/data";
import { DepartmentType } from "@/lib/types";
import { 
  ShieldCheck, 
  Map, 
  ArrowLeft, 
  BarChart3, 
  Info, 
  Zap, 
  Play, 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  Users,
  Trophy,
  Activity,
  History,
  Globe,
  Crosshair
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PolicySimulatorHub() {
  const [activeTab, setActiveTab] = useState<"heatmap" | "simulate">("heatmap");
  const [selectedDept, setSelectedDept] = useState<DepartmentType>("Food");
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const router = useRouter();

  // Simulation Form State
  const [formData, setFormData] = useState({
    name: "",
    department: "Food",
    scheme: "",
    type: "Central",
    min_income: 0,
    max_income: 200000,
    required_category: "Poor",
    additional_rule: ""
  });
  const [simLoading, setSimLoading] = useState(false);
  const [simResults, setSimResults] = useState<any>(null);

  const currentHeatmapData = useMemo(() => {
    const found = HEATMAP_MOCK_DATA.find(d => d.department === selectedDept);
    if (found) return found;
    return {
      department: selectedDept,
      stats: { total_districts: 0, high_risk: 0, avg_conflict: 0 },
      districts: []
    };
  }, [selectedDept]);

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSimLoading(true);
    setSimResults(null);
    try {
      const res = await fetch("/api/simulate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ policy: formData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSimResults(data);
      setActiveTab("simulate");
    } catch (err) {
      console.error("Simulation error:", err);
    } finally {
      setSimLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black font-sans selection:bg-amber-500/20 pb-20 overflow-x-hidden relative">
      {/* High-Authority Admin Navigation */}
      <nav className="bg-black/90 backdrop-blur-3xl border-b border-amber-500/10 h-24 px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-6">
            <button onClick={() => router.push("/")} className="p-3 bg-slate-900/50 hover:bg-amber-500/10 rounded-2xl transition-all border border-amber-500/10 text-amber-500 group">
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <div className="h-10 w-px bg-amber-500/10" />
            <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-amber-400 to-yellow-600 p-2.5 rounded-xl text-black shadow-2xl">
                    <Zap className="h-5 w-5 stroke-[2.5]" />
                </div>
                <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <h1 className="text-xl font-black italic gold-text-gradient uppercase leading-none tracking-tighter">Soochana Setu</h1>
                    <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.4em] mt-2">Policy Intelligence & Analytics Hub</p>
                </motion.div>
            </div>
        </div>

        {/* Elite Tab Switcher */}
        <div className="bg-slate-900/60 backdrop-blur-md p-1.5 rounded-2xl border border-amber-500/10 flex items-center shadow-inner scale-90 md:scale-100 relative overflow-hidden group">
            <div className={`absolute top-0 bottom-0 w-1/2 bg-amber-500/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${activeTab === 'simulate' ? 'translate-x-full' : 'translate-x-0'}`} />
            <button 
                onClick={() => setActiveTab("heatmap")}
                className={`relative z-10 flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'heatmap' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
            >
                <Globe className="h-4 w-4" /> Heatmap Analytics
            </button>
            <button 
                onClick={() => setActiveTab("simulate")}
                className={`relative z-10 flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeTab === 'simulate' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                }`}
            >
                <Play className="h-4 w-4" /> Policy Simulation
            </button>
        </div>

        <div className="hidden lg:flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">AI Engine: Online</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 italic">Mistral Small v0.2</span>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-10 py-20 max-w-7xl relative z-10">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] pointer-events-none group">
             <Crosshair className="h-[500px] w-[500px] text-amber-500 animate-spin-slow" />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "heatmap" ? (
            <motion.div 
              key="heatmap"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="space-y-20"
            >
                {/* Heatmap Title & Dept Selection: Scroll Reveal Elite */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-12"
                >
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="flex items-center gap-3 text-amber-500 mb-6 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20">
                            <Map className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-none italic">Regional Risk Projection node</span>
                        </div>
                        <h2 className="text-7xl font-black text-white tracking-tighter leading-tight">
                            Regional <span className="gold-text-gradient italic">Leakage Analytics</span>
                        </h2>
                    </motion.div>
                    <div className="glass-card-elite rounded-[2.5rem] p-2 border-amber-500/5">
                        <DepartmentSwitcher selected={selectedDept} onSelect={(id) => {
                            setSelectedDept(id);
                            setSelectedDistrict(null);
                        }} />
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="xl:col-span-8 space-y-16"
                    >
                        <div className="glass-card-elite rounded-[4rem] p-4 border-amber-500/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] group relative">
                           <div className="absolute inset-0 bg-amber-500/[0.02] pointer-events-none group-hover:opacity-100 transition-opacity opacity-0" />
                           <IndiaMap districts={currentHeatmapData.districts} selectedDistrict={selectedDistrict} onSelect={setSelectedDistrict} />
                        </div>
                        <div className="glass-card-elite rounded-[3rem] p-2 border-amber-500/5">
                            <HeatmapTable districts={currentHeatmapData.districts} selected={selectedDistrict} onSelect={setSelectedDistrict} />
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="xl:col-span-4 space-y-16"
                    >
                        <LeakageStats data={currentHeatmapData} />
                        <div className="glass-card-elite rounded-[3rem] p-10 border-amber-500/5">
                             <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/60 mb-8 italic">Variance Vectors</h4>
                             <LeakageChart districts={currentHeatmapData.districts} />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
          ) : (
            <motion.div 
              key="simulate"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="space-y-20"
            >
                {/* Simulation Header: Scroll Reveal Elite */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-4 text-amber-500 mb-6 bg-amber-500/10 w-fit px-6 py-2 rounded-full border border-amber-500/20 shadow-2xl">
                        <Zap className="h-5 w-5 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-none italic">Government Policy Simulator Active</span>
                    </div>
                    <h2 className="text-7xl font-black text-white tracking-tighter leading-tight mb-8">
                        Predictive <span className="gold-text-gradient italic">Impact Assessment.</span>
                    </h2>
                    <p className="text-slate-400 text-xl font-medium max-w-2xl leading-relaxed italic opacity-70">
                        Test new policy rules against the live national dataset to identify potential leakage, funding gaps, and departmental conflicts before deployment.
                    </p>
                </motion.div>

                {/* Elite Simulation Form */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="glass-card-elite rounded-[4rem] p-16 border-amber-500/10 relative overflow-hidden group shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
                >
                    <div className="absolute top-0 right-0 p-20 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 pointer-events-none">
                         <Play className="h-80 w-80 text-amber-500" />
                    </div>
                    
                    <form onSubmit={handleSimulate} className="max-w-5xl relative z-10 space-y-16">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                            <div className="md:col-span-8 space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">Strategy Title</label>
                                <input 
                                  type="text" 
                                  value={formData.name}
                                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                                  placeholder="e.g., Central Food Security Transformation 2026"
                                  className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2.5rem] p-8 text-lg font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner tracking-tight placeholder:text-amber-500/5 group-hover:border-amber-500/20"
                                  required
                                />
                            </div>
                            <div className="md:col-span-4 space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">Ministerial Domain</label>
                                <select 
                                   value={formData.department}
                                   onChange={(e) => setFormData({...formData, department: e.target.value})}
                                   className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2.5rem] p-8 text-lg font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner appearance-none group-hover:border-amber-500/20"
                                >
                                    {["Food", "Health", "Education", "Tax"].map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {[
                                { label: "Floor Threshold", key: "min_income", type: "number" },
                                { label: "Ceiling Limit", key: "max_income", type: "number" }
                            ].map((f) => (
                                <div key={f.key} className="space-y-4">
                                    <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">{f.label}</label>
                                    <input 
                                      type={f.type} 
                                      value={formData[f.key as keyof typeof formData]}
                                      onChange={(e) => setFormData({...formData, [f.key]: Number(e.target.value)})}
                                      className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2rem] p-7 text-sm font-black text-amber-100 shadow-inner group-hover:border-amber-500/20"
                                    />
                                </div>
                            ))}
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">Priority Category</label>
                                <select 
                                   value={formData.required_category}
                                   onChange={(e) => setFormData({...formData, required_category: e.target.value})}
                                   className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2rem] p-7 text-sm font-black text-amber-100 shadow-inner appearance-none group-hover:border-amber-500/20"
                                >
                                    {["Poor", "Middle", "Rich", "BPL"].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="space-y-4">
                                <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">Deployment Tier</label>
                                <div className="flex gap-4 h-[78px]">
                                    {["Central", "State"].map(t => (
                                        <button 
                                           key={t}
                                           type="button"
                                           onClick={() => setFormData({...formData, type: t})}
                                           className={`flex-1 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-2 ${
                                               formData.type === t ? 'bg-amber-500 text-black border-amber-500 shadow-[0_0_20px_#d4af37]' : 'bg-slate-900/50 text-amber-500/40 border-amber-500/10 hover:border-amber-500/30'
                                           }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-3 italic">Advanced Simulation Logic (Neural Inference)</label>
                            <textarea 
                                value={formData.additional_rule}
                                onChange={(e) => setFormData({...formData, additional_rule: e.target.value})}
                                placeholder="Define complex constraints for the AI to simulate..."
                                className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2.5rem] p-10 text-sm font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner h-40 group-hover:border-amber-500/20 placeholder:text-amber-500/5"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-10 border-t border-amber-500/10">
                            <div className="flex items-center gap-4 text-amber-500/60 px-4">
                                <Activity className="h-6 w-6 animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-[0.3em] italic">Targeting: Global {formData.required_category} Reality Node</span>
                            </div>
                            <button 
                                type="submit" 
                                disabled={simLoading}
                                className="px-16 py-7 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm hover:scale-[1.05] active:scale-[0.95] transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-4 disabled:bg-slate-800 disabled:text-slate-600"
                            >
                                {simLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <><Play className="h-5 w-5 fill-black" strokeWidth={3} /> Commence National Simulation</>}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Simulation Results Section: Heavy Animations */}
                <AnimatePresence>
                    {simResults && (
                        <motion.div 
                           initial={{ opacity: 0, y: 100 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 1, type: "spring" }}
                           className="space-y-20 pt-10"
                        >
                            <div className="flex items-center gap-4 px-10">
                                <div className="h-1 w-16 bg-amber-500 shadow-[0_0_10px_#d4af37]" />
                                <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-500 italic">Synthetic Reality Output (Simulation Cluster Alpha)</h3>
                            </div>

                            {/* Detailed Results Matrix (Table) */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="glass-card-elite rounded-[4rem] p-4 border-amber-500/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]"
                            >
                                {/* Results Grid Headers */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-10 border-b border-amber-500/5">
                                    {[
                                        { label: "Target Nodes", value: simResults.summary.total_eligible, icon: Users },
                                        { label: "Predictive Integrity", value: `${simResults.summary.avg_eligibility}%`, icon: Trophy },
                                        { label: "Reality Conflicts", value: simResults.summary.high_conflict_cases, icon: History, alert: true }
                                    ].map((s) => (
                                        <div key={s.label} className="bg-black/40 p-8 rounded-[2.5rem] border border-amber-500/10 flex items-center gap-8 group">
                                            <div className={`p-5 rounded-2xl ${s.alert ? 'bg-rose-500/20 text-rose-500' : 'bg-amber-500/10 text-amber-500'} group-hover:scale-110 transition-transform shadow-2xl`}>
                                                <s.icon className="h-8 w-8" />
                                            </div>
                                            <div>
                                                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 mb-2 italic leading-none">{s.label}</p>
                                                <p className={`text-4xl font-black ${s.alert ? 'text-rose-400' : 'text-white'} tracking-tighter`}>{s.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-black/60 border-b border-amber-500/10">
                                                <th className="px-12 py-10 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Identity Core</th>
                                                <th className="px-12 py-10 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Financial Reality</th>
                                                <th className="px-12 py-10 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Elastic Accuracy</th>
                                                <th className="px-12 py-10 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Strategic Status</th>
                                                <th className="px-12 py-10 text-[11px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">Neural Reasoning</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-amber-500/5">
                                            {simResults.results.map((r: any, idx: number) => (
                                                <motion.tr 
                                                    key={r.citizen_id} 
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="hover:bg-amber-500/[0.03] transition-all group/row"
                                                >
                                                    <td className="px-12 py-10">
                                                        <div className="text-lg font-black text-white italic tracking-tighter">{r.name}</div>
                                                        <div className="text-[10px] text-amber-500/30 font-mono tracking-widest uppercase mt-1">{r.citizen_id}</div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <div className="text-lg font-black text-amber-100 tracking-tight">₹{r.income.toLocaleString()}</div>
                                                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic">{r.category} reality</div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <div className="flex items-center gap-5">
                                                            <div className="flex-1 w-32 h-2 bg-slate-900 rounded-full overflow-hidden shadow-inner border border-amber-500/5">
                                                                <motion.div 
                                                                    initial={{ width: 0 }}
                                                                    whileInView={{ width: `${r.eligibility_percentage}%` }}
                                                                    className={`h-full shadow-[0_0_15px_currentColor] ${r.eligibility_percentage > 70 ? 'text-amber-500' : r.eligibility_percentage > 40 ? 'text-yellow-600' : 'text-rose-500'} bg-current`}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-black text-white">{r.eligibility_percentage}%</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                       <div className="flex flex-col gap-3">
                                                            <div className={`w-fit px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 border-2 ${
                                                                r.status === 'Eligible' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                                                r.status === 'Partial' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                            }`}>
                                                                {r.status === 'Eligible' ? <CheckCircle2 className="h-3.5 w-3.5" /> : r.status === 'Partial' ? <Activity className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                                                                {r.status}
                                                            </div>
                                                            {r.has_conflict && (
                                                                <div className="flex items-center gap-2 text-[9px] font-black text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20 uppercase tracking-[0.2em] animate-pulse italic">
                                                                    <AlertCircle className="h-3 w-3" /> Reality Violation Detected
                                                                </div>
                                                            )}
                                                       </div>
                                                    </td>
                                                    <td className="px-12 py-10">
                                                        <p className="text-[11px] text-amber-100/40 font-medium leading-relaxed max-w-sm italic tracking-tight group-hover/row:text-amber-100 transition-colors">
                                                            {r.reason}
                                                        </p>
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="py-40 border-t border-amber-500/10 bg-black mt-20">
        <div className="container mx-auto px-10 text-center">
            <p className="text-amber-500/40 text-[11px] font-black uppercase tracking-[0.8em] leading-relaxed italic">
                National Data Unification Hub &bull; Strategic Intelligence Division &bull; Node 0x7E2A
            </p>
        </div>
      </footer>
    </main>
  );
}
