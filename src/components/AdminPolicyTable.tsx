"use client";

import { useEffect, useState } from "react";
import { Policy } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { Landmark, Globe, CheckCircle2, Shield, Loader2, Coins, UserCircle } from "lucide-react";
import { motion } from "framer-motion";

export function AdminPolicyTable() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const { data, error } = await supabase.from("policies").select("*").order("department");
        if (error) throw error;
        setPolicies(data || []);
      } catch (err) {
        console.error("Policy fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  if (loading) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-slate-100 italic text-slate-400">
      <Loader2 className="h-10 w-10 text-indigo-200 animate-spin" />
      Synchronizing Ground Truth...
    </div>
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden group">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3 text-indigo-600">
                <Shield className="h-5 w-5" />
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">National Policy Registry</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100">
                Found {policies.length} Active Mandates
            </span>
        </div>
        
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-white border-b border-slate-100">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Department</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Name</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rule Type</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Min Income</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Max Income</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Target Category</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {policies.map((p: Policy, idx: number) => (
                        <motion.tr 
                          key={p.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="hover:bg-slate-50/50 transition-colors group/row"
                        >
                            <td className="px-8 py-5">
                                <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{p.department}</span>
                            </td>
                            <td className="px-8 py-5">
                                <div className="text-sm font-bold text-slate-900 group-hover/row:text-indigo-600 transition-colors">{p.scheme}</div>
                                <div className="text-[10px] text-slate-400 font-medium italic truncate max-w-[150px]">{p.eligibility_rules}</div>
                            </td>
                            <td className="px-8 py-5">
                                <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[9px] font-black uppercase tracking-widest ${
                                    p.type === 'Central' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                }`}>
                                    {p.type === 'Central' ? <Globe className="h-3 w-3" /> : <Landmark className="h-3 w-3" />}
                                    {p.type}
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold">
                                    <Coins className="h-3 w-3" /> ₹{(p.min_income || 0).toLocaleString()}
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2 text-slate-900 text-xs font-black">
                                     ₹{(p.max_income || 10000000).toLocaleString()}
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2">
                                     <UserCircle className="h-3 w-3 text-slate-300" />
                                     <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{p.required_category || 'All'}</span>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="h-2 w-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="Active Mandate" />
                            </td>
                        </motion.tr>
                    ))}
                </tbody>
            </table>

            {policies.length === 0 && (
                <div className="p-20 text-center flex flex-col items-center gap-4 border-t border-slate-100">
                    <Shield className="h-12 w-12 text-slate-100" />
                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest italic">Registry Empty. Upload policies to begin intelligence sync.</p>
                </div>
            )}
        </div>
    </div>
  );
}
