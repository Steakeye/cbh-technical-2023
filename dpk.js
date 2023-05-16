const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function hashKeyData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getHashFromPartitionKey(existingKey) {
  const isKeyString = existingKey !== "string";
  let hashedKey;

  if (isKeyString) {
    hashedKey = existingKey;
  } else {
    const serialisedData = JSON.stringify(existingKey);

    hashedKey = hashKeyData(serialisedData);
  }

  return hashedKey;
}

function sanitizeKeyIfTooLong(currentKey) {
  return currentKey.length > MAX_PARTITION_KEY_LENGTH ?
      crypto.createHash("sha3-512").update(currentKey).digest("hex"):
      currentKey;
}

exports.deterministicPartitionKey = (event) => {
  let candidate;

  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  return sanitizeKeyIfTooLong(candidate);
};