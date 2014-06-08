var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
  if (req.method != 'POST') 
     return res.send('Send me a POST\n');

  var body = "";
  req.on('data', function (chunk) {
        body += chunk;
  });
  req.on('end', function () {
        res.writeHead(200);
        res.end(body.toString().toUpperCase());
  });
});

server.listen(Number(process.argv[2]))
