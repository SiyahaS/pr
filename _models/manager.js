var mongoose = require('mongoose');
var types = mongoose.Schema.Types;

module.exports = mongoose.model('User', {
  username: {
    type: types.String,
    required: true
  },
  password: {
    type: types.String,
    required: true
  }
});
