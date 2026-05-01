import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const DecisionBadge = ({ decision }) => {
  // Graceful fallback if decision object is missing
  const statusKey = decision?.status ? decision.status.toUpperCase() : 'REVIEW';
  const reasonText = decision?.reason || "Awaiting final review due to complex trade-offs.";

  const config = {
    ACCEPT: {
      color: 'bg-success/20 text-success border-success/50',
      icon: <CheckCircle2 className="w-10 h-10" />,
      label: 'ACCEPT'
    },
    REJECT: {
      color: 'bg-error/20 text-error border-error/50',
      icon: <XCircle className="w-10 h-10" />,
      label: 'REJECT'
    },
    REVIEW: {
      color: 'bg-warning/20 text-warning border-warning/50',
      icon: <AlertTriangle className="w-10 h-10" />,
      label: 'REVIEW'
    }
  };

  const status = config[statusKey] || config['REVIEW'];

  return (
    <div className="flex flex-col h-full gap-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`glass-panel p-6 flex flex-col items-center justify-center border-2 ${status.color} shadow-lg relative overflow-hidden flex-1`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="flex items-center gap-4 z-10">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-md">
            {status.icon}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">AI Engine Decision</p>
            <h2 className="text-4xl font-black tracking-tight">{status.label}</h2>
          </div>
        </div>
      </motion.div>

      {/* Decision Reason Section */}
      <motion.div 
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-panel p-4 bg-slate-800/40 border border-slate-700/50"
      >
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reasoning</h4>
        <p className="text-sm text-slate-200 leading-relaxed">
          {reasonText}
        </p>
      </motion.div>
    </div>
  );
};

export default DecisionBadge;
