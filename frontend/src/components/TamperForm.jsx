import React, { useState } from "react";
import { tamper } from "../utils/api";

export default function TamperForm({ onDone }) {
  const [index, setIndex] = useState("");
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!index) return alert("Please provide block index");
    setLoading(true);
    const res = await tamper({ index, donor, amount, purpose });
    setLoading(false);
    if (res.error) alert(res.error);
    else alert("Block tampered successfully!");
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Tamper a Block (Demo)</h2>
      <input value={index} onChange={(e) => setIndex(e.target.value)} placeholder="Block index" className="border p-2 w-full mb-2 rounded" />
      <input value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="New donor (optional)" className="border p-2 w-full mb-2 rounded" />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="New amount (optional)" className="border p-2 w-full mb-2 rounded" />
      <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="New purpose (optional)" className="border p-2 w-full mb-2 rounded" />
      <button disabled={loading} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700">
        {loading ? "Tampering..." : "Tamper"}
      </button>
    </form>
  );
}
