"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const quotes = [
  { text: "Data is ", highlight: "fragmented.", id: 1 },
  { text: "Identities ", highlight: "conflict.", id: 2 },
  { text: "Truth is ", highlight: "hidden.", id: 3 },
  { text: "We ", highlight: "unify the reality.", id: 4 },
];

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<{ left: string, top: string, delay: number, duration: number }[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const videoScale = useTransform(smoothProgress, [0, 0.2], [1, 1.1]);
  const videoOpacity = useTransform(smoothProgress, [0, 0.2, 0.3], [1, 1, 0.2]);
  const blackOverlayOpacity = useTransform(smoothProgress, [0, 0, 0.3], [0, 0, 0.95]);

  useEffect(() => {
    setIsMounted(true);
    
    // Stable particle generation on client-side only (Fixes Hydration Mismatch)
    const newParticles = [...Array(20)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main ref={containerRef} className="relative bg-black text-white min-h-[600vh] overflow-x-hidden selection:bg-amber-500/20">
      {/* Cinematic Overlays */}
      <div className="grain-overlay" />
      <div className="vignette-overlay" />
      <div className="gradient-overlay-y" />
      
      {/* Ambient Lighting */}
      {isMounted && (
        <div 
          className="cursor-glow hidden lg:block" 
          style={{ 
            left: mousePos.x, 
            top: mousePos.y 
          }} 
        />
      )}

      {/* Floating Particles - Rendered only on client to avoid hydration mismatch */}
      <div className="fixed inset-0 pointer-events-none z-20">
        {isMounted && particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-amber-500/40 rounded-full"
            initial={{ left: p.left, top: p.top, opacity: 0 }}
            animate={{ 
              y: [0, -100, 0],
              x: [0, 20, 0],
              opacity: [0, 0.4, 0]
            }}
            transition={{ 
              duration: p.duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: p.delay
            }}
          />
        ))}
      </div>

      {/* Hero Section (Sticky) - CLEAN DESIGN, VIDEO ONLY, NO TEXT */}
      <section className="sticky top-0 h-screen w-full flex items-center overflow-hidden z-0">
        <motion.video
          autoPlay
          muted
          loop
          playsInline
          style={{ 
            scale: videoScale, 
            opacity: videoOpacity,
            willChange: "transform, opacity"
          }}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/video.mp4" type="video/mp4" />
        </motion.video>

        {/* Global Darkener */}
        <motion.div 
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: blackOverlayOpacity }}
        />
      </section>

      {/* Quotes Section - Sequential reveal triggered by scroll */}
      <section className="relative z-40 bg-transparent">
        {quotes.map((quote, idx) => (
          <QuoteSlide key={quote.id} quote={quote} index={idx} />
        ))}
      </section>

      {/* CTA Section */}
      <section className="h-screen w-full flex items-center justify-center relative z-40 bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center space-y-16"
        >
          <div className="space-y-6">
             <div className="flex justify-center mb-8">
               <div className="w-16 h-16 rounded-2xl border border-amber-500/20 flex items-center justify-center bg-amber-500/5">
                 <ChevronRight className="w-8 h-8 text-amber-500" />
               </div>
             </div>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter text-white uppercase italic">Ready to Enter?</h3>
            <p className="text-amber-500/30 font-bold text-[10px] uppercase tracking-[0.8em] max-w-sm mx-auto leading-loose">
              Awaiting Neural Handshake & Operational Authorization
            </p>
          </div>

          <Link href="/dashboard">
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 0 40px rgba(198, 160, 82, 0.3)",
                borderColor: "rgba(198, 160, 82, 0.5)"
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-16 py-8 bg-black border border-amber-500/20 backdrop-blur-3xl rounded-2xl overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-6 text-amber-200 font-black uppercase tracking-[0.4em] text-xs">
                Enter Command Interface
                <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Footer info */}
        <div className="absolute bottom-16 w-full text-center px-10">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
            <div className="h-[1px] w-12 bg-amber-500/20" />
            <p className="text-[8px] font-black text-amber-500/10 uppercase tracking-[1.2em] italic">
              Soochana Setu &bull; National Intelligence Network &bull; Secured Deployment v2.5
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function QuoteSlide({ quote, index }: { quote: any, index: number }) {
  return (
    <div className="h-screen w-full flex items-center justify-center sticky top-0 bg-black/80 lg:bg-black/40 backdrop-blur-3xl lg:backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, filter: "blur(20px)", y: 60 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ margin: "-25% 0px -25% 0px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl text-center px-10"
      >
        <h2 className="text-4xl md:text-8xl font-black tracking-[0.15em] uppercase leading-tight text-white/90 italic">
          {quote.text}
          <span className="gold-text-gradient italic"> {quote.highlight}</span>
        </h2>
        <div className="mt-12 flex justify-center opacity-20">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}
