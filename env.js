module.exports.radioName = process.env.RADIO || 'test_stream';
module.exports.bitrates = process.env.BITRATES || ['32k', '64k', '128k'];
module.exports.mainServerPORT = process.env.MAIN_SERVER_PORT || 3000;
module.exports.mainServer = `http://${process.env.MAIN_SERVER || 'localhost'}:${module.exports.mainServerPORT}`;
module.exports.localport = process.env.PORT || 3000;
module.exports.mainDB = process.env.MAIN_DB || 'mongodb://localhost:27017';
module.exports.dbName = process.env.DB_NAME || 'pr';
module.exports.type = process.env.TYPE || 'server';
module.exports.currentServer = `http://${process.env.CURRENT_SERVER || 'localhost'}:${process.env.PORT}`;
