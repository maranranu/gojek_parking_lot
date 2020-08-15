const colors = require('colors');

module.exports = {
  success: function(text) {
    return colors.green(text);
  },
  warning: function(text) {
    return colors.yellow(text)
  },
  error: function(text) {
    return colors.red(text);
  },
  info: function(text) {
    return colors.blue(text);
  }
}
