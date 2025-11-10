import React, { useState } from "react";
import { verify } from "../utils/api";

export default function VerifyPanel() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await verify();
      setResult(res);
    } catch (err) {
      setResult({ valid: false, message: "Failed to contact server for verification." });
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        Audit Ledger
      </h2>
      
      <p className="text-sm text-slate-400 mb-4">
        Cryptographically verify the integrity of the entire blockchain.
      </p>

      <button
        onClick={handleVerify}
        disabled={loading}
        className={`w-full py-4 px-4 rounded-lg font-bold text-lg transition-all duration-200 flex items-center justify-center space-x-2
          ${loading 
              ? "bg-slate-700 text-slate-400 cursor-wait" 
              : "bg-slate-700 hover:bg-slate-600 text-white border-2 border-slate-600 hover:border-cyan-500"
          }`}
      >
        {loading ? (
            <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               <span>Verifying...</span>
            </>
        ) : (
            <span>Verify Integrity</span>
        )}
      </button>

      {/* Result Display Area */}
      {result && (
        <div className={`mt-4 p-4 rounded-lg flex items-start space-x-3 animate-fade-in
            ${result.valid ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'}
        `}>
            
            {result.valid ? (
                 <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            ) : (
                 <svg className="w-6 h-6 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}

            <div>
                <h3 className={`font-bold ${result.valid ? 'text-green-400' : 'text-red-400'}`}>
                    {result.valid ? 'Verification Successful' : 'Verification Failed'}
                </h3>
                <p className={`text-sm mt-1 ${result.valid ? 'text-green-200' : 'text-red-200'}`}>
                    {result.message}
                </p>
            </div>
        </div>
      )}

    </div>
  );
}