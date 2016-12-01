var uuid = require('uuid');
var Env = require('./Env');

function ExtractCookie (req) {
    var cookieName = Env.CookieName + '=';
    if (req.headers && req.headers.cookie && req.headers.cookie.includes(cookieName)) {
        return req.headers.cookie
        .split(cookieName)[1]
        .split(';')[0];
    }
    return uuid.v4();
}

module.exports = ExtractCookie;