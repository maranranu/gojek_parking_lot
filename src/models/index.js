const {Car} = require('./vehicle');

module.exports = {
  ParkingLot: require('./parkingLot'),
  Car: Car,
  Ticket: require('./ticket'),
  Payment: require('./payment')
}
