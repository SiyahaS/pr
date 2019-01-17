var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../_models/manager');
var channel = require('../_models/channel');

/* GET users listing. */
router.post('/login', (req, res) => {
  var {
    username,
    password
  } = req.body;
  user.find({
    username: username,
    password: password
  }).then((result) => {
    if (result.length === 0) {
      res.send({
        err: 'no match'
      });
    } else {
      res.send({
        ok: true,
        data: result[0]
      });
    }
  }).catch(err => {
    console.log('DB user error: ' + err);
    res.status(500).end();
  });
});

router.post('/register', (req, res) => {
  var {
    username,
    password
  } = req.body;
  user.find({
    username: username
  }).then((result) => {
    if (result.length === 0) {
      new user({
        username: username,
        password: password
      }).save().then((result2) => {
        new channel({
          owner: result2._id,
          title: result2.username,
          path: result2.username
        }).save().then(result3 => {
          res.send({
            ok: true,
            data: result2
          });
        });
      }).catch(err => {
        res.send({
          err: 'username not available'
        });
      });
    } else {
      res.send({
        err: 'username not available'
      });
    }
  }).catch((err) => {
    console.log('DB user register error: ' + err);
    res.status(500).end();
  })
});

router.get('/:userid/streams', (req, res) => {
  channel.findOne({
    owner: new mongoose.Types.ObjectId(req.params.userid)
  }).then(result => {
    console.log(result);
    res.send({
      ok: true,
      data: result
    });
  });
});

module.exports = router;
