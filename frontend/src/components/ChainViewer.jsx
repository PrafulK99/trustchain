import React from "react";

// A cool chain-link icon to go between blocks
const ChainLinkIcon = () => (
  <div className="flex justify-center my-2">
    <div className="bg-slate-700 p-2 rounded-full">
      <svg
        className="w-6 h-6 text-cyan-500 rotate-90"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        ></path>
      </svg>
    </div>
  </div>
);

function BlockCard({ block, isGenesis }) {
  // Format timestamp nicely
  const formattedTime = new Date(block.timestamp * 1000).toLocaleString();

  // Helper to shorten long hashes for display
  const shortHash = (hash) =>
    hash ? `${hash.substring(0, 10)}...${hash.substring(hash.length - 10)}` : "N/A";

  return (
    <div className="relative group">
      {/* The Block Card itself */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-300">
        
        {/* Block Header (Index & Time) */}
        <div className="bg-slate-900/50 px-4 py-3 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${isGenesis ? 'bg-purple-500/20 text-purple-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
              Block #{block.index}
            </span>
            {isGenesis && <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">Genesis Block</span>}
          </div>
          <span className="text-xs text-slate-400 font-mono">{formattedTime}</span>
        </div>

        {/* Block Content Grid */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Left Side: Transaction Data */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Data</h4>
            <div className="bg-slate-900/50 p-3 rounded-lg space-y-2">
              {block.index === 0 ? (
                 <p className="text-slate-300 italic">{block.data.message || "Genesis Block"}</p>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Donor:</span>
                    <span className="text-white font-medium">{block.data.donor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Amount:</span>
                    <span className="text-green-400 font-bold">${block.data.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-sm">Purpose:</span>
                    <span className="text-slate-200 text-sm">{block.data.purpose}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Side: Cryptographic Hashes */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Hashes</h4>
            <div className="space-y-3">
              
              {/* Previous Hash */}
              <div>
                <div className="text-xs text-slate-500 mb-1 flex items-center">
                   <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                   Previous Hash
                </div>
                <div className="font-mono text-xs text-slate-400 bg-slate-900/50 p-2 rounded break-all border border-transparent hover:border-slate-600 transition-colors" title={block.previous_hash}>
                  {shortHash(block.previous_hash)}
                </div>
              </div>

              {/* Current Hash */}
              <div>
                <div className="text-xs text-cyan-500 mb-1 flex items-center font-semibold">
                   <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   Current Hash
                </div>
                <div className="font-mono text-xs text-cyan-300 bg-cyan-900/20 p-2 rounded break-all border border-cyan-900/30 hover:border-cyan-500/30 transition-colors" title={block.hash}>
                   {block.hash}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ChainViewer({ chain }) {
  if (!chain || chain.length === 0) {
      return <div className="text-slate-400 text-center py-10">No blocks in chain yet.</div>;
  }

  // Reverse the chain for display so newest is at top (optional, remove .slice().reverse() if you prefer old first)
  // Actually, for a blockchain, usually you want to see the whole history, so standard order is fine.
  // Let's keep it standard order so the "chain" visual makes sense (downwards).

  return (
    <div className="space-y-0"> {/* space-y-0 because ChainLinkIcon handles its own spacing */}
      {chain.map((block, index) => (
        <React.Fragment key={block.index}>
          {/* Don't show link before the first block */}
          {index > 0 && <ChainLinkIcon />}
          <BlockCard block={block} isGenesis={block.index === 0} />
        </React.Fragment>
      ))}
    </div>
  );
}