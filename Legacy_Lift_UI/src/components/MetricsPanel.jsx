import React, { useState } from 'react';
import { Activity, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MetricRow = ({ label, before, after, invertGoodDirection = false }) => {
  const diff = after - before;
  const isGood = invertGoodDirection ? diff < 0 : diff > 0;
  const isNeutral = diff === 0;

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-700/30 last:border-0">
      <span className="text-sm font-medium text-slate-300 w-1/3">{label}</span>
      
      <div className="flex items-center justify-end w-2/3 gap-4">
        <span className="text-sm text-slate-400 w-12 text-right">{before}</span>
        
        <div className="w-6 flex justify-center">
          {isNeutral ? (
            <Minus className="w-4 h-4 text-slate-500" />
          ) : isGood ? (
            <TrendingDown className={`w-4 h-4 ${invertGoodDirection ? 'text-success' : 'text-error'} ${!invertGoodDirection && 'rotate-180 text-success'}`} />
          ) : (
            <TrendingUp className={`w-4 h-4 ${invertGoodDirection ? 'text-error' : 'text-success'} ${!invertGoodDirection && 'rotate-180 text-error'}`} />
          )}
        </div>
        
        <span className={`text-sm font-bold w-12 text-right ${isNeutral ? 'text-slate-300' : isGood ? 'text-success' : 'text-error'}`}>
          {after}
        </span>
      </div>
    </div>
  );
};

const MetricsPanel = ({ metrics }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!metrics) return null;

  const scoreImprovement = metrics.score?.improvement || metrics.score_improvement;
  const summaryText = metrics.analysis?.summary || "No insights available.";

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div 
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg">Engineering Metrics</h3>
        </div>
        <div className="flex items-center gap-3">
          {scoreImprovement !== undefined && (
            <div className={`px-3 py-1 border rounded-full text-xs font-bold ${scoreImprovement >= 0 ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20'}`}>
              {scoreImprovement > 0 ? '+' : ''}{Number(scoreImprovement).toFixed(2)}% Overall
            </div>
          )}
          {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-6 flex-1 flex flex-col"
          >
            <div className="flex text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">
              <div className="w-1/3">Metric</div>
              <div className="w-2/3 flex justify-end gap-6 pr-2">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>

            <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50 mb-4 flex-1">
              <MetricRow 
                label="Complexity" 
                before={metrics.before?.complexity || 0} 
                after={metrics.after?.complexity || 0} 
                invertGoodDirection={true}
              />
              <MetricRow 
                label="Lines of Code" 
                before={metrics.before?.loc || 0} 
                after={metrics.after?.loc || 0} 
                invertGoodDirection={true}
              />
              <MetricRow 
                label="Maintainability" 
                before={metrics.before?.maintainability || 0} 
                after={metrics.after?.maintainability || 0} 
                invertGoodDirection={false}
              />
              <MetricRow 
                label="Effort" 
                before={Number(metrics.before?.halstead?.effort || metrics.before?.effort || 0).toFixed(0)} 
                after={Number(metrics.after?.halstead?.effort || metrics.after?.effort || 0).toFixed(0)} 
                invertGoodDirection={true}
              />
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex gap-3 items-start">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-1">Metric Insight</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{summaryText}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetricsPanel;
