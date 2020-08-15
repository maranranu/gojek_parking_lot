const {ParkingLot} = require('../models');
const logger = require('../utils/logger');

function createParkingSlots(slot) {
  slot = parseInt(slot);
  if (slot <= 0) {
    throw new Error(`Invalid slot value ${slot}`)
  }
  let parkingSlots = ParkingLot.create(slot);
  console.log(logger.success(`Created parking lot with ${slot} slots`));
  return parkingSlots;
}

function getParkingStatus() {
  if (ParkingLot.isSlotEmpty()) {
    console.log(logger.warn(`No Slot alloted`));
  }
  console.log(logger.success('Slot No.\t\t\tRegistration No.'));
  const slots = ParkingLot.getSlots();
  slots.forEach(slot => {
    console.log(logger.success(`${slot.key}\t\t\t${slot.value.getRegistration()}`));
  });
}

module.exports = {
  createParkingSlots,
  getParkingStatus
}
