"use client";

import { AlertTriangle, Info } from "lucide-react";
import { motion } from "framer-motion";

export function InsightBox({ conflicts }: { conflicts: string[] }) {
  const hasConflicts = conflicts.length > 0;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-6 border ${hasConflicts ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"}`}
    >
      <div className="flex gap-4">
        <div className={`p-2 rounded-full h-fit ${hasConflicts ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"}`}>
          {hasConflicts ? <AlertTriangle className="h-6 w-6" /> : <Info className="h-6 w-6" />}
        </div>
        <div className="flex flex-col gap-2">
            <h4 className={`text-lg font-bold ${hasConflicts ? "text-rose-900" : "text-emerald-900"}`}>
                {hasConflicts ? "Critical Data Inconsistency Detected" : "Data Integrity Verified"}
            </h4>
            <p className={`text-md leading-relaxed ${hasConflicts ? "text-rose-800" : "text-emerald-800"}`}>
                {hasConflicts 
                    ? "This citizen exists in multiple economic realities across departments, indicating a severe lack of data synchronization and potential identity fragmentation." 
                    : "Data across multiple departments shows perfect alignment. The citizen's profile is unified and synchronized across ministries."}
            </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ConflictBadges({ conflicts }: { conflicts: string[] }) {
    if (conflicts.length === 0) return null;
    return (
        <div className="flex flex-wrap gap-2">
            {conflicts.map((conflict, index) => (
                <span key={index} className="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded shadow-sm flex items-center gap-1.5 animate-pulse">
                    <AlertTriangle className="h-3 w-3" /> {conflict}
                </span>
            ))}
        </div>
    )
}
