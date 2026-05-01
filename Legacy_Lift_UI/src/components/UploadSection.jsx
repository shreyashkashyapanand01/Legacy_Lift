import React, { useState, useRef } from 'react';
import { Upload, FileArchive, CheckCircle, Loader2 } from 'lucide-react';
import { indexProject } from '../services/api';

const UploadSection = ({ onJobCreated, onError }) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const data = await indexProject(file);
      if (data && data.job_id) {
        setSuccess(true);
        onJobCreated(data.job_id);
      } else {
        const msg = "Invalid response from server. Missing job_id.";
        setError(msg);
        if (onError) onError(msg);
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.detail || err.message || "Failed to upload project";
      setError(msg);
      if (onError) onError(msg);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Upload className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">1. Upload Project</h2>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          file ? 'border-primary/50 bg-primary/5' : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
        }`}
      >
        <input 
          type="file" 
          accept=".zip" 
          className="hidden" 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        
        {!file ? (
          <div className="flex flex-col items-center justify-center space-y-3 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
              <FileArchive className="w-6 h-6 text-slate-400" />
            </div>
            <div className="text-sm text-slate-400">
              <span className="text-primary font-medium">Click to upload</span> or drag and drop
              <p className="text-xs mt-1">ZIP files only</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <div className="flex items-center gap-3 overflow-hidden">
              <FileArchive className="w-8 h-8 text-primary flex-shrink-0" />
              <div className="text-left truncate">
                <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
                <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <button 
              onClick={() => { setFile(null); setSuccess(false); }}
              className="text-xs text-slate-400 hover:text-slate-200 px-2"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="text-sm text-error bg-error/10 p-3 rounded-lg border border-error/20">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 text-sm text-success bg-success/10 p-3 rounded-lg border border-success/20">
          <CheckCircle className="w-4 h-4" />
          <span>Project indexed successfully!</span>
        </div>
      )}

      <div className="flex justify-end">
        <button 
          className="btn-primary flex items-center gap-2"
          onClick={handleUpload}
          disabled={!file || isUploading || success}
        >
          {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
          {isUploading ? 'Indexing...' : 'Index Project'}
        </button>
      </div>
    </div>
  );
};

export default UploadSection;
