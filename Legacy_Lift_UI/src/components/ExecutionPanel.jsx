import React, { useState } from 'react';
import { Terminal, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExecutionPanel = ({ validation }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!validation) return null;

  const passed = validation.status === 'PASS';

  return (
    <div className="glass-panel p-6 flex flex-col h-full">
      <div 
        className="flex items-center justify-between pb-2 border-b border-slate-700/50 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          <h3 className="font-semibold text-lg">Execution Sandbox</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md ${passed ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
            {passed ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
            {passed ? 'PASS' : 'FAIL'}
          </div>
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
            className="overflow-hidden flex-1 flex flex-col pt-4"
          >
            <div className="flex-1 flex flex-col justify-center items-center py-6 space-y-4">
              <div className={`p-4 rounded-full ${passed ? 'bg-success/10' : 'bg-error/10'}`}>
                {passed ? (
                  <CheckCircle2 className="w-12 h-12 text-success" />
                ) : (
                  <XCircle className="w-12 h-12 text-error" />
                )}
              </div>
              
              <div className="text-center">
                <h4 className={`text-xl font-bold ${passed ? 'text-success' : 'text-error'}`}>
                  {passed ? 'Validation Passed' : 'Validation Failed'}
                </h4>
                <p className="text-sm text-slate-400 mt-2 max-w-[250px] mx-auto">
                  {validation.message || (passed ? 'The refactored code passed all execution tests in the secure sandbox.' : 'The refactored code failed to run correctly or broke existing functionality.')}
                </p>
              </div>
            </div>

            {validation.summary && (
              <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800">
                <p className="text-xs font-mono text-slate-300">
                  &gt; {validation.summary}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExecutionPanel;
