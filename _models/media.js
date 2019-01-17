var mongoose = require('mongoose');
var types = mongoose.Schema.Types;

module.exports = mongoose.model('Media', {
  title: {
    type: types.String,
    required: true
  },
  _id: {
    type: types.String,
    required: true
  },
  url: {
    type: types.String,
    required: true
  }
});
