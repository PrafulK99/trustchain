import React, { useState } from "react";
import { donate } from "../utils/api";

// Reusable Input Component for consistency
const InputField = ({ value, onChange, placeholder, type = "text" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="w-full p-3 bg-slate-700 text-white rounded-md border border-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder-gray-400"
  />
);

export default function DonateForm({ onDone }) {
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // For inline feedback instead of alerts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!donor || !amount || !purpose) {
        setMessage({ type: 'error', text: "Please fill all fields." });
        return;
    }
    
    setLoading(true);
    try {
        const res = await donate({ donor, amount, purpose });
        if (res.error) {
             setMessage({ type: 'error', text: res.error });
        } else {
            setMessage({ type: 'success', text: "Donation recorded successfully!" });
            setDonor(""); setAmount(""); setPurpose("");
            if (onDone) onDone();
        }
    } catch (err) {
         setMessage({ type: 'error', text: "Failed to connect to server." });
    }
    setLoading(false);

    // Clear success message after 3 seconds
    setTimeout(() => {
        if (message?.type === 'success') setMessage(null);
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center">
        <span className="bg-cyan-500 w-2 h-6 rounded-full mr-3"></span>
        Make a Donation
      </h2>
      
      {/* Inline Message Area */}
      {message && (
          <div className={`p-3 mb-4 rounded-md text-sm ${message.type === 'error' ? 'bg-red-900/50 text-red-200 border border-red-700' : 'bg-green-900/50 text-green-200 border border-green-700'}`}>
              {message.text}
          </div>
      )}

      <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Donor Name</label>
            <InputField value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="e.g., John Doe" />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Amount ($)</label>
            <InputField value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 500" type="number" />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Purpose</label>
            <InputField value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="e.g., Medical Supplies" />
        </div>

        <button
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-bold text-white transition-all duration-200 
            ${loading 
                ? "bg-slate-600 cursor-not-allowed opacity-70" 
                : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md hover:shadow-cyan-500/20"
            }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Recording...
            </span>
          ) : (
            "Donate Now"
          )}
        </button>
      </div>
    </form>
  );
}