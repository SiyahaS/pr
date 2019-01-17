/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
const {
  spawn
} = require('child_process');
var mongoose = require('mongoose');
var dataChannel = require('../_models/data-channel');
var {
  PassThrough
} = require('stream');
var {
  cleanup
} = require('../cleanup');

var {
  radioName,
  bitrates,
  mainServerPORT,
  mainServer,
  localport,
  mainDB,
  dbName,
  currentServer
} = require('../env');

var queue = require('../_models/queue');
var channel = require('../_models/channel');
var live = require('../_models/live');

channel.findOne({
  title: radioName
}).then((result) => {
  return new Promise((resolve, reject) => {
    new live({
      radioId: result.id,
      address: currentServer
    }).save((err, doc) => {
      process.on('SIGINT', () => {
        cleanup(live.findOneAndDelete({
          _id: doc.id
        }).exec());
      });
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}).then((result) => {
  var channelId = result.id; //|| mongoose.Types.ObjectId('5c1e4e575aa1f0c0bef7adaf');

  router.get('/live.mpd', (req, res) => {
    res.set({
      'Content-Type': 'application/dash+xml',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': mainServer
    });
    res.sendFile(path.join(__dirname, '..', 'public', `${radioName}.mpd`));
  });

  router.get('/live.m3u8', (req, res) => {
    res.set({
      'Content-Type': 'application/vnd.apple.mpegURL',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': mainServer
    });
    res.sendFile(path.join(__dirname, '..', 'public', `${radioName}.m3u8`));
  });

  router.get('/live/sse', (req, res) => {
    dataChannel.subscribe('queue-update', (message) => {
      var data = message.split(/\n/).reduce((prev, line) => `${prev}data: ${line}\n`, '');
      res.write(`event: ${channel}\n`);
      data.forEach(element => {
        res.write(element);
      });
    });

    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
      "Access-Control-Allow-Origin": "*"
    });
    res.write("retry: 10000\n\n");
  });

  router.get('/filler', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '1sec.mp3'));
  });

  function nextSong(req, res, pt) {
    queue.find({
      radioId: channelId
    }, null, {
      sort: {
        createdAt: 'ascending'
      },
      limit: 10
    }).then((result) => {
      let url;
      if (result.length > 0) {
        queue.findByIdAndDelete(result[0]._id, () => {});
        url = `${mainServer}/api/v1/cache/${result[0].mediaId}`; // TODO request song from cache server
        dataChannel.publish('queue-update', {
          playing: result[0],
          upNext: result.slice(1)
        });
      } else {
        dataChannel.publish('queue-update', {
          playing: {},
          upNext: []
        });
      }

      http.get(url || `http://localhost:${localport}/api/v1/encoder/filler`, (response) => {
        response.pipe(pt, {
          end: false
        });
        response.once('end', () => setTimeout(() => nextSong(req, res, pt), 300));
      });
    });
  }

  router.get('/live', (req, res) => {
    const pt = new PassThrough();
    pt.pipe(res);
    nextSong(req, res, pt);
  });

  var params = ['-y', '-re', '-f', 'mp3', '-reconnect_at_eof', 1, '-reconnect_streamed', 1, '-timeout', 10000000, '-i', `http://localhost:${localport}/api/v1/encoder/live`];

  var p = bitrates.reduce((prev, bitrate, index) => {
    prev.maps.push('-map', '0:a:0');
    prev.bitrates.push(`-b:${index}`, bitrate);
    return prev;
  }, {
    maps: [],
    bitrates: []
  });

  params = params.concat(p.maps, p.bitrates);
  params.push(
    '-f', 'dash',
    '-seg_duration', '1',
    '-use_template', '1',
    '-use_timeline', '0',
    '-window_size', '5',
    '-extra_window_size', '10',
    //'-adaptation_sets', '"id=0,streams=a"',
    '-remove_at_exit', 1,
    '-init_seg_name', `init-${radioName}$RepresentationID$.m4s`,
    '-media_seg_name', `chunk-${radioName}$RepresentationID$-$Number%05d$.m4s`,
    path.join(__dirname, '..', 'public', `${radioName}.mpd`)
  );

  var child = spawn('ffmpeg', params
    /*
      , {
          stdio: 'inherit'
        }
    */
  );
  child.on('exit', (code, signal) => {
    if (code) {
      console.log('Process exited with: ' + code);
    } else if (signal) {
      console.log('Process received signal: ' + signal);
    } else {
      console.log('Process gracefully ended');
    }
    process.exit(1);
  });

}).catch((err) => {
  console.log('DB error: ' + err);
});

module.exports = router;
