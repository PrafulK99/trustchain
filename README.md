# 🪙 TrustChain

> **Transparent Charity Donation Tracker** built with Flask + React + Tailwind.
> Simulates blockchain to ensure donation transparency and tamper detection.

---

## 🌍 Overview

Traditional charity systems lack transparency.
**TrustChain** uses a *simulated blockchain ledger* to record donations, making every transaction traceable and immutable.

Each donation becomes a **block** containing:

* Donor name
* Amount
* Purpose
* Timestamp
* Hash & previous hash linkage

Tampering breaks the chain, demonstrating **blockchain immutability**.

---

## ⚙️ Tech Stack

| Layer                 | Technology                     |
| --------------------- | ------------------------------ |
| Frontend              | React (Vite) + Tailwind CSS v4 |
| Backend               | Python Flask                   |
| Blockchain Simulation | Linked list + SHA-256 hashing  |
| Communication         | REST API (Fetch/Axios)         |

---

## 📁 Project Structure

```
trustchain/
├── backend/
│   ├── app.py
│   ├── block.py
│   ├── blockchain.py
│   ├── blockchain.json
│   ├── requirements.txt
│   └── README.md
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Backend setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate     # (Windows)
pip install -r requirements.txt
python app.py
```

Backend runs at **[http://127.0.0.1:5000](http://127.0.0.1:5000)**

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at **[http://localhost:5173](http://localhost:5173)**

---

## 🧪 Test Flow

1. Add donations from the UI
2. Click “Verify Chain” → shows valid ✅
3. Tamper a block → Verify again → invalid ❌
4. Observe hash mismatch and broken chain link.

---

## 🧠 Key Concepts

* **Hash linkage:** Every block stores the hash of its predecessor.
* **Immutability:** Changing one block invalidates the chain.
* **Transparency:** Every donation is visible to all participants.

---

## 🎨 Demo

| Action       | Description                            |
| ------------ | -------------------------------------- |
| Add Donation | Adds a new block                       |
| Verify Chain | Validates all hash links               |
| Tamper Block | Demonstrates data corruption detection |

---

## 📜 License

MIT License © 2025 TrustChain Contributors
