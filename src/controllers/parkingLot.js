const {ParkingLot, Car, Ticket, Payment} = require('../models');
const {hashCode, paymentMode} = require('../utils/helpers');

class ParkingLotController {
  constructor() {
    this.parkingLot = new ParkingLot();
    this.parkingDetails = {};
  }

  createParkingSlots(slot) {
    if (slot <= 0) {
      throw new Error(`Invalid slot value ${slot}`)
    }
    if (this.parkingLot.isSlotEmpty()) {
      this.parkingLot.create(slot);
    } else {
      throw new Error(`Slot already created.`)
    }
    return slot;
  }

  getParkingStatus() {
    if (this.parkingLot.isSlotEmpty()) {
      throw new Error(`No Slot alloted`);
    } else {
      const slots = this.parkingLot.getOccupiedSlots();
      let result = [];
      for (let key in slots) {
        result.push({
          key: key,
          value: slots[key].getRegistration()
        })
      }
      return result;
    }
  }

  parkCar(registrationNumber, color, size) {
    if (!registrationNumber) {
      throw new Error(`Registration number required to park a vehicle`);
    } else if (this.parkingLot.isSlotEmpty()) {
      throw new Error(`No Slot alloted`);
    } else if (this.parkingLot.isSlotFull()) {
      throw new Error('Sorry, parking lot is full');
    } else if (registrationNumber in this.parkingDetails) {
      throw new Error(`Vehicle ${registrationNumber} is already parked.`);
    } else {
      const slot = this.parkingLot.getNearestFreeSlot();
      if (slot) {
        const ticketId = hashCode(registrationNumber);
        const carObject = new Car(registrationNumber, color=color, size=size);
        const ticketObj = new Ticket(ticketId, carObject);
        this.parkingDetails[registrationNumber] = {
          slot: slot,
          vehicle: carObject,
          ticket: ticketObj
        };
        this.parkingLot.setSlots(slot, carObject);
        return slot;
      } else {
        throw new Error(`Car cannot be parked as slot is undefined`);
      }
    }
  }

  leaveVehicle(registrationNumber, hour) {
    if (this.parkingLot.isSlotEmpty()) {
      throw new Error(`No Slot alloted`);
    } else if (!(registrationNumber in this.parkingDetails)) {
      throw new Error(`Registration number ${registrationNumber} not found`);
    } else {
      const parkingObj = this.parkingDetails[registrationNumber];
      parkingObj.ticket.setExitTime(hour);
      parkingObj.ticket.setTicketStatus(false);
      const amount = parkingObj.ticket.calculateCost(hour);
      parkingObj.ticket.setTicketCost(amount);
      const paymentObj = new Payment(hashCode(registrationNumber), amount);
      delete this.parkingDetails[registrationNumber];
      this.parkingLot.delSlots(parkingObj.slot);
      return {
        regNo: registrationNumber,
        slot: parkingObj.slot,
        amount: amount
      };
    }
  }

  getSlotByRegistration(registrationNumber) {
    if (!(registrationNumber in this.parkingDetails)) {
      throw new Error(`Registration number ${registrationNumber} not found`);
    } else {
      return this.parkingDetails[registrationNumber].slot;
    }
  }
}
module.exports = ParkingLotController;
