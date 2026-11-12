import { motion } from "framer-motion";
import { Server, Database, Cloud, Activity, CheckCircle, Zap, Globe2, Rocket } from "lucide-react";

export function InfraVisualization() {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-bg p-8">
      {/* Center Structure Map */}
      <div className="relative w-full max-w-lg aspect-square">
        {/* SVG Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(47, 102, 240, 0.15)" />
              <stop offset="50%" stopColor="rgba(47, 102, 240, 0.6)" />
              <stop offset="100%" stopColor="rgba(47, 102, 240, 0.15)" />
            </linearGradient>
          </defs>

          {/* Paths connecting nodes */}
          <path d="M 200 50 L 120 150" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 200 50 L 280 150" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 120 150 L 200 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 280 150 L 200 250" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
          <path d="M 200 250 L 200 350" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />

          {/* Animated Packets */}
          <motion.circle cx="0" cy="0" r="3" fill="#2F66F0">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 200 50 L 120 150" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#2F66F0">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 200 50 L 280 150" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#2F66F0">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 120 150 L 200 250" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#2F66F0">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 280 150 L 200 250" />
          </motion.circle>
          <motion.circle cx="0" cy="0" r="3" fill="#2F66F0">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 200 250 L 200 350" />
          </motion.circle>
        </svg>

        {/* Nodes */}
        {/* Ingress Node */}
        <div className="absolute left-1/2 top-[12.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border-strong flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <Globe2 className="w-5 h-5 text-accent-text" />
          </div>
          <span className="mt-2 text-xs text-text-subtle">Ingress</span>
        </div>

        {/* API Gateway 01 */}
        <div className="absolute left-[30%] top-[37.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border-strong flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <Server className="w-5 h-5 text-accent-text" />
          </div>
          <span className="mt-2 text-xs text-text-subtle">Gateway 01</span>
        </div>

        {/* API Gateway 02 */}
        <div className="absolute left-[70%] top-[37.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border-strong flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <Server className="w-5 h-5 text-accent-text" />
          </div>
          <span className="mt-2 text-xs text-text-subtle">Gateway 02</span>
        </div>

        {/* Cache Layer */}
        <div className="absolute left-1/2 top-[62.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border-strong flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <Zap className="w-5 h-5 text-accent-text" />
          </div>
          <span className="mt-2 text-xs text-text-subtle">Cache Layer</span>
        </div>

        {/* Database Cluster */}
        <div className="absolute left-1/2 top-[87.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-surface border border-border-strong flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
            <Database className="w-5 h-5 text-accent-text" />
          </div>
          <span className="mt-2 text-xs text-text-subtle">DB Cluster</span>
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${className} z-10 glass-card bg-surface border border-border rounded-lg p-3 flex items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}
    >
      <div className="w-8 h-8 rounded-full bg-highlight-bg border border-highlight-border flex items-center justify-center text-accent-text">
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <p className="text-[11px] text-text-subtle">{label}</p>
        <p className="text-sm font-semibold text-text-heading">{value}</p>
      </div>
    </motion.div>
  );
}
