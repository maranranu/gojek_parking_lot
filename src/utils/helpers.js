const {MODE} = require('./constants');

module.exports = {
  hashCode: function(s) {
    var hash = 0;
    if (s.length == 0) {
        return hash;
    }
    for (var i = 0; i < s.length; i++) {
        var char = s.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash;
    }
    return hash;
  },
  paymentMode: function(mode) {
    return MODE[mode]
  }
}
