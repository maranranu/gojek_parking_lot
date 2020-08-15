const {MODE} = require('./constants');

module.exports = {
  hashCode: function(s) {
    for(let i = 0, h = 0; i < s.length; i++)
        h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
  },
  paymentMode: function(mode) {
    return MODE[mode]
  }
}
