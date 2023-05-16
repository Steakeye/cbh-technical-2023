const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey - creates a consistently predictable key for sharding data", () => {
  describe("When no seed value is provided", () => {
    let resultingKey;

    beforeAll(() => {
      resultingKey = deterministicPartitionKey();
    })

    it("then it returns the string literal '0'", () => {
      expect(resultingKey).toBe("0");
    });
  });

  describe("When a seed value is provided", () => {
    describe.each`
      seedValue | seedValueDescription | expected | expectedDescription
      ${``} | ${`an empty string`} | ${`0`} | ${`the '0' string literal is returned`}
    `(`that is $seedValueDescription`, ({ seedValue, expected, expectedDescription }) => {
      let resultingKey;

      beforeAll(() => {
        resultingKey = deterministicPartitionKey(seedValue);
      })

      it(`then ${expectedDescription}`, () => {
        expect(resultingKey).toBe(expected);
      });
    });
  });
});
