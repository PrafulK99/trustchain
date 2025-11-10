import React from "react";

function BlockCard({ block }) {
  return (
    <div className="border p-3 mb-3 rounded bg-white shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500">Index: {block.index}</div>
          <div className="text-xs text-gray-400">{new Date(block.timestamp).toLocaleString()}</div>
          <div className="mt-2"><strong>Donor:</strong> {block.data.donor || block.data.message}</div>
          {block.data.amount && <div><strong>Amount:</strong> {block.data.amount}</div>}
          {block.data.purpose && <div><strong>Purpose:</strong> {block.data.purpose}</div>}
        </div>
        <div className="text-xs w-60 font-mono text-right break-words">
          <div className="text-gray-500">hash</div>
          <div>{block.hash}</div>
          <div className="text-gray-500 mt-2">prev</div>
          <div>{block.previous_hash}</div>
        </div>
      </div>
    </div>
  );
}

export default function ChainViewer({ chain }) {
  if (!chain) return null;
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Blockchain (Chain)</h2>
      {chain.map((b) => <BlockCard key={b.index} block={b} />)}
    </div>
  );
}
