"use client";

import { useState, useEffect } from "react";
import { Wallet, LogOut, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Initial persistence check & metamask listener setup
  useEffect(() => {
    setIsMounted(true);
    const savedAccount = localStorage.getItem("connected_wallet");
    if (savedAccount) {
      setAccount(savedAccount);
    }

    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          localStorage.setItem("connected_wallet", accounts[0]);
        } else {
          setAccount(null);
          localStorage.removeItem("connected_wallet");
        }
      });
    }

    // Cleanup listener on unmount
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      setConnecting(true);
      setError(null);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setAccount(account);
        localStorage.setItem("connected_wallet", account);
      } catch (err: any) {
        console.error("MetaMask connection failed", err);
        if (err.code === 4001) {
          setError("User rejected connection");
        } else {
          setError("Connection failed. Check MetaMask.");
        }
      } finally {
        setConnecting(false);
      }
    } else {
      alert("MetaMask not detected. Please install the extension to continue.");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("connected_wallet");
  };

  const formatAddress = (addr: string) => {
    if (!addr) return "";
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="flex items-center gap-4 shrink-0 min-w-[140px] justify-end">
      {!isMounted ? (
        <div className="h-10 w-32 border border-white/5 rounded-xl animate-pulse" />
      ) : (
        <AnimatePresence mode="wait">
          {!account ? (
            <motion.button
              key="connect"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={connectWallet}
              disabled={connecting}
              className="flex items-center gap-3 bg-slate-900 border border-amber-500/20 hover:border-amber-500/50 px-5 py-2.5 rounded-xl text-amber-500 font-black text-[10px] uppercase tracking-[0.2em] transition-all group relative overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] active:scale-[0.98]"
            >
              {connecting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Wallet className="h-3.5 w-3.5 group-hover:scale-110 transition-transform stroke-[2.5]" />
              )}
              <span className="relative z-10">Connect Wallet</span>
              <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4"
            >
              <div className="flex flex-col items-end border-r border-amber-500/10 pr-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-amber-500 leading-none mb-1">
                  Protected
                </span>
                <span className="text-[10px] font-bold text-amber-100/40 uppercase tracking-widest italic leading-none font-mono">
                  {formatAddress(account)}
                </span>
              </div>
              
              <button
                onClick={disconnectWallet}
                className="group p-2 rounded-lg hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/10"
                title="Terminate Connection"
              >
                <LogOut className="h-4 w-4 text-amber-500/30 group-hover:text-amber-500 transition-colors" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
