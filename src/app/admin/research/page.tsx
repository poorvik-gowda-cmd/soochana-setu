"use client";

import { useState, useEffect } from "react";
import { 
  Search, 
  Loader2, 
  Database, 
  ShieldCheck, 
  AlertCircle, 
  Map, 
  ArrowLeft,
  Zap,
  Fingerprint,
  Activity,
  Crosshair,
  Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CitizenCard } from "@/components/CitizenCard";
import { TruthScore } from "@/components/TruthScore";
import { RealityTable } from "@/components/RealityTable";
import { ConflictDetection } from "@/components/ConflictDetection";
import { AIEvaluation } from "@/components/AIEvaluation";
import { UnifiedProfile } from "@/lib/types";

import { Suspense } from "react";

function ResearchContent() {
  const [identifier, setIdentifier] = useState("");
  const [profile, setProfile] = useState<UnifiedProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle initial search from URL
  useEffect(() => {
    const urlIdentifier = searchParams.get("identifier");
    if (urlIdentifier) {
      setIdentifier(urlIdentifier);
      performSearch(urlIdentifier);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setProfile(null);

    try {
      const res = await fetch(`/api/citizen-profile?identifier=${query}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Citizen not found in National Registry");
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier) return;
    performSearch(identifier);
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
                    <Search className="h-5 w-5 stroke-[2.5]" />
                </div>
                <motion.div 
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <h1 className="text-xl font-black italic gold-text-gradient uppercase leading-none tracking-tighter">Soochana Setu</h1>
                    <p className="text-[10px] font-black text-amber-500/60 uppercase tracking-[0.4em] mt-2">Forensic Identity & Reality Analysis</p>
                </motion.div>
            </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-right">
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Neural Sync: Active</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5 italic">Protocol 0x7F2A</span>
            </div>
            <Activity className="h-4 w-4 text-amber-500 animate-pulse" />
        </div>
      </nav>

      <div className="container mx-auto px-10 py-24 max-w-7xl relative z-10">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 p-40 opacity-[0.03] pointer-events-none group">
             <Fingerprint className="h-[500px] w-[500px] text-amber-500 animate-pulse" />
        </div>

        {/* Elite Search Section: Scroll Reveal */}
        <motion.section 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: [0, -6, 0] }}
            transition={{ 
                opacity: { duration: 0.8 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
            className="mb-24"
        >
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto group">
                <div className="absolute inset-0 bg-amber-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                <div className="relative">
                    <input 
                        type="text" 
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Search Identity (Name, Aadhaar, Phone)..."
                        className="w-full h-24 pl-16 pr-56 rounded-[2.5rem] border-2 border-amber-500/10 bg-slate-900/40 backdrop-blur-3xl text-2xl font-black text-amber-100 placeholder:text-amber-500/10 focus:outline-none focus:border-amber-500/40 focus:ring-0 transition-all shadow-4xl group-hover:border-amber-500/20"
                    />
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-8 w-8 text-amber-500/40 animate-pulse" />
                    <button 
                        type="submit"
                        disabled={loading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-18 px-10 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:scale-[1.05] active:scale-[0.95] disabled:bg-slate-800 disabled:text-slate-600 shadow-2xl transition-all flex items-center justify-center gap-3"
                    >
                        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Initiate Audit"}
                    </button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-8">
                    <p className="text-[10px] font-black text-amber-500/30 uppercase tracking-[0.5em] flex items-center gap-4 italic">
                        <Sparkles className="h-3 w-3" /> Samples:
                        <button type="button" onClick={() => setIdentifier("Ramesh")} className="text-amber-500/60 hover:text-amber-500 transition-colors border-b border-amber-500/20">Ramesh</button>
                        <button type="button" onClick={() => setIdentifier("Sita")} className="text-amber-500/60 hover:text-amber-500 transition-colors border-b border-amber-500/20">Sita</button>
                    </p>
                </div>
            </form>
        </motion.section>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-rose-500/10 border border-rose-500/20 p-10 rounded-[2.5rem] text-rose-400 flex items-center gap-8 shadow-4xl shadow-rose-500/5 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-10 opacity-5">
                  <AlertCircle className="h-32 w-32" />
              </div>
              <div className="bg-rose-500/20 p-4 rounded-2xl relative z-10">
                  <AlertCircle className="h-10 w-10" />
              </div>
              <div className="relative z-10">
                  <h4 className="font-black text-sm uppercase tracking-[0.3em] leading-none italic">Analysis Violation</h4>
                  <p className="text-sm mt-3 opacity-80 italic tracking-tight">{error}</p>
              </div>
            </motion.div>
          )}

          {profile && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-24"
            >
              {/* Profile Overview Matrix */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative">
                {/* Visual Connector Line */}
                <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent z-0" />

                <div className="lg:col-span-4 flex flex-col gap-12 relative z-10">
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-4 text-amber-500 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20"
                    >
                        <Database className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Identity core node</span>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                       <CitizenCard citizen={profile.citizen} />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="glass-card-elite rounded-[3rem] p-1 border-amber-500/5 shadow-2xl"
                    >
                       <TruthScore score={profile.truth_score} />
                    </motion.div>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-12 relative z-10">
                     <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-amber-500 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20"
                     >
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Reality conflict telemetry</span>
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="glass-card-elite rounded-[3.5rem] p-2 border-amber-500/5 shadow-3xl"
                    >
                        <RealityTable records={profile.records} />
                    </motion.div>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="glass-card-elite rounded-[3rem] p-10 border-amber-500/10 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute -bottom-10 -right-10 opacity-[0.03]">
                            <Crosshair className="h-40 w-40 text-amber-500" />
                        </div>
                        <ConflictDetection records={profile.records} />
                    </motion.div>
                </div>
              </div>

              {/* AI Policy Evaluation Area: Scroll Reveal Massive */}
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="pt-24 border-t border-amber-500/10 relative"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-black border border-amber-500/10 rounded-full shadow-2xl text-amber-500 animate-bounce">
                    <Zap className="h-6 w-6 stroke-[3]" />
                </div>
                <AIEvaluation profile={profile} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <footer className="py-40 border-t border-amber-500/10 bg-black relative z-10">
        <div className="container mx-auto px-10 text-center">
            <p className="text-amber-500/40 text-[11px] font-black uppercase tracking-[0.8em] leading-relaxed italic">
                Soochana Setu &bull; National Data Command Hub &bull; Strategic Intelligence Division
            </p>
        </div>
      </footer>
    </main>
  );
}

export default function AdminResearch() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-amber-500 animate-spin" />
      </div>
    }>
      <ResearchContent />
    </Suspense>
  );
}
