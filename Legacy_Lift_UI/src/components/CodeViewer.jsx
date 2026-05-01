import React, { useState } from 'react';
import { Code2, SplitSquareHorizontal, Diff } from 'lucide-react';

const CodeViewer = ({ originalCode, refactoredCode, diff }) => {
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'tabs' | 'diff'
  const [activeTab, setActiveTab] = useState('refactored');

  if (!originalCode && !refactoredCode) return null;

  // Helper to determine if a line was modified
  const getLineStatus = (line, type) => {
    if (!diff) return null;
    
    line = line.trim();
    if (!line) return null;

    if (type === 'original') {
      if (diff.removed?.some(r => r.trim() === line)) return 'removed';
      if (diff.modified?.some(m => m.from.trim() === line)) return 'removed';
    } else {
      if (diff.added?.some(a => a.trim() === line)) return 'added';
      if (diff.modified?.some(m => m.to.trim() === line)) return 'added';
    }
    return null;
  };

  const renderCodeWithHighlights = (code, type) => {
    if (!code) return '// No code available';
    
    return code.split('\n').map((line, i) => {
      const status = getLineStatus(line, type);
      let bgColor = 'bg-transparent';
      let textColor = type === 'original' ? 'text-slate-300' : 'text-emerald-400/90';
      
      if (status === 'removed') {
        bgColor = 'bg-error/20';
        textColor = 'text-error-300';
      } else if (status === 'added') {
        bgColor = 'bg-success/20';
        textColor = 'text-success-300';
      }

      return (
        <div key={i} className={`px-4 py-0.5 whitespace-pre ${bgColor}`}>
          <span className={`inline-block w-8 text-right mr-4 text-slate-600 select-none`}>{i + 1}</span>
          <span className={textColor}>{line}</span>
        </div>
      );
    });
  };

  return (
    <div className="glass-panel overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Code Comparison</h3>
        </div>
        <div className="flex gap-2 bg-slate-900 p-1 rounded-lg border border-slate-700/50">
          <button 
            onClick={() => setViewMode('tabs')}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors ${viewMode === 'tabs' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Tabs
          </button>
          <button 
            onClick={() => setViewMode('split')}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors flex items-center gap-1 ${viewMode === 'split' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <SplitSquareHorizontal className="w-3 h-3" /> Split
          </button>
          <button 
            onClick={() => setViewMode('diff')}
            className={`px-3 py-1.5 text-xs rounded-md font-medium transition-colors flex items-center gap-1 ${viewMode === 'diff' ? 'bg-primary text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Diff className="w-3 h-3" /> Highlights
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden bg-[#0d1117] min-h-[400px]">
        {viewMode === 'split' || viewMode === 'diff' ? (
          <div className="grid grid-cols-2 h-full divide-x divide-slate-800">
            <div className="h-full flex flex-col overflow-hidden">
              <div className="text-xs text-slate-500 p-2 bg-slate-900 border-b border-slate-800 font-mono text-center">Original Code</div>
              <div className="text-sm font-mono overflow-auto flex-1 py-2">
                {viewMode === 'diff' ? renderCodeWithHighlights(originalCode, 'original') : (
                  <pre className="p-4 text-slate-300"><code>{originalCode}</code></pre>
                )}
              </div>
            </div>
            <div className="h-full flex flex-col overflow-hidden">
              <div className="text-xs text-primary/80 p-2 bg-slate-900 border-b border-slate-800 font-mono flex justify-center items-center gap-2">
                <span>Refactored Code</span>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px]">AI Generated</span>
              </div>
              <div className="text-sm font-mono overflow-auto flex-1 py-2">
                {viewMode === 'diff' ? renderCodeWithHighlights(refactoredCode, 'refactored') : (
                  <pre className="p-4 text-emerald-400/90"><code>{refactoredCode}</code></pre>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex border-b border-slate-800 bg-slate-900">
              <button
                onClick={() => setActiveTab('original')}
                className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'original' ? 'border-b-2 border-slate-400 text-slate-200 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Original Code
              </button>
              <button
                onClick={() => setActiveTab('refactored')}
                className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'refactored' ? 'border-b-2 border-primary text-primary bg-primary/5' : 'text-slate-500 hover:text-slate-300'}`}
              >
                Refactored Code
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className={`text-sm font-mono ${activeTab === 'original' ? 'text-slate-300' : 'text-emerald-400/90'}`}>
                <code>{activeTab === 'original' ? originalCode : refactoredCode}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeViewer;
