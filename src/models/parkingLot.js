const HeapTree = require('../utils/heapTree');

class ParkingSlot {
  constructor() {
    this.MAX_SLOT_SIZE = 0;
    this.occupiedSlots = {};
    this.freeSlots = new HeapTree();
  }

  create(size) {
    this.MAX_SLOT_SIZE = size;
    this._assignFreeSlots(size);
  }

  slotAvailable() {
    return this.freeSlots.length();
  }
  
  reset() {
    this.MAX_SLOT_SIZE = 0;
    this.occupiedSlots = {};
    this.freeSlots = new HeapTree();
  }

  _assignFreeSlots(size) {
    for (let i = 1; i <= size; i++) {
      this.freeSlots.set(i);
    }
  }

  setSlots(slot, value) {
    this.occupiedSlots[slot] = value;
    this.freeSlots.remove(slot);
  }

  delSlots(slot) {
    delete this.occupiedSlots[slot];
    this.freeSlots.set(slot);
  }

  isSlotEmpty() {
    return this.MAX_SLOT_SIZE === 0;
  }

  isSlotFull() {
    return Object.keys(this.occupiedSlots).length >= this.MAX_SLOT_SIZE;
  }

  getOccupiedSlots() {
    return this.occupiedSlots;
  }

  getNearestFreeSlot() {
    return this.freeSlots.getMin()
  }
}

module.exports = ParkingSlot;
