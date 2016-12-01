'use strict';

var Cookies = require('./Cookies');
var ExtractCookie = require('./ExtractCookie');
var BuildCookie = require('./BuildCookie');
var PrimaryKey = require('./PrimaryKey');
var GetPrimaryKey = PrimaryKey.GetPrimaryKey;

class Sessions {
    ready () {
        return this.sessionify.bind(this);
    }

    sessionify (callback) {
        return (request, response) => {
            this.lookupOrCreate(request)
            .then((Item) => GetPrimaryKey(Item))
            .then((sessionId) => {
                request.Cookies = Cookies;
                request.sessionId = sessionId;
                response.setHeader('Set-Cookie', BuildCookie(sessionId));
                callback(request, response);
            })
            .catch((err) => {
                response.writeHead(404, {"Content-Type": "application/json"});
                response.end(JSON.stringify({ message: err.message }));
            });
        }
    }
    
    lookupOrCreate (request) {
        const id = ExtractCookie(request);
        return Cookies.finder(id)
        .catch(() => Cookies.insert(id));
    }

}

module.exports = Sessions;