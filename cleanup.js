var mongoose = require('mongoose');
var cleanups = [];

module.exports.cleanup = (promise) => {
  cleanups.push(promise);
}

function _cleanup() {
  Promise.all(cleanups).then(() => {
    mongoose.disconnect();
  });
}

process.on('SIGINT', _cleanup);
process.on('beforeExit', _cleanup);
