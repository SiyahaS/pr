var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var env = require('./env');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(`${env.mainDB}/${env.dbName}`).then(() => {

  if (env.type === 'encoder') {
    var encoderRouter = require('./routes/encoder');
    app.use('/api/v1/encoder', encoderRouter);
  } else {
    var youtubeRouter = require('./routes/youtube');
    var usersRouter = require('./routes/users');
    var streamsRouter = require('./routes/stream');
    var cacheRouter = require('./routes/cache');
    app.use('/api/v1/youtube', youtubeRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/radios', streamsRouter);
    app.use('/api/v1/cache', cacheRouter);
    app.use('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
  }
}).catch((err) => {
  console.log('DB Error: ' + err);
});


module.exports = app;
