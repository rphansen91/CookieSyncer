const Respondify = require('../utils/Respondify');

function HandleGetAll (request, responder) {
    request.Cookies.scan()
    .then(responder.onSuccess)
    .catch(responder.onFailure)
}

function HandleGetOne (request, responder) {
    request.Cookies.finder(request.sessionId)
    .then(responder.onSuccess)
    .catch(HandleAddOne.bind(request.Cookies, request, responder))
}

function HandleAddOne (request, responder) {
    request.Cookies.insert(request.sessionId)
    .then((Item) => responder.onSuccess(Item))
    .catch(responder.onFailure);
}

function HandleDeleteAll (request, responder) {
    request.Cookies.deleter()
    .then(responder.onSuccess)
    .catch(responder.onFailure);
}

module.exports = {
    getAll: Respondify(HandleGetAll),
    getOne: Respondify(HandleGetOne),
    addOne: Respondify(HandleAddOne),
    deleteAll: Respondify(HandleDeleteAll)
}