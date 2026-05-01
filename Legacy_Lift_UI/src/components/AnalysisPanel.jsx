import React, { useState } from 'react';
import { Lightbulb, ShieldAlert, Zap, ListChecks, ChevronDown, ChevronUp, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisPanel = ({ analysis, baseAnalysis }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!analysis && !baseAnalysis) return null;

  const getConfidenceLevel = (score) => {
    if (score === undefined || score === null) return null;
    if (score >= 0.7) return { text: 'High', color: 'text-success bg-success/10 border-success/20' };
    if (score >= 0.4) return { text: 'Medium', color: 'text-warning bg-warning/10 border-warning/20' };
    return { text: 'Low', color: 'text-error bg-error/10 border-error/20' };
  };

  const confidence = getConfidenceLevel(analysis?.confidence);

  return (
    <div className="glass-panel p-6 flex flex-col h-full max-h-[500px]">
      <div 
        className="flex items-center justify-between pb-2 border-b border-slate-700/50 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-warning group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg">AI Analysis</h3>
        </div>
        <div className="flex items-center gap-3">
          {confidence && (
            <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 border rounded-md ${confidence.color}`}>
              <Gauge className="w-3 h-3" />
              Conf: {confidence.text}
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
            className="overflow-hidden flex-1 flex flex-col pt-6"
          >
            <div className="space-y-6 flex-1 overflow-auto pr-2">
              {analysis?.summary && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    Summary
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                    {analysis.summary}
                  </p>
                </div>
              )}

              {baseAnalysis?.suggestions && baseAnalysis.suggestions.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-primary/90 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ListChecks className="w-4 h-4" /> Suggestions
                  </h4>
                  <ul className="space-y-2 bg-slate-800/20 p-3 rounded-lg">
                    {baseAnalysis.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/70 mt-1.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis?.key_improvements && analysis.key_improvements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Key Improvements
                  </h4>
                  <ul className="space-y-2">
                    {analysis.key_improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis?.risk && (
                <div>
                  <h4 className="text-sm font-semibold text-error/90 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" /> Risk Assessment
                  </h4>
                  <p className="text-sm text-slate-300 bg-error/10 border border-error/20 p-3 rounded-lg">
                    {analysis.risk}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisPanel;
