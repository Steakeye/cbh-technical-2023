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
      ${``} | ${`an empty string`} | ${`0`} | ${`string literal is returned`}
      ${` `} | ${`a whitespace string`} | ${`20b42560b6d0019042ccb5476246e60c66b5a779ff8b36fe6c391d565b816f83eb097a3d997d3a4d31591b54c8064e60b94907d65571766017ef4bdb343b2c2a`} | ${`hash is returned`}
      ${false} | ${`a false boolean`} | ${`0`} | ${`string literal is returned`}
      ${true} | ${`a true boolean`} | ${`ff2c82ed266dc30b1afe862bee32cf996b213513bc6b3e242ff605ddd9d5bbd1e7eebf6dde586b8700125cb7b95d35aec2f4e750d092cd359b202e3d2be41e1a`} | ${`hash is returned`}
      ${0} | ${`a numeric value of `} | ${`0`} | ${`string literal is returned`}
      ${1} | ${`a numeric value of 1`} | ${`ca2c70bc13298c5109ee0cb342d014906e6365249005fd4beee6f01aee44edb531231e98b50bf6810de6cf687882b09320fdd5f6375d1f2debd966fbf8d03efa`} | ${`hash is returned`}
    `(`that is $seedValueDescription`, ({ seedValue, expected, expectedDescription }) => {
      let resultingKey;

      beforeAll(() => {
        resultingKey = deterministicPartitionKey(seedValue);
      })

      it(`then ${expected} ${expectedDescription}`, () => {
        expect(resultingKey).toBe(expected);
      });
    });
  });
});
