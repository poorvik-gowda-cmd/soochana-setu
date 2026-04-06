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
            <h3 className="text-3xl font-black text-white tracking-tight leading-tight mb-4">
                Policy <span className="text-[#C6A052] underline underline-offset-4 decoration-[#C6A052]/30">Eligibility Analysis</span>
            </h3>
            <p className="text-sm font-medium text-[#A1A1AA] leading-relaxed italic">
                "Using Mistral AI Large to synthesize disparate departmental data and simulate real-time eligibility across 20+ government schemes."
            </p>
        </div>

        <button 
          onClick={handleEvaluate}
          disabled={evaluating}
          className="flex items-center gap-3 px-8 py-4 bg-[rgba(198,160,82,0.1)] text-[#C6A052] border border-[#C6A052]/20 rounded-[20px] font-black uppercase tracking-widest text-xs hover:bg-[rgba(198,160,82,0.2)] transition-all shadow-[0_0_20px_rgba(198,160,82,0.1)] disabled:opacity-50"
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
            className="p-16 border border-dashed border-[rgba(198,160,82,0.3)] rounded-[3rem] text-center bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px]"
          >
             <div className="bg-[rgba(198,160,82,0.1)] p-4 rounded-full w-fit mx-auto mb-6 animate-bounce shadow-[0_0_40px_rgba(198,160,82,0.2)]">
                <Sparkles className="h-10 w-10 text-[#C6A052]" />
             </div>
             <h4 className="text-xl font-black text-white tracking-tight leading-none mb-3">Consulting Judicial Core</h4>
             <p className="text-xs font-black text-[#A1A1AA] uppercase tracking-widest animate-pulse max-w-sm mx-auto leading-relaxed">
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
             <div className="lg:col-span-8">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] mb-6">Eligibility Projections</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {result.eligibility.map((e, i) => (
                    <motion.div 
                        key={i}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] border border-[rgba(198,160,82,0.15)] p-6 rounded-[20px] shadow-[0_0_40px_rgba(198,160,82,0.08)] group relative flex flex-col gap-4"
                    >
                        {e.percentage > 70 && (
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-125 transition-transform">
                                <CheckCircle2 className="h-12 w-12 text-[#C6A052]" />
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                            <div className="flex items-start gap-3">
                                <div className="p-2 rounded-xl bg-[rgba(198,160,82,0.1)] text-[#C6A052] border border-[rgba(198,160,82,0.2)]">
                                    {e.percentage > 70 ? <CheckCircle2 className="h-5 w-5" /> : <AlertTriangle className="h-5 w-5" />}
                                </div>
                                <div>
                                    <h6 className="text-[9px] font-black uppercase tracking-widest text-[#A1A1AA] mb-1">{e.department}</h6>
                                    <p className="text-md font-black text-white tracking-tight">{e.scheme}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center mt-2 md:mt-0">
                                <span className="bg-[rgba(198,160,82,0.1)] text-[#C6A052] px-3 py-1 rounded-full text-sm font-black border border-[#C6A052]/20 shadow-[0_0_15px_rgba(198,160,82,0.1)]">
                                    {e.percentage}%
                                </span>
                            </div>
                        </div>
                        
                        <div className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] p-4 rounded-xl mt-auto">
                             <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase tracking-widest text-[#C6A052]">
                                 <Brain className="h-3 w-3" /> Comprehensive Reasoning
                             </div>
                             <p className="text-sm text-[#A1A1AA] font-medium leading-relaxed italic">
                                 "{e.reason}"
                             </p>
                        </div>
                    </motion.div>
                ))}
                </div>
             </div>

             <div className="lg:col-span-4 flex flex-col gap-8">
                <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] border border-[rgba(198,160,82,0.15)] shadow-[0_0_40px_rgba(198,160,82,0.08)] rounded-[3rem] p-10 text-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000 text-[#C6A052]">
                        <Target className="h-32 w-32" />
                    </div>
                    <div className="flex items-center gap-3 text-[#C6A052] mb-8 relative z-10">
                        <Scan className="h-5 w-5" />
                        <h5 className="text-[10px] font-black uppercase tracking-widest">Global Intelligence Synthesis</h5>
                    </div>
                    <p className="text-xl font-black leading-[1.4] mb-8 text-white tracking-tight relative z-10">
                        "{result.summary}"
                    </p>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden mb-3 relative z-10">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${result.overall_confidence}%` }}
                            className="h-full bg-gradient-to-r from-[rgba(198,160,82,0.5)] to-[#C6A052]"
                        />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#A1A1AA] relative z-10">
                         <span>AI Analysis Confidence</span>
                         <span className="text-[#C6A052]">{result.overall_confidence}%</span>
                    </div>
                </div>

                <div className="p-8 bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] border border-[rgba(198,160,82,0.15)] shadow-[0_0_40px_rgba(198,160,82,0.08)] rounded-[20px] text-[#A1A1AA]">
                    <div className="flex items-center gap-3 mb-4 text-[#C6A052]">
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
