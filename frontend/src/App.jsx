import React, { useEffect, useState } from "react";
import DonateForm from "./components/DonateForm";
import TamperForm from "./components/TamperForm";
import VerifyPanel from "./components/VerifyPanel";
import ChainViewer from "./components/ChainViewer";
import { getChain } from "./utils/api";

// A simple icon component (you can replace this with react-icons if you want)
const LogoIcon = () => (
  <svg
    className="w-8 h-8 text-cyan-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7v8a2 2 0 002 2h4a2 2 0 002-2V7m-4 10h0M6 7h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2z"
    ></path>
  </svg>
);

export default function App() {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadChain = async () => {
    setLoading(true);
    try {
      const data = await getChain();
      setChain(data.chain || []);
    } catch (error) {
      console.error("Failed to load chain:", error);
      // You could add some user-facing error state here
    }
    setLoading(false);
  };

  useEffect(() => {
    loadChain();
  }, []);

  return (
    // Main page container with dark background
    <div className="min-h-screen bg-slate-900 text-gray-200 p-4 md:p-8">
      
      {/* Main content wrapper */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex items-center space-x-3">
          <LogoIcon />
          <div>
            <h1 className="text-3xl font-bold text-white">
              TrustChain
            </h1>
            <p className="text-cyan-400 text-sm">
              Transparent Charity Donation Tracker (Simulated)
            </p>
          </div>
        </header>

        {/* Two-column layout: Grid on desktop, stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Controls */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            <h2 className="text-xl font-semibold text-white mb-2">Controls</h2>
            <DonateForm onDone={loadChain} />
            <VerifyPanel />
            <TamperForm onDone={loadChain} />
          </aside>

          {/* Right Column: Chain Viewer */}
          <main className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-2">
              Blockchain Ledger
            </h2>
            {loading ? (
              <div className="flex justify-center items-center h-64 bg-slate-800 rounded-lg">
                <p className="text-lg animate-pulse">Loading chain...</p>
              </div>
            ) : (
              <ChainViewer chain={chain} />
            )}
          </main>

        </div>
      </div>
    </div>
  );
}