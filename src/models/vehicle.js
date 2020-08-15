class Vehicle {
  constructor(registrationNumber, size, color) {
    this.registrationNumber = registrationNumber;
    this.color = color;
    this.size = size;
    this.slot = 0
  }

  getRegistration() {
    return this.registrationNumber;
  }

  setSlot(slot) {
    this.slot = slot;
  }

  getSlot() {
    return this.slot;
  }

  getColor() {
    return this.color;
  }

  getSize() {
    return this.size;
  }
}

class Car extends Vehicle {
  constructor(registrationNumber, size, color) {
    super(registrationNumber, size, color);
  }
}
