import React, { useEffect, useState } from "react";
import DonateForm from "./components/DonateForm";
import TamperForm from "./components/TamperForm";
import VerifyPanel from "./components/VerifyPanel";
import ChainViewer from "./components/ChainViewer";
import { getChain } from "./utils/api";

export default function App() {
  const [chain, setChain] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadChain = async () => {
    setLoading(true);
    const data = await getChain();
    setChain(data.chain || []);
    setLoading(false);
  };

  useEffect(() => {
    loadChain();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">TrustChain (Simulated)</h1>
          <p className="text-gray-600">Transparent Charity Donation Tracker using Blockchain Simulation</p>
        </header>

        <DonateForm onDone={loadChain} />
        <TamperForm onDone={loadChain} />
        <VerifyPanel />
        {loading ? <div>Loading chain...</div> : <ChainViewer chain={chain} />}
      </div>
    </div>
  );
}
