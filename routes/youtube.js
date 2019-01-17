var express = require('express');
var router = express.Router();

var fs = require('fs');
var readline = require('readline');
var {
  google
} = require('googleapis');

// initialize the Youtube API library
const youtube = google.youtube({
  version: 'v3',
  auth: process.env.API_KEY || 'AIzaSyCBVjqXzgpr37GJjlPNXQYDcnwhr7OXjuM',
});

/* GET home page. */
router.get('/search', function (req, res) {
  youtube.search.list({
    part: 'snippet',
    q: req.query.q,
    type: 'video',
    maxResults: '25',
    pageToken: req.query.page
  }).then(function (result) {
    res.send(result.data);
  }).catch(function (err) {
    console.log('Error: ' + err);
    res.status(500).send({
      error: 'Internal Error'
    });
  });
});

router.get('/duration', function (req, res) {
  console.log(req.query);
  youtube.videos.list({
    part: 'snippet,contentDetails',
    id: req.query.videos instanceof Array ? req.query.videos.join(',') : [req.query.videos]
  }).then((result) => {
    res.send(result.data);
  }).catch((err) => {
    console.log('Error: ' + err);
    res.status(500).send({
      error: 'Internal Error'
    });
  });
});

module.exports = router;
