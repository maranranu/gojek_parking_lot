const { expect, assert } = require('chai');
const ParkingLot = require('src/models/parkingLot');

describe('models :: parkingLot', () => {
  let parkingLot;

  beforeEach(() => {
    parkingLot = new ParkingLot();
  });

  describe('#create', () => {
    it('free slot initialized', () => {
      let size = 5;
      parkingLot.create(size);
      expect(parkingLot.slotAvailable()).equal(size);
    });
  });

  describe('#reset', () => {
    it('slot reset', () => {
      parkingLot.reset();
      expect(parkingLot.slotAvailable()).equal(0);
    });
  });

  describe('#setSlots', () => {
    it('insert element in slot', () => {
      /** Initialization **/
      let size = 5;
      parkingLot.create(size);

      parkingLot.setSlots(1, 'slot1');
      assert.property(parkingLot.getOccupiedSlots(), 1);
      expect(parkingLot.slotAvailable()).equal(size-1);
    });
  });

  describe('#delSlots', () => {
    it('delete slot from dictionary', () => {
      /** Initialization and insertion**/
      let size = 5;
      parkingLot.create(size);
      let slot = 1;
      parkingLot.setSlots(slot, 'slot1');

      /** deletion **/
      parkingLot.delSlots(slot);

      assert.notInclude(Object.keys(parkingLot.getOccupiedSlots()), slot.toString());
      expect(parkingLot.slotAvailable()).equal(size);
    });
  });

  describe('#isSlotEmpty', () => {
    it('slot empty', () => {
      let out = parkingLot.isSlotEmpty();
      expect(out).equal(true);
    });
  });

  describe('#isSlotFull', () => {
    it('slot full', () => {
      /** Initialization**/
      let size = 5;
      parkingLot.create(size);

      /** set slots **/
      for (let i = 1; i <= size; i++) {
        parkingLot.setSlots(i, 'slot1');
      }

      expect(parkingLot.isSlotFull()).equal(true);
    });
  });

  describe('#getOccupiedSlots', () => {
    it('get occupied slots', () => {
      /** Initialization**/
      let size = 5;
      parkingLot.create(size);

      /** set slots **/
      let matchOut = {};
      for (let i = 1; i <= size; i++) {
        parkingLot.setSlots(i, 'slot1');
        matchOut[i] = 'slot1';
      }
      let out = parkingLot.getOccupiedSlots();

      expect(out).to.eql(matchOut);
    });
  });

  describe('#getNearestFreeSlot', () => {
    it('get free slot', () => {
      /** Initialization**/
      let size = 5;
      parkingLot.create(size);

      expect(parkingLot.getNearestFreeSlot()).equal(1);
    });
  });

});
