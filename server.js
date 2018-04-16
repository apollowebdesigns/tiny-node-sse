var http = require('http');
var fs = require('fs');

http.createServer(function(req, res) {
  debugHeaders(req);

  if (req.headers.accept && req.headers.accept === 'text/event-stream') {
    if (req.url === '/stream') {
      sendSSE(req, res);
    } else if (req.url === '/') {
      sendSSE(req, res);
    } else {
      res.writeHead(404);
      res.end();
    }
  } else {
    res.end();
  }
}).listen(8080);

function sendSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    // Website you wish to allow to connect

    // Request methods you wish to allow
    'Access-Control-Allow-Methods':'GET',

    // Request headers you wish to allow
    'Access-Control-Allow-Headers':'X-Requested-With,content-type',
    'Access-Control-Allow-Origin': 'http://localhost',
    'Access-Control-Allow-Credentials': true

  });

  // Sends a SSE every 5 seconds on a single connection.
  setInterval(function() {
    constructSSE(res);
  }, 10*1000);

  constructSSE(res);
}

function constructSSE(res) {
  var randomNumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
  var index = randomNumber-1;
  var satArray = [
    [{id:1,state:'OK'},{id:2,state:'OK'},{id:3,state:'OK'},{id:4,state:'OK'}],
    [{id:1,state:'OK'},{id:2,state:'OK'},{id:3,state:'OK'},{id:4,state:'ERROR'}],
    [{id:1,state:'OK'},{id:2,state:'OK'},{id:3,state:'ERROR'},{id:4,state:'OK'}],
    [{id:1,state:'OK'},{id:2,state:'ERROR'},{id:3,state:'OK'},{id:4,state:'OK'}],
    [{id:1,state:'ERROR'},{id:2,state:'OK'},{id:3,state:'OK'},{id:4,state:'OK'}],
  ];
  var data = JSON.stringify(satArray[index]);
  var id = Math.floor(Math.random() * 99999999);
  console.log("id: "+id);
  console.log("data: "+data);
  res.write('id: ' + id + '\n');
  res.write("data: " + data+'\n\n');
}

function debugHeaders(req) {
  console.log('URL: ' + req.url);
  for (var key in req.headers) {
    console.log(key + ': ' + req.headers[key]);
  }
  console.log('\n\n');
}