var Handler = require('../utils/Handler');
var SendIndex = require('../utils/SendIndex');
var GetRequests = require('./Get');
var PostRequests = require('./Post');

module.exports = Handler()
.get('/', SendIndex)
.get('/getAll', GetRequests.getAll)
.get('/getOne', GetRequests.getOne)
.get('/deleteAll', GetRequests.deleteAll)
.post('/setOne', PostRequests.setOne)
.ready();