const {expect, assert} = require('chai');
const processCommand = require('src/controllers');

describe('controllers :: index', () => {
  describe('processCommand', () => {
    it('process command through file with success', async function () {
      let filename = 'test/data/input1.txt';
      await processCommand(false, [filename]);
      assert.ok(true);
    });
    it('process command through file with error', () => {
      return processCommand(false, 'test/data/input.txt')
      .then(
        () => Promise.reject(new Error('Expected method to reject.')),
        err => assert.instanceOf(err, Error)
      );
    });
  });
});
