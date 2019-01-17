var express = require('express');
var router = express.Router();
var ytdl = require('ytdl-core');
var mongo = require('mongoose');
const {
  spawn
} = require('child_process');
const fs = require('fs');
const {
  PassThrough
} = require('stream');

var req = {
  body: {
    "url": "https://youtu.be/YJTae5ScvQA",
    "uri": "YJTae5ScvQA"
  }
};

let stream = ytdl(req.body.url, {
  quality: 'highestaudio',
  filter: 'audioonly'
});
var file = fs.createReadStream('/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/audio.mp3');
var file2 = fs.createReadStream('/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/audio.mp3');
/*var child = spawn('cat',
  ['|', 'ffmpeg', '-y', '-re', '-f', 'mp3', '-i', 'pipe:', '-c', 'aac', '-b:a', '128k', '-hls_segment_type', 'mpegts', '-hls_time', 1, '-hls_list_size', 0, '/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/' + req.body.uri + '_32k.m3u8'], {
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true
  }
);*/
var child = spawn('cat',
  ['|', 'ffmpeg', '-y', '-re', '-f', 'mp3', '-i', 'pipe:', '-map', '0:a:0', '-map', '0:a:0', '-map', '0:a:0', '-b:0', '128k', '-b:1', '64k', '-b:2', '32k', '-f', 'dash', '-seg_duration', '1', '-use_template 1', '-use_timeline', '0', '-window_size', '5', '-extra_window_size', '10', '-adaptation_sets', '"id=0, streams=a"', '-hls_playlist', 1, '-remove_at_exit', '1', '/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/test.mpd'], {
    stdio: ['pipe', 'inherit', 'inherit'],
    shell: true
  }
);
var files = ['/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/audio128k.mp3', '/home/siyahas/mathdata.io/apache-tomcat-9.0.12/webapps/x/audio128k.mp3'];

const d = new PassThrough();
var foo = () => {
  var filename = files.shift() || './1sec.mp3';
  var st = fs.createReadStream(filename);
  st.pipe(d, {
    end: false
  });
  st.on('end', foo);
  console.log('playing file: ', filename);
};
d.pipe(child.stdin);
foo();


/*var st;
var foo = () => {
  var filename = files.shift() || './1sec.mp3';
  st = fs.createReadStream(filename);
  st.pipe(child.stdin, {
    end: false
  }).on('finish', () => {
    console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<FINISH called');
  });
  st.on('end', foo);
  console.log('playing file: ', filename);
};
foo();*/


/*
file.pipe(child.stdin);
child.on('close', (c, s) => {
  console.log(c, s)
});
child.on('message', (msg) => {
  console.log(msg);
});
child.on('error', (err) => {
  console.log(err);
});
child.on('close', (code) => {
  console.log(code);
});
*/
