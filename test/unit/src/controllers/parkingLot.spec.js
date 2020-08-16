const { expect, assert } = require('chai');
const ParkingLot = require('src/controllers/parkingLot');

describe('controllers :: ParkingLotController', () => {
  let parkingLot;

  beforeEach(() => {
    parkingLot = new ParkingLot();
  });

  describe('#createParkingSlots', () => {
    context('create parking lot', () => {
      it('parking lot created', () => {
        let size = 5;
        let out = parkingLot.createParkingSlots(size);
        expect(out).equal(size);
      });
    });
    context('when slot value is invalid', () => {
      it('Reject with error, as slot value <= 0', () => {
        expect(() => parkingLot.createParkingSlots(0)).to.throw(Error, /Invalid slot value 0/);
      });
    });
    context('when slot is already alloted', () => {
      it('Rejects with error, as slot is already alloted', () => {
        let size = 5;
        parkingLot.createParkingSlots(size);

        expect(() => parkingLot.createParkingSlots(size)).to.throw(Error, /Slot already created./);
      });
    });
  });

  describe('#getParkingStatus', () => {
    context('when slot is alloted', () => {
      it('Get slots', () => {
        let size = 5;
        parkingLot.createParkingSlots(size);
        /**park car**/
        parkingLot.parkCar('KA-06-PA-333', 'Blue');
        parkingLot.parkCar('KA-02-hj-333', 'Red');

        let out = parkingLot.getParkingStatus();
        assert.isArray(out);
      });
    });

    context('when parking lot is empty', () => {
      it('rejects with an error', () => {
        expect(() => parkingLot.getParkingStatus()).to.throw(Error, 'No Slot alloted');
      });
    });
  });

  describe('#parkCar', () => {
    context('when vehicle parked successfully', () => {
      it('vehicle park to nearest empty slot', () => {
        let size = 5;
        parkingLot.createParkingSlots(size);

        let out = parkingLot.parkCar('KA-01-P-333', 'Blue');
        expect(out).equal(1);
      });
    });
    context('when registration number invalid', () => {
      it('Reject with error, as registration number is empty', () => {
        let size = 5;
        parkingLot.createParkingSlots(size);
        expect(() => parkingLot.parkCar()).to.throw(Error, 'Registration number required to park a vehicle');
      });
    });
    context('when slot is not alloted', () => {
      it('Rejects with error, as slot is not alloted', () => {
        expect(() => parkingLot.parkCar('KA-01-P-333', 'Blue')).to.throw(Error, 'No Slot alloted');
      });
    });
    context('when slot is full', () => {
      it('Rejects with error, as slot is full', () => {
        let size = 2;
        parkingLot.createParkingSlots(size);
        /**park car**/
        parkingLot.parkCar('KA-06-PA-333', 'Blue');
        parkingLot.parkCar('KA-02-hj-333', 'Red');

        expect(() => parkingLot.parkCar('KA-01-P-333', 'Blue')).to.throw(Error, 'Sorry, parking lot is full');
      });
    });

    context('when vehicle already parked', () => {
      it('Rejects with error, as it is already parked', () => {
        let size = 2;
        parkingLot.createParkingSlots(size);
        /**park car**/
        parkingLot.parkCar('KA-06-PA-333', 'Blue');

        expect(() => parkingLot.parkCar('KA-06-PA-333', 'Blue')).to.throw(Error, 'Vehicle KA-06-PA-333 is already parked.');
      });
    });
  });

  describe('#leaveVehicle', () => {
    context('when vehicle leave lot successfully', () => {
      it('Vehicle left', () => {
        let size = 2;
        parkingLot.createParkingSlots(size);
        /**park car**/
        parkingLot.parkCar('KA-06-PA-333', 'Blue');

        let out = parkingLot.leaveVehicle('KA-06-PA-333');
        assert.isObject(out);
      });
    });

    context('when parking lot is empty', () => {
      it('rejects with an error, as lot is empty', () => {
        expect(() => parkingLot.leaveVehicle('KA-01-P-333', 'Blue')).to.throw(Error, 'No Slot alloted');
      });
    });

    context('when vehicle not parked in lot', () => {
      it('rejects with an error, as this vehicle is not in parking lot', () => {
        let size = 2;
        parkingLot.createParkingSlots(size);
        expect(() => parkingLot.leaveVehicle('KA-01-P-333', 'Blue')).to.throw(Error, 'Registration number KA-01-P-333 not found');
      });
    });
  });

  describe('#getSlotByRegistration', () => {
    context('when slot is there for particular registration number', () => {
      it('Get slot for this vehicle', () => {
        let size = 2;
        parkingLot.createParkingSlots(size);
        parkingLot.parkCar('KA-06-PA-333', 'Blue');

        let out = parkingLot.getSlotByRegistration('KA-06-PA-333');
        expect(out).equal(1);
      });
    });

    context('when vehicle not parked in lot', () => {
      it('rejects with an error, as this vehicle is not in parking lot', () => {
        expect(() => parkingLot.getSlotByRegistration('KA-01-P-333')).to.throw(Error, 'Registration number KA-01-P-333 not found');
      });
    });
  });
});
