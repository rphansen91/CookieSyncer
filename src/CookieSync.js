var Sessions = require('./sessions/Sessions');
var Router = require('./requests/Router');
var SessionHandler = new Sessions().ready();

module.exports = SessionHandler(Router);