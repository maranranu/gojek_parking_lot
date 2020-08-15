const {ParkingLot, Car, Ticket} = require('../models');
const logger = require('../utils/logger');
const {hashCode, paymentMode} = require('../utils/helpers');

class ParkingLotController {
  constructor() {
    this.parkingLot = ParkingLot;
    this.parkingDetails = {};
  }

  createParkingSlots(slot) {
    slot = parseInt(slot);
    if (slot <= 0) {
      throw new Error(`Invalid slot value ${slot}`)
    }
    let parkingSlots = this.parkingLot.create(slot);
    console.log(logger.success(`Created parking lot with ${slot} slots`));
    return parkingSlots;
  }

  getParkingStatus() {
    if (this.parkingLot.isSlotEmpty()) {
      console.log(logger.warn(`No Slot alloted`));
    } else {
      console.log(logger.success('Slot No.\t\t\tRegistration No.'));
      const slots = this.parkingLot.getSlots();
      slots.forEach(slot => {
        console.log(logger.success(`${slot.key}\t\t\t${slot.value.getRegistration()}`));
      });
    }
  }

  parkCar(registrationNumber) {
    if (this.parkingLot.isSlotFull) {
      console.log(logger.error('Sorry, parking lot is full'));
    } else if (this.parkingLot.isSlotEmpty()) {
      console.log(logger.warn(`No Slot alloted`));
    } else if (registrationNumber in this.parkingDetails) {
      console.log(logger.error(`Vehicle ${registrationNumber} is already parked.`));
    } else {
      const slot = this.parkingLot.getNearestFreeSlot();
      if (slot) {
        const ticketId = hashCode(registrationNumber);
        const carObject = new Car(registrationNumber);
        carObject.setCarSlot(registrationNumber, slot);
        const ticketObj = new Ticket(ticketId, carObject);
        this.parkingDetails[registrationNumber] = {
          slot: slot,
          vehicle: carObject,
          ticket: ticketObj
        };
        this.parkingLot.setSlots(slot, carObject);
        console.log(logger.success(`Allocated slot number: ${slot}`));
      } else {
        console.log(logger.error(`Car cannot be parked as slot is undefined`));
      }
    }
  }

  leaveVehicle(registrationNumber, hour) {
    if (this.parkingLot.isSlotEmpty()) {
      console.log(logger.warn(`No Slot alloted`));
    } else if (!(registrationNumber in this.parkingDetails)) {
      console.log(logger.error(`Car ${registrationNumber} was not parked to any slot`));
    } else {
      const parkingObj = this.parkingDetails[registrationNumber];
      parkingObj.ticket.setExitTime(hour);
      parkingObj.ticket.setTicketStatus(false);
      const amount = parkingObj.ticket.calculateCost(hour);
      parkingObj.ticket.setTicketCost(amount);
      parkingObj.vehiclet.leaveCarSlot(registrationNumber);
      const paymentObj = new Payment(hashCode(registrationNumber), amount);
      delete this.parkingDetails[registrationNumber];
      this.parkingLot.delSlot(parkingObj.slot);
      console.log(logger.success(`Registration number ${registrationNumber} with Slot Number ${parkingObj.slot} is free with Charge ${amount}`));
    }
  }
}
module.exports = ParkingLotController;
