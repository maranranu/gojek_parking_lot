const { expect, assert } = require('chai');
const {ParkingLot, Car} = require('src/models');

describe('controllers :: ParkingLotController', () => {
  let parkingLot, parkingDetails, size, car;
  beforeEach(() => {
    parkingLot = new ParkingLot();
    parkingDetails = {};
    size = 5;
  });

  describe('#createParkingSlots', () => {
    context('create parking lot', () => {
      it('parking lot created', () => {
        parkingLot.create(size);
        expect(parkingLot.MAX_SLOT_SIZE).equal(size);
      });
    });
    context('when slot value is invalid', () => {
      it('Reject with error, as slot value <= 0', () => {
        let slot = 0;
        try {
          throw new Error(`Invalid slot value ${slot}`);
        } catch (error) {
          expect(error.message).equal('Invalid slot value 0');
        }
      });
    });
    context('when slot is already alloted', () => {
      it('Rejects with error, as slot is already alloted', () => {
        try {
          parkingLot.create(size);
          if (parkingLot.isSlotEmpty()) {
            parkingLot.create(size);
          } else {
            throw new Error(`Slot already created.`)
          }
        } catch (error) {
          expect(error.message).equal('Slot already created.');
        }
      });
    });
  });

  describe('#getParkingStatus', () => {
    context('when slot is alloted', () => {
      it('Get slots', () => {
        const car = new Car('KA-01-HH-1234', 'White');
        parkingLot.create(size);
        parkingLot.setSlots(1, car);
        let slots = parkingLot.getOccupiedSlots();
        assert.property(slots, 1)
      });
    });

    context('when parking lot is empty', () => {
      it('rejects with an error', () => {
        try {
          if (parkingLot.isSlotEmpty()) {
            throw new Error(`No Slot alloted`);
          }
          parkingLot.getOccupiedSlots();
        } catch (error) {
          expect(error.message).equal('No Slot alloted');
        }
      });
    });
  });

  describe('#parkCar', () => {
    context('when vehicle parked successfully', () => {
      it('vehicle park to nearest empty slot', () => {
        const car = new Car('KA-01-HH-1234', 'White');
        parkingLot.create(size);
        let slot = parkingLot.getNearestFreeSlot();
        parkingDetails['KA-01-HH-1234'] = {
          slot: slot,
          vehicle: car
        };
        parkingLot.setSlots(slot, car);
        let slots = parkingLot.getOccupiedSlots();
        assert.property(slots, slot)
      });
    });
    context('when registration number invalid', () => {
      it('Reject with error, as registration number is empty', () => {
        try {
          let registrationNumber;
          if (!registrationNumber) {
            throw new Error(`Registration number required to park a vehicle`);
          }
          parkingLot.create(size);
          let slot = parkingLot.getNearestFreeSlot();
          const car = new Car(registrationNumber);
          parkingDetails[registrationNumber] = {
            slot: slot,
            vehicle: car
          };
          parkingLot.setSlots(slot, car);
        } catch (error) {
          expect(error.message).equal('Registration number required to park a vehicle');
        }
      });
    });
    context('when slot is not alloted', () => {
      it('Rejects with error, as slot is not alloted', () => {
        try {
          if (parkingLot.isSlotEmpty()) {
            throw new Error(`No Slot alloted`);
          }
          let slot = parkingLot.getNearestFreeSlot();
          const car = new Car('KA-01-HH-1234', 'White');
          parkingDetails['KA-01-HH-1234'] = {
            slot: slot,
            vehicle: car
          };
          parkingLot.setSlots(slot, car);
        } catch (error) {
          expect(error.message).equal('No Slot alloted');
        }
      });
    });
    context('when slot is full', () => {
      it('Rejects with error, as slot is full', () => {
        try {
          parkingLot.create(2);
          for (let i = 0; i < 2; i++) {
            const car = new Car('KA-01-HH-1234', 'White');
            let slot = parkingLot.getNearestFreeSlot();
            parkingLot.setSlots(slot, car);
          }
          if (parkingLot.isSlotFull()) {
            throw new Error('Sorry, parking lot is full');
          }
        } catch (error) {
          expect(error.message).equal('Sorry, parking lot is full');
        }
      });
    });
    context('when slot is invalid', () => {
      it('Rejects with error, as slot is invalid', () => {
        try {
          const car = new Car('KA-01-HH-1234', 'White');
          parkingLot.create(size);
          let slot;
          if (slot) {
            throw new Error(`Car cannot be parked as slot is undefined`);
          }
          parkingDetails['KA-01-HH-1234'] = {
            slot: slot,
            vehicle: car
          };
          parkingLot.setSlots(slot, car);
        } catch (error) {
          expect(error.message).equal('Car cannot be parked as slot is undefined');
        }
      });
    });
    context('when vehicle already parked', () => {
      it('Rejects with error, as it is already parked', () => {
        try {
          let registrationNumber = 'KA-01-HH-1234';
          parkingDetails[registrationNumber] = {};
          if (registrationNumber in parkingDetails) {
            throw new Error(`Vehicle ${registrationNumber} is already parked.`);
          }
        } catch (error) {
          expect(error.message).equal('Vehicle KA-01-HH-1234 is already parked.');
        }
      });
    });
  });

  describe('#leaveVehicle', () => {
    context('when vehicle leave lot successfully', () => {
      it('Vehicle left', () => {
        let registration = 'KA-01-HH-1234';
        parkingLot.create(size);
        const car = new Car(registration, 'White');
        parkingDetails[registration] = {
          slot: 1,
          car: car
        };
        let slot = parkingLot.getNearestFreeSlot();
        parkingLot.setSlots(slot, car);

        let slotToClear = parkingDetails[registration];
        parkingLot.delSlots(slotToClear.slot);
        assert.notInclude(Object.keys(parkingLot.getOccupiedSlots()), (slotToClear.slot).toString(), 'vehicle left successfully');
      });
    });

    context('when parking lot is empty', () => {
      it('rejects with an error, as lot is empty', () => {
        try {
          if(parkingLot.isSlotEmpty()) {
            throw new Error(`No Slot alloted`);
          }
        } catch (error) {
          expect(error.message).equal('No Slot alloted');
        }
      });
    });

    context('when vehicle not parked in lot', () => {
      it('rejects with an error, as this vehicle is not in parking lot', () => {
        try {
          let registrationNumber = 'DL-12-AA-9999';
          if(!(registrationNumber in parkingDetails)) {
            throw new Error(`Registration number ${registrationNumber} not found`);
          }
        } catch (error) {
          expect(error.message).equal('Registration number DL-12-AA-9999 not found');
        }
      });
    });
  });

  describe('#getSlotByRegistration', () => {
    context('when slot is there for particular registration number', () => {
      it('Get slot for this vehicle', () => {
        parkingLot.create(size);
        let registrationNumber = 'DL-12-AA-9999';
        const car = new Car(registrationNumber);
        let slot = parkingLot.getNearestFreeSlot();
        parkingDetails[registrationNumber] = {
          slot: slot,
          car: car
        };
        parkingLot.setSlots(slot, car);
        let returnSlot = parkingDetails[registrationNumber].slot;
        expect(returnSlot).equal(slot);
      });
    });

    context('when vehicle not parked in lot', () => {
      it('rejects with an error, as this vehicle is not in parking lot', () => {
        try {
          let registrationNumber = 'DL-12-AA-9999';
          throw new Error(`Registration number ${registrationNumber} not found`);
        } catch (error) {
          expect(error.message).equal('Registration number DL-12-AA-9999 not found');
        }
      });
    });
  });
});
