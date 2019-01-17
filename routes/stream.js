var express = require('express');
var router = express.Router();
var ffmpeg = require('fluent-ffmpeg');
var ytdl = require('ytdl-core');
var mongo = require('mongoose');
const spawn = require('child_process').spawn;
var path = require('path');

var dataChannel = require('../_models/data-channel');

var channel = require('../_models/channel');
var approval = require('../_models/approval');
var blacklist = require('../_models/blacklist');
var whitelist = require('../_models/whitelist');
var queue = require('../_models/queue');
var live = require('../_models/live');

router.get('/', (req, res) => {
  channel.find({}).then(result => {
    res.send({
      ok: true,
      data: result
    });
  }).catch(err => {
    console.log('DB streams get all error: ' + err);
  });
})

router.get('/:streamId/queue', (req, res) => {
  var streamId = new mongo.Types.ObjectId(req.params.streamId);

  queue.find({
    radioId: streamId
  }, null, {
    limit: 10,
    sort: {
      createdAt: 'ascending'
    }
  }).then(queue => res.send({
    ok: true,
    data: queue
  })).catch(err => {
    console.log('DB stream queue get: ' + err);
    res.status(500).end();
  });
});

router.post('/:streamId/queue', (req, res) => {
  var {
    _id,
    title
  } = req.body;
  var streamId = new mongo.Types.ObjectId(req.params.streamId);

  new queue({
    mediaId: new mongo.Types.ObjectId(_id),
    radioId: streamId,
    title: title,
    createdAt: new Date().toISOString()
  }).save().then(result => {
    res.send({
      ok: true
    });
  }).catch(err => {
    console.log('DB queue post error: ' + err);
    res.status(500).end();
  });
});

router.delete('/:streamId/queue/:queueId', (req, res) => {
  queue.findByIdAndDelete(req.params.queueId).then(result => {
    res.send({
      ok: true
    });
  }).catch(err => {
    console.log('DB queue delete error: ' + err);
    res.status(500).end();
  });
});

router.get('/:streamId/approval', (req, res) => {
  var streamId = new mongo.Types.ObjectId(req.params.streamId);

  channel.findById(streamId).then((result) => {
    return approval.find({
      radioId: streamId
    });
  }).then(approvals => res.send({
    ok: true,
    data: approvals
  }));
});

router.post('/:streamId/approval/:approvalId', (req, res) => {
  var {
    action
  } = req.body;
  var {
    approvalId
  } = req.params;
  approval.findByIdAndDelete(approvalId).then(result => {
    const {
      mediaId,
      radioId,
      title,
      createdAt
    } = result;
    delete result._id;
    if (action === 'approve') {
      new queue({
        mediaId,
        radioId,
        title,
        createdAt
      }).save().then(q => res.send({
        ok: true,
        data: q
      }));
    } else if (action === 'whitelist') {
      new whitelist({
        mediaId,
        radioId,
        title,
        createdAt
      }).save().then(q => res.send({
        ok: true,
        data: q
      })).then(() => {
        new queue({
          mediaId,
          radioId,
          title,
          createdAt
        }).save().then(q => res.send({
          ok: true,
          data: q
        }));
      });
    } else if (action === 'blacklist') {
      new blacklist({
        mediaId,
        radioId,
        title,
        createdAt
      }).save().then(q => res.send({
        ok: true,
        data: q
      }));
    } else {
      res.send({
        ok: true,
        data: {
          mediaId,
          radioId,
          title,
          createdAt
        }
      });
    }
  }).catch(err => {
    console.log('DB approval post with approvalId: ' + err);
    res.status(500).end();
  });
});

router.post('/:streamId/approval', (req, res) => {
  var {
    mediaId,
    title
  } = req.body;
  var streamId = new mongo.Types.ObjectId(req.params.streamId);

  Promise.all([whitelist.findOne({
    mediaId: mediaId,
    radioId: streamId
  }).exec(), blacklist.findOne({
    mediaId: mediaId,
    radioId: streamId
  }).exec()]).then((result) => {
    if (result[0]) {
      new queue({
        mediaId: mediaId,
        radioId: streamId,
        title: title,
        createdAt: new Date().toISOString()
      }).save().then(q => res.send({
        ok: true,
        data: {
          status: 'queue'
        }
      }));
    } else if (result[1]) {
      res.send({
        ok: true,
        data: {
          status: 'blacklist'
        }
      });
    } else {
      new approval({
        mediaId: mediaId,
        radioId: streamId,
        title: title,
        createdAt: new Date().toISOString()
      }).save().then(a => res.send({
        ok: true,
        data: {
          status: 'approval'
        }
      }));
    }
  }).catch(err => {
    console.log('DB approval post: ', err);
    res.status(500).end();
  });

});
router.get('/:streamId/blacklist', (req, res) => {
  var streamId = new mongo.Types.ObjectId(req.params.streamId);
  blacklist.find({
    radioId: streamId
  }).then(result => {
    res.send({
      ok: true,
      data: result
    });
  }).catch(err => {
    console.log('DB blacklist get error: ' + err);
    res.status(500).end();
  });
});

router.delete('/:streamId/blacklist/:blacklistId', (req, res) => {
  var blacklistId = new mongo.Types.ObjectId(req.params.blacklistId);

  blacklist.findByIdAndDelete(blacklistId).then(result => res.send({
    ok: true
  })).catch(err => {
    console.log('DB blacklist delete by id error: ' + err);
    res.status(500).end();
  });
});

router.get('/:streamId/whitelist', (req, res) => {
  var streamId = new mongo.Types.ObjectId(req.params.streamId);
  whitelist.find({
    radioId: streamId
  }).then(result => {
    res.send({
      ok: true,
      data: result
    });
  }).catch(err => {
    console.log('DB whitelist get error: ' + err);
    res.status(500).end();
  });
});

router.delete('/:streamId/whitelist/:whitelistId', (req, res) => {
  var whitelistId = new mongo.Types.ObjectId(req.params.whitelistId);

  whitelist.findByIdAndDelete(whitelistId).then(result => res.send({
    ok: true
  })).catch(err => {
    console.log('DB blacklist delete by id error: ' + err);
    res.status(500).end();
  });
});

router.get('/:streamId/sse/', (req, res) => {
  dataChannel.subscribe('queue-update', (message) => {
    var data = message.split(/\n/).reduce((prev, line) => `${prev}data: ${line}\n`, '');
    console.log(data);
    res.write(`event: ${channel}\n`);
    res.write(data);
    res.write('\n');
  });

  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Access-Control-Allow-Origin": "*"
  });
  res.write("retry: 10000\n\n");
});

router.get('/:streamId/live.mpd', (req, res) => {
  /*live.findOne({
    radioId: new mongo.Types.ObjectId(req.params.streamId)
  }).then(result => {
    res.set({
      'Cache-Control': 'no-cache'
    })
    console.log(result);
    if (result) {
      res.send({
        ok: true,
        data: result
      });
    } else {
      res.send({
        err: 'no stream found'
      });
    }
  }).catch(err => {
    console.log('DB get stream live id error: ' + err);
  });*/
  channel.findById(req.params.streamId).then(result => {
    res.sendFile(path.join(__dirname, '..', 'public', result.path + '.mpd'));
  });
});

router.get('/:streamId/:chunk', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', chunk));
})

module.exports = router;
