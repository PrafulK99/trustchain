# blockchain.py
import json
import os
from datetime import datetime
from block import Block

CHAIN_FILE = os.path.join(os.path.dirname(__file__), 'blockchain.json')

class Blockchain:
    def __init__(self):
        self.chain = []
        self.load_chain()

    def create_genesis_block(self):
        genesis = Block(
            index=0,
            timestamp=datetime.utcnow().isoformat(),
            data={"message": "Genesis Block"},
            previous_hash="0"
        )
        return genesis

    def load_chain(self):
        if os.path.exists(CHAIN_FILE):
            with open(CHAIN_FILE, 'r') as f:
                data = json.load(f)
                self.chain = [Block.from_dict(d) for d in data]
        else:
            self.chain = [self.create_genesis_block()]
            self.save_chain()

    def save_chain(self):
        with open(CHAIN_FILE, 'w') as f:
            json.dump([b.to_dict() for b in self.chain], f, indent=2)

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, data: dict):
        prev = self.get_latest_block()
        new_block = Block(
            index=len(self.chain),
            timestamp=datetime.utcnow().isoformat(),
            data=data,
            previous_hash=prev.hash
        )
        self.chain.append(new_block)
        self.save_chain()
        return new_block

    def is_chain_valid(self):
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            previous = self.chain[i-1]
            # Recalculate hash and compare
            if current.hash != current.calculate_hash():
                return False, f"Invalid hash at index {i}"
            if current.previous_hash != previous.hash:
                return False, f"Invalid previous_hash link at index {i}"
        return True, "Chain valid"

    def tamper_block(self, index: int, new_data: dict):
        """
        For demo only: change block data at index (not genesis).
        After tampering, we intentionally do NOT re-hash subsequent blocks to demonstrate chain break.
        """
        if index <= 0 or index >= len(self.chain):
            raise IndexError("Cannot tamper genesis or out of range")
        self.chain[index].data = new_data
        # update the hash for the tampered block to simulate an on-disk malicious change
        self.chain[index].hash = self.chain[index].calculate_hash()
        self.save_chain()
        return self.chain[index]
