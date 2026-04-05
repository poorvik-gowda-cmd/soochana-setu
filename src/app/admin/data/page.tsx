"use client";

import { useState } from "react";
import { 
  Database, 
  Upload, 
  FileText, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  Info,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Search,
  Zap,
  Globe,
  ChevronRight,
  Crosshair
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { AdminPolicyTable } from "@/components/AdminPolicyTable";

export default function AdminDataHub() {
  const [rawText, setRawText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAIInjest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/ai-ingest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage(data.message);
      setRawText("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const exampleData = `Ramesh Kumar, income 120000 received ration from food department
Ramesh Kumar, filed tax with income 850000 under tax department
Ramesh Kumar, hospital treatment under BPL category health scheme
Ramesh Kumar, applied scholarship income 300000 education department
Sita Devi, income 100000 receiving free ration
Sita Devi, health scheme BPL treatment
Arjun Singh, income 130000 ration benefit
Arjun Singh, tax filed income 600000
Priya Sharma, education scholarship income 280000
Imran Khan, health BPL treatment income 110000
Imran Khan, tax income 400000 filed returns`;

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
                    <Database className="h-5 w-5 stroke-[2.5]" />
                </div>
                <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <h1 className="text-xl font-black italic gold-text-gradient uppercase leading-none tracking-tighter">Soochana Setu</h1>
                    <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.4em] mt-2">Data Management & Ingestion Command</p>
                </motion.div>
            </div>
        </div>

        <div className="hidden md:flex items-center gap-6 border-amber-500/10 pr-10">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">AI Ingester: Active</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Mistral 8x7b-v0.1</span>
            </div>
        </div>
      </nav>

      <div className="container mx-auto px-10 py-20 max-w-7xl relative z-10">
        {/* Particle Accent Background */}
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] pointer-events-none group">
             <Crosshair className="h-[500px] w-[500px] text-amber-500 animate-spin-slow" />
        </div>

        {/* Unified AI Ingest Module: Scroll Reveal Elite */}
        <section className="mb-32">
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card-elite rounded-[4rem] p-20 border-amber-500/10 relative overflow-hidden group shadow-[0_50px_100px_-15px_rgba(0,0,0,1)]"
            >
                <div className="absolute top-0 right-0 p-24 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000 pointer-events-none">
                     <Sparkles className="h-80 w-80 text-amber-500" />
                </div>
                
                <div className="relative z-10 max-w-4xl">
                    <div className="flex items-center gap-3 text-amber-500 mb-10 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20">
                        <Zap className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-none">Intelligent Reality Sync active</span>
                    </div>
                    
                    <motion.h2 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-7xl font-black text-white tracking-tighter leading-tight mb-10"
                    >
                        Deploy <span className="gold-text-gradient italic">Global Ground Truth.</span>
                    </motion.h2>
                    
                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        animate={{ y: [0, -4, 0] }}
                        viewport={{ once: true }}
                        transition={{ 
                            opacity: { delay: 0.4 },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                        }}
                        className="text-amber-100 text-lg font-medium max-w-2xl leading-relaxed mb-16 italic"
                    >
                        Paste semi-structured departmental logs, sentences, or CSV blocks. Our AI analyzes the entropy, identifies the citizens, and cross-links their conflicting "Realities" across all ministries automatically.
                    </motion.p>

                    <form onSubmit={handleAIInjest} className="space-y-12">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="relative group/input"
                        >
                            <div className="absolute inset-0 bg-amber-500/40 rounded-[3rem] blur-3xl opacity-0 group-focus-within/input:opacity-10 transition-opacity" />
                            <textarea 
                                value={rawText}
                                onChange={(e) => setRawText(e.target.value)}
                                placeholder={exampleData}
                                className="w-full h-80 bg-slate-900/40 backdrop-blur-3xl border-2 border-amber-500/10 rounded-[3.5rem] p-12 text-sm font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner relative z-10 font-mono tracking-tight placeholder:text-amber-500/10"
                                required
                            />
                            <div className="absolute top-8 right-12 z-20 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/40 bg-black/50 px-4 py-1.5 rounded-full border border-amber-500/10 opacity-60">AI Intelligence Terminal</div>
                        </motion.div>

                        <div className="flex flex-col md:flex-row items-center justify-between gap-12 pt-6">
                            <div className="flex items-center gap-5 text-amber-100/40">
                                <div className="p-3 bg-amber-500/10 rounded-xl group-hover:scale-110 transition-transform">
                                    <Search className="h-6 w-6 text-amber-500" />
                                </div>
                                <p className="text-[11px] font-bold uppercase tracking-[0.2em] leading-relaxed max-w-sm italic">
                                    Deduplicates by name and resolves conflicting income/category realities across departments in a single sync.
                                </p>
                            </div>
                            <button 
                                type="submit" 
                                disabled={loading || !rawText}
                                className="w-full md:w-auto px-20 py-7 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-sm hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 disabled:bg-slate-800 disabled:text-slate-600"
                            >
                                {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Commence Intelligent Sync <Globe className="h-5 w-5 stroke-[3]" /></>}
                            </button>
                        </div>
                    </form>

                    <AnimatePresence>
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mt-16 bg-amber-500/10 border border-amber-500/20 p-10 rounded-[3rem] text-amber-400 flex items-center gap-8 shadow-4xl shadow-amber-500/5 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-10 opacity-5">
                                    <ShieldCheck className="h-32 w-32" />
                                </div>
                                <div className="bg-amber-500/20 p-5 rounded-2xl shadow-inner relative z-10"><CheckCircle2 className="h-10 w-10" /></div>
                                <div className="space-y-1 relative z-10">
                                    <p className="text-sm font-black uppercase tracking-[0.5em] italic">Ground Truth Synchronized</p>
                                    <p className="text-xs font-bold text-amber-100/60 tracking-wider mt-2">{message}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>

        {/* Global Policy Registry Elite */}
        <section className="space-y-12">
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 px-10"
             >
                <div className="h-1 w-12 bg-amber-500 shadow-[0_0_10px_#d4af37]" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-amber-500 italic">National Policy Registry Master (Central Node)</h3>
             </motion.div>
             <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-card-elite rounded-[4rem] p-4 border-amber-500/5"
             >
                <AdminPolicyTable />
             </motion.div>
        </section>
      </div>

      <footer className="py-40 border-t border-amber-500/10 bg-black">
        <div className="container mx-auto px-10 text-center">
            <p className="text-amber-500 text-[11px] font-black uppercase tracking-[0.8em] leading-relaxed italic opacity-40">
                Soochana Setu &bull; National Intelligence Command &bull; Absolute Integrity Protocol active
            </p>
        </div>
      </footer>
    </main>
  );
}
