const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

function hashKeyData(data) {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getStringFromPartitionKey(existingKey) {
  const isKeyString = typeof existingKey === "string";
  let hashedKey;

  if (isKeyString) {
    hashedKey = existingKey;
  } else {
    hashedKey = JSON.stringify(existingKey);
  }

  return hashedKey;
}

function sanitizeKeyIfTooLong(currentKey) {
  return currentKey.length > MAX_PARTITION_KEY_LENGTH ?
      crypto.createHash("sha3-512").update(currentKey).digest("hex"):
      currentKey;
}

exports.deterministicPartitionKey = (event) => {
  // If we have no data to work with, return early with a default value
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  let partitionKey;
  const { partitionKey: foundPartitionKey } = event

  // If we have an existing `partitionKey` value to work with, use that to determine our key, otherwise fall back to
  // serialising the raw data
  if (foundPartitionKey) {
    partitionKey = getStringFromPartitionKey(foundPartitionKey);
  } else {
    const serialisedEventData = JSON.stringify(event);
    partitionKey = hashKeyData(serialisedEventData);
  }

  // If the determined key is too long we recycling it to create a key that user less than 256 characters
  return sanitizeKeyIfTooLong(partitionKey);
};