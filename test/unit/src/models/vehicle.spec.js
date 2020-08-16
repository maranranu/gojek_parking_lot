const { expect, assert } = require('chai');
const {Vehicle, Car} = require('src/models/vehicle');

describe('models :: vehicle', () => {
  let vehicle;

  beforeEach(() => {
    vehicle = new Vehicle('DL-12-AA-9999', 'medium', 'Blue');
  });

  describe('#getRegistration', () => {
    it('get registration number', () => {
      expect(vehicle.getRegistration()).equal('DL-12-AA-9999');
    });
  });

  describe('#getColor', () => {
    it('get color', () => {
      expect(vehicle.getColor()).equal('Blue');
    });
  });

  describe('#getSize', () => {
    it('get size', () => {
      expect(vehicle.getSize()).equal('medium');
    });
  });

});
