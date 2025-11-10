import React, { useState } from "react";
import { donate } from "../utils/api";

export default function DonateForm({ onDone }) {
  const [donor, setDonor] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!donor || !amount || !purpose) return alert("Please fill all fields.");
    setLoading(true);
    const res = await donate({ donor, amount, purpose });
    setLoading(false);
    if (res.error) alert(res.error);
    else alert("Donation recorded successfully!");
    setDonor(""); setAmount(""); setPurpose("");
    if (onDone) onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Make a Donation</h2>
      <input value={donor} onChange={(e) => setDonor(e.target.value)} placeholder="Donor Name" className="border p-2 w-full mb-2 rounded" />
      <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="border p-2 w-full mb-2 rounded" />
      <input value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Purpose" className="border p-2 w-full mb-2 rounded" />
      <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {loading ? "Recording..." : "Donate"}
      </button>
    </form>
  );
}
