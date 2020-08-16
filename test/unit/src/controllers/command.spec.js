const expect = require('chai').expect;
const {COMMANDS} = require('src/utils/constants');
const command = require('src/controllers/command');

describe('controllers :: command', () => {
  describe('commandHandling', () => {
    it('execute create parking lot command with success', () => {
      let output = command.commandHandling(COMMANDS.CREATE_PARKING_LOT, [6]);
      const expectedOutput = 'Created parking lot with 6 slots';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute create parking lot command with error', () => {
      let output = command.commandHandling(COMMANDS.CREATE_PARKING_LOT, [0]);
      const expectedOutput = 'Invalid slot value 0';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute park command with success', () => {
      let output = command.commandHandling(COMMANDS.PARK, ['KA-01-HH-3141', 'White']);
      const expectedOutput = 'Allocated slot number: 1';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute park command with error', () => {
      let output = command.commandHandling(COMMANDS.PARK, []);
      const expectedOutput = 'Registration number required to park a vehicle';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute leave command with success', () => {
      let output = command.commandHandling(COMMANDS.LEAVE, ['KA-01-HH-3141', 4]);
      const expectedOutput = 'Registration number KA-01-HH-3141 with Slot Number 1 is free with Charge 30';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute leave command with error', () => {
      let output = command.commandHandling(COMMANDS.LEAVE, ['DL-01-HH-3141', 4]);
      const expectedOutput = 'Registration number DL-01-HH-3141 not found';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute status command with success', () => {
      let output = command.commandHandling(COMMANDS.STATUS);
      expect(output.success).equal(true);
    });
    it('execute to get slot number by registration number command with success', () => {
      command.commandHandling(COMMANDS.PARK, ['KA-10-2355-3141']);
      let output = command.commandHandling(COMMANDS.SLOT_NUMBER_BY_REGISTRATION, ['KA-10-2355-3141']);
      expect(output.success).equal(true);
    });
    it('execute to get slot number by registration number command with error', () => {
      let output = command.commandHandling(COMMANDS.SLOT_NUMBER_BY_REGISTRATION, ['KA-01-HH-3141']);
      const expectedOutput = 'Registration number KA-01-HH-3141 not found';
      expect(output.msg).equal(expectedOutput);
    });
    it('execute invalid command', () => {
      let output = command.commandHandling('INVALID_COMMAND');
      expect(output.msg).equal('Invalid command entered');
    });
  });
});
