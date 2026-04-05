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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <AlertTriangle className="h-5 w-5 text-rose-500" />
        <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Conflict Telemetry</h3>
      </div>

      <div className="space-y-4">
        {conflicts.length === 0 ? (
          <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-4">
            <div className="bg-emerald-100 p-2 rounded-full"><AlertCircle className="h-4 w-4 text-emerald-600" /></div>
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest">No structural conflicts detected.</p>
          </div>
        ) : (
          conflicts.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-xl border flex gap-6 ${
                c.severity === 'High' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'
              }`}
            >
              <div className={`p-3 h-fit rounded-full ${
                c.severity === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
              }`}>
                {c.severity === 'High' ? <AlertTriangle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
              </div>
              <div>
                <h4 className={`text-[10px] font-black uppercase tracking-widest mb-1 ${
                  c.severity === 'High' ? 'text-rose-900' : 'text-amber-900'
                }`}>{c.type}</h4>
                <p className={`text-sm font-medium ${
                  c.severity === 'High' ? 'text-rose-700' : 'text-amber-700'
                }`}>{c.description}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
