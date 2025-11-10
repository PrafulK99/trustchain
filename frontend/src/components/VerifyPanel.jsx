import React, { useState } from "react";
import { verify } from "../utils/api";

export default function VerifyPanel() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    const res = await verify();
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold mb-2">Verify Blockchain</h2>
      <button onClick={handleVerify} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        {loading ? "Verifying..." : "Verify Chain"}
      </button>

      {result && (
        <div className={`mt-3 p-3 rounded ${result.valid ? "bg-green-50 border border-green-300" : "bg-red-50 border border-red-300"}`}>
          <p><strong>Valid:</strong> {String(result.valid)}</p>
          <p className="text-sm text-gray-700">{result.message}</p>
        </div>
      )}
    </div>
  );
}
