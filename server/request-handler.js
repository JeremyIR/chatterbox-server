/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  
  if (request.method === 'GET' && request.url === '/classes/messages') {
    headers['Content-Type'] = 'application/json';
    response.writeHead(response.statusCode, response.headers);
    response.end(JSON.stringify({results: []}));
  }

  if (request.method === 'POST' && request.url === '/send') {
    response.statusCode = 201;
    response.headers;
    response.end();
  }
};


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports = {
  request: requestHandler
};


// headers['Content-Type'] = 'application/json';
//     response.writeHead(response.statusCode, response.headers);
//     response.setEncoding('utf-8');
//     response.on('data', function(chunk) {
//       console.log('Response ' + chunk);
//     });

 // response.write({
 //    username: 'Jono',
 //    message: 'Do my bidding!'
 //  });

 //  response.end();