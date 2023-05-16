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
      ${{}} | ${`an empty object`} | ${`c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862`} | ${`hash is returned`}
      ${{ partitionKey: undefined }} | ${`an event object with partitionKey property undefined`} | ${`c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862`} | ${`hash is returned`}
      ${{ partitionKey: `` }} | ${`an event object with partitionKey property set to an empty string`} | ${`b7478342a465088fc33d43a64cd370737e5a3bf6749ca62c1d6db341beb987326b4df3a9f54f67a2f0ee915d4216af2f382fda14dd58dc67794f745e92d7a7f6`} | ${`hash is returned`}
      ${{ partitionKey: ` ` }} | ${`an event object with partitionKey property set to a whitespace string`} | ${` `} | ${`whitespace string is returned`}
      ${{ partitionKey: false }} | ${`an event object with partitionKey property set to a false boolean`} | ${`51a5f43b933ce152103a4789a17f1cf958e0b5e1c793082db6a6c74dd3f04c69ad8f558e28cf7c3eac61af4e484741f095129e815c4de4fdd30e3cd6c4e3c00f`} | ${`hash is returned`}
      ${{ partitionKey: true }} | ${`an event object with partitionKey property set to a true boolean`} | ${`true`} | ${`parsed to a string literal is returned`}
      ${{ partitionKey: 0 }} | ${`an event object with partitionKey property set to a numeric value of 0`} | ${`e65a0cb83a95cae7eb0642da576cac881e397c0405c63577c977068f7892f69f1c315baa294124da2a67e0c486d340f9d357377f894d0c0fd850484f8984f2e7`} | ${`hash is returned`}
      ${{ partitionKey: 1 }} | ${`an event object with partitionKey property set to a numeric value of 1`} | ${`1`} | ${`parsed to a string literal is returned`}
      ${{ partitionKey: {} }} | ${`an event object with partitionKey property set to an empty object`} | ${`{}`} | ${`object as JSON string is returned`}
      ${{ partitionKey: '.'.repeat(256) }} | ${`an event object with partitionKey property set to an string with 256 characters`} | ${'.'.repeat(256)} | ${`original partitionKey value is returned`}
      ${{ partitionKey: '.'.repeat(257) }} | ${`an event object with partitionKey property set to an string with more than 256 characters`} | ${`e2212f95c765277a1582d4273b21d8a4a44b6cfc03687f6780568ab669585c1fbabec58c457c7d5f0325e7ea53f03d7be8cbeb0a692fb6cd47f562efc81bb0f3`} | ${`a new hash value is returned`}
    `(`that is $seedValueDescription`, ({ seedValue, expected, expectedDescription }) => {
      let resultingKey;

      beforeAll(() => {
        resultingKey = deterministicPartitionKey(seedValue);
      })

      it(`then '${expected}' ${expectedDescription}`, () => {
        expect(resultingKey).toBe(expected);
      });
    });
  });
});
