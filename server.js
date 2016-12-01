var Http = require('http'); 
var CookieSync = require('./src/CookieSync');
var ListeningOn = require('./src/utils/ListeningOn');
var Port = process.env.port || 8080;

Http.createServer(CookieSync)
.listen(Port, ListeningOn.bind(null, Port));