const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey - creates a consistently predictable key for sharding data", () => {
  describe("When no seed value is provided", () => {
    it("then it returns the string literal '0'", () => {
      const trivialKey = deterministicPartitionKey();
      expect(trivialKey).toBe("0");
    });
  });
});
