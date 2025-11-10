# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from blockchain import Blockchain

app = Flask(__name__)
CORS(app)  # allow all origins for dev; restrict for production
bc = Blockchain()

@app.route("/")
def hello():
    return jsonify({"message": "TrustChain (simulated) backend running"}), 200

@app.route("/chain", methods=["GET"])
def get_chain():
    chain_data = [b.to_dict() for b in bc.chain]
    return jsonify({"length": len(chain_data), "chain": chain_data}), 200

@app.route("/donate", methods=["POST"])
def donate():
    payload = request.get_json()
    # expected payload keys: donor, amount, purpose (amount can be number or string)
    if not payload or not all(k in payload for k in ("donor", "amount", "purpose")):
        return jsonify({"error": "payload must include donor, amount, purpose"}), 400

    data = {
        "donor": payload["donor"],
        "amount": payload["amount"],
        "purpose": payload["purpose"]
    }
    new_block = bc.add_block(data)
    return jsonify({"message": "Donation recorded", "block": new_block.to_dict()}), 201

@app.route("/verify", methods=["GET"])
def verify():
    valid, reason = bc.is_chain_valid()
    return jsonify({"valid": valid, "message": reason}), 200

@app.route("/tamper", methods=["POST"])
def tamper():
    """
    Demo helper to tamper a block at given index. Use for demo to show invalid chain.
    payload: {"index": <int>, "donor": "...", "amount": ..., "purpose": "..."}
    """
    payload = request.get_json()
    if not payload or "index" not in payload:
        return jsonify({"error": "payload must include index and new data"}), 400
    idx = int(payload["index"])
    new_data = {
        "donor": payload.get("donor", f"Tampered_{idx}"),
        "amount": payload.get("amount", "0"),
        "purpose": payload.get("purpose", "tamper")
    }
    try:
        tampered_block = bc.tamper_block(idx, new_data)
        return jsonify({"message": "Block tampered", "block": tampered_block.to_dict()}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(port=5000, debug=True)
