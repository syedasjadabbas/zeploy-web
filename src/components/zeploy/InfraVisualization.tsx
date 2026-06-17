import { motion } from "framer-motion";
import { Server, Database, Cloud, Activity, CheckCircle, Zap, Globe2, Rocket } from "lucide-react";

export function InfraVisualization() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-background/50 backdrop-blur-sm p-8">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 bg-electric/10 rounded-full blur-[100px]" />
      </div>

      {/* Center Structure Map */}
      <div className="relative w-full max-w-lg aspect-square">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Paths connecting nodes */}
          <path d="M 200 50 L 120 150" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 200 50 L 280 150" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 120 150 L 200 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 280 150 L 200 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 200 250 L 200 350" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />

          {/* Animated Packets */}
          <motion.circle cx="0" cy="0" r="3" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 200 50 L 120 150" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200 50 L 280 150" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 120 150 L 200 250" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 280 150 L 200 250" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#3B82F6" filter="url(#glow)">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 200 250 L 200 350" />
          </motion.circle>
        </svg>

        {/* Nodes */}
        {/* Ingress Node */}
        <div className="absolute left-1/2 top-[12.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface/80 border border-electric/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Globe2 className="w-5 h-5 text-electric" />
          </div>
          <span className="mt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Ingress</span>
        </div>

        {/* API Gateway 01 */}
        <div className="absolute left-[30%] top-[37.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface/80 border border-electric/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Server className="w-5 h-5 text-electric" />
          </div>
          <span className="mt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Gateway 01</span>
        </div>

        {/* API Gateway 02 */}
        <div className="absolute left-[70%] top-[37.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface/80 border border-electric/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Server className="w-5 h-5 text-electric" />
          </div>
          <span className="mt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Gateway 02</span>
        </div>

        {/* Cache Layer */}
        <div className="absolute left-1/2 top-[62.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface/80 border border-electric/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Zap className="w-5 h-5 text-electric" />
          </div>
          <span className="mt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">Cache Layer</span>
        </div>

        {/* Database Cluster */}
        <div className="absolute left-1/2 top-[87.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface/80 border border-electric/30 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Database className="w-5 h-5 text-electric" />
          </div>
          <span className="mt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">DB Cluster</span>
        </div>

        {/* Floating Metrics */}
        <MetricChip 
          icon={CheckCircle} 
          label="Deployment Success" 
          value="99.9%" 
          className="top-[10%] -left-12"
          delay={0.2}
        />
        <MetricChip 
          icon={Activity} 
          label="System Reliability" 
          value="99.99%" 
          className="top-[30%] -right-12"
          delay={0.4}
        />
        <MetricChip 
          icon={Zap} 
          label="API Performance" 
          value="<50ms" 
          className="top-[50%] -left-16"
          delay={0.6}
        />
        <MetricChip 
          icon={Globe2} 
          label="Global Delivery" 
          value="6 Countries" 
          className="bottom-[20%] -right-16"
          delay={0.8}
        />
        <MetricChip 
          icon={Rocket} 
          label="Projects Delivered" 
          value="50+" 
          className="bottom-[5%] left-0"
          delay={1.0}
        />
      </div>
    </div>
  );
}

function MetricChip({ icon: Icon, label, value, className, delay }: { icon: any, label: string, value: string, className: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
      className={`absolute ${className} z-10 glass-card bg-surface/60 backdrop-blur-md border border-white/5 rounded-lg p-3 flex items-center gap-3 shadow-lg`}
    >
      <div className="w-8 h-8 rounded-full bg-electric/10 flex items-center justify-center text-electric">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </motion.div>
  );
}
