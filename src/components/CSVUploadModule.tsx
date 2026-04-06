"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle, Info, Database, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CSVUploadModule() {
  const [file, setFile] = useState<File | null>(null);
  const [type, setType] = useState<"citizens" | "records" | "policies">("records");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvData = e.target?.result as string;

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, csvData }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setResult(data);
      };
      reader.readAsText(file);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 w-full">
      <div className="flex items-center gap-3 text-amber-500 mb-8 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20">
        <Database className="h-4 w-4" />
        <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-none">Bulk Data Command</span>
      </div>

      <h2 className="text-4xl font-black text-white tracking-tighter leading-tight mb-8">
        CSV <span className="gold-text-gradient italic">Ingestion Matrix.</span>
      </h2>

      <div className="space-y-8">
        {/* Type Selector */}
        <div className="flex flex-wrap gap-4">
          {(["citizens", "records", "policies"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${type === t
                  ? "bg-amber-500 text-black border-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  : "bg-slate-900/40 text-amber-500/40 border-amber-500/10 hover:border-amber-500/30"
                }`}
            >
              {t === "records" ? "Departmental Records" : t}
            </button>
          ))}
        </div>

        {/* Dropzone */}
        <div className="relative group/drop">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
          />
          <div className={`h-48 rounded-[2.5rem] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-4 ${file ? "border-amber-500/40 bg-amber-500/5" : "border-amber-500/10 bg-black/20 group-hover/drop:border-amber-500/30 group-hover/drop:bg-amber-500/5"
            }`}>
            <Upload className={`h-10 w-10 ${file ? "text-amber-500" : "text-amber-500/20"}`} />
            <div className="text-center">
              <p className="text-xs font-black text-amber-100 uppercase tracking-widest">
                {file ? file.name : "Select Command CSV"}
              </p>
              <p className="text-[9px] font-bold text-amber-500/40 uppercase tracking-[0.2em] mt-2">
                {file ? `${(file.size / 1024).toFixed(1)} KB` : "Drop or Click to browse"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpload}
          disabled={loading || !file}
          className="w-full py-6 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-20 shadow-xl"
        >
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Execute Batch Upload <FileText className="h-4 w-4 stroke-[3]" /></>}
        </button>

        {/* Results/Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-4 shadow-xl"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{error}</span>
            </motion.div>
          )}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-4 shadow-xl"
            >
              <CheckCircle2 className="h-5 w-5" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{result.message}</span>
                <div className="flex gap-4 mt-2">
                  <span className="text-[8px] font-bold text-emerald-500/60 uppercase">+ {result.summary.added} Added</span>
                  <span className="text-[8px] font-bold text-rose-500/60 uppercase">! {result.summary.skipped} Skipped</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-start gap-3 opacity-40">
          <Info className="h-3 w-3 text-amber-500 mt-0.5" />
          <p className="text-[9px] font-medium text-amber-100/60 italic leading-relaxed">
            Relational mapping enabled: Ingesting 'Records' will automatically resolve and link Citizen identities based on Aadhaar or common name entropy.
          </p>
        </div>
      </div>
    </div>
  );
}
