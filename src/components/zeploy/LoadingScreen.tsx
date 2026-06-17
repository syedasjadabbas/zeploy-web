import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sequence duration before allowing the app to reveal
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%", filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-background"
        >
          {/* Background Lighting & Particles */}
          <div className="absolute inset-0 z-0">
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric/15 blur-[120px]" />
            <div className="absolute inset-0 grid-bg opacity-30" />
            
            {/* Subtle animated floating particles via CSS */}
            <div className="absolute inset-0 opacity-50 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #0B1535 100%), url("/projects/noise.png")' }} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Sequence */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <img src="/logo.png" alt="Zeploy Tech" className="h-24 w-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
              
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-8 font-display text-4xl font-semibold tracking-widest text-foreground"
              >
                <span className="text-electric">ZEPLOY</span> TECH
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-electric-soft"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-electric"></span>
                </span>
                We Deploy Your Vision.
              </motion.div>
            </motion.div>

            {/* Electric Loading Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 256 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
              className="relative mt-16 h-[2px] w-64 overflow-hidden rounded-full bg-white/5"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 h-full w-1/2 bg-gradient-to-r from-transparent via-electric to-transparent drop-shadow-[0_0_8px_rgba(59,130,246,1)]"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
