const ParkingLot = require('./parkingLot');

module.exports = {
  ParkingLot: new ParkingLot().singleton(),
  Vehicle: require('./vehicle'),
  ticket: require('./ticket')
}
