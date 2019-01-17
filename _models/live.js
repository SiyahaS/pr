var mongoose = require('mongoose');
var types = mongoose.Schema.Types;

module.exports = mongoose.model('Live', {
  radioId: {
    type: types.ObjectId,
    required: true
  },
  address: {
    type: types.String,
    required: true
  }
});
