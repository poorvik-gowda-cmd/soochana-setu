"use client";

import { AlertTriangle, Info, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { CitizenPortalResult } from "@/lib/types";

export function CitizenAIInsightPanel({ result }: { result: CitizenPortalResult }) {
  const hasConflicts = result.eligible_policies.some(p => p.status === "Not Eligible" || p.status === "Partial");
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl p-8 border shadow-sm ${hasConflicts ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"}`}
    >
      <div className="flex gap-6">
        <div className={`p-3 rounded-full h-fit border shadow-md ${hasConflicts ? "bg-rose-100 text-rose-600 border-rose-200" : "bg-emerald-100 text-emerald-600 border-emerald-200"}`}>
          {hasConflicts ? <AlertTriangle className="h-8 w-8" /> : <CheckCircle2 className="h-8 w-8" />}
        </div>
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
                <Sparkles className={`h-4 w-4 ${hasConflicts ? "text-rose-400" : "text-emerald-400"}`} />
                <h4 className={`text-sm font-black uppercase tracking-[0.2em] ${hasConflicts ? "text-rose-900" : "text-emerald-900"}`}>
                    AI Data Synthesis & Guidance
                </h4>
            </div>
            
            <p className={`text-xl font-medium leading-relaxed font-serif italic ${hasConflicts ? "text-rose-800" : "text-emerald-800"}`}>
                "{result.summary}"
            </p>

            {hasConflicts && (
                <div className="mt-4 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-rose-200">
                    <h5 className="text-xs font-black text-rose-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Info className="h-3 w-3" /> Key Discrepancies Detected
                    </h5>
                    <ul className="text-sm text-rose-800 space-y-2 list-disc pl-4 leading-relaxed">
                        <li>Data fragmentation across departments is leading to eligibility conflicts.</li>
                        <li>High reported income in certain ministries is disqualifying you from BPL/Poor category benefits in others.</li>
                        <li>Action Recommended: Consolidate your income declarations across Food and Tax departments to unify your profile status.</li>
                    </ul>
                </div>
            )}
        </div>
      </div>
    </motion.div>
  );
}
