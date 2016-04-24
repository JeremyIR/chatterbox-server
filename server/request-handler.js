/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
global.messages = [];
var requestHandler = function(request, response) {

    console.log('Serving request type ' + request.method + ' for url ' + request.url);
    var statusCode = 200;
    var headers = defaultCorsHeaders;

    if (request.method === 'OPTIONS') {
        response.writeHead(statusCode, headers);
        response.end();
        return;
    }

    if (request.method === 'GET') {
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify({ results: global.messages }));
        return;
    }

    if (request.method === 'POST') {
        statusCode = 201;
        var data = '';
        request.on('error', function(err) {
            statusCode = 404;
            response.end();
        });
        request.on('data', function(chunk) {
            data += chunk;
        });
        request.on('end', function() {
            var post = JSON.parse(data);
            global.messages.push(post);
            response.writeHead(statusCode, headers);
            response.end(JSON.stringify(post));
            return;
        });
    }
};

var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'content-type': 'application/json',
    'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler;
