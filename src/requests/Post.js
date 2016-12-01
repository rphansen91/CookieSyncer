const BodyParser = require('../utils/BodyParser');
const Respondify = require('../utils/Respondify');

function HandleSet (request, response) {
    BodyParser(request, response, () => {
        // NEED TO CURRY RESPONDIFY HERE 
        // BODY PARSER NEEDS THE RAW RESPONSE 
        Respondify(function setOne (req, responder) {
            req.Cookies.updater(req.sessionId, req.body)
            .then((Item) => responder.onSuccess(Item))
            .catch((e) => responder.onFailure(e));
        })(request, response)
    })
}

module.exports = {
    setOne: HandleSet
}