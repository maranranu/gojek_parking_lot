const { expect, assert } = require('chai');
const colors = require('colors');

const logger = require('src/utils/logger');

describe('utils :: helpers', () => {

  describe('success', () => {
    it('success message for text', () => {
      let text = 'test success';
      let obj = logger.success(text);
      expect(obj).equal(colors.green(text));
    });
  });

  describe('error', () => {
    it('error message for text', () => {
      let text = 'test error';
      expect(logger.error(text)).equal(colors.red(text));
    });
  });

  describe('warning', () => {
    it('warning message for text', () => {
      let text = 'test warning';
      expect(logger.warning(text)).equal(colors.yellow(text));
    });
  });

  describe('info', () => {
    it('info message for text', () => {
      let text = 'test info';
      expect(logger.info(text)).equal(colors.blue(text));
    });
  });
});
