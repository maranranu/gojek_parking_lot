const {COMMANDS} = require('../utils/constants');
const ParkingLot = require('./parkingLot');
const ParkingLotObj = new ParkingLot();
Object.freeze(ParkingLotObj);

function commandHandling (commandType, commandArgs) {
  switch(commandType) {
    case COMMANDS.CREATE_PARKING_LOT:
      try {
        const slot = ParkingLotObj.createParkingSlots(parseInt(commandArgs[0]));
        return { success: true, type: 'success', msg: `Created parking lot with ${slot} slots` }
      } catch (error) {
        return { success: false, type: 'error', msg: error.message };
      }
      break;
    case COMMANDS.PARK:
      try {
        const parkSlot = ParkingLotObj.parkCar(...commandArgs);
        return { success: true, type: 'success', msg: `Allocated slot number: ${parkSlot}` };
      } catch (error) {
        return { success: false, type: 'error',  msg: error.message };
      }
      break;
    case COMMANDS.STATUS:
      try {
        const slots = ParkingLotObj.getParkingStatus();
        let output = 'Slot No.\t\tRegistration No.\n';
        slots.forEach(slot => {
          output += `${slot.key}\t\t${slot.value}\n`;
        });
        return { success: true, type: 'info', msg: output };
      } catch (error) {
        return { success: false, type: 'error', msg: error.message };
      }
      break;
    case COMMANDS.LEAVE:
      try {
        let leaveSlot = ParkingLotObj.leaveVehicle(commandArgs[0], parseInt(commandArgs[1]));
        return { success: true, type: 'success', msg: `Registration number ${leaveSlot.regNo} with Slot Number ${leaveSlot.slot} is free with Charge ${leaveSlot.amount}` };
      } catch (error) {
        return { success: false, type: 'error', msg: error.message };
      }
      break;
    case COMMANDS.SLOT_NUMBER_BY_REGISTRATION:
    try {
      let slot = ParkingLotObj.getSlotByRegistration(commandArgs[0]);
      return { success: true, type: 'success', msg: `Slot for Registration number ${commandArgs[0]} is ${slot}` };
    } catch (error) {
      return { success: false, type: 'error', msg: error.message };
    }
    break;
    default:
    return { success: false, type: 'warning', msg: 'Invalid command entered' };
  }

}
module.exports = {
  commandHandling
};
