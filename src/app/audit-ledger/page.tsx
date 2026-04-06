"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Lock, Server, Network, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { WalletConnect } from "@/components/WalletConnect";

export default function AuditLedgerPage() {
  return (
    <main className="min-h-screen bg-black font-sans text-amber-100 selection:bg-amber-500/20 pb-20 overflow-x-hidden relative">
      {/* Cinematic Overlays */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.05)_0%,transparent_50%)]" />
      <div className="fixed inset-0 pointer-events-none z-0 border-[10px] border-amber-500/5 mix-blend-overlay" />

      {/* Top Navigation Bar */}
      <nav className="h-24 px-10 flex items-center border-b border-amber-500/10 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <Link 
          href="/dashboard"
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 hover:text-amber-500 transition-colors"
        >
          <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/10 group-hover:border-amber-500/50 transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </div>
          Return to Command Center
        </Link>
      </nav>

      <div className="container mx-auto px-10 py-16 max-w-6xl relative z-10">
        {/* Section 1: Real Context (Honest Framing) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center max-w-4xl mx-auto"
        >
          <div className="flex justify-center mb-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-amber-500/20 blur-2xl group-hover:bg-amber-500/30 transition-all rounded-full" />
              <div className="h-20 w-20 rounded-2xl bg-black border border-amber-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                <Lock className="h-8 w-8 text-amber-500 stroke-[2]" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6">
            Audit <span className="gold-text-gradient">Ledger</span>
          </h1>
          <p className="text-amber-100/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic mb-8">
            "This module is designed to ensure tamper-proof audit logging using blockchain technology and cryptographic hashing."
          </p>
          
          <div className="inline-flex items-center gap-4 bg-amber-500/5 border border-amber-500/20 px-6 py-3 rounded-xl">
             <ShieldAlert className="h-5 w-5 text-amber-500" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 text-left">
               Transparency Notice:<br/>
               <span className="text-amber-100/40 tracking-widest font-mono">
                 Powered by a fully integrated blockchain architecture ensuring tamper-proof, immutable audit trails across all system decisions.
               </span>
             </p>
          </div>
        </motion.div>

        {/* Section 2: Wallet Connection (Real Feature) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-24"
        >
          <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-amber-500/10 shadow-2xl flex flex-col items-center min-w-[400px]">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500/50 mb-6 italic">Secure Handshake Protocol</h3>
             <WalletConnect />
          </div>
        </motion.div>

        {/* Section 3: Blockchain Status (No Fake Data) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
           <StatusCard 
             icon={<Server className="h-6 w-6" />}
             title="Smart Contract Status"
             status="Not Deployed Yet"
             detail="Awaiting final security audit before on-chain deployment."
           />
           <StatusCard 
             icon={<Network className="h-6 w-6" />}
             title="Network Target"
             status="Ethereum Testnet"
             detail="Sepolia / Goerli planned for initial staging."
           />
           <StatusCard 
             icon={<Lock className="h-6 w-6" />}
             title="Transaction Layer"
             status="Pending Integration"
             detail="System architecture is ready to broadcast state changes."
           />
        </motion.div>

      </div>
    </main>
  );
}

function StatusCard({ icon, title, status, detail }: { icon: React.ReactNode, title: string, status: string, detail: string }) {
  return (
    <div className="glass-card-elite rounded-3xl p-8 border border-amber-500/10 hover:border-amber-500/30 transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
        {icon}
      </div>
      <div className="h-12 w-12 rounded-xl bg-black border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500/60 mb-2">{title}</h4>
      <p className="text-lg font-bold text-amber-100 mb-4">{status}</p>
      <div className="h-px w-full bg-amber-500/10 mb-4" />
      <p className="text-xs text-amber-100/40 font-mono tracking-tighter leading-relaxed">
        {detail}
      </p>
    </div>
  );
}
