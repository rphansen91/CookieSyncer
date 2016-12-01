var Env = require('./Env');
var Dates = require('./Dates');
var inOneUTCWeek = Dates.inOneUTCWeek;

function BuildCookie (id, options) {
    options = options || {}
    options.path = options.path || '/';
    options.expires = inOneUTCWeek();

    var parts = Object.keys(options)
    .filter(part => options[part])
    .map(part => part + '=' + options[part]);
    
    return [Env.CookieName+'='+id]
    .concat(parts)
    .join('; ');
}

module.exports = BuildCookie;