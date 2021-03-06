var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var math = require('./plugins/math.min.js');

var botID = process.env.BOT_ID;

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botCoolRegex = /^\/cool guy$/;// respond with cool acii
      botHueRegex = /^\/hue$/;  //respnod with cool hue gif
      botImgRegex = /((.)*\.jpg)|((.)*\.png)|((.)*\.jpeg)/;  //respond to images

  if(request.text && botCoolRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } else if(request.text && botHueRegex.test(request.text)) {
    this.res.writeHead(200);
    postHueMessage(Math.random(0,2));
    this.res.end();
  } else if(request.image) {
    this.res.writeHead(200);
    postShitMessage();
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200)
;    this.res.end();
  }
}

function postShitMessage() {
  var botResponse, options, body, botReq;

  botResponse = 'Looks like shit';

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postHueMessage(index) {
  var botResponse, options, body, botReq, hueGifs;
  hueGifs = ['https://puu.sh/xv87K/a0135e2de6.gif','https://puu.sh/xvAjj/685aa8b205.gif','https://puu.sh/xvAa4/cadd0a5bf6.gif']

  botResponse = hueGifs[index];

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postMessage() {
  var botResponse, options, body, botReq;

  botResponse = cool();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;