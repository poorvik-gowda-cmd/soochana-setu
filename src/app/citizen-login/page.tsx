"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  Loader2, 
  Fingerprint,
  Globe,
  Info,
  ChevronLeft,
  Crosshair,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CitizenLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/citizen-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      sessionStorage.setItem("citizen", JSON.stringify(data));
      router.push("/citizen-dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black font-sans flex items-center justify-center p-6 selection:bg-amber-500/20 relative overflow-hidden">
      {/* Background Neural Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
          <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] text-amber-500 animate-spin-slow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 glass-card-elite rounded-[4rem] shadow-4xl overflow-hidden border border-amber-500/10 min-h-[700px] relative z-10"
      >
        
        {/* Left Side: Elite Branding */}
        <div className="bg-black p-16 lg:p-24 text-white relative flex flex-col justify-between overflow-hidden border-r border-amber-500/10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-20 opacity-[0.03] pointer-events-none group">
                <Globe className="h-[500px] w-[500px] rotate-12 transition-transform duration-[30s] group-hover:rotate-0" />
            </div>
            
            <div className="relative z-10">
                <Link href="/" className="flex items-center gap-4 mb-16 group w-fit">
                    <div className="bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 group-hover:border-amber-500/40 transition-all">
                        <ChevronLeft className="h-5 w-5 text-amber-500 group-hover:-translate-x-1 transition-transform" />
                    </div>
                </Link>
                
                <div className="mb-10">
                    <div className="flex items-center gap-3 text-amber-500 mb-6 bg-amber-500/10 w-fit px-5 py-2 rounded-full border border-amber-500/20">
                        <ShieldCheck className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] leading-none italic">National Data command node</span>
                    </div>
                    <motion.div 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <h1 className="text-6xl font-black italic gold-text-gradient uppercase leading-none tracking-tighter mb-4">Soochana Setu</h1>
                    </motion.div>
                </div>

                <motion.h2 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="text-5xl font-black tracking-tighter leading-[1.1] mb-10"
                >
                    Your Data. <br />
                    Total <span className="gold-text-gradient italic">Transparency.</span>
                </motion.h2>
                
                <p className="text-amber-100/60 text-lg font-medium leading-relaxed max-w-md italic opacity-80">
                    Log in to view your unified government profile and check your eligibility for 100+ state and central schemes monitored by the Strategic Intelligence Division.
                </p>
            </div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="relative z-10 p-10 bg-amber-500/5 rounded-3xl backdrop-blur-3xl border border-amber-500/10 shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-5">
                    <Zap className="h-5 w-5 text-amber-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Access Guidance Protocol</span>
                </div>
                <p className="text-xs font-bold leading-relaxed text-amber-100/40 italic tracking-tight">
                    "Citizens can use their Name or Registered Phone as the username. The password is your unique system UUID found on your digital card or provided via secure ministerial channel."
                </p>
            </motion.div>
        </div>

        {/* Right Side: Elite Login Form */}
        <div className="p-16 lg:p-24 flex flex-col justify-center bg-black/40 backdrop-blur-xl">
            <div className="max-w-md mx-auto w-full">
                <div className="mb-16">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/40 mb-4 italic">
                        <Fingerprint className="h-4 w-4" /> Secure Gateway
                    </div>
                    <h3 className="text-5xl font-black text-white tracking-tighter leading-none italic mb-4">Citizen Entry</h3>
                </div>

                <form onSubmit={handleLogin} className="space-y-10">
                    <div className="space-y-4 group">
                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-2 italic">Registered Profile Hub</label>
                        <div className="relative">
                            <User className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-amber-500/20 group-hover:text-amber-500/50 transition-colors" />
                            <input 
                               type="text"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               placeholder="Registered Phone or Name..."
                               className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2rem] py-7 pl-16 pr-8 text-sm font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner tracking-wide placeholder:text-amber-500/5"
                               required
                            />
                        </div>
                    </div>

                    <div className="space-y-4 group">
                        <label className="text-[11px] font-black uppercase tracking-[0.4em] text-amber-500/40 px-2 italic">Security Cryptographic UUID</label>
                        <div className="relative">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-amber-500/20 group-hover:text-amber-500/50 transition-colors" />
                            <input 
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="Enter 32-character ID..."
                               className="w-full bg-slate-900/60 border-2 border-amber-500/10 rounded-[2rem] py-7 pl-16 pr-8 text-sm font-black text-amber-100 focus:outline-none focus:border-amber-500/40 transition-all shadow-inner tracking-widest placeholder:text-amber-500/5"
                               required
                            />
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-[2rem] py-7 font-black uppercase tracking-[0.3em] text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-amber-500/20 flex items-center justify-center gap-4 disabled:bg-slate-800 disabled:text-slate-600"
                        >
                            {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <>Commence Biometric Sync <ArrowRight className="h-5 w-5 stroke-[3]" /></>}
                        </button>
                    </div>
                    
                    <AnimatePresence>
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-rose-500/10 border border-rose-500/20 p-5 rounded-2xl text-rose-400 text-[10px] font-black uppercase tracking-[0.2em] text-center shadow-4xl shadow-rose-500/5"
                            >
                                {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>

                <div className="mt-16 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/20 leading-relaxed italic">
                        Securing National Sovereignty through Unified Truth <br />
                        <span className="opacity-40 mt-3 inline-block">Protocol v2.4.0 &bull; 0x7E2A</span>
                    </p>
                </div>
            </div>
        </div>
      </motion.div>
    </main>
  );
}
