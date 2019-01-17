var redis = require("redis");

module.exports.subscribe = function (channel, callback) {
  var subscriber = redis.createClient();

  subscriber.subscribe(channel);

  subscriber.on("error", function (err) {
    console.log("Redis error: " + err);
  });

  subscriber.on("message", callback);
};

module.exports.publish = function (channel, data) {
  var publisher = redis.createClient();

  publisher.publish(channel, JSON.stringify(data));
};
