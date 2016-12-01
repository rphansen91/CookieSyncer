function ListeningOn (PORT) {
    const url = 'http://localhost:' + PORT;
    require("openurl").open(url);
    console.info('Listening At ' + url);
}

module.exports = ListeningOn;