import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { queryProject } from '../services/api';

const QuerySection = ({ jobId, onResultsReceived, onError }) => {
  const [queryText, setQueryText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  const handleRunAnalysis = async () => {
    if (!jobId || !queryText.trim()) return;
    
    setIsAnalyzing(true);
    setError(null);
    if (onError) onError(null);
    
    try {
      const results = await queryProject(jobId, queryText);
      onResultsReceived(results);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || err.message || "Failed to run analysis";
      setError(msg);
      if (onError) onError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className={`glass-panel p-6 space-y-4 transition-opacity duration-300 ${!jobId ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">2. Analyze & Refactor</h2>
      </div>
      
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-300 block">
          What would you like to improve?
        </label>
        <textarea 
          className="input-field min-h-[100px] resize-y"
          placeholder="e.g., Improve the database connection logic, add connection pooling, and handle exceptions better."
          value={queryText}
          onChange={(e) => setQueryText(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-sm text-error bg-error/10 p-3 rounded-lg border border-error/20">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={handleRunAnalysis}
          disabled={!jobId || !queryText.trim() || isAnalyzing}
        >
          {isAnalyzing && <Loader2 className="w-4 h-4 animate-spin" />}
          {isAnalyzing ? 'Running AI Engine...' : 'Run Analysis'}
        </button>
      </div>
    </div>
  );
};

export default QuerySection;
