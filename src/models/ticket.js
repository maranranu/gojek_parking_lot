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
    amount = 0;
    if (hours <= 2) {
      amount += 10
    }
    hours = hours - 2;
    amount += (hours)*10
    return amount;
  }
}

module.exports = Ticket;
