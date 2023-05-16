const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey - creates a consistently predictable key for sharding data", () => {
  describe("When no seed value is provided", () => {
    let reultingKey;

    beforeAll(() => {
      reultingKey = deterministicPartitionKey();
    })

    it("then it returns the string literal '0'", () => {
      expect(reultingKey).toBe("0");
    });
  });
});
