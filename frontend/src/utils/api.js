const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:5000";

export async function getChain() {
  const res = await fetch(`${API_BASE}/chain`);
  return res.json();
}

export async function donate(payload) {
  const res = await fetch(`${API_BASE}/donate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function verify() {
  const res = await fetch(`${API_BASE}/verify`);
  return res.json();
}

export async function tamper(payload) {
  const res = await fetch(`${API_BASE}/tamper`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}
