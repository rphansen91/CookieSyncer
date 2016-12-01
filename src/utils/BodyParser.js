const BodyParser = function (request, response, callback) {
    var body = "";

    request.on('data', function(data) {
        body += data;
        if(body.length > 1e6) {
            body = "";
            response.writeHead(413, {'Content-Type': 'text/plain'}).end();
            request.connection.destroy();
        }
    });

    request.on('end', function() {
        request.body = JSON.parse(body);
        callback();
    });
}

module.exports = BodyParser;