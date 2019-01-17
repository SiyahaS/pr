/*jshint esversion: 6 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');
var ytdl = require('ytdl-core');
var path = require('path');
var media = require('../_models/media');
var fs = require('fs');

var {
  radioName,
  bitrates,
  mainServerPORT,
  mainServer,
  localport,
  mainDB,
  dbName
} = require('../env');

router.get('/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(__dirname, '..', 'audios', fileId + '.mp3');
  console.log(filePath);
  media.findById(fileId).then((result) => {
    if (result === {} || !fs.existsSync(filePath)) {
      res.status(404).end();
    } else {
      res.sendFile(filePath);
    }
  }).catch((err) => {
    console.log('DB media error: ' + err);
    res.status(500).end();
  });
});

router.post('/', (req, res) => {
  const filePath = path.join(__dirname, '..', 'audios', req.body.uri + '.mp3');
  if (fs.existsSync(filePath)) {
    res.send({
      _id: req.body.uri,
      url: req.body.url,
      title: req.body.title
    });
  }

  let stream = ytdl(req.body.url, {
    quality: 'highestaudio',
    filter: 'audioonly'
  });

  ffmpeg({
      source: stream
    }).audioCodec('libmp3lame')
    .audioBitrate('128k')
    .output(`./audios/${req.body.uri}.mp3`)
    .on('end', (stdout, stderr) => {
      new media({
        _id: req.body.uri,
        url: req.body.url,
        title: req.body.title
      }).save().then(result => {
        res.send({
          ok: true,
          data: result
        });
      }).catch(err => {
        // skip already exists in db
        res.send({
          ok: true,
          data: {
            _id: req.body.uri,
            url: req.body.url,
            title: req.body.title
          }
        });
      });
    }).run();
});

module.exports = router;
