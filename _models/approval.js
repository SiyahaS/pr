var mongoose = require('mongoose');
var types = mongoose.Schema.Types;

module.exports = mongoose.model('Approval', {
  mediaId: {
    type: types.String,
    required: true
  },
  radioId: {
    type: types.ObjectId,
    required: true
  },
  title: {
    type: types.String,
    required: true
  },
  createdAt: {
    type: types.Date,
    required: true
  }
});
