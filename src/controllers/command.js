const {COMMANDS} = require('../utils/constants');
const ParkingLot = require('./parkingLot');
const ParkingLotObj = new ParkingLot();
Object.freeze(ParkingLotObj);

const logger = require('../utils/logger');

function commandHandling (commandType, commandArgs) {
  switch(commandType) {
    case COMMANDS.CREATE_PARKING_LOT:
      try {
        const slot = ParkingLotObj.createParkingSlots(parseInt(commandArgs[0]));
        console.log(logger.success(`Created parking lot with ${slot} slots`));
      } catch (error) {
        console.log(logger.error(error.message));
      }
      break;
    case COMMANDS.PARK:
      try {
        const parkSlot = ParkingLotObj.parkCar(...commandArgs);
        console.log(logger.success(`Allocated slot number: ${parkSlot}`));
      } catch (error) {
        console.log(logger.error(error.message));
      }
      break;
    case COMMANDS.STATUS:
      try {
        const slots = ParkingLotObj.getParkingStatus();
        console.log(logger.success('Slot No.\t\t\tRegistration No.'));
        slots.forEach(slot => {
          console.log(logger.success(`${slot.key}\t\t\t${slot.value}`));
        });
      } catch (error) {
        console.log(logger.error(error.message));
      }
      break;
    case COMMANDS.LEAVE:
      try {
        let leaveSlot = ParkingLotObj.leaveVehicle(commandArgs[0], parseInt(commandArgs[1]));
        console.log(logger.success(`Registration number ${leaveSlot.regNo} with Slot Number \
          ${leaveSlot.slot} is free with Charge ${leaveSlot.amount}`));
      } catch (error) {
        console.log(logger.error(error.message));
      }
      break;
    case COMMANDS.SLOT_NUMBER_BY_REGISTRATION:
    try {
      let slot = ParkingLotObj.getSlotByRegistration(commandArgs[0]);
      console.log(logger.success(`Slot for Registration number ${commandArgs[0]} is ${slot}`));
    } catch (error) {
      console.log(logger.error(error.message));
    }
    break;
    default:
      throw new Error('Invalid command entered');
  }

}
module.exports = {
  commandHandling
};
