class Vehicle {
  constructor(registrationNumber, size, color) {
    this.registrationNumber = registrationNumber;
    this.color = color;
    this.size = size;
  }

  getRegistration() {
    return this.registrationNumber;
  }

  getColor() {
    return this.color;
  }

  getSize() {
    return this.size;
  }
}

class Car extends Vehicle {
  constructor(registrationNumber, color='red', size='medium') {
    super(registrationNumber, size, color);
    this.carSlots = {}
  }
}

module.exports = {
  Vehicle,
  Car
}
