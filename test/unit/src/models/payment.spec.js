const { expect, assert } = require('chai');
const Payment = require('src/models/payment');

describe('models :: payment', () => {

  describe('#getPaymentDetails', () => {
    it('get payment details', () => {
      let payment = {
        transactionId:'1234',
        amount: 30,
        paymentMode: 1
      }
      const paymentObj = new Payment(payment.transactionId, payment.amount, payment.paymentMode);
      expect(paymentObj.getPaymentDetails()).to.eql(payment);
  });
  });
});
