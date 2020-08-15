const TreeHashMap = require('../utils/bstree');

class ParkingSlot {
  constructor() {
    this.MAX_SLOT_SIZE = 0;
    this.occupiedSlots = new TreeHashMap();
    this.freeSlots = new TreeHashMap();
  }

  create(size) {
    this.MAX_SLOT_SIZE = size;
    this._assignFreeSlots(size);
  }

  _assignFreeSlots(size) {
    for (let i = 1; i <= size; i++) {
      this.freeSlots.set(i, 'free slot');
    }
  }

  setSlots(slot, value) {
    this.occupiedSlots.set(slot, value);
    this.freeSlots.remove(slot);
  }

  delSlots(slot) {
    this.occupiedSlots.remove(slot);
    this.freeSlots.set(slot, 'free slot');
  }

  isSlotEmpty() {
    return this.MAX_SLOT_SIZE === 0;
  }

  isSlotFull() {
    return this.occupiedSlots.length >= this.MAX_SLOT_SIZE;
  }

  getOccupiedSlots() {
    return this.occupiedSlots.getAll();
  }

  getFreeSlots() {
    return this.freeSlots.getAll();
  }

  getNearestFreeSlot() {
    return this.freeSlots.getMinKey()
  }
}

module.exports = ParkingSlot;
