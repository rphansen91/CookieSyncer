const Path = require('path');
const fs = require('fs');

const SendIndex = function (request, response) {
    fs.createReadStream(Path.resolve('./demo/index.html'))
    .pipe(response);
}

module.exports = SendIndex;