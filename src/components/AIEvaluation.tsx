"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Loader2, Target, CheckCircle2, AlertTriangle, AlertCircle, Scan } from "lucide-react";
import { UnifiedProfile, AIEvaluationResponse } from "@/lib/types";

export function AIEvaluation({ profile }: { profile: UnifiedProfile }) {
  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState<AIEvaluationResponse | null>(null);

  const handleEvaluate = async () => {
    setEvaluating(true);
    setResult(null);

    try {
      const res = await fetch("/api/ai-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (res.ok) setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="max-w-xl">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Policy <span className="text-indigo-600 underline underline-offset-4 decoration-indigo-100">Eligibility Analysis</span>
            </h3>
            <p className="text-sm font-medium text-slate-500 leading-relaxed italic">
                "Using Mistral AI Large to synthesize disparate departmental data and simulate real-time eligibility across 20+ government schemes."
            </p>
        </div>

        <button 
          onClick={handleEvaluate}
          disabled={evaluating}
          className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:bg-slate-200"
        >
          {evaluating ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Evaluating Nodes...</>
          ) : (
            <><Brain className="h-4 w-4" /> Run AI Synthesizer</>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {evaluating && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-16 border-2 border-dashed border-slate-200 rounded-[3rem] text-center bg-white"
          >
             <div className="bg-indigo-50 p-4 rounded-full w-fit mx-auto mb-6 animate-bounce">
                <Sparkles className="h-10 w-10 text-indigo-600" />
             </div>
             <h4 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-3">Consulting Judicial Core</h4>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse max-w-sm mx-auto leading-relaxed">
                Cross-referencing food, tax, and health silos with latest judicial policy mandates.
             </p>
          </motion.div>
        )}

        {result && (
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
             <div className="lg:col-span-8 space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Eligibility Projections</h5>
                {result.eligibility.map((e, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
                    >
                        {e.percentage > 70 && (
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                                <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${e.percentage > 70 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                    {e.percentage > 70 ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h6 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{e.department}</h6>
                                    <p className="text-md font-black text-slate-900 tracking-tight">{e.scheme}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-8">
                                <div className="text-right">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Percentage Match</p>
                                    <p className={`text-xl font-black ${e.percentage > 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
                                        {e.percentage}%
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-slate-100 bg-slate-50/50 p-6 rounded-2xl">
                             <div className="flex items-center gap-2 mb-3 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                                 <Brain className="h-4 w-4" /> Comprehensive Reasoning
                             </div>
                             <p className="text-lg text-slate-900 font-bold leading-relaxed italic">
                                 "{e.reason}"
                             </p>
                        </div>
                    </motion.div>
                ))}
             </div>

             <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                        <Target className="h-32 w-32" />
                    </div>
                    <div className="flex items-center gap-3 text-indigo-400 mb-8">
                        <Scan className="h-5 w-5" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Global Intelligence Synthesis</h5>
                    </div>
                    <p className="text-xl font-black leading-[1.4] mb-8 text-indigo-50 tracking-tight">
                        "{result.summary}"
                    </p>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mb-3">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.overall_confidence}%` }}
                            className="h-full bg-indigo-500"
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                         <span>AI Analysis Confidence</span>
                         <span className="text-indigo-400">{result.overall_confidence}%</span>
                    </div>
                </div>

                <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100 text-indigo-900">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertCircle className="h-5 w-5" />
                        <h6 className="text-[10px] font-black uppercase tracking-widest">Advisory Note</h6>
                    </div>
                    <p className="text-xs font-black leading-relaxed uppercase tracking-widest opacity-60">
                        The above analysis is a simulated projection based on current data snapshots. Final approval remains with the respective ministry boards.
                    </p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
