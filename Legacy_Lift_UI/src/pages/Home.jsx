import React, { useState } from 'react';
import UploadSection from '../components/UploadSection';
import QuerySection from '../components/QuerySection';
import DecisionBadge from '../components/DecisionBadge';
import CodeViewer from '../components/CodeViewer';
import ExecutionPanel from '../components/ExecutionPanel';
import MetricsPanel from '../components/MetricsPanel';
import AnalysisPanel from '../components/AnalysisPanel';

const Home = () => {
  const [jobId, setJobId] = useState(null);
  const [results, setResults] = useState(null);
  const [globalError, setGlobalError] = useState(null);

  const handleJobCreated = (id) => {
    setJobId(id);
    setResults(null);
    setGlobalError(null);
  };

  const handleResultsReceived = (data) => {
    if (!data || Object.keys(data).length === 0) {
      setGlobalError("Received empty response from the AI Engine.");
      return;
    }
    setResults(data);
    setGlobalError(null);
  };

  const handleError = (errorMsg) => {
    setGlobalError(errorMsg);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8 pb-20">
      
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent inline-block">
          LegacyLift
        </h1>
        <p className="text-slate-400 mt-3 text-lg">AI-Powered Code Refactor Engine</p>
      </header>

      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <UploadSection onJobCreated={handleJobCreated} onError={handleError} />
        <QuerySection jobId={jobId} onResultsReceived={handleResultsReceived} onError={handleError} />
      </div>

      {/* Global Error Banner */}
      {globalError && (
        <div className="mt-8 bg-error/10 border-l-4 border-error p-4 rounded-r-lg">
          <div className="flex items-start">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error">Execution Error</h3>
              <div className="mt-2 text-sm text-error/80">
                <p>{globalError}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Dashboard */}
      {results && !globalError && (
        <div className="space-y-6 mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-4 py-4 border-b border-slate-800">
            <h2 className="text-2xl font-bold">Analysis Results</h2>
            <div className="flex-1" />
            <div className="text-sm text-slate-500 font-mono">Job ID: {jobId}</div>
          </div>

          {/* Top Row: Decision and Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <DecisionBadge 
                decision={results.decision || (results.execution_validation?.status === 'PASS' ? { status: 'ACCEPT', reason: 'Passed all execution tests and improved metrics.' } : { status: 'REVIEW', reason: 'Execution validation failed or no definitive decision reached.' })} 
              />
            </div>
            <div className="md:col-span-2">
              <MetricsPanel metrics={results.metrics} />
            </div>
          </div>

          {/* Middle Row: Code Viewer */}
          <div className="h-[600px]">
            <CodeViewer 
              originalCode={results.refactor_engine?.original_code || results.context} 
              refactoredCode={results.refactor_engine?.refactored_code || results.refactor?.code} 
              diff={results.refactor_engine?.diff}
            />
          </div>

          {/* Bottom Row: Execution and Analysis */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <ExecutionPanel validation={results.execution_validation} />
            <AnalysisPanel 
              analysis={results.metrics?.analysis} 
              baseAnalysis={results.analysis}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
