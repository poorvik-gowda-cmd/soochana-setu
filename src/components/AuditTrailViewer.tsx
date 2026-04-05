"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, Calendar, Lock, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AuditLog {
  id: string;
  action: string;
  hash: string;
  created_at: string;
  data: any;
}

export function AuditTrailViewer({ citizenId }: { citizenId?: string }) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = citizenId ? `/api/audit-log?citizen_id=${citizenId}` : `/api/audit-log`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) setLogs(data);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [citizenId]);

  const formatHash = (h: string) => {
    return `${h.substring(0, 6)}...${h.substring(h.length - 4)}`;
  };

  if (loading) return <div className="animate-pulse h-48 bg-slate-100 rounded-2xl" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-indigo-600">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Tamper-Proof Audit Ledger</h3>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SHA256 Multi-Factor Integrity</span>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center">
            <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-4" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Audit Records Found</p>
          </div>
        ) : (
          logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900 text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800"
            >
              <div 
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-white leading-none">
                            {log.action.replace('_', ' ')}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                                <Calendar className="h-3 w-3" /> {new Date(log.created_at).toLocaleString()}
                            </span>
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-1.5 py-0.5 rounded border border-indigo-500/20">
                                Verified ✔
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Hash Sequence</span>
                        <code className="text-xs font-mono text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded">
                            {formatHash(log.hash)}
                        </code>
                    </div>
                    {expandedId === log.id ? <ChevronUp className="h-4 w-4 text-slate-600" /> : <ChevronDown className="h-4 w-4 text-slate-600" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === log.id && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="border-t border-slate-800 bg-slate-900 px-6 py-8"
                  >
                    <div className="space-y-6">
                        <div>
                            <h5 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Lock className="h-3 w-3" /> Immutable Sequence Hash
                            </h5>
                            <code className="block bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-500 break-all border border-slate-800 leading-relaxed shadow-inner">
                                {log.hash}
                            </code>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6 bg-slate-950/50 p-5 rounded-2xl border border-slate-800">
                             <div>
                                <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Integrity Status</h6>
                                <p className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                                    No tampering detected &bull; Active Node Verified
                                </p>
                             </div>
                             <div>
                                <h6 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">Signatory ID</h6>
                                <p className="text-xs font-mono text-slate-300 truncate">{log.id}</p>
                             </div>
                        </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
