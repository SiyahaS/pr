var mongoose = require('mongoose');
var types = mongoose.Schema.Types;

module.exports = mongoose.model('Channel', {
  owner: {
    type: types.ObjectId,
    required: true
  },
  title: {
    type: types.String,
    required: true
  },
  path: {
    type: types.String,
    required: true
  },
  image: {
    type: types.String,
    default: () => 'http://ksdesigning.com/themes/beach/wp-content/uploads/2013/03/featured-image-vertical-300x400.jpg'
  }
});
