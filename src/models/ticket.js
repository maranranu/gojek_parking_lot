class Ticket {
  constructor(ticketNumber, vehicle) {
    this.vehicle = vehicle;
    this.ticketNumber = ticketNumber;
    this.issuedAt = new Date().getTime();
    this.exitAt = null;
    this.ticketCost = 0;
    this.isActive = true;
  }

  getTicketNumber() {
    return this.ticketNumber;
  }

  getVehicle() {
    return this.vehicle
  }

  setExitTime(hours) {
    this.exitAt = this.issuedAt + (2*60*60*1000);
  }

  setTicketStatus(isActive) {
    this.isActive = isActive;
  }

  isTicketActive() {
    return this.isActive;
  }

  setTicketCost(cost) {
    this.ticketCost = cost;
  }

  getTicketCost() {
    return this.ticketCost;
  }

  calculateCost(hours) {
    let remaining = hours < 2 ? 0 : hours - 2;
    let amount = 10 + (remaining)*10
    return amount;
  }
}

module.exports = Ticket;
