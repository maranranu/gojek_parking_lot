const { expect, assert } = require('chai');
const helpers = require('src/utils/helpers');

describe('utils :: helpers', () => {

  describe('hashCode', () => {
    it('get hash code for string', () => {
      let st = helpers.hashCode('teststring');
      assert.typeOf(st, 'number');
    });
  });

  describe('paymentMode', () => {
    it('get payment mode for cash', () => {
      let mode = 'CASH';
      expect(helpers.paymentMode(mode)).equal(0);
    });
    it('get payment mode for card', () => {
      let mode = 'CARD';
      expect(helpers.paymentMode(mode)).equal(1);
    });
  });
});
