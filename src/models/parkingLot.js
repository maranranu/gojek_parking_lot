const TreeHashMap = require('../utils/bstree');

class ParkingSlot {
  constructor() {
    this.MAX_SLOT_SIZE = 0;
    this.slots = {};
  }

  create(size) {
    this.MAX_SLOT_SIZE = size;
    this.slots = new TreeHashMap();
  }
  
  setSlots(slot, value) {
    this.slots.set(slot, value);
  }

  delSlots(slot) {
    this.slots.remove(slot);
  }

  isSlotEmpty() {
    return this.MAX_SLOT_SIZE === 0;
  }

  isSlotFull() {
    return this.slots.length <= this.MAX_SLOT_SIZE;
  }

  getSlots() {
    return this.slots.getAll();
  }
}
