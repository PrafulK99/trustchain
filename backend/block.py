# block.py
import hashlib
import json
from datetime import datetime

class Block:
    def __init__(self, index, timestamp, data, previous_hash=''):
        """
        data is a dict e.g. {"donor":"Alice", "amount":100, "purpose":"Education"}
        """
        self.index = index
        self.timestamp = timestamp  # ISO string
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        block_string = json.dumps({
            'index': self.index,
            'timestamp': self.timestamp,
            'data': self.data,
            'previous_hash': self.previous_hash
        }, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    def to_dict(self):
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "data": self.data,
            "previous_hash": self.previous_hash,
            "hash": self.hash
        }

    @staticmethod
    def from_dict(d):
        b = Block(d['index'], d['timestamp'], d['data'], d['previous_hash'])
        # override computed hash with stored hash so we preserve exact state
        b.hash = d.get('hash', b.hash)
        return b
