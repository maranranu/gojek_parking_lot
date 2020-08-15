class Ticket {
  constructor(ticketNumber, registrationNumber) {
    this.registrationNumber = registrationNumber;
    this.ticketNumber = ticketNumber;
    this.issuedAt = new Date().getTime();
    this.ticketCost = 0;
    this.isActive = false;
  }

  getTicketNumber() {
    return this.ticketNumber;
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
}
