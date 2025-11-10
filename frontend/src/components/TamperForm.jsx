import React, { useState } from "react";
import { tamper } from "../utils/api";

// Reusable Input Component (Dark Mode)
const InputField = ({ value, onChange, placeholder, type = "text", required = false }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    className="w-full p-3 bg-slate-700 text-white rounded-md border border-slate-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all placeholder-slate-400"
  />
);

export default function TamperForm({ onDone }) {
  const [index, setIndex] = useState("");
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!index) {
       setMessage({ type: 'error', text: "Block index is required." });
       return;
    }

    setLoading(true);
    try {
        const res = await tamper({ index, donor, amount, purpose });
        if (res.error) {
            setMessage({ type: 'error', text: res.error });
        } else {
            setMessage({ type: 'success', text: "Block tampered successfully!" });
             // Clear form
            setIndex(""); setDonor(""); setAmount(""); setPurpose("");
            if (onDone) onDone();
        }
    } catch (err) {
        setMessage({ type: 'error', text: "Failed to connect to server." });
    }
    setLoading(false);

    // Auto-dismiss success message
    setTimeout(() => {
        if (message?.type === 'success') setMessage(null);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-red-900/30">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center text-yellow-500">
        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        Tamper Block (Demo)
      </h2>
      
      <p className="text-sm text-slate-400 mb-4">
          Use this to simulate an attack. Modifying any old block will break the chain's hash links.
      </p>

      {/* Inline Message Area */}
      {message && (
          <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-green-900/50 text-green-200 border border-green-700'}`}>
              {message.text}
          </div>
      )}

      <div className="space-y-4">
        <div>
             <label className="block text-sm font-medium text-slate-300 mb-1">Block Index to Attack <span className="text-red-400">*</span></label>
            <InputField value={index} onChange={(e) => setIndex(e.target.value)} placeholder="e.g., 1" type="number" required={true} />
        </div>
        
        <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 mb-3 uppercase font-bold">New Fake Data (Optional)</p>
            <div className="space-y-3">
                <InputField value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="New Donor Name" />
                <InputField value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="New Amount" type="number" />
                <InputField value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="New Purpose" />
            </div>
        </div>

        <button
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-bold text-white transition-all duration-200 
            ${loading 
                ? "bg-slate-600 cursor-not-allowed opacity-70" 
                : "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 shadow-md hover:shadow-orange-500/20"
            }`}
        >
           {loading ? "Tampering..." : "Corrupt Data Now"}
        </button>
      </div>
    </form>
  );
}