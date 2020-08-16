const { expect, assert } = require('chai');
const {Car, Ticket} = require('src/models');

describe('models :: ticket', () => {
  let ticket;

  beforeEach(() => {
    ticket = new Ticket(765789878, new Car('DL-12-AA-9999', 'medium', 'Blue'));
  });

  describe('#getTicketNumber', () => {
    it('get ticket number', () => {
      expect(ticket.getTicketNumber()).equal(765789878);
    });
  });

  describe('#getVehicle', () => {
    it('get vehicle', () => {
      assert.instanceOf(ticket.getVehicle(), Car);
    });
  });

  describe('#setExitTime', () => {
    it('set ticket exit time', () => {
      let issuedAt = ticket.issuedAt;
      ticket.setExitTime(2);
      expect(ticket.exitAt).equal(issuedAt + 2*60*60*1000);
    });
  });

  describe('#setTicketStatus', () => {
    it('set ticket status', () => {
      let status = false;
      ticket.setTicketStatus(status);
      expect(ticket.isActive).equal(status);
    });
  });

  describe('#isTicketActive', () => {
    it('check ticket status', () => {
      expect(ticket.isActive).equal(true);
    });
  });

  describe('#setTicketCost', () => {
    it('set ticket cost', () => {
      let cost = 20
      ticket.setTicketCost(cost);
      expect(ticket.ticketCost).equal(cost);
    });
  });

  describe('#getTicketCost', () => {
    it('get ticket cost', () => {
      expect(ticket.getTicketCost()).equal(0);
    });
  });

  describe('#calculateCost', () => {
    it('calculate ticket cost', () => {
      let calculate = ticket.calculateCost(4);
      expect(calculate).equal(30);
    });
  });
});
