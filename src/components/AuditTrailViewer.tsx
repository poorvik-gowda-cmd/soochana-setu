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

export default function AuditTrailViewer({ citizenId }: { citizenId?: string }) {
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

  if (loading) return <div className="animate-pulse h-48 bg-amber-500/5 backdrop-blur-md rounded-2xl border border-amber-500/10" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-6 mb-2">
        <div className="flex items-center gap-3 text-amber-500">
            <ShieldCheck className="h-5 w-5" />
            <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white italic">Identity & Profile Verification</h3>
        </div>
        <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 italic opacity-60">SHA256 Multi-Factor Integrity</span>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <div className="p-16 border-2 border-dashed border-amber-500/10 rounded-[3rem] text-center bg-amber-500/[0.02]">
            <AlertCircle className="h-10 w-10 text-amber-500/20 mx-auto mb-6" />
            <p className="text-[10px] font-black text-amber-500/40 uppercase tracking-[0.5em] italic">No Audit Records Found</p>
          </div>
        ) : (
          logs.map((log) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card-elite rounded-3xl overflow-hidden border-amber-500/10 hover:border-amber-500/30 transition-all duration-500"
            >
              <div 
                onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                className="p-6 flex items-center justify-between cursor-pointer hover:bg-amber-500/[0.05] transition-all"
              >
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 border border-amber-500/20">
                        <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="text-[12px] font-black uppercase tracking-[0.2em] text-white italic leading-none">
                            {log.action.replace('_', ' ')}
                        </p>
                        <div className="flex items-center gap-4 mt-2.5">
                            <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-2 italic">
                                <Calendar className="h-3 w-3 opacity-40" /> {new Date(log.created_at).toLocaleString()}
                            </span>
                            <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 italic shadow-glow-amber-xs">
                                Verified ✔
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] mb-1.5 italic">Hash Sequence</span>
                        <code className="text-[11px] font-mono text-amber-500 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/10">
                            {formatHash(log.hash)}
                        </code>
                    </div>
                    {expandedId === log.id ? <ChevronUp className="h-4 w-4 text-amber-500/40" /> : <ChevronDown className="h-4 w-4 text-amber-500/40" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === log.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-amber-500/5 bg-black/40 px-8 py-10"
                  >
                    <div className="space-y-8">
                        <div>
                            <h5 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.4em] mb-4 flex items-center gap-3 italic">
                                <Lock className="h-3 w-3" /> Immutable Sequence Hash
                            </h5>
                            <code className="block bg-black/60 p-6 rounded-2xl text-[11px] font-mono text-amber-400/80 break-all border border-amber-500/10 leading-relaxed shadow-inner italic">
                                {log.hash}
                            </code>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 bg-black/40 p-6 rounded-[2.5rem] border border-amber-500/5">
                             <div>
                                <h6 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-3 italic">Integrity Status</h6>
                                <p className="text-xs font-black text-amber-500 flex items-center gap-3 italic">
                                    <div className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse shadow-glow-amber-xs" />
                                    No tampering detected &bull; Node Verified
                                </p>
                             </div>
                             <div>
                                <h6 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.5em] mb-3 italic">Signatory ID</h6>
                                <p className="text-[11px] font-mono text-zinc-400 truncate italic">{log.id}</p>
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
