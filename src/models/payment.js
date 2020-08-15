class Payment {
  constructor(transactionId, amount, paymentMode=0) {
    this.transactionId = transactionId;
    this.paymentMode = paymentMode;
    this.amount = amount;
    this.paymentDate = new Date();
  }

  getPaymentDetails() {
    return {
      transactionId: this.transactionId,
      paymentMode: this.paymentMode,
      amount: this.amount
    }
  }
}

module.exports = Payment;
