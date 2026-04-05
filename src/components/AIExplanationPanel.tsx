"use client";

import { Brain, Quote, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AIEvaluationResponse } from "@/lib/types";

export function AIExplanationPanel({ evaluation }: { evaluation: AIEvaluationResponse }) {
  return (
    <div className="flex flex-col gap-6">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-indigo-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Brain className="h-32 w-32" />
            </div>
            
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-indigo-500/20 backdrop-blur-md rounded-lg border border-indigo-400/30">
                        <Sparkles className="h-5 w-5 text-indigo-300" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-300">Artificial Intelligence Synthesis</span>
                </div>

                <div className="flex gap-4">
                    <Quote className="h-8 w-8 text-indigo-400 shrink-0" />
                    <p className="text-xl md:text-2xl font-medium leading-relaxed font-serif italic text-indigo-50">
                        "{evaluation.summary}"
                    </p>
                </div>
            </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {evaluation.eligibility.map((item, idx) => (
                <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.department}</span>
                            <h4 className="text-lg font-bold text-slate-900">{item.scheme}</h4>
                        </div>
                        <div className={`text-2xl font-black ${item.percentage >= 70 ? 'text-emerald-600' : item.percentage >= 40 ? 'text-amber-500' : 'text-rose-600'}`}>
                            {item.percentage}%
                        </div>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {item.reason}
                    </p>
                </motion.div>
            ))}
        </div>
    </div>
  );
}

export function ConfidenceScore({ score }: { score: number }) {
    return (
        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg border border-slate-800">
            <h3 className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Brain className="h-3 w-3" /> AI Confidence
            </h3>
            <div className="flex items-end gap-2 mb-2">
                <span className="text-4xl font-black leading-none">{score}%</span>
                <span className="text-xs font-bold text-slate-500 uppercase pb-1">Confidence</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${score > 80 ? 'bg-indigo-500' : 'bg-amber-500'}`}
                />
            </div>
            <p className="mt-4 text-slate-500 text-[10px] font-bold uppercase tracking-wider leading-relaxed">
                Reliability of decision based on data conflicts across ministerial silos.
            </p>
        </div>
    )
}
