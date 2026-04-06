"use client";

import { motion } from "framer-motion";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { DepartmentRecord } from "@/lib/types";

export function ConflictDetection({ records }: { records: DepartmentRecord[] }) {
  const conflicts = [];
  const incomeValues = records.map(r => r.income);
  const categories = records.map(r => r.category);

  const maxIncome = Math.max(...incomeValues);
  const minIncome = Math.min(...incomeValues);

  if (maxIncome - minIncome > 500000) {
    conflicts.push({
      type: "Income Mismatch",
      description: `Significant income variance detected across departments: ₹${minIncome.toLocaleString()} vs ₹${maxIncome.toLocaleString()}.`,
      severity: "High"
    });
  }

  if (new Set(categories).size > 1) {
    conflicts.push({
      type: "Category Conflict",
      description: `Inconsistent economic status: User is marked as both '${categories[0]}' and '${categories[1] || ''}' in different ministries.`,
      severity: "Medium"
    });
  }

  return (
    <div className="bg-[rgba(15,15,25,0.65)] backdrop-blur-[14px] rounded-2xl border border-[rgba(198,160,82,0.15)] shadow-[0_0_40px_rgba(198,160,82,0.08)] p-8">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-5 w-5 text-[#C6A052]" />
        <h3 className="text-sm font-black uppercase tracking-widest text-white italic">Conflict Telemetry</h3>
      </div>

      <div className="space-y-4">
        {conflicts.length === 0 ? (
          <div className="p-6 bg-[rgba(16,185,129,0.08)] border border-[rgba(16,185,129,0.3)] rounded-xl flex items-center gap-4">
            <div className="bg-[rgba(16,185,129,0.1)] p-2 rounded-full"><AlertCircle className="h-4 w-4 text-emerald-500" /></div>
            <p className="text-xs font-black text-emerald-500 uppercase tracking-widest">No structural conflicts detected.</p>
          </div>
        ) : (
          conflicts.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl border flex gap-6 ${
                c.severity === 'High' 
                ? 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.3)]' 
                : 'bg-[rgba(245,158,11,0.08)] border-[rgba(245,158,11,0.3)]'
              }`}
            >
              <div className={`p-3 h-fit rounded-full ${
                c.severity === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {c.severity === 'High' ? <AlertTriangle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
              </div>
              <div>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                  c.severity === 'High' ? 'text-rose-500' : 'text-amber-500'
                }`}>{c.type}</h4>
                <p className={`text-sm font-medium ${
                  c.severity === 'High' ? 'text-rose-200/70' : 'text-amber-200/70'
                }`}>{c.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
